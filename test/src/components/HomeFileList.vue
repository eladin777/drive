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

        <td v-show="store.state.sort_state.includes('desc')" style="width:79.5%;font-size: 7px;color: #727272;" class="attribute-td" v-on:click="set_file_name_order_asc()" >
          <span style="margin-left: 34px"> 名称 </span>
          <svg fill="currentColor"  style="color:#575757;width: 15px;height: 15px;margin-bottom: -1px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M311.9 335.1l-132.4 136.8C174.1 477.3 167.1 480 160 480c-7.055 0-14.12-2.702-19.47-8.109l-132.4-136.8C-9.229 317.8 3.055 288 27.66 288h264.7C316.9 288 329.2 317.8 311.9 335.1z"/></svg>
        </td>
        <td v-show="store.state.sort_state.includes('asc')" style="width:79.5%;font-size: 7px;color: #727272;" class="attribute-td" v-on:click="set_file_name_order_desc()" >
          <span style="margin-left: 34px"> 名称 </span>
          <svg fill="currentColor" style="color:#575757;width: 15px;height: 15px;margin-bottom: -6px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224z"/></svg>
        </td>



        <td v-show="store.state.sort_state.includes('desc')"  style="font-size: 7px;color: #727272;width: 11.7%" v-on:click="set_create_time_order_asc()" class="attribute-td" >
          <span>修改日期</span>
          <svg fill="currentColor"  style="color:#575757;width: 15px;height: 15px;margin-bottom: -1px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M311.9 335.1l-132.4 136.8C174.1 477.3 167.1 480 160 480c-7.055 0-14.12-2.702-19.47-8.109l-132.4-136.8C-9.229 317.8 3.055 288 27.66 288h264.7C316.9 288 329.2 317.8 311.9 335.1z"/></svg>
        </td>
        <td v-show="store.state.sort_state.includes('asc')"  style="font-size: 7px;color: #727272;width: 11.7%" v-on:click="set_create_time_order_desc()" class="attribute-td" >
          <span>修改日期</span>
          <svg fill="currentColor" style="color:#575757;width: 15px;height: 15px;margin-bottom: -6px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224z"/></svg>
        </td>

        <td v-show="store.state.sort_state.includes('desc')"  style="font-size: 7px;color: #727272;width: 11.7%" v-on:click="set_file_size_order_asc()" class="attribute-td" >
          <span>大小</span>
          <svg fill="currentColor"  style="color:#575757;width: 15px;height: 15px;margin-bottom: -1px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M311.9 335.1l-132.4 136.8C174.1 477.3 167.1 480 160 480c-7.055 0-14.12-2.702-19.47-8.109l-132.4-136.8C-9.229 317.8 3.055 288 27.66 288h264.7C316.9 288 329.2 317.8 311.9 335.1z"/></svg>
        </td>
        <td v-show="store.state.sort_state.includes('asc')"  style="font-size: 7px;color: #727272;width: 11.7%" v-on:click="set_file_size_order_desc()" class="attribute-td" >
          <span>大小</span>
          <svg fill="currentColor" style="color:#575757;width: 15px;height: 15px;margin-bottom: -6px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224z"/></svg>
        </td>

      </tr>
    </table>
  </div>

  <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 空文件显示图标，需要用响应式ref数据来控制dom的显示，直接判断response data的长度会导致在刷新文件列表前意外地显示空文件图标  "empty_file===true&&empty_folder===true"-->
  <div style="position: relative;width: 100%;margin-top:25%;text-align: center" v-show="empty_file===true&&empty_folder===true">
    <img  style="width: 200px;height: 200px;display: inline-block;vertical-align: middle;" src="../assets/empty.png">
  </div>
  <div style="position: relative;width: 100%;text-align: center" v-show="empty_file===true&&empty_folder===true">
    <p  style="width: 70px;color: #565656;display: inline-block;vertical-align: middle;margin-top: 0;font-size: 15px">无文件</p>
  </div>
  <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑空文件显示图标，需要用响应式ref数据来控制dom的显示，直接判断response data的长度会导致在刷新文件列表前意外地显示空文件图标  "empty_file===true&&empty_folder===true"-  -->


  <div id="file_display_area" :style="store.state.SideBar_isOpen? 'width:calc(100% - 280px)' : ' width:calc(100% - 42px)'"><!--    获取ｖｕｅｘ状态值（菜单是否折叠），以此依据改变文件显示区域的宽度-->
    <el-scrollbar>
      <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 大图标显示区域 -->
      <div class="" v-show="store.state.enable_big_icon_mode" style="display: flex;flex-direction:row;justify-content: flex-start;flex-wrap:wrap;width: 99%;">

        <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 大图标模式，文件夹显示 -->
        <div class="table_area" v-on:click.right="click_drop_down(folder)" style="border-radius: 10px;margin-bottom: 60px;margin-left: 40px;flex: 0 0 120px;" v-for="folder in folder_list.folder_data" :key="folder" >
          <el-checkbox-group v-model="checked_files_group" @change="handleCheckedFilesChange">

            <el-checkbox style="margin-left: 6px"  :label="folder.file_path" class="my_check_box" >
              <!-- 多选框不显示label 只要在里面加上<br>就OK了 -->
              <br>
            </el-checkbox>
          </el-checkbox-group>

          <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  弹出选项菜单-->
          <div class="file_infor_td_ellipsis_in_big_icon_mode" style="margin-bottom:-25px;margin-left: 95px;margin-top: -30px">
            <div class="ellipsis" v-on:click="click_drop_down(folder)" @mouseover="ellipsis_is_hover=true" @mouseleave="ellipsis_is_hover=false" >
              <svg class="ellipsis_svg" fill="currentColor"  :style="ellipsis_is_hover?'  width: 22px;height: 22px;color: #dcdbdb;margin-top: 2px;margin-left: 1px':'  width: 22px;height: 22px;color: #6e6e6e;margin-top: 2px;margin-left: 1px'"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 256C352 238.3 366.3 224 384 224C401.7 224 416 238.3 416 256C416 273.7 401.7 288 384 288C366.3 288 352 273.7 352 256zM192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256zM96 256C96 273.7 81.67 288 64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256z"/></svg>
            </div>
          </div>
          <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  弹出选项菜单-->

          <div style="font-size: 10px;">
            <img class="file_icon2" src="../assets/folder.png" style="height:105px;width: 105px;position:relative;top: 15px;left: 8px" v-on:click="inToFolder(folder.file_path)">
            <div style="text-align: center;color: #a7a8a8;text-overflow: ellipsis;width: 120px;height:35px;overflow: hidden;margin-top: 20px">
              {{folder.file_name}}
            </div>
          </div>

          <!--          <td  class="file_infor_td" style="font-size: 5px;width: 12%">{{folder.create_time}}</td>-->
          <!--          <td  class="file_infor_td" style="font-size: 5px;border-radius: 0px 10px 10px 0px"></td>-->
        </div>
        <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  大图标模式，文件夹显示-->

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
<!--            <img class="file_icon2" src="../assets/图片-jpg_png.png" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">-->

            <div   v-lazy-container="{ selector: 'img', loading: loading_image}">
            <img class="file_icon2" :data-src="show_thumbnail(file)" v-on:click="open_video_or_image(file)" style="border-radius: 5px;height: 70px;width: 90px;margin-left: 15px;margin-top: 35px;margin-bottom: 10px" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">
            </div>

            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/document.png"  v-show="file.suffix=='txt'||file.suffix=='ini'||file.suffix=='lua'||file.suffix=='json'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/music.png"  v-show="file.suffix=='mp3'||file.suffix=='wma'||file.suffix=='wav'||file.suffix=='ape'||file.suffix=='flac'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/zip.png"  v-show="file.suffix=='zip'||file.suffix=='7z'||file.suffix=='tar'||file.suffix=='rar'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" v-on:click="open_video_or_image(file)" src="../assets/video.png"  v-show="file.suffix=='mov'||file.suffix=='mp4'||file.suffix=='avi'||file.suffix=='flv'||file.suffix=='wmv'||file.suffix=='mpeg'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/word.png"  v-show="file.suffix=='doc'||file.suffix=='docx'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/ppt.png"  v-show="file.suffix=='ppt'||file.suffix=='pptx'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/pdf.png"  v-show="file.suffix=='pdf'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/other.png"  v-show="file.suffix=='exe'">
            <img class="file_icon2" style="width: 95px;height: 95px;margin-left: 12px;margin-top: 20px" src="../assets/other.png"  v-show="file.suffix!=='jpg'&&file.suffix!=='png'&&file.suffix!=='jpeg'&&file.suffix!=='bmp'&&file.suffix!=='gif'&&
