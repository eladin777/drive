<template>

  <div style="height: 5px;margin-bottom: -15px" >
    <div style="position:fixed;margin-top: 85px;margin-left: 6px;float: left">
      <!--  全选选择框 element plus-->
      <el-checkbox id="select_all_check_box"  :indeterminate="check_box_check_all_is_indeterminate" @change="handleCheckAllChange" ></el-checkbox><!--        //indeterminate	设置不确定状态，仅负责样式控制	boolean  -->
      <span v-show="checked_files_group.length===0" style="color: #8c8c8c; font-size: 14px;margin-left: 5px;vertical-align: 12%">{{folder_list.folder_data.length+file_list.file_data.length}}项</span>
      <span v-show="checked_files_group.length>0" style="color: #8c8c8c; font-size: 14px;margin-left: 5px;vertical-align: 12%">已选{{checked_files_group.length}}项</span>
    </div>
    <table style="width: 100%;position: relative;top: 120px;" v-show="!store.state.enable_big_icon_mode">
      <tr>

        <td style="width:79.5%;font-size: 7px;color: #727272;" class="table-td" >
          <span style="margin-left: 34px"> 名称 </span>
        </td>
        <td  style="font-size: 7px;color: #727272;width: 11.7%" class="table-td" >提取码</td>
        <td  style="font-size: 7px;color: #727272;" class="table-td" >大小 </td>
        <!--      <td  style="width: 110px" class="table-td" ></td>-->
      </tr>
    </table>

  </div>

  <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 空文件显示图标，需要用响应式ref数据来控制dom的显示，直接判断response data的长度会导致在刷新文件列表前意外地显示空文件图标  "empty_file===true"-->
  <div style="position: relative;width: 100%;margin-top:25%;text-align: center" v-show="empty_file===true">
    <img  style="width: 200px;height: 200px;display: inline-block;vertical-align: middle;" src="../assets/empty.png">
  </div>
  <div style="position: relative;width: 100%;text-align: center" v-show="empty_file===true">
    <p  style="width: 70px;color: #565656;display: inline-block;vertical-align: middle;margin-top: 0;font-size: 15px">无文件</p>
  </div>
  <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑空文件显示图标，需要用响应式ref数据来控制dom的显示，直接判断response data的长度会导致在刷新文件列表前意外地显示空文件图标  "empty_file===true&&empty_folder===true"-  -->


  <div id="file_display_area" :style="store.state.SideBar_isOpen? 'width:calc(100% - 280px)' : ' width:calc(100% - 42px)'"><!--    获取ｖｕｅｘ状态值（菜单是否折叠），以此依据改变文件显示区域的宽度-->

    <el-scrollbar>
      <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 大图标显示区域 -->
      <div class="" v-show="store.state.enable_big_icon_mode" style="display: flex;flex-direction:row;justify-content: flex-start;flex-wrap:wrap;width: 99%;">
        <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 大图标模式，文件显示 -->
        <div class="table_area"  v-on:click.right="click_drop_down(file)" style="border-radius: 10px;margin-bottom: 60px;margin-left: 40px;flex: 0 0 120px;" v-for="file in file_list.file_data" :key="file" >

          <el-checkbox-group v-model="checked_files_group" @change="handleCheckedFilesChange">
            <el-checkbox style="margin-left: 6px"  :label="file.file_path" class="my_check_box">
              <!-- 多选框不显示label 只要在里面加上<br>就OK了 -->
              <br>
            </el-checkbox>
          </el-checkbox-group>

          <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  弹出选项菜单-->
          <div class="file_infor_td_ellipsis_in_big_icon_mode" style="margin-bottom:-25px;margin-left: 95px;margin-top: -30px">
            <div class="ellipsis" v-on:click="click_drop_down(file)" @mouseover="ellipsis_is_hover=true" @mouseleave="ellipsis_is_hover=false" >
              <svg class="ellipsis_svg" fill="currentColor"  :style="ellipsis_is_hover?'  width: 22px;height: 22px;color: #dcdbdb;margin-top: 2px;margin-left: 1px':'  width: 22px;height: 22px;color: #6e6e6e;margin-top: 2px;margin-left: 1px'"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 256C352 238.3 366.3 224 384 224C401.7 224 416 238.3 416 256C416 273.7 401.7 288 384 288C366.3 288 352 273.7 352 256zM192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256zM96 256C96 273.7 81.67 288 64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256z"/></svg>
            </div>
          </div>
          <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  弹出选项菜单-->

          <div style="font-size: 10px;" >
            <div   v-lazy-container="{ selector: 'img', loading: loading_image}">
              <img class="file_icon2" :data-src="show_thumbnail(file)" v-on:click="open_video_or_image(file)" style="border-radius: 5px;height: 70px;width: 90px;margin-left: 15px;margin-top: 35px;margin-bottom: 10px" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">
            </div>

            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 15px;margin-top: 20px" src="../assets/folder.png"  v-show="file.suffix=='folder'">
