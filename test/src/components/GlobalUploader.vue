<template>
  <div id="global-uploader" :class="{ 'global-uploader-single': !global }">
    <!-- 上传 -->
    <uploader
        ref="uploaderRef"
        class="uploader-app"
        :options="initOptions"
        :file-status-text="fileStatusText"
        :auto-start="false"
        @file-added="onFileAdded"
        @file-success="onFileSuccess"
        @file-progress="onFileProgress"
        @file-error="onFileError"
        @file-complete="onFileComplete"

    >
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn   id="global-uploader-btn" ref="uploadBtnRef">选择文件</uploader-btn>

<!--      上传按钮，不显示，只被此上传器方法调用，simple_uploader_enable_folder_upload_button来控制是否上传文件夹还是文件-->
      <uploader-btn  id="global-uploader-btn" :directory="true" ref="upload_folder_BtnRef">选择文件夹</uploader-btn>


      <uploader-list v-show="panelShow">
        <template #default="{ fileList }">
          <div class="file-panel" style="background: #131314;" :class="{ collapse: collapse }">
            <div class="file-title" @click="collapse = !collapse">
              <div class="title" style="color:#777777;" >传输列表</div>
              <div class="operate">
<!--                <svg link @click="collapse = !collapse" fill="currentColor" width="15" height="15" style="color:#a2a2a2;cursor: pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">&lt;!&ndash;! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. &ndash;&gt;<path d="M144 320h-128C7.156 320 0 327.2 0 336S7.156 352 16 352H128v112C128 472.8 135.2 480 144 480S160 472.8 160 464v-128C160 327.2 152.8 320 144 320zM304 192h128C440.8 192 448 184.8 448 176S440.8 160 432 160H320V48C320 39.16 312.8 32 304 32S288 39.16 288 48v128C288 184.8 295.2 192 304 192zM432 320h-128c-8.844 0-16 7.156-16 16v128c0 8.844 7.156 16 16 16s16-7.156 16-16V352h112c8.844 0 16-7.156 16-16S440.8 320 432 320zM144 32C135.2 32 128 39.16 128 48V160H16C7.156 160 0 167.2 0 176S7.156 192 16 192h128C152.8 192 160 184.8 160 176v-128C160 39.16 152.8 32 144 32z"/></svg>-->

                <svg link @click="close" fill="currentColor" width="17" height="17" style="color:#3f3f3f;cursor: pointer;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z"/></svg>
              </div>
            </div>

            <ul class="file-list" style="background-color: #131314;list-style: none;font-size: 1px;border-radius: 0px 0px 10px 10px">
              <li
                  v-for="file in fileList"
                  :key="file.id"
                  class="file-item" style="margin-left: -39px">

                  <uploader-file style="border-bottom: 1px solid #3a3a3a"
                  ref="files"
                  :class="['file_' + file.id, customStatus]"
                  :file="file"
                  :list="true">
                  </uploader-file>



              </li>
              <div v-if="!fileList.length" class="no-file">
                <Icon icon="ri:file-3-line" width="16" /> 暂无待上传文件
              </div>
            </ul>


          </div>
        </template>
      </uploader-list>
    </uploader>
  </div>
</template>


<script>
/**
 *  全局上传插件，两种调用方式
 *   1. 作为全局页面的组件，使用event bus
 *   调用方法：Bus.emit('openUploader', {params: {}, options: {}})
 *               params: 发送给服务器的额外参数；
 *               options：上传选项，目前支持 target、testChunks、mergeFn、accept
 *
 *   监听函数：Bus.on('fileAdded', fn); 文件选择后的回调
 *           Bus.on('fileSuccess', fn); 文件上传成功的回调，监听后记得释放
 *
 *   2. 作为普通组件在单个页面中调用，使用props
 */
import { ref, watch, computed, nextTick, onMounted } from 'vue'
import { mergeSimpleUpload } from '../script/uploader/index'
import { generateMD5 } from '../script/uploader/md5'
import Bus from '../script/uploader/bus'
// import {ElMessage, ElNotification} from "element-plus";
import axios from "axios";
import store from "@/store/";
import qs from "qs";
import cookie from "js-cookie";
import {ElMessage} from "element-plus";
import fileDownload from "js-file-download";
// import cookie from "js-cookie";