file.suffix!=='txt'&&file.suffix!=='ini'&&file.suffix!=='lua'&&file.suffix!=='json'&&file.suffix!=='mp3'&&file.suffix!=='wma'&&file.suffix!=='wav'&&file.suffix!=='ape'&&file.suffix!=='flac'&&
file.suffix!=='zip'&&file.suffix!=='7z'&&file.suffix!=='tar'&&file.suffix!=='rar'&&file.suffix!=='mov'&&file.suffix!=='mp4'&&file.suffix!=='avi'&&file.suffix!=='flv'&&file.suffix!=='wmv'&&file.suffix!=='mpeg'&&
file.suffix!=='doc'&&file.suffix!=='docx'&&file.suffix!=='ppt'&&file.suffix!=='pptx'&&file.suffix!=='pdf'&&file.suffix!=='exe'">

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
        <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  文件夹显示区域-->
        <tr class="table_area" v-for="folder in folder_list.folder_data" :key="folder" >
          <td class="file_infor_td" style="width: 2%;border-radius: 10px 0px 0px 10px;">
            <el-checkbox-group v-model="checked_files_group" @change="handleCheckedFilesChange">
              <el-checkbox style="margin-left: 6px"  :label="folder.file_path" class="my_check_box">
                <!-- 多选框不显示label 只要在里面加上<br>就OK了 -->
              </el-checkbox>
            </el-checkbox-group>
          </td>

          <td class="file_infor_td" style="font-size: 15px;width: 75%;color: #c0c0c0" v-on:click.right="click_drop_down(folder)" v-on:click="inToFolder(folder.file_path)">
            <img class="file_icon" src="../assets/folder.png" style="height: 40px;width: 40px;vertical-align: -70%;margin-left: -5px" >
            {{folder.file_name}}
          </td>

          <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  弹出选项菜单-->
          <td class="file_infor_td_ellipsis" style="width: 3%;">
            <div class="ellipsis" v-on:click="click_drop_down(folder)" @mouseover="ellipsis_is_hover=true" @mouseleave="ellipsis_is_hover=false" >
              <svg class="ellipsis_svg" fill="currentColor"  :style="ellipsis_is_hover?'  width: 22px;height: 22px;color: #dcdbdb;margin-top: 2px;margin-left: 1px':'  width: 22px;height: 22px;color: #6e6e6e;margin-top: 2px;margin-left: 1px'"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 256C352 238.3 366.3 224 384 224C401.7 224 416 238.3 416 256C416 273.7 401.7 288 384 288C366.3 288 352 273.7 352 256zM192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256zM96 256C96 273.7 81.67 288 64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256z"/></svg>
            </div>
          </td>
          <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  弹出选项菜单-->

          <td  class="file_infor_td" style="font-size: 5px;width: 12%" v-on:click="inToFolder(folder.file_path)">{{folder.create_time}}</td>
          <td  class="file_infor_td" style="font-size: 5px;border-radius: 0px 10px 10px 0px" v-on:click="inToFolder(folder.file_path)"></td>
        </tr>
        <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  文件夹显示区域-->


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

          <td class="file_infor_td" v-on:click="open_video_or_image(file)" v-on:click.right="click_drop_down(file)" style="font-size: 14px;width: 75%;color: #c0c0c0" >
<!--            <img class="file_icon" src="../assets/图片-jpg_png.png" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">-->
<!--            <img class="file_icon" style="border-radius: 5px;border: #626262 solid 0.07em;width: 30px" :src="show_thumbnail(file)" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">-->
           <div style="display: inline"  v-lazy-container="{ selector: 'img', loading: loading_image}">
             <img class="file_icon" style="border-radius: 5px;width: 30px;" :data-src="show_thumbnail(file)" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">
           </div>


            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/document.png"  v-show="file.suffix=='txt'||file.suffix=='ini'||file.suffix=='lua'||file.suffix=='json'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/music.png"  v-show="file.suffix=='mp3'||file.suffix=='wma'||file.suffix=='wav'||file.suffix=='ape'||file.suffix=='flac'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/zip.png"  v-show="file.suffix=='zip'||file.suffix=='7z'||file.suffix=='tar'||file.suffix=='rar'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/video.png"  v-show="file.suffix=='mov'||file.suffix=='mp4'||file.suffix=='avi'||file.suffix=='flv'||file.suffix=='wmv'||file.suffix=='mpeg'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/word.png"  v-show="file.suffix=='doc'||file.suffix=='docx'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/ppt.png"  v-show="file.suffix=='ppt'||file.suffix=='pptx'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/pdf.png"  v-show="file.suffix=='pdf'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/other.png"  v-show="file.suffix=='exe'">
            <img class="file_icon" style="width: 40px;height: 40px;vertical-align: -70%;margin-left: -5px" src="../assets/other.png"  v-show="file.suffix!=='jpg'&&file.suffix!=='png'&&file.suffix!=='jpeg'&&file.suffix!=='bmp'&&file.suffix!=='gif'&&
file.suffix!=='txt'&&file.suffix!=='ini'&&file.suffix!=='lua'&&file.suffix!=='json'&&file.suffix!=='mp3'&&file.suffix!=='wma'&&file.suffix!=='wav'&&file.suffix!=='ape'&&file.suffix!=='flac'&&
file.suffix!=='zip'&&file.suffix!=='7z'&&file.suffix!=='tar'&&file.suffix!=='rar'&&file.suffix!=='mov'&&file.suffix!=='mp4'&&file.suffix!=='avi'&&file.suffix!=='flv'&&file.suffix!=='wmv'&&file.suffix!=='mpeg'&&
file.suffix!=='doc'&&file.suffix!=='docx'&&file.suffix!=='ppt'&&file.suffix!=='pptx'&&file.suffix!=='pdf'&&file.suffix!=='exe'">