<!--            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 15px;margin-top: 20px" src="../assets/picture.png"  v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">-->
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/document.png"  v-show="file.suffix=='txt'||file.suffix=='ini'||file.suffix=='lua'||file.suffix=='json'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/music.png"  v-show="file.suffix=='mp3'||file.suffix=='wma'||file.suffix=='wav'||file.suffix=='ape'||file.suffix=='flac'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/zip.png"  v-show="file.suffix=='zip'||file.suffix=='7z'||file.suffix=='tar'||file.suffix=='rar'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/video.png"  v-show="file.suffix=='mov'||file.suffix=='mp4'||file.suffix=='avi'||file.suffix=='flv'||file.suffix=='wmv'||file.suffix=='mpeg'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/word.png"  v-show="file.suffix=='doc'||file.suffix=='docx'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/ppt.png"  v-show="file.suffix=='ppt'||file.suffix=='pptx'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/pdf.png"  v-show="file.suffix=='pdf'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/other.png"  v-show="file.suffix=='exe'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 15px;margin-top: 20px" src="../assets/other.png"  v-show="file.suffix!=='jpg'&&file.suffix!=='png'&&file.suffix!=='jpeg'&&file.suffix!=='bmp'&&file.suffix!=='gif'&&
file.suffix!=='txt'&&file.suffix!=='ini'&&file.suffix!=='lua'&&file.suffix!=='json'&&file.suffix!=='mp3'&&file.suffix!=='wma'&&file.suffix!=='wav'&&file.suffix!=='ape'&&file.suffix!=='flac'&&
file.suffix!=='zip'&&file.suffix!=='7z'&&file.suffix!=='tar'&&file.suffix!=='rar'&&file.suffix!=='mov'&&file.suffix!=='mp4'&&file.suffix!=='avi'&&file.suffix!=='flv'&&file.suffix!=='wmv'&&file.suffix!=='mpeg'&&
file.suffix!=='doc'&&file.suffix!=='docx'&&file.suffix!=='ppt'&&file.suffix!=='pptx'&&file.suffix!=='pdf'&&file.suffix!=='exe'&&file.suffix!=='pdf'&&file.suffix!=='exe'&&file.suffix!=='jpg'&&file.suffix!=='png'&&file.suffix!=='jpeg'&&file.suffix!=='bmp'&&file.suffix!=='gif'&&file.suffix!=='folder'">

            <div style="text-align: center;color: #a7a8a8;text-overflow: ellipsis;width: 120px;height:32px;overflow: hidden;margin-top: 10px">
              {{file.file_name}}
            </div>

          </div>

          <!--          <td  class="file_infor_td" style="font-size: 5px;width: 12%">{{file.create_time}}</td>-->
          <!--          <td class="file_infor_td" style="font-size: 5px;border-radius: 0px 10px 10px 0px">{{file.file_size}}</td>-->
        </div>
        <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  大图标模式，文件显示-->

      </div>
      <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 大图标显示区域 -->

      <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 列表显示区域  -->
      <table class="fileTable" v-show="!store.state.enable_big_icon_mode" style="width: 99%;border-collapse: collapse;">




        <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  文件显示区域-->
        <tr class="table_area" v-for="file in file_list.file_data" :key="file" >
          <td class="file_infor_td" style="width: 2%;border-radius: 10px 0px 0px 10px;">
            <el-checkbox-group v-model="checked_files_group" @change="handleCheckedFilesChange">
              <el-checkbox style="margin-left: 6px"  :label="file.file_path" class="my_check_box" is_select=:checked>
                <!-- 多选框不显示label 只要在里面加上<br>就OK了 -->
                <br>
              </el-checkbox>
            </el-checkbox-group>
          </td>

          <td class="file_infor_td" v-on:click.right="click_drop_down(file)" style="font-size: 14px;width: 75%;color: #c0c0c0" >
            <div style="display: inline"  v-lazy-container="{ selector: 'img', loading: loading_image}">
              <img class="file_icon" style="border-radius: 5px;width: 30px;" :data-src="show_thumbnail(file)" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">
            </div>

            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/folder.png"  v-show="file.suffix=='folder'">

            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/document.png"  v-show="file.suffix=='txt'||file.suffix=='ini'||file.suffix=='lua'||file.suffix=='json'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/music.png"  v-show="file.suffix=='mp3'||file.suffix=='wma'||file.suffix=='wav'||file.suffix=='ape'||file.suffix=='flac'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/zip.png"  v-show="file.suffix=='zip'||file.suffix=='7z'||file.suffix=='tar'||file.suffix=='rar'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/video.png"  v-show="file.suffix=='mov'||file.suffix=='mp4'||file.suffix=='avi'||file.suffix=='flv'||file.suffix=='wmv'||file.suffix=='mpeg'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/word.png"  v-show="file.suffix=='doc'||file.suffix=='docx'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/ppt.png"  v-show="file.suffix=='ppt'||file.suffix=='pptx'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/pdf.png"  v-show="file.suffix=='pdf'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/other.png"  v-show="file.suffix=='exe'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -80%;margin-left: -5px" src="../assets/other.png"  v-show="file.suffix!=='jpg'&&file.suffix!=='png'&&file.suffix!=='jpeg'&&file.suffix!=='bmp'&&file.suffix!=='gif'&&