export default {
  name: 'GlobalUploader',
  props: {
    global: {
      type: Boolean,
      default: true
    },
    // 发送给服务器的额外参数
    params: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  emits: ['fileAdded', 'fileSuccess'],

  setup(props, { emit }) {



    const initOptions = {
      target: 'http://localhost:3000/upload',
      //单位Byte
      chunkSize: '209715200',
      fileParameterName: 'file',
      maxChunkRetries: 3,
      // 是否开启服务器分片校验
      testChunks: true,

      // 服务器分片校验函数，秒传及断点续传基础,接受get接口返回的数据
      checkChunkUploadedByResponse: function (chunk, message) {
        let skip = false
        // console.log("checkChunkUploadedByResponse!!!!!!!!!")
        try {
          let objMessage = JSON.parse(message)
          // console.log(objMessage)
          if (objMessage.skipUpload) {
            skip = true
          } else {
            //b. 如果后台返回了分片信息，这是断点续传。如图，返回的数据中有个uploaded的字段，代表这些分片是已经上传过的了，插件会自动跳过这些分片的上传。
            //uploaded为数组，chunk_number
            skip = (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
          }
        } catch (e) {
        //
        }

        return skip
      },
      query: (file, chunk) => {
        return {
          ...file.params
        }
      }
    }
    const fileStatusText = {
      success: '上传成功',
      error: '上传失败',
      uploading: '上传中',
      paused: '已暂停',
      waiting: '等待上传'
    }
    const customStatus = ref('')
    const panelShow = ref(false)
    const collapse = ref(false)
    const uploaderRef = ref()
    const uploadBtnRef = ref()
    const upload_folder_BtnRef = ref()

    let mergeFn = mergeSimpleUpload

    const uploader = computed(() => uploaderRef.value?.uploader)

    let customParams = {}
    watch(
        () => props.params,
        (data) => {
          if (data) {
            customParams = data
          }
        }
    )
    watch(
        () => props.options,
        (data) => {
          if (data) {
            setTimeout(() => {
              customizeOptions(data)
            }, 0)
          }
        }
    )


    // 自定义options
    function customizeOptions(opts) {
      // 自定义上传url
      if (opts.target) {
        uploader.value.opts.target = opts.target
      }
      // 是否可以秒传、断点续传
      if (opts.testChunks !== undefined) {
        uploader.value.opts.testChunks = opts.testChunks
      }
      // merge 的方法，类型为Function，返回Promise
      if (opts.mergeFn) {
        mergeFn = opts.mergeFn
      }
      // 自定义文件上传类型
      if (opts.accept) {
        let input = document.querySelector('#global-uploader-btn input')
        // eslint-disable-next-line no-undef
        input.setAttribute(opts.accept, accept.join())
      }
    }

    //文件点击上传后的方法
    //md5不再进行计算，影响页面性能，identifier直接用文件名
    async function onFileAdded(file) {
      panelShow.value = true
      trigger('fileAdded')
      // 将额外的参数赋值到每个文件上，以不同文件使用不同params的需求
      file.params = customParams
      // console.log("params")
      // console.log(file.params)

      // 计算MD5
      const md5 = await computeMD5(file)
      startUpload(file, md5)
    }

    function computeMD5(file) {
      // 文件状态设为"计算MD5"
      statusSet(file.id, 'md5')
      // 暂停文件
      file.pause()
      // 计算MD5时隐藏”开始“按钮
      nextTick(() => {
        // document.querySelector(`.file-${file.id} .uploader-file-resume`).style.display = 'none'
      })
      // 开始计算MD5
      //我修改此方法，不再计算md5
      return new Promise((resolve, reject) => {
            statusRemove(file.id);
            let temp;

            //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回-1。存在返回1。
            // if(file.name.indexOf(".")===-1)
            //   temp=file.name;
            // else
            //   temp=file.name.substring(0,file.name.lastIndexOf("."))


            temp=file.name;
            let t1=temp.substring(0,temp.lastIndexOf('.'));
            let t2=temp.substring(temp.lastIndexOf('.')+1,temp.length);
            temp=t1+t2;

            //返回identifier,如果是文件就去掉扩展名前面的点号
            resolve(temp);


        // generateMD5(file, {
        //   onProgress(currentChunk, chunks) {
        //     // 实时展示MD5的计算进度
        //     nextTick(() => {
        //       const md5ProgressText = '文件校验中 ' + ((currentChunk / chunks) * 100).toFixed(0) + '%'
        //       document.querySelector(`.custom-status-${file.id}`).innerText = md5ProgressText
        //     })
        //   },
        //   onSuccess(md5) {
        //     statusRemove(file.id)
        //     resolve(md5)
        //   },
        //   onError() {
        //     error(`文件${file.name}读取出错，请检查该文件`)
        //     file.cancel()
        //     statusRemove(file.id)
        //     reject()
        //   }
        // })
      })
    }

    // md5计算完毕，开始上传
    function startUpload(file, md5) {
      file.uniqueIdentifier = md5
      file.resume()
    }


    //文件上传成功执行，这个接受的是后端post接口返回的数据
    function onFileSuccess(rootFile, file, response, chunk) {
      // let res = JSON.parse(response)
      // console.log("onFileSuccess方法！！！，file为")
      // console.log(file)
      // console.log("username为！")
      // console.log(cookie.get("user_name"))

      // 服务端自定义的错误（即http状态码为200，但是是错误的情况），这种错误是Uploader无法拦截的
      if (response.data==="error") {
        error(response.message)
        // 文件状态设为“失败”
        statusSet(file.id, 'failed')
        return
      }

      statusSet(file.id, 'merging');
      axios.get("http://localhost:8081/mergeFile",{
        params: {
          relativePath: file.relativePath,
          identifier: file.uniqueIdentifier,
          fileName:file.name,
          user_name:cookie.get("user_name"),
          current_upload_path:file.params.current_upload_path
        }
      }).then(function (response) {
        statusSet(file.id, 'merging')
        if (response.data!==null)
        {
          //设置在vuex中的一个值为了对比改上传文件保存的目标路径和用户当前所处在的路径是否相同，目的是为了让前端判断用户是否还在目标路径的页面下，如果在则立刻更新文件列表以多显示上传的文件，如果不在则不做任何事
          store.commit('set_check_current_path_and_upload_path',response.data);

          store.commit('set_one_file_has_been_uploaded',true);   //设置vuex属性，让页面组件监听这个值是否变化


          statusRemove(file.id)
          mergeFn({
            // tempName: res.tempName,
            fileName: file.name,
            ...file.params
          }).then((res) => {
                // 文件合并成功
                trigger('fileSuccess')
                statusRemove(file.id)
              })
              .catch((e) => {
                //
              })

          // if(file.relativePath.includes('/'))
          // {
          //   axios.get("http://localhost:8081/delete_temp_upload_folder",{
          //     params: {
          //       relativePath: file.relativePath,
          //       user_name:cookie.get("user_name"),
          //     }
          //   })
          // }

        }
        // else {
        // //
        // }
      })

      // // 如果服务端返回了需要合并的参数
      // if (response.data==="merge") {
      //   // 文件状态设为“合并中”
      //   statusSet(file.id, 'merging')
      //
      //   mergeFn({
      //     // tempName: res.tempName,
      //     fileName: file.name,
      //     ...file.params
      //   })
      //       .then((res) => {
      //         // 文件合并成功
      //         trigger('fileSuccess')
      //
      //         // statusRemove(file.id)
      //       })
      //       .catch((e) => {
      //       //
      //       })
      //
      //   // 不需要合并
      // } else {
      //   trigger('fileSuccess')
      //   console.log('上传成功')
      // }
    }

    function onFileComplete(rootFile)
    {
      console.log("onFileComplete")
      console.log(rootFile)
      // setTimeout(function a(){delete_temp_upload_folder(rootFile)},500);   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!必须延时执行删除临时文件夹命令，不然会和合并文件的操作同时进行
    }

    function delete_temp_upload_folder(rootFile)
    {
      if(rootFile.isFolder===true)
      {
        console.log("onFileComplete folder")
        axios.get("/delete_temp_upload_folder", {
          params:{
            user_name:cookie.get("user_name"),
            folder_name:rootFile.name
          }
        })
      }
      else
      {
        console.log("onFileComplete file")
        console.log(rootFile.uniqueIdentifier)
        axios.get("/delete_temp_upload_folder", {
          params:{
            user_name:cookie.get("user_name"),
            folder_name:rootFile.uniqueIdentifier
          }
        })
      }
      console.log(rootFile)
    }

    function onFileProgress(rootFile, file, chunk) {
      console.log(
          `上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${
              chunk.endByte / 1024 / 1024
          }`
      )
    }
    function onFileError(rootFile, file, response, chunk) {
      error(response)
    }
    function close() {
      uploader.value.cancel()
      panelShow.value = false
    }
    /**
     * 新增的自定义的状态: 'md5'、'merging'、'transcoding'、'failed'
     * @param id
     * @param status
     */
    function statusSet(id, status) {
      const statusMap = {
        md5: {
          text: '文件校验中',
          bgc: '#212123'
        },
        merging: {
          text: '合并中',
          bgc: '#293f29'
        },
        transcoding: {
          text: '转码中',
          bgc: '#e2eeff'
        },
        failed: {
          text: '上传失败',
          bgc: '#e2eeff'
        }
      }

      customStatus.value = status
      nextTick(() => {
        const statusTag = document.createElement('p')
        statusTag.className = `custom-status-${id} custom-status`
        statusTag.innerText = statusMap[status].text
        statusTag.style.backgroundColor = statusMap[status].bgc

        const statusWrap = document.querySelector(`.file_${id} .uploader-file-status`)
        statusWrap.appendChild(statusTag)
      })
    }
    function statusRemove(id) {
      customStatus.value = ''
      nextTick(() => {
        const statusTag = document.querySelector(`.custom-status-${id}`)
        statusTag.remove()
      })
    }
    function trigger(e) {
      Bus.emit(e)
      emit(e)
    }
    function error(msg) {
      // ElNotification({
      //   title: '错误',
      //   message: msg,
      //   type: 'error',
      //   duration: 2000
      // })
    }

    onMounted(() => {
      Bus.on('openUploader', ({ params = {}, options = {} }) => {
        customParams = params
        customizeOptions(options)

        if (uploadBtnRef.value) {
          uploadBtnRef.value.$el.click()
        }
      }),
          Bus.on('openUploader_enable_folder_upload', ({ params = {}, options = {} }) => {
            customParams = params

            customizeOptions(options)

            if (upload_folder_BtnRef.value) {
              upload_folder_BtnRef.value.$el.click()
            }
          })
    })

    return {
      initOptions,
      fileStatusText,
      customStatus,
      panelShow,
      collapse,
      uploaderRef,
      uploadBtnRef,

      upload_folder_BtnRef,

      customParams,

      onFileAdded,
      onFileSuccess,
      onFileComplete,
      onFileProgress,
      onFileError,
      close
    }
  }
}
</script>


<style lang="scss">
.uploader-file[status=error] .uploader-file-progress
{
  background-color: #5e2626;
  border-bottom: #a83d3d solid 1px;
}
.uploader-file-progress
{
  background-color: #294028;
  bottom: 0;
  height: 100%;
  border-bottom: #37ff00 solid 1px;
}
.uploader-file[status=success] .uploader-file-remove
{
  display: block;
}
.uploader-file-meta
{
  width: 0;
}
.uploader-file-status
{
  width: 32%;
}
.uploader-file-status i
{
  display: none;
}
.uploader-file-info:hover {
  background-color: transparent;
}


#global-uploader {
  &:not(.global-uploader-single) {
    position: fixed;
    z-index: 20;
    right: 15px;
    bottom: 15px;
    box-sizing: border-box;
  }

  .uploader-app {
    width: 520px;
  }

  .file-panel {
    //background-color: #fff;
    //border: 1px solid #e2e2e2;
    //border-radius: 7px 7px 0 0;
    border-radius: 10px;
    //box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .file-title {
      display: flex;
      height: 39px;
      line-height: 40px;
      padding: 0 15px;
      transition: all 0.4s;
      //border-bottom: 1px solid #2d2d2d;

      .operate {
        flex: 1;
        text-align: right;
      }

    }
    .file-title:hover
    {
        background-color: #2c2c2c;
      border-radius: 10px 10px 0 0;
      cursor: pointer;
    }

    .file-list {
      position: relative;
      height: 440px;
      overflow-x: hidden;
      overflow-y: auto;
      transition: all 0.4s;

      .file-item {
        background-color: #212122;
      }
    }

    &.collapse {
      .file-title {
        border-radius: 10px;
        background-color: #212123;
      }
      .file-title:hover
      {
        background-color: #484848;
        border-radius: 10px;
        cursor: pointer;
      }
      .file-list {
        //display: none;
        height: 0;
      }
      .file-item
      {
        display: none;
      }
    }
  }

  .no-file {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;

    svg {
      vertical-align: text-bottom;
    }
  }

  .uploader-file {
    &.md5 {
      .uploader-file-resume {
        display: none;
      }
    }
  }

  .uploader-file-icon {
    &:before {
      content: '' !important;
    }
    &[icon='image'] {
      background: url(../assets/picture.png);
      background-size: contain;
    }
    &[icon='audio'] {
      background: url(../assets/music.png);
      background-size: contain;
    }
    &[icon='video'] {
      background: url(../assets/video.png);
      background-size: contain;
    }
    &[icon='document'] {
      background: url(../assets/document.png);
      background-size: contain;
    }
    &[icon='unknown'] {
      background: url(../assets/other.png) no-repeat center;
      background-size: contain;
    }
    &[icon='folder'] {
      background: url(../assets/folder.png) no-repeat center;
      background-size: contain;
    }
  }

  .uploader-file-actions > span {
    margin-right: 6px;
  }

  .custom-status {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
}

/* 隐藏上传按钮 */
#global-uploader-btn {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

.global-uploader-single {
  #global-uploader-btn {
    position: relative;
  }
}

#global-uploader .uploader-file-icon[icon=document]
{
  margin-top: 7.999000000000002em;
  background-size: 120%;
  background-repeat: no-repeat;
}
</style>