<!--          <span :style="(file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif')?'top: 5px;':''">  {{file.file_name}}</span>-->
                {{file.file_name}}
          </td>

          <td class="file_infor_td_ellipsis" style="width: 3%;">
            <div class="ellipsis" v-on:click="click_drop_down(file)" @mouseover="ellipsis_is_hover=true" @mouseleave="ellipsis_is_hover=false" >
              <svg class="ellipsis_svg" fill="currentColor"  :style="ellipsis_is_hover?'  width: 22px;height: 22px;color: #dcdbdb;margin-top: 2px;margin-left: 1px':'  width: 22px;height: 22px;color: #6e6e6e;margin-top: 2px;margin-left: 1px'"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 256C352 238.3 366.3 224 384 224C401.7 224 416 238.3 416 256C416 273.7 401.7 288 384 288C366.3 288 352 273.7 352 256zM192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256zM96 256C96 273.7 81.67 288 64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256z"/></svg>
            </div>
          </td>

          <td  class="file_infor_td" style="font-size: 5px;width: 12%">
            {{file.create_time}}
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
            <el-dropdown-item class="drop_down_item_download" style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 6px;margin-bottom: 5px;margin-top: 5px" @click="download(drop_down_file_infor)">
              <svg  fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 352c4.094 0 8.188-1.562 11.31-4.688l144-144c6.25-6.25 6.25-16.38 0-22.62s-16.38-6.25-22.62 0L240 297.4V16C240 7.156 232.8 0 224 0S208 7.156 208 16v281.4L91.31 180.7c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62l144 144C215.8 350.4 219.9 352 224 352zM448 432v-96c0-8.844-7.156-16-16-16S416 327.2 416 336v96c0 26.47-21.53 48-48 48h-288C53.53 480 32 458.5 32 432v-96C32 327.2 24.84 320 16 320S0 327.2 0 336v96C0 476.1 35.88 512 80 512h288C412.1 512 448 476.1 448 432z"/></svg>
              下载
            </el-dropdown-item>

            <el-dropdown-item style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px" v-on:click="open_share_file_dialog(drop_down_file_infor)">
              <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M400 352c-8.836 0-16 7.164-16 16v79.1C384 465.7 369.7 480 352 480H64c-17.67 0-32-14.33-32-32V160c0-17.67 14.33-32 32-32h112C184.8 128 192 120.8 192 112S184.8 96 176 96H64C28.65 96 0 124.7 0 160v287.1c0 35.34 28.65 64 64 64L352 512c35.35 0 64-28.66 64-64v-80C416 359.2 408.8 352 400 352zM570.3 131.7l-160-127.1c-6.75-5.656-16.84-4.781-22.53 2.031c-5.656 6.781-4.75 16.88 2.031 22.53L515.8 128H368C270.1 128 192 206.1 192 304v32C192 344.8 199.2 352 208 352S224 344.8 224 336v-32C224 224.6 288.6 160 368 160h147.8l-126.1 99.72c-6.781 5.656-7.688 15.75-2.031 22.53C390.9 286 395.4 288 400 288c3.625 0 7.25-1.219 10.25-3.719l160-128C573.9 153.3 576 148.7 576 143.1S573.9 134.8 570.3 131.7z"/></svg>
              分享
            </el-dropdown-item>

            <el-dropdown-item divided style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px" @click="open_move_file_dialog(drop_down_file_infor)">
              <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 255.1c0 4.094-1.562 8.222-4.688 11.35l-80 80C424.2 350.4 420.1 352 416 352c-9.139 0-16-7.473-16-16c0-4.094 1.562-8.188 4.688-11.31L457.4 272H272v185.4l52.69-52.69C327.8 401.6 331.9 400 336 400c9.139 0 16 7.473 16 16c0 4.094-1.562 8.188-4.688 11.31l-80 80C264.2 510.4 260.1 512 256 512s-8.188-1.562-11.31-4.688l-80-80C161.6 424.2 160 420.1 160 416c0-8.527 6.865-16 16-16c4.094 0 8.188 1.562 11.31 4.688L240 457.4V272H54.63l52.69 52.69C110.4 327.8 112 331.9 112 336C112 344.5 105.1 352 96 352c-4.094 0-8.188-1.562-11.31-4.688l-80-80C1.563 264.2 0 260.1 0 255.1s1.562-8.153 4.688-11.28l80-80C87.81 161.6 91.91 160 96 160c9.139 0 16 7.473 16 16c0 4.094-1.562 8.188-4.688 11.31L54.63 240H240V54.63L187.3 107.3C184.2 110.4 180.1 112 176 112C166.9 112 160 104.5 160 96c0-4.094 1.562-8.188 4.688-11.31l80-80C247.8 1.562 251.9 0 256 0s8.188 1.562 11.31 4.688l80 80C350.4 87.81 352 91.91 352 96c0 8.527-6.865 16-16 16c-4.094 0-8.188-1.562-11.31-4.688L272 54.63V240h185.4l-52.69-52.69C401.6 184.2 400 180.1 400 176C400 167.5 406.9 160 416 160c4.094 0 8.188 1.562 11.31 4.688l80 80C510.4 247.8 512 251.9 512 255.1z"/></svg>
              移动
            </el-dropdown-item>

            <el-dropdown-item style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px" v-on:click="edit_name(drop_down_file_infor)">
              <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" t="1673869607862" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="2279" width="200" height="200"><path d="M832 938.666667a148.353333 148.353333 0 0 1-105.593333-43.74 150.253333 150.253333 0 0 1-22.406667-28.56 150.253333 150.253333 0 0 1-22.406667 28.56A148.353333 148.353333 0 0 1 576 938.666667a21.333333 21.333333 0 0 1 0-42.666667c58.813333 0 106.666667-47.853333 106.666667-106.666667V234.666667c0-58.813333-47.853333-106.666667-106.666667-106.666667a21.333333 21.333333 0 0 1 0-42.666667 148.353333 148.353333 0 0 1 105.593333 43.74 150.253333 150.253333 0 0 1 22.406667 28.56 150.253333 150.253333 0 0 1 22.406667-28.56A148.353333 148.353333 0 0 1 832 85.333333a21.333333 21.333333 0 0 1 0 42.666667c-58.813333 0-106.666667 47.853333-106.666667 106.666667v21.333333h202.666667a53.393333 53.393333 0 0 1 53.333333 53.333333v405.333334a53.393333 53.393333 0 0 1-53.333333 53.333333h-202.666667v21.333333c0 58.813333 47.853333 106.666667 106.666667 106.666667a21.333333 21.333333 0 0 1 0 42.666667z m-106.666667-213.333334h202.666667a10.666667 10.666667 0 0 0 10.666667-10.666666V309.333333a10.666667 10.666667 0 0 0-10.666667-10.666666h-202.666667z m-149.333333 42.666667H96a53.393333 53.393333 0 0 1-53.333333-53.333333V309.333333a53.393333 53.393333 0 0 1 53.333333-53.333333h480a21.333333 21.333333 0 0 1 0 42.666667H96a10.666667 10.666667 0 0 0-10.666667 10.666666v405.333334a10.666667 10.666667 0 0 0 10.666667 10.666666h480a21.333333 21.333333 0 0 1 0 42.666667z" p-id="2280"></path></svg>
              重命名
            </el-dropdown-item>

<!--            <el-dropdown-item style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px">-->
<!--              <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">&lt;!&ndash;! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. &ndash;&gt;<path d="M224 184c13.25 0 24-10.74 24-24c0-13.25-10.75-24-24-24S200 146.7 200 160C200 173.3 210.7 184 224 184zM384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96C448 60.65 419.3 32 384 32zM416 416c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h320c17.64 0 32 14.36 32 32V416zM272 352h-32V240C240 231.2 232.8 224 224 224H192C183.2 224 176 231.2 176 240S183.2 256 192 256h16v96h-32C167.2 352 160 359.2 160 368C160 376.8 167.2 384 176 384h96c8.836 0 16-7.164 16-16C288 359.2 280.8 352 272 352z"/></svg>-->
<!--              详细信息-->
<!--            </el-dropdown-item>-->

            <el-dropdown-item divided style="color: #d22727;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px" @click="move_file_to_recycle_bin(drop_down_file_infor.file_path)">
              <svg fill="currentColor" style="color:#d22727;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M144 400C144 408.8 136.8 416 128 416C119.2 416 112 408.8 112 400V176C112 167.2 119.2 160 128 160C136.8 160 144 167.2 144 176V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V176C208 167.2 215.2 160 224 160C232.8 160 240 167.2 240 176V400zM336 400C336 408.8 328.8 416 320 416C311.2 416 304 408.8 304 400V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V400zM310.1 22.56L336.9 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V96H16C7.164 96 0 88.84 0 80C0 71.16 7.164 64 16 64H111.1L137 22.56C145.8 8.526 161.2 0 177.7 0H270.3C286.8 0 302.2 8.526 310.1 22.56V22.56zM148.9 64H299.1L283.8 39.52C280.9 34.84 275.8 32 270.3 32H177.7C172.2 32 167.1 34.84 164.2 39.52L148.9 64zM64 432C64 458.5 85.49 480 112 480H336C362.5 480 384 458.5 384 432V96H64V432z"/></svg>
              回收站
            </el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  下拉框-->

    </el-scrollbar>



    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  修改名称对话框-->
    <el-dialog v-model="EditNameDialogVisible" width="350px" title="重命名" top="15%" class="EditNameDialog" style="border-radius: 15px">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/folder.png"  v-show="file_suffix_name=='folder' ">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/picture.png" v-show="file_suffix_name=='jpg'||file_suffix_name=='png'||file_suffix_name=='jpeg'||file_suffix_name=='bmp'||file_suffix_name=='gif'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/document.png"  v-show="file_suffix_name=='txt'||file_suffix_name=='ini'||file_suffix_name=='lua'||file_suffix_name=='json'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/music.png"  v-show="file_suffix_name=='mp3'||file_suffix_name=='wma'||file_suffix_name=='wav'||file_suffix_name=='ape'||file_suffix_name=='flac'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/zip.png"  v-show="file_suffix_name=='zip'||file_suffix_name=='7z'||file_suffix_name=='tar'||file_suffix_name=='rar'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/video.png"  v-show="file_suffix_name=='mov'||file_suffix_name=='mp4'||file_suffix_name=='avi'||file_suffix_name=='flv'||file_suffix_name=='wmv'||file_suffix_name=='mpeg'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/word.png"   v-show="file_suffix_name=='doc'||file_suffix_name=='docx'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/ppt.png"   v-show="file_suffix_name=='ppt'||file_suffix_name=='pptx'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/pdf.png"  v-show="file_suffix_name=='pdf'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/other.png"   v-show="file_suffix_name=='exe'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/other.png"  v-show="file_suffix_name!=='jpg'&&file_suffix_name!=='png'&&file_suffix_name!=='jpeg'&&file_suffix_name!=='bmp'&&file_suffix_name!=='gif'&&