file.suffix!=='txt'&&file.suffix!=='ini'&&file.suffix!=='lua'&&file.suffix!=='json'&&file.suffix!=='mp3'&&file.suffix!=='wma'&&file.suffix!=='wav'&&file.suffix!=='ape'&&file.suffix!=='flac'&&
file.suffix!=='zip'&&file.suffix!=='7z'&&file.suffix!=='tar'&&file.suffix!=='rar'&&file.suffix!=='mov'&&file.suffix!=='mp4'&&file.suffix!=='avi'&&file.suffix!=='flv'&&file.suffix!=='wmv'&&file.suffix!=='mpeg'&&
file.suffix!=='doc'&&file.suffix!=='docx'&&file.suffix!=='ppt'&&file.suffix!=='pptx'&&file.suffix!=='pdf'&&file.suffix!=='exe'&&file.suffix!=='jpg'&&file.suffix!=='png'&&file.suffix!=='jpeg'&&file.suffix!=='bmp'&&file.suffix!=='gif'&&file.suffix!=='folder'">

            <!--          <span :style="(file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif')?'top: 5px;':''">  {{file.file_name}}</span>-->
            {{file.file_name}}
          </td>

          <td class="file_infor_td_ellipsis" style="width: 3%;">
            <div class="ellipsis" v-on:click="click_drop_down(file)" @mouseover="ellipsis_is_hover=true" @mouseleave="ellipsis_is_hover=false" >
              <svg class="ellipsis_svg" fill="currentColor"  :style="ellipsis_is_hover?'  width: 22px;height: 22px;color: #dcdbdb;margin-top: 2px;margin-left: 1px':'  width: 22px;height: 22px;color: #6e6e6e;margin-top: 2px;margin-left: 1px'"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 256C352 238.3 366.3 224 384 224C401.7 224 416 238.3 416 256C416 273.7 401.7 288 384 288C366.3 288 352 273.7 352 256zM192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256zM96 256C96 273.7 81.67 288 64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256z"/></svg>
            </div>
          </td>

          <td  class="file_infor_td" style="font-size: 5px;width: 12%">
            {{file.password}}
          </td>

          <td class="file_infor_td" style="font-size: 5px;border-radius: 0px 10px 10px 0px">{{size_convert(file.file_size)}}</td>

        </tr>
        <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  文件显示区域-->

      </table>
      <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  列表显示区域-->

      <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  下拉框-->
      <el-dropdown trigger="click" id="my_drop_down" placement="bottom-start">
        <div class="ellipsis" id="my_drop_down_div"  style="position:fixed;" >
          <!--        <svg class="ellipsis_svg" fill="currentColor" style="width: 22px;height: 22px;color: #dcdbdb;margin-top: 2px;margin-left: 1px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">&lt;!&ndash;! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. &ndash;&gt;<path d="M352 256C352 238.3 366.3 224 384 224C401.7 224 416 238.3 416 256C416 273.7 401.7 288 384 288C366.3 288 352 273.7 352 256zM192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256zM96 256C96 273.7 81.67 288 64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256z"/></svg>-->
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px" v-on:click="cancel_share(drop_down_file_infor)">
              <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M420.7 36.69C426.9 30.44 437.1 30.44 443.3 36.69C449.6 42.93 449.6 53.06 443.3 59.31L246.6 256L443.3 452.7C449.6 458.9 449.6 469.1 443.3 475.3C437.1 481.6 426.9 481.6 420.7 475.3L224 278.6L27.31 475.3C21.07 481.6 10.94 481.6 4.686 475.3C-1.562 469.1-1.562 458.9 4.686 452.7L201.4 256L4.686 59.31C-1.562 53.07-1.562 42.94 4.686 36.69C10.93 30.44 21.06 30.44 27.31 36.69L224 233.4L420.7 36.69z"/></svg>
              取消分享
            </el-dropdown-item>

            <el-dropdown-item divided style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px" @click="copy_link(drop_down_file_infor)">
              <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M112 128h160C280.8 128 288 120.8 288 112S280.8 96 272 96h-24.88C252.6 86.55 256 75.72 256 64c0-35.35-28.65-64-64-64S128 28.65 128 64c0 11.72 3.379 22.55 8.877 32H112C103.2 96 96 103.2 96 112S103.2 128 112 128zM192 32c17.64 0 32 14.36 32 32s-14.36 32-32 32S160 81.64 160 64S174.4 32 192 32zM320 64c-8.844 0-16 7.156-16 16S311.2 96 320 96c17.64 0 32 14.34 32 32v320c0 17.66-14.36 32-32 32H64c-17.64 0-32-14.34-32-32V128c0-17.66 14.36-32 32-32c8.844 0 16-7.156 16-16S72.84 64 64 64C28.7 64 0 92.72 0 128v320c0 35.28 28.7 64 64 64h256c35.3 0 64-28.72 64-64V128C384 92.72 355.3 64 320 64z"/></svg>
              复制链接
            </el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  下拉框-->

    </el-scrollbar>



    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  多选文件操作板-->
    <div v-show="checked_files_group.length>0" style="z-index:2;height: 40px;width: 80px;border-radius: 10px;position:fixed;background-color: #212122;top: 90%;left: 50%;border: #424242 solid 1px;">
      <el-tooltip
          content="取消分享"
          effect="light"
          placement="top">
        <div class="multi_file_operation_tool" style="width: 25px;height: 25px;margin-top: 7px;border-radius: 5px;margin-left: 10px;cursor: pointer;float: left" v-on:click="cancel_multi_share()">
          <svg fill="currentColor" style="color:#55129a;width: 15px;height: 15px;float: left;margin-top: 5px;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M420.7 36.69C426.9 30.44 437.1 30.44 443.3 36.69C449.6 42.93 449.6 53.06 443.3 59.31L246.6 256L443.3 452.7C449.6 458.9 449.6 469.1 443.3 475.3C437.1 481.6 426.9 481.6 420.7 475.3L224 278.6L27.31 475.3C21.07 481.6 10.94 481.6 4.686 475.3C-1.562 469.1-1.562 458.9 4.686 452.7L201.4 256L4.686 59.31C-1.562 53.07-1.562 42.94 4.686 36.69C10.93 30.44 21.06 30.44 27.31 36.69L224 233.4L420.7 36.69z"/></svg>
        </div>
      </el-tooltip>
      <el-tooltip
          content="取消选择"
          effect="light"
          placement="top">
        <div class="multi_file_operation_tool" style="width: 25px;height: 25px;margin-top: 7px;border-radius: 5px;margin-left: 10px;cursor: pointer;float: left" v-on:click="cancel_multi_files_select">
          <!--          <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;float: left;margin-top: 5px;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">&lt;!&ndash;! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. &ndash;&gt;<path d="M315.3 411.3c-6.253 6.253-16.37 6.253-22.63 0L160 278.6l-132.7 132.7c-6.253 6.253-16.37 6.253-22.63 0c-6.253-6.253-6.253-16.37 0-22.63L137.4 256L4.69 123.3c-6.253-6.253-6.253-16.37 0-22.63c6.253-6.253 16.37-6.253 22.63 0L160 233.4l132.7-132.7c6.253-6.253 16.37-6.253 22.63 0c6.253 6.253 6.253 16.37 0 22.63L182.6 256l132.7 132.7C321.6 394.9 321.6 405.1 315.3 411.3z"/></svg>-->
          <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;float: left;margin-top: 5px;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M420.7 36.69C426.9 30.44 437.1 30.44 443.3 36.69C449.6 42.93 449.6 53.06 443.3 59.31L246.6 256L443.3 452.7C449.6 458.9 449.6 469.1 443.3 475.3C437.1 481.6 426.9 481.6 420.7 475.3L224 278.6L27.31 475.3C21.07 481.6 10.94 481.6 4.686 475.3C-1.562 469.1-1.562 458.9 4.686 452.7L201.4 256L4.686 59.31C-1.562 53.07-1.562 42.94 4.686 36.69C10.93 30.44 21.06 30.44 27.31 36.69L224 233.4L420.7 36.69z"/></svg>
        </div>
      </el-tooltip>

    </div>
    <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  多选文件操作板-->

  </div>