file_suffix_name!=='txt'&&file_suffix_name!=='ini'&&file_suffix_name!=='lua'&&file_suffix_name!=='json'&&file_suffix_name!=='mp3'&&file_suffix_name!=='wma'&&file_suffix_name!=='wav'&&file_suffix_name!=='ape'&&file_suffix_name!=='flac'&&
file_suffix_name!=='zip'&&file_suffix_name!=='7z'&&file_suffix_name!=='tar'&&file_suffix_name!=='rar'&&file_suffix_name!=='mov'&&file_suffix_name!=='mp4'&&file_suffix_name!=='avi'&&file_suffix_name!=='flv'&&file_suffix_name!=='wmv'&&file_suffix_name!=='mpeg'&&
file_suffix_name!=='doc'&&file_suffix_name!=='docx'&&file_suffix_name!=='ppt'&&file_suffix_name!=='pptx'&&file_suffix_name!=='pdf'&&file_suffix_name!=='exe'&&file_suffix_name!=='folder'">

      <el-input type="text" v-model="file_name_in_edit_name_dialog" clearable autofocus="true" style="--el-input-focus-border-color: #569b3f;"/>

      <template #footer>
      <span class="dialog-footer">
          <el-button type="success" style="margin-top: -10px" v-on:click="confirm_edit_name(old_file_path,file_name_in_edit_name_dialog+old_file_suffix)">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  修改名称对话框-->

    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  移动文件对话框-->
    <el-dialog v-model="MoveFileDialogVisible" width="450px" title="移动至" top="10%" class="EditNameDialog" style="border-radius: 15px;height: 500px;">

      <div style="margin-top: -20px">
        <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  移动文件对话框面包屑-->
        <span :class="{'crumbs_path_no_hover_color':!have_crumbs_in_move_file_dialog,'crumbs_path_have_hover_color':have_crumbs_in_move_file_dialog}" v-on:click="click_go_home_in_move_file_dialog()" style="transition:all 0.5s;font-size: 10px;cursor: pointer;margin-left: 12px;margin-bottom: 50px">文件</span>
        <span :class="{'crumbs_path_no_hover_color':index===crumbs_path_in_move_file_dialog.crumbs_data.length-1,'crumbs_path_have_hover_color':index!==crumbs_path_in_move_file_dialog.crumbs_data.length-1}" v-on:click="click_crumbs_in_move_file_dialog(path.full_Path)" v-for="(path,index) in crumbs_path_in_move_file_dialog.crumbs_data" :key="index" style="transition:all 0.5s;font-size: 10px;cursor: pointer;margin-left: 1px">
           <svg fill="currentColor" width="10" height="10" style="color:#888888;margin-left: 1px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>
              {{path.folder_name}}
        </span>
        <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  移动文件对话框面包屑-->
      </div>


      <div style="height: 320px;width: 420px;margin-top: 10px">
        <el-scrollbar>
          <table style="width: 100%;border-collapse: collapse;">
            <tr class="table_area" v-for="folder in folder_list_in_move_file_dialog.folder_data" :key="folder" >
              <td class="file_infor_td" style="height:45px;font-size: 10px;width: 77%;border-radius: 10px 0px 0px 10px;color: #c0c0c0;white-space: nowrap;text-overflow: ellipsis" v-on:click="inToFolder_in_move_file_dialog(folder.file_path)">
                <img class="file_icon" src="../assets/folder.png" style="height: 35px;width: 35px;margin-left: 10px;vertical-align: -80%" >
                {{folder.file_name}}
              </td>

              <td  class="file_infor_td" style="height:45px;font-size: 5px;width: 12%" v-on:click="inToFolder(folder.file_path)"></td>
              <td  class="file_infor_td" style="height:45px;font-size: 5px;border-radius: 0px 10px 10px 0px" v-on:click="inToFolder(folder.file_path)"></td>
            </tr>
          </table>
        </el-scrollbar>
      </div>

      <template #footer>
      <span class="dialog-footer">
          <el-button type="success" style="" v-on:click="confirm_move_file()">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 移动文件对话框 -->

    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  分享对话框-->
    <el-dialog v-model="ShareFileDialogVisible" width="350px" title="分享文件" top="15%" class="EditNameDialog" style="border-radius: 15px">

      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/folder.png"  v-show="file_suffix_name=='folder' ">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/picture.png" v-show="file_suffix_name=='jpg'||file_suffix_name=='png'||file_suffix_name=='jpeg'||file_suffix_name=='bmp'||file_suffix_name=='gif'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/document.png"  v-show="file_suffix_name=='txt'||file_suffix_name=='ini'||file_suffix_name=='lua'||file_suffix_name=='json'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/music.png"  v-show="file_suffix_name=='mp3'||file_suffix_name=='wma'||file_suffix_name=='wav'||file_suffix_name=='ape'||file_suffix_name=='flac'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/zip.png"  v-show="file_suffix_name=='zip'||file_suffix_name=='7z'||file_suffix_name=='tar'||file_suffix_name=='rar'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/video.png"  v-show="file_suffix_name=='mov'||file_suffix_name=='mp4'||file_suffix_name=='avi'||file_suffix_name=='flv'||file_suffix_name=='wmv'||file_suffix_name=='mpeg'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/word.png"   v-show="file_suffix_name=='doc'||file_suffix_name=='docx'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/ppt.png"   v-show="file_suffix_name=='ppt'||file_suffix_name=='pptx'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/pdf.png"  v-show="file_suffix_name=='pdf'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/other.png"   v-show="file_suffix_name=='exe'">
      <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/other.png"  v-show="file_suffix_name!=='jpg'&&file_suffix_name!=='png'&&file_suffix_name!=='jpeg'&&file_suffix_name!=='bmp'&&file_suffix_name!=='gif'&&
file_suffix_name!=='txt'&&file_suffix_name!=='ini'&&file_suffix_name!=='lua'&&file_suffix_name!=='json'&&file_suffix_name!=='mp3'&&file_suffix_name!=='wma'&&file_suffix_name!=='wav'&&file_suffix_name!=='ape'&&file_suffix_name!=='flac'&&
file_suffix_name!=='zip'&&file_suffix_name!=='7z'&&file_suffix_name!=='tar'&&file_suffix_name!=='rar'&&file_suffix_name!=='mov'&&file_suffix_name!=='mp4'&&file_suffix_name!=='avi'&&file_suffix_name!=='flv'&&file_suffix_name!=='wmv'&&file_suffix_name!=='mpeg'&&
file_suffix_name!=='doc'&&file_suffix_name!=='docx'&&file_suffix_name!=='ppt'&&file_suffix_name!=='pptx'&&file_suffix_name!=='pdf'&&file_suffix_name!=='exe'&&file_suffix_name!=='folder'">

      <el-checkbox style="margin-left: -200px"   v-model="use_password">
          使用密码
      </el-checkbox>

      <template #footer>
      <span class="dialog-footer">
          <el-button type="success" style="margin-top: -10px" v-on:click="confirm_share_file(drop_down_file_infor)">创建链接</el-button>
      </span>
      </template>
    </el-dialog>
    <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  分享对话框-->

    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  分享信息对话框-->
    <el-dialog v-model="ShowShareLinkDialogVisible" width="550px" title="分享信息" top="15%" class="EditNameDialog" style="border-radius: 15px">

      <div style="height: 30px;width: 500px;border-radius: 10px;background-color: #363636;margin-bottom: 20px">
       <span style="color: #bdbdbd;font-size: 15px;text-align: center">{{share_link}}</span>
      </div>

      <span v-show="password" style="float: left;margin-top: 5px">密码</span>
      <div v-show="password" style="height: 30px;width: 50px;border-radius: 10px;background-color: #363636;float: left;font-size: 16px">{{password}}</div>


      <template #footer>
      <span class="dialog-footer">
          <el-button type="success" style="margin-top: -10px" v-on:click="clipboard_copy">复制链接</el-button>
      </span>
      </template>
    </el-dialog>
    <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 分享信息对话框 -->




    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  多选文件操作板-->
    <div v-show="checked_files_group.length>0" style="z-index:2;height: 40px;width: 150px;border-radius: 10px;position:fixed;background-color: #212122;top: 90%;left: 50%;border: #424242 solid 1px;">
      <el-tooltip
          content="下载"
          effect="light"
          placement="top">
        <div class="multi_file_operation_tool" style="width: 25px;height: 25px;margin-top: 7px;border-radius: 5px;margin-left: 10px;cursor: pointer;float: left" v-on:click="multi_files_download">
          <svg fill="currentColor" style="color:#22dd47;width: 15px;height: 15px;float: left;margin-top: 5px;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 352c4.094 0 8.188-1.562 11.31-4.688l144-144c6.25-6.25 6.25-16.38 0-22.62s-16.38-6.25-22.62 0L240 297.4V16C240 7.156 232.8 0 224 0S208 7.156 208 16v281.4L91.31 180.7c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62l144 144C215.8 350.4 219.9 352 224 352zM448 432v-96c0-8.844-7.156-16-16-16S416 327.2 416 336v96c0 26.47-21.53 48-48 48h-288C53.53 480 32 458.5 32 432v-96C32 327.2 24.84 320 16 320S0 327.2 0 336v96C0 476.1 35.88 512 80 512h288C412.1 512 448 476.1 448 432z"/></svg>
        </div>
      </el-tooltip>
      <el-tooltip
          content="移动"
          effect="light"
          placement="top">
      <div class="multi_file_operation_tool" style="width: 25px;height: 25px;margin-top: 7px;border-radius: 5px;margin-left: 10px;cursor: pointer;float: left" v-on:click="open_move_file_dialog_multi_files">
        <svg fill="currentColor" style="color:#2897a8;width: 15px;height: 15px;float: left;margin-top: 5px;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 255.1c0 4.094-1.562 8.222-4.688 11.35l-80 80C424.2 350.4 420.1 352 416 352c-9.139 0-16-7.473-16-16c0-4.094 1.562-8.188 4.688-11.31L457.4 272H272v185.4l52.69-52.69C327.8 401.6 331.9 400 336 400c9.139 0 16 7.473 16 16c0 4.094-1.562 8.188-4.688 11.31l-80 80C264.2 510.4 260.1 512 256 512s-8.188-1.562-11.31-4.688l-80-80C161.6 424.2 160 420.1 160 416c0-8.527 6.865-16 16-16c4.094 0 8.188 1.562 11.31 4.688L240 457.4V272H54.63l52.69 52.69C110.4 327.8 112 331.9 112 336C112 344.5 105.1 352 96 352c-4.094 0-8.188-1.562-11.31-4.688l-80-80C1.563 264.2 0 260.1 0 255.1s1.562-8.153 4.688-11.28l80-80C87.81 161.6 91.91 160 96 160c9.139 0 16 7.473 16 16c0 4.094-1.562 8.188-4.688 11.31L54.63 240H240V54.63L187.3 107.3C184.2 110.4 180.1 112 176 112C166.9 112 160 104.5 160 96c0-4.094 1.562-8.188 4.688-11.31l80-80C247.8 1.562 251.9 0 256 0s8.188 1.562 11.31 4.688l80 80C350.4 87.81 352 91.91 352 96c0 8.527-6.865 16-16 16c-4.094 0-8.188-1.562-11.31-4.688L272 54.63V240h185.4l-52.69-52.69C401.6 184.2 400 180.1 400 176C400 167.5 406.9 160 416 160c4.094 0 8.188 1.562 11.31 4.688l80 80C510.4 247.8 512 251.9 512 255.1z"/></svg>
      </div>
      </el-tooltip>