</template>

<script setup>
import {onBeforeMount, reactive, ref, watch} from "vue";
import axios from "axios";
import cookie from "js-cookie";

import store from "@/store";
import router from "@/router";

import fileDownload from 'js-file-download';
import {ElMessage} from "element-plus";

import useClipboard from 'vue-clipboard3'

let folder_list=reactive({folder_data:[]});
let file_list=reactive({file_data:[]});


let EditNameDialogVisible =ref(false);
let MoveFileDialogVisible =ref(false);
let ShareFileDialogVisible =ref(false);
let ShowShareLinkDialogVisible =ref(false);
let ShareFileDialogVisible_multi_files =ref(false);


let empty_file=ref(false);

let file_suffix_name=ref("");

let ellipsis_is_hover=ref(false);

// let file_name_in_edit_name_dialog = ref("");
// let old_file_path=ref("");
// let  old_file_suffix=ref("");
//
//
// let have_crumbs_in_move_file_dialog=ref(false);
// let crumbs_path_in_move_file_dialog=reactive({crumbs_data:[]});
// let folder_list_in_move_file_dialog=reactive({folder_data:[]});
// let empty_folder_in_move_file_dialog=ref(false);
// let source_file_path=ref("");
// let destination_folder_path=ref("");
//
// let multi_files_state=ref(false);