<!--      <el-tooltip-->
<!--          content="分享"-->
<!--          effect="light"-->
<!--          placement="top">-->
<!--        <div class="multi_file_operation_tool"  style="width: 25px;height: 25px;margin-top: 7px;border-radius: 5px;margin-left: 10px;cursor: pointer;float: left" v-on:click="open_share_file_dialog_multi_files()">-->
<!--          <svg fill="currentColor" style="color:#622dbd;width: 15px;height: 15px;float: left;margin-top: 5px;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">&lt;!&ndash;! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. &ndash;&gt;<path d="M400 352c-8.836 0-16 7.164-16 16v79.1C384 465.7 369.7 480 352 480H64c-17.67 0-32-14.33-32-32V160c0-17.67 14.33-32 32-32h112C184.8 128 192 120.8 192 112S184.8 96 176 96H64C28.65 96 0 124.7 0 160v287.1c0 35.34 28.65 64 64 64L352 512c35.35 0 64-28.66 64-64v-80C416 359.2 408.8 352 400 352zM570.3 131.7l-160-127.1c-6.75-5.656-16.84-4.781-22.53 2.031c-5.656 6.781-4.75 16.88 2.031 22.53L515.8 128H368C270.1 128 192 206.1 192 304v32C192 344.8 199.2 352 208 352S224 344.8 224 336v-32C224 224.6 288.6 160 368 160h147.8l-126.1 99.72c-6.781 5.656-7.688 15.75-2.031 22.53C390.9 286 395.4 288 400 288c3.625 0 7.25-1.219 10.25-3.719l160-128C573.9 153.3 576 148.7 576 143.1S573.9 134.8 570.3 131.7z"/></svg>-->
<!--        </div>-->
<!--      </el-tooltip>-->
      <el-tooltip
          content="回收站"
          effect="light"
          placement="top">
        <div class="multi_file_operation_tool" style="width: 25px;height: 25px;margin-top: 7px;border-radius: 5px;margin-left: 10px;cursor: pointer;float: left" v-on:click="move_multi_files_to_recycle_bin">
          <svg fill="currentColor" style="color:#cc2121;width: 15px;height: 15px;float: left;margin-top: 5px;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M144 400C144 408.8 136.8 416 128 416C119.2 416 112 408.8 112 400V176C112 167.2 119.2 160 128 160C136.8 160 144 167.2 144 176V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V176C208 167.2 215.2 160 224 160C232.8 160 240 167.2 240 176V400zM336 400C336 408.8 328.8 416 320 416C311.2 416 304 408.8 304 400V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V400zM310.1 22.56L336.9 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V96H16C7.164 96 0 88.84 0 80C0 71.16 7.164 64 16 64H111.1L137 22.56C145.8 8.526 161.2 0 177.7 0H270.3C286.8 0 302.2 8.526 310.1 22.56V22.56zM148.9 64H299.1L283.8 39.52C280.9 34.84 275.8 32 270.3 32H177.7C172.2 32 167.1 34.84 164.2 39.52L148.9 64zM64 432C64 458.5 85.49 480 112 480H336C362.5 480 384 458.5 384 432V96H64V432z"/></svg>
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
import {nextTick, onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import axios from "axios";
import cookie from "js-cookie";

import store from "@/store";
import router from "@/router";

import fileDownload from 'js-file-download';
import {ElMessage} from "element-plus";

import useClipboard from 'vue-clipboard3'
import Viewer from "viewerjs";


const folder_list=reactive({folder_data:[]});
const file_list=reactive({file_data:[]});


let EditNameDialogVisible =ref(false);
let MoveFileDialogVisible =ref(false);
let ShareFileDialogVisible =ref(false);
let ShowShareLinkDialogVisible =ref(false);



let empty_file=ref(false);
let empty_folder=ref(false);

let file_suffix_name=ref("");

let ellipsis_is_hover=ref(false);

let file_name_in_edit_name_dialog = ref("");
let old_file_path=ref("");
let  old_file_suffix=ref("");


let have_crumbs_in_move_file_dialog=ref(false);
let crumbs_path_in_move_file_dialog=reactive({crumbs_data:[]});
let folder_list_in_move_file_dialog=reactive({folder_data:[]});
let empty_folder_in_move_file_dialog=ref(false);
let source_file_path=ref("");
let destination_folder_path=ref("");

let multi_files_state=ref(false);


////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 预览视频和图片
// eslint-disable-next-line @typescript-eslint/no-var-requires
let loading_image = require('../assets/picture.png')
function show_thumbnail(file)
{
  let p=file.parent_path.indexOf('\\');
  let p2=file.parent_path.indexOf('\\',p+1);

  let path=file.parent_path.substr(p2,file.parent_path.length)+'\\'+file.file_name;
  return 'http://localhost:8081/rootFolder/'+path;
}

function open_video_or_image(file)
{
  if(file.suffix=='mov'||file.suffix=='mp4'||file.suffix=='avi'||file.suffix=='flv'||file.suffix=='wmv'||file.suffix=='mpeg')
  {

    let p=file.parent_path.indexOf('\\');
    let p2=file.parent_path.indexOf('\\',p+1);

    let path=file.parent_path.substr(p2,file.parent_path.length)+'\\'+file.file_name;
    // console.log(path)
    store.commit('set_video_file_path',path);
    store.commit('set_video_name',file.file_name);
    store.commit('set_VideoDialogVisible',true);
  }
  else if(file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif')
  {
    let p=file.parent_path.indexOf('\\');
    let p2=file.parent_path.indexOf('\\',p+1);

    let path=file.parent_path.substr(p2,file.parent_path.length)+'\\'+file.file_name;
    store.commit('set_video_file_path',path);
    view_image();
  }
}
// let image_list=ref([]);
function view_image()
{
  //使用虚拟路径打开文件（web的安全性限制）
  let image = new Image();
  image.src = 'http://localhost:8081/rootFolder/'+store.state.video_file_path;
  const  viewer = new Viewer(image, {
    navbar:false,
    transition:false
  });
  // image.click();
  viewer.show();
}
/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  预览视频和图片

////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 设置下拉框出现的位置，因为把下拉框设置在每个文件项里页面很卡，所以之设置一个下拉框，鼠标点击图标时设置下拉框位置
let drop_down_file_infor=ref([]);
function click_drop_down(file)
{
  document.oncontextmenu = function (event) {
    event.preventDefault();
  };

  drop_down_file_infor.value=file;
  // console.log(drop_down_file_infor.value)

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
    if(response.data.password===null)
    {
      share_link.value='http://localhost:8080/#/share/'+response.data.uuid+"/no_password";
    }
    else
    {
      share_link.value='http://localhost:8080/#/share2/'+response.data.uuid;
    }
    // share_link.value='http://localhost:8080/#/share/'+response.data.uuid;
    ShareFileDialogVisible.value=false
    ShowShareLinkDialogVisible.value=true
  })
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

/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  分享文件


// const open_state=ref(store.state.SideBar_isOpen);vuex状态值的变化不会引起ｒｅｆ数值变化

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


function inToFolder(folder_path)
{
  router.push({path:"/home/folder/"+folder_path});
}

////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 文件和文件夹下载
function download(file)
{
  if (file.suffix==='folder')
  {
    folder_download(file.file_path,file.file_name)
  }
  else
  {
    axios.get("/download", {
      params:{
        file_path:file.file_path
      },
      responseType: 'blob'
    }).then(function (response) {
      ElMessage({
        message: '开始下载',
        type: 'success',
        customClass:'message'
      })
      fileDownload(response.data, file.file_name);
    })
  }
}
function folder_download(file_path,file_name)
{
  ElMessage({
    message: '开始压缩，请等待......',
    type: 'warning',
    customClass:'message',
    duration:5000
  })
  axios.get("/folder_download", {
    params:{
      file_path:file_path
    },
    responseType: 'blob'
  }).then(function (response) {
    ElMessage({
      message: '开始下载',
      type: 'success',
      customClass:'message'
    })
    //file——name决定了最终下载的文件名！！！！！！！！！！，不是在后端决定！！！！！
    fileDownload(response.data, file_name+".zip");
  })
}
function multi_files_download()
{
  ElMessage({
    message: '开始压缩，请等待......',
    type: 'warning',
    customClass:'message',
    duration:5000
  })
  axios.get("/multi_files_download", {
    params:{
      //https://segmentfault.com/q/1010000010323643
      //let arr = [1,2,3]
//       axios({url: '/user/',
//               params: {
//                 id: arr + '',    // 重点在这数组加上'',即可变为 "1,2,3"
//   }
// }
//   所形成的url为： /user?id=1,2,3    等价于 /user?id=1&id=2&id=3
      file_path: checked_files_group.value+'',
    },
    responseType: 'blob'
  }).then(function (response) {
    ElMessage({
      message: '开始下载',
      type: 'success',
      customClass:'message'
    })
    //file——name决定了最终下载的文件名！！！！！！！！！！，不是在后端决定！！！！！
    fileDownload(response.data, "多个文件.zip");
  })
}
/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  文件和文件夹下载


function move_file_to_recycle_bin(file_path)
{
  axios.get("/move_file_to_recycle_bin", {
    params:{
      file_path: file_path,
      user_name:cookie.get("user_name")
    }
  }).then(function (response) {
    if (response.data===true)
    {
      ElMessage({
        message: '文件已移至回收站',
        type: 'success',
        customClass:'message'
      })
      //名字修改后再发送更新列表请求来迅速更新列表
      axios.get("/home_file", {
        params:{
          user_name:cookie.get("user_name")
        }

      }).then(function (response) {
        // if(!response.data)//////java返回null，浏览器为undefined
        file_list.file_data=response.data;
        sort_file();
        if(response.data.length===0)//////java返回null，浏览器为undefined
        {
          empty_file.value=true;
        }
        else
        {
          empty_file.value=false;
        }
      })

      axios.get("/home_folder", {
        params:{
          user_name:cookie.get("user_name")
        }

      }).then(function (response) {

        folder_list.folder_data=response.data;
        sort_file();

        if(response.data.length===0)//////java返回null，浏览器为undefined
        {
          empty_folder.value=true;
        }
        else
        {
          empty_folder.value=false;
        }

      })
    }
    else
    {
      ElMessage({
        message: '删除失败，包含同文件名',
        type: 'error',
        customClass:'message'
      })
    }
    cancel_multi_files_select();
  })
}
function move_multi_files_to_recycle_bin()
{
  axios.get("/move_multi_files_to_recycle_bin", {
    params:{
      user_name:cookie.get("user_name"),
      file_path: checked_files_group.value+'',
    }
  }).then(function (response) {
    if (response.data===true)
    {
      ElMessage({
        message: checked_files_group.value.length+'个文件已移至回收站',
        type: 'success',
        customClass:'message'
      })
      //名字修改后再发送更新列表请求来迅速更新列表
      axios.get("/home_file", {
        params:{
          user_name:cookie.get("user_name")
        }

      }).then(function (response) {
        file_list.file_data=response.data;
        sort_file();
        if(response.data.length===0)//////java返回null，浏览器为undefined
        {
          empty_file.value=true;
        }
        else
        {
          empty_file.value=false;
        }
      })

      axios.get("/home_folder", {
        params:{
          user_name:cookie.get("user_name")
        }

      }).then(function (response) {

        folder_list.folder_data=response.data;
        sort_file();
        if(response.data.length===0)//////java返回null，浏览器为undefined
        {
          empty_folder.value=true;
        }
        else
        {
          empty_folder.value=false;
        }
      })
    }
    else
    {
      ElMessage({
        message: '部分文件删除失败，包含同文件名',
        type: 'error',
        customClass:'message'
      })
    }
    cancel_multi_files_select();
  })
}


function edit_name(file)
{
  old_file_path.value=file.file_path;
  if (file.suffix==="folder")
    old_file_suffix.value="";
  else
     old_file_suffix.value="."+file.suffix;

  let name=file.file_name;
  if (file.suffix!=="folder")
     name=name.substr(0,name.lastIndexOf('.'));

  file_suffix_name.value=file.suffix;
  file_name_in_edit_name_dialog.value=name;


  EditNameDialogVisible.value=true;
}

function confirm_edit_name(old_file_path,new_file_name)
{
  axios.get("/edit_file_name", {
    params:{
      old_file_path:old_file_path,
      new_file_name:new_file_name,
      user_name:""
    }

  }).then(function (response) {
    if(response.data===true)//////java返回null，浏览器为undefined
    {
      ElMessage({
        message: '修改成功',
        type: 'success',
      })

      // store.commit('set_crumbs_path',null);
      //名字修改后再发送更新列表请求来迅速更新列表
      axios.get("/home_file", {
        params:{
          user_name:cookie.get("user_name")
        }

      }).then(function (response) {
        file_list.file_data=response.data;
        sort_file();
        if(response.data.length===0)//////java返回null，浏览器为undefined
        {
          empty_file.value=true;
        }
        else
        {
          empty_file.value=false;
        }
      })

      axios.get("/home_folder", {
        params:{
          user_name:cookie.get("user_name")
        }

      }).then(function (response) {
        folder_list.folder_data=response.data;
        sort_file();
        if(response.data.length===0)//////java返回null，浏览器为undefined
        {
          empty_folder.value=true;
        }
        else
        {
          empty_folder.value=false;
        }
      })
    }
    else
    {
      ElMessage.error('修改失败，存在同名文件')
    }

  })

  //确认更改名字后关闭对话框
  EditNameDialogVisible.value=false;
}

function  inToFolder_in_move_file_dialog(folder_path)
{
  destination_folder_path.value=folder_path;
  axios.get("/crumbs_path", {
    params:{
      folder_path:folder_path,
      user_name:cookie.get("user_name"),
      multi_files_state:false
    }
  }).then(function (response) {
    crumbs_path_in_move_file_dialog.crumbs_data=response.data;
  })

  axios.get("/inToFolder_searchFolder", {
    params:{
      folder_path:folder_path
    }

  }).then(function (response) {
    folder_list_in_move_file_dialog.folder_data=response.data;

    if(response.data.length===0)//////java返回null，浏览器为undefined
    {
      empty_folder_in_move_file_dialog.value=true;
    }
    else
    {
      empty_folder_in_move_file_dialog.value=false;
    }

    if(response.data===null)
      have_crumbs_in_move_file_dialog.value=false;
    else
      have_crumbs_in_move_file_dialog.value=true;
  })
}

function click_crumbs_in_move_file_dialog(file_path)
{
  destination_folder_path.value=file_path;
  axios.get("/crumbs_path", {
    params:{
      folder_path:file_path,
      user_name:cookie.get("user_name"),
      multi_files_state:false
    }
  }).then(function (response) {
    crumbs_path_in_move_file_dialog.crumbs_data=response.data;
    if(response.data===null)
      have_crumbs_in_move_file_dialog.value=false;
    else
      have_crumbs_in_move_file_dialog.value=true;
  })

  axios.get("/inToFolder_searchFolder", {
    params:{
      folder_path:file_path
    }

  }).then(function (response) {
    folder_list_in_move_file_dialog.folder_data=response.data;

    if(response.data.length===0)//////java返回null，浏览器为undefined
    {
      empty_folder_in_move_file_dialog.value=true;
    }
    else
    {
      empty_folder_in_move_file_dialog.value=false;
    }
  })

}

function click_go_home_in_move_file_dialog()
{
  folder_list_in_move_file_dialog.folder_data=folder_list.folder_data;
  have_crumbs_in_move_file_dialog.value=false;
  crumbs_path_in_move_file_dialog.crumbs_data=null;
  destination_folder_path.value="";
}

////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 移动单文件方法块
function open_move_file_dialog(file)
{
  source_file_path.value=file.file_path;
  ////解决在移动文件对话框里进入了某个目录后关闭对话框，对话框再打开后仍然显示之前进入的这个目录的问题，将列表重置为初始列表
  crumbs_path_in_move_file_dialog.crumbs_data=null;
  folder_list_in_move_file_dialog.folder_data=folder_list.folder_data;
  have_crumbs_in_move_file_dialog.value=false;
  destination_folder_path.value="";

  // axios.get("/crumbs_path", {
  //   params:{
  //     folder_path:folder_path,
  //     user_name:cookie.get("user_name")
  //   }
  // }).then(function (response) {
  //   crumbs_path_in_move_file_dialog.crumbs_data=response.data;
  // })
  folder_list_in_move_file_dialog.folder_data=folder_list.folder_data;
  MoveFileDialogVisible.value=true;
}

function confirm_move_file()
{
  if (multi_files_state.value===true)
  {
    if(destination_folder_path.value!=="")
    {
      axios.get("/multi_files_move", {
        params: {
          source_file_path: checked_files_group.value+'',
          destination_folder_path:destination_folder_path.value
        }

      }).then(function (response) {
        if (!response.data)//////java返回null，浏览器为undefined
        {
          ElMessage({
            message: '部分文件移动失败',
            type: 'error',
          })
        } else {
          ElMessage({
            message: '移动成功',
            type: 'success',
          })
          MoveFileDialogVisible.value=false;
          axios.get("/home_file", {
            params: {
              user_name: cookie.get("user_name")
            }

          }).then(function (response) {
            file_list.file_data = response.data;
            sort_file()
            if(response.data.length===0)//////java返回null，浏览器为undefined
            {
              empty_file.value=true;
            }
            else
            {
              empty_file.value=false;
            }

          })

          axios.get("/home_folder", {
            params: {
              user_name: cookie.get("user_name")
            }

          }).then(function (response) {
            folder_list.folder_data = response.data;
            sort_file()
            if(response.data.length===0)//////java返回null，浏览器为undefined
            {
              empty_folder.value=true;
            }
            else
            {
              empty_folder.value=false;
            }
          })
        }
      })
    }
  }
else
  {
    if(destination_folder_path.value!=="")
    {
      axios.get("/move_file", {
        params: {
          source_file_path: source_file_path.value,
          destination_folder_path:destination_folder_path.value
        }
      }).then(function (response) {
        if (!response.data)//////java返回null，浏览器为undefined
        {
          ElMessage({
            message: '移动失败，包含同名文件',
            type: 'error',
          })
        } else {
          ElMessage({
            message: '移动成功',
            type: 'success',
          })
          MoveFileDialogVisible.value=false;
          axios.get("/home_file", {
            params: {
              user_name: cookie.get("user_name")
            }
          }).then(function (response) {
            file_list.file_data = response.data;
            sort_file()
            if(response.data.length===0)//////java返回null，浏览器为undefined
            {
              empty_file.value=true;
            }
            else
            {
              empty_file.value=false;
            }
          })

          axios.get("/home_folder", {
            params: {
              user_name: cookie.get("user_name")
            }

          }).then(function (response) {
            folder_list.folder_data = response.data;
            sort_file()
            if(response.data.length===0)//////java返回null，浏览器为undefined
            {
              empty_folder.value=true;
            }
            else
            {
              empty_folder.value=false;
            }
          })
        }
      })
    }
  }
  multi_files_state.value=false;
}

/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  移动单文件方法块

function open_move_file_dialog_multi_files()
{
  multi_files_state.value=true;
  ////解决在移动文件对话框里进入了某个目录后关闭对话框，对话框再打开后仍然显示之前进入的这个目录的问题，将列表重置为初始列表
  crumbs_path_in_move_file_dialog.crumbs_data=null;
  folder_list_in_move_file_dialog.folder_data=folder_list.folder_data;
  have_crumbs_in_move_file_dialog.value=false;
  destination_folder_path.value="";
  folder_list_in_move_file_dialog.folder_data=folder_list.folder_data;
  MoveFileDialogVisible.value=true;
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
  store.commit('set_crumbs_path', null);

  store.commit('set_current_page','home');

  store.commit("set_current_path_for_create_folder_function","");

  store.commit('set_current_upload_path',"");

  axios.get("/home_file", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {

    file_list.file_data = response.data;
    sort_file()
    if(response.data.length===0)//////java返回null，浏览器为undefined
    {
      empty_file.value=true;
    }
    else
    {
      empty_file.value=false;
    }
  })

  axios.get("/home_folder", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    folder_list.folder_data = response.data;
    sort_file()
    if(response.data.length===0)//////java返回null，浏览器为undefined
    {
      empty_folder.value=true;
    }
    else
    {
      empty_folder.value=false;
    }
  })


})


watch(()=>store.state.have_confirmed_create_folder,()=>
{
  axios.get("/home_folder", {
    params: {
      user_name: cookie.get("user_name")
    }
  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      folder_list.folder_data = response.data;
      sort_file();
    }
  })
  store.commit("set_have_confirmed_create_folder",false);

})

//监听一个文件是否成功上传，通过监听vuex属性
watch(()=>store.state.one_file_has_been_uploaded,()=>
{
  if(store.state.check_current_path_and_upload_path==="")
  {
    axios.get("/home_file", {
      params: {
        user_name: cookie.get("user_name")
      }

    }).then(function (response) {
      if (!response.data)//////java返回null，浏览器为undefined
      {
        // error_password_alert();
      } else {
        file_list.file_data = response.data;
        sort_file()
      }
    })

    axios.get("/home_folder", {
      params: {
        user_name: cookie.get("user_name")
      }

    }).then(function (response) {
      if (!response.data)//////java返回null，浏览器为undefined
      {
        // error_password_alert();
      } else {
        folder_list.folder_data = response.data;
        sort_file()
      }
    })

  }
  store.commit("set_one_file_has_been_uploaded",false);//将属性设置false，以便新的文件上传成功后做判断
})


function set_file_name_order_asc()
{
  store.commit('set_sort_state',"file_name_asc")
  axios.get("/home_file", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      file_list.file_data = response.data;
      sort_file();
    }
  })

  axios.get("/home_folder", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      folder_list.folder_data = response.data;
      sort_file();
    }
  })

}
function set_file_name_order_desc()
{
  store.commit('set_sort_state',"file_name_desc")
  axios.get("/home_file", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      file_list.file_data = response.data;
      sort_file();
    }
  })

  axios.get("/home_folder", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      folder_list.folder_data = response.data;
      sort_file();
    }
  })

}
function set_create_time_order_asc()
{
  store.commit('set_sort_state',"create_time_asc")
  axios.get("/home_file", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      file_list.file_data = response.data;
      sort_file();
    }
  })

  axios.get("/home_folder", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      folder_list.folder_data = response.data;
      sort_file();
    }
  })

}
function set_create_time_order_desc()
{
  store.commit('set_sort_state',"create_time_desc")
  axios.get("/home_file", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      file_list.file_data = response.data;
      sort_file();
    }
  })

  axios.get("/home_folder", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      folder_list.folder_data = response.data;
      sort_file();
    }
  })

}
function set_file_size_order_asc()
{
  store.commit('set_sort_state',"file_size_asc")
  axios.get("/home_file", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      file_list.file_data = response.data;
      sort_file();
    }
  })

  axios.get("/home_folder", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      folder_list.folder_data = response.data;
      sort_file();
    }
  })

}
function set_file_size_order_desc()
{
  store.commit('set_sort_state',"file_size_desc")
  axios.get("/home_file", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      file_list.file_data = response.data;
      sort_file();
    }
  })

  axios.get("/home_folder", {
    params: {
      user_name: cookie.get("user_name")
    }

  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {
      // error_password_alert();
    } else {
      folder_list.folder_data = response.data;
      sort_file();
    }
  })

}