////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 预览视频和图片
// eslint-disable-next-line @typescript-eslint/no-var-requires
let loading_image = require('../assets/picture.png')
function show_thumbnail(file)
{
  file.file_path=decodeURIComponent(file.file_path)
  let p=file.file_path.indexOf('\\');
  let p2=file.file_path.indexOf('\\',p+1);
  let path=file.file_path.substr(p2,file.file_path.length);
  return 'http://localhost:8081/rootFolder/'+path;
}



////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 设置下拉框出现的位置，因为把下拉框设置在每个文件项里页面很卡，所以之设置一个下拉框，鼠标点击图标时设置下拉框位置
let drop_down_file_infor=ref([]);
function click_drop_down(file)
{
  document.oncontextmenu = function (event) {
    event.preventDefault();
  };

  drop_down_file_infor.value=file;
  processClick();
  document.getElementById('my_drop_down').click();
}
function processClick(evt){
  //输出evt 的值 ，查看event对象
  console.log(evt);
  //window使用window对象访问event,其他 将Event对象作为事件处理程序的一个参数传递
  evt = evt || window.event;
  let x=0;
  let y=0;
  //其他浏览器(非ie)使用pageX
  if(evt.pageX){
    x = evt.pageX;
    y = evt.pageY;
    //（ie浏览器使用clientX,且要考虑偏移值）
  }else if(evt.clientX){
    let offsetX = 0;
    let offsetY = 0;
    //ie 6 版本以上使用
    if(document.documentElement.scrollLeft){
      offsetX = document.documentElement.scrollLeft;
      offsetY = document.documentElement.scrollTop;
      // ie 6 比较旧的版本
    }else if(document.body){
      offsetX = document.body.scrollLeft;
      offsetY = document.body.scrollTop;
    }
    x = evt.clientX + offsetX;
    y = evt.clientY + offsetY;
  }

  y-=20;
  let style = "left:"+ x + "px; top : "+ y + "px";
  // console.log(style);
  document.getElementById('my_drop_down').setAttribute('style',style);
}
/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑   设置下拉框出现的位置，因为把下拉框设置在每个文件项里页面很卡，所以之设置一个下拉框，鼠标点击图标时设置下拉框位置


////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ element plus 多选框相关操作
let checked_files_group=ref([]);//选中的文件集合。。。使用let比const快得多！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！不然点击checkbox很慢
let check_box_check_all=ref(false);
let check_box_check_all_is_indeterminate=ref(false);
//elment plus  设置全选框的状态，set_check_box_check_all_is_indeterminate为true表示用户只选择了列表中的部分文件，false表示什么都没选
function handleCheckedFilesChange (value)  {
  const checkedCount = value.length
  check_box_check_all.value=checkedCount === checked_files_group.value.length
  check_box_check_all_is_indeterminate.value=checkedCount > 0 && checkedCount < (folder_list.folder_data.length+file_list.file_data.length)

}
//点击了全选选择框，之后的操作
function handleCheckAllChange (val)
{
  // console.log(checked_files_group.value.length)
  ////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 这里一定要从file_list.file_data中提取file_path加到checked_files_group里，这样页面内的：label=file.file_path才能正确地在点击全选时被自动勾选
  if(val)
  {
    folder_list.folder_data.forEach((item)=>
    {
      checked_files_group.value.push(item.file_path)
    })
    file_list.file_data.forEach((item)=>
    {
      checked_files_group.value.push(item.file_path)
    })
  }
  else
    checked_files_group.value=[]
  check_box_check_all_is_indeterminate.value = false
  // console.log(checked_files_group.value)
}
/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑   element plus 多选框相关操作


////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 分享文件
let use_password=ref(false);
let password=ref('');
let share_link=ref('');
// let multi_files_share=ref(false);
function open_share_file_dialog(file)
{

  drop_down_file_infor.value=file;  //借用dropdown的
  use_password.value=false;
  file_suffix_name.value=file.suffix;
  ShareFileDialogVisible.value=true;
}
function confirm_share_file(file)
{
  axios.get("/share_file", {
    params:
        {
          file_name:file.file_name,
          file_path:file.file_path,
          file_size:file.file_size,
          create_time:file.create_time,
          suffix:file.suffix,
          use_password:use_password.value,
          user_name:cookie.get('user_name')
        }
  }).then(function (response) {
    password.value=response.data.password;
    share_link.value='http://localhost:8080/#/share/'+response.data.uuid;
    ShareFileDialogVisible.value=false
    ShowShareLinkDialogVisible.value=true
  })
}