function sort_file()
{

  let file=reactive({data:[]})
  let folder=reactive({data:[]})
  file.data=file_list.file_data;
  folder.data=folder_list.folder_data;


  // cookie.get("sort_state")
  switch (store.state.sort_state)
  {
    case "file_name_asc": {
      file.data.sort(compare_file_name_asc("file_name"));
      folder.data.sort(compare_file_name_asc("file_name"));
    }
      break;
    case "file_name_desc":
    {
      file.data.sort(compare_file_name_desc("file_name"));
      folder.data.sort(compare_file_name_desc("file_name"));
    }
      break;
    case "create_time_asc":
    {
      file.data.sort(compare_create_time_asc("create_time"));
      folder.data.sort(compare_create_time_asc("create_time"));
    }
      break;
    case "create_time_desc":
    {
       file.data.sort(compare_create_time_desc("create_time"));
      folder.data.sort(compare_create_time_desc("create_time"));
    }
      break;
    case "file_size_asc":
    {
      file.data.sort(compare_asc("file_size"));
      folder.data.sort(compare_asc("file_size"));
    }
      break;
    case "file_size_desc":
    {
      file.data.sort(compare_desc("file_size"));
      folder.data.sort(compare_desc("file_size"));
    }
      break;
  }
  // Object.assign(file_list.file_data,file.data);
  // Object.assign(folder_list.folder_data,folder);
  file_list.file_data=file.data;
  folder_list.folder_data=folder.data;
}

function compare_asc(p){ //这是比较函数
  return function(m,n){
    let a = m[p];
    let b = n[p];
    return a - b; //升序
  }
}
function compare_desc(p){ //这是比较函数
  return function(m,n){
    let a = m[p];
    let b = n[p];
    return b - a; //降序
  }
}
function compare_file_name_asc(p){ //这是比较函数
  return function(m,n){
    let a = m[p];
    let b = n[p];
    return a.localeCompare(b); //升序
  }
}
function compare_file_name_desc(p){ //这是比较函数
  return function(m,n){
    let a = m[p];
    let b = n[p];
    return b.localeCompare(a); //降序
  }
}
function compare_create_time_asc(p){ //这是比较函数
  return function(m,n){
    let a = m[p];
    let b = n[p];

    a=a.replace("-", "/");
    a= new Date(Date.parse(a));
    b=b.replace("-", "/");
    b= new Date(Date.parse(b));
    return a-b; //升序
  }
}function compare_create_time_desc(p){ //这是比较函数
  return function(m,n){
    let a = m[p];
    let b = n[p];

    a=a.replace("-", "/");
    a= new Date(Date.parse(a));
    b=b.replace("-", "/");
    b= new Date(Date.parse(b));
    return b-a; //升序
  }
}


// //监听router的url变化，变了就发送请求重新获取列表
// watch(()=>route.path,()=>
// {
//   store.commit('set_crumbs_path', null);
//
//   axios.get("/home_file", {
//     params: {
//       user_name: cookie.get("user_name")
//     }
//
//   }).then(function (response) {
//     if (!response.data)//////java返回null，浏览器为undefined
//     {
//       // error_password_alert();
//     } else {
//       file_list.file_data = response.data;
//     }
//     console.log(file_list);
//   })
//
//   axios.get("/home_folder", {
//     params: {
//       user_name: cookie.get("user_name")
//     }
//
//   }).then(function (response) {
//     if (!response.data)//////java返回null，浏览器为undefined
//     {
//       // error_password_alert();
//     } else {
//       folder_list.folder_data = response.data;
//     }
//     console.log(folder_list);
//   })
// }), { immediate: true, deep: true }


</script>

<style scoped>

.attribute-td
{
  transition: all 0.5s;
  cursor: pointer;
}
.attribute-td svg
{
opacity: 0;
}
.attribute-td:hover span
{
  transition: all 0.5s;
  color: white;
  /*background-color: #646464;*/
}
.attribute-td:hover svg
{
 opacity: 1;
}

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
  vertical-align: -50%;
}


.file_icon2
{
  /*margin-left: 25px;*/
  /*margin-top: 25px;*/
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

#video_dialog .el-dialog__headerbtn
{
  font-size: 30px;
}
.viewer-title
{
  color: #35e130;
}
.viewer-prev
{
  display: none;
}
.viewer-next
{
  display: none;
}

img[lazy="loading"]{
  height: 27px;
  width:300px ;
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