function copy_link(file)
{
  if (file.password===null)
  {
    share_link.value='http://localhost:8080/#/share/'+file.uuid+"/no_password";
  }
  else
  {
    share_link.value='http://localhost:8080/#/share2/'+file.uuid;
  }

  clipboard_copy();
}

const { toClipboard } = useClipboard()
const clipboard_copy = async () => {
  try {
    await toClipboard(share_link.value)
    ElMessage({
      message: '已复制到剪贴板',
      type: 'success',
      customClass:'message'
    })
  } catch (e) {
    console.error(e)
  }
}


function cancel_share(file)
{
  axios.get("/cancel_share", {
    params: {
      file_path: file.file_path
    }
  }).then(function (response) {
    axios.get("/share_management_page", {
      params: {
        user_name: cookie.get("user_name")
      }
    }).then(function (response) {
      file_list.file_data = response.data;
      if(response.data.length===0)//////java返回null，浏览器为undefined
      {
        empty_file.value=true;
      }
      else
      {
        empty_file.value=false;
      }
    })
  })
}
function cancel_multi_share()
{
  axios.get("/cancel_multi_share", {
    params: {
      file_path: checked_files_group.value+'',
    }
  }).then(function (response) {
    axios.get("/share_management_page", {
      params: {
        user_name: cookie.get("user_name")
      }

    }).then(function (response) {
      file_list.file_data = response.data;
      if(response.data.length===0)//////java返回null，浏览器为undefined
      {
        empty_file.value=true;
      }
      else
      {
        empty_file.value=false;
      }
    })

  })
}
/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  分享文件

//将后端传的kb数字转成标准大小显示
function size_convert(size) {//把字节转换成正常文件大小
  if (!size) return "";
  const num = 1024.00; //byte
  if (size < num)
    return size + "B";
  if (size < Math.pow(num, 2))
    return (size / num).toFixed(2) + "KB"; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

function cancel_multi_files_select()
{
  checked_files_group.value=[];
  // eslint-disable-next-line no-constant-condition
  while (true)
  {
    document.getElementById('select_all_check_box').click()
    if (checked_files_group.value.length===0)
      break;
  }

}

//组件初始化就发送请求获取文件与文件夹列表
onBeforeMount(()=> {

  //因为在主页，所以使用vuex把面包屑集合设置空，则只显示文件这个单独的面包屑
  // store.commit('set_crumbs_path', null);

  store.commit('set_current_page','share_management');

  // store.commit("set_current_path_for_create_folder_function","");

  axios.get("/share_management_page", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    file_list.file_data = response.data;
    if(response.data.length===0)//////java返回null，浏览器为undefined
    {
      empty_file.value=true;
    }
    else
    {
      empty_file.value=false;
    }
  })

})
</script>

<style scoped>
/*实现滚动条只在文件列表区域显示，ｈｉｄｄｅｎ属性是关键，同时加上overflow-y: scroll*/
#file_display_area
{
  transition: all 0.5s;
  margin-top: 160px;
  /*margin-bottom: 140px;*/
  overflow: hidden;
  overflow-y: auto;
  position: fixed;
  height: calc(100% - 160px);
}

.table_area
{
  transition: all 0.5s;
  cursor: pointer;
}

.table_area:hover
{
  background-color: #1f1f22;
}

.table_area:hover .file_infor_td_ellipsis
{
  opacity: 1;
}
.table_area:hover .file_infor_td_ellipsis_in_big_icon_mode
{
  opacity: 1;
}

.file_infor_td
{
  color: #a6a5a5;
  height: 55px;
  border-top: #1f1f23 solid 1px;
}

.file_infor_td_ellipsis_in_big_icon_mode
{
  opacity: 0;
}
.file_infor_td_ellipsis
{
  color: #a6a5a5;
  height: 55px;
  border-top: #1f1f23 solid 1px;
  opacity: 0;
}



.file_icon
{
  margin-right: 10px;
  /*overflow: hidden;*/
  height: 27px;
  width: 27px;
  vertical-align: -45%;
}


.file_icon2
{
  height: 70px;
  width: 70px;
}

.ellipsis
{
  width: 25px;
  height: 25px;
  border-radius: 5px;
}


.ellipsis :hover
{
  border-radius: 5px;
  background-color: #333333;
  transition: all 0.2s;
}
.multi_file_operation_tool
{
  transition: all 0.4s;
}
.multi_file_operation_tool:hover
{
  background-color: #3d3d3d;
}
.file_icon_in_editName_dialog
{
  margin-left: 110px;
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
}



/deep/ .el-dropdown-menu__item:not(.is-disabled):focus {
  border-radius: 5px;
  background-color: #343434;
}


.crumbs_path_no_hover_color
{
  color:white;
  /*font-weight: bold;*/
}

.crumbs_path_have_hover_color
{
  color:#676363;
}

.crumbs_path_have_hover_color:hover
{
  color: #22dd5d;
}

</style>

<style>
.table_area:hover .my_check_box .el-checkbox__input
{
  opacity: 1;
}
.my_check_box .el-checkbox__input.is-checked
{
  opacity: 1;
}
.my_check_box .el-checkbox__input
{
  opacity: 0;
}

/*elcheckbox 选中的文字样式*/
.el-checkbox__input.is-checked+.el-checkbox__label
{
  color: #2ebd2a;
}

.el-checkbox__inner
{
  border-radius: 100%;  border: #5b5b5b solid 2px;
}
.el-checkbox
{
  --el-checkbox-input-border-color-hover: #88ff23;
  --el-checkbox-input-height:15px;
  --el-checkbox-input-width:15px;

  --el-checkbox-checked-input-border-color:#88ff23;
  --el-checkbox-checked-bg-color:#88ff23;
  --el-checkbox-checked-icon-color: #181818;
}
.el-checkbox__inner::after
{
  /*border: 2px ;*/
  display: none;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner::before
{
  top: 4px;
  transform: scale(.6);
  height: 4px;
}


.my_messagebox
{
  border-radius:10px;
  border: 0px;
}
.my_messagebox .el-input
{
  --el-input-focus-border-color: #569b3f;
}
.my_messagebox .el-button--primary
{
  --el-button-bg-color: #2ebd2a;
  --el-button-border-color: #5cc55a;
  --el-button-hover-bg-color: #289a24;
  --el-button-hover-border-color: #3fa93c;
}
.EditNameDialog  .el-dialog__headerbtn
{
  --el-color-primary: #2ebd2a;
}
.my_messagebox .el-message-box__content
{
  padding: 1px var(--el-messagebox-padding-primary);
  font-size: 17px;
}

/*bug element plus 输入框选中没有蓝色背景!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
.el-input__inner::selection {
  background-color: #30b92b !important;
  color: #fff !important;
}


.el-dropdown__popper.el-popper[data-popper-placement^=right] .el-popper__arrow::before
{
  display:none
}
.el-dropdown__popper.el-popper[data-popper-placement^=left] .el-popper__arrow::before
{
  display:none
}
.el-dropdown__popper.el-popper[data-popper-placement^=top] .el-popper__arrow::before
{
  display:none
}
.el-dropdown__popper.el-popper[data-popper-placement^=bottom] .el-popper__arrow::before
{
  display:none
}
.el-dropdown-menu
{
  width: 200px;
  background-color: #212121;
  border-radius:10px;
}
.el-popper.is-light
{
  border: 0px;
  border-radius: 200px;
}

.el-popper[data-popper-placement^=top] .el-popper__arrow::before
{
  display: none;
}
</style>
