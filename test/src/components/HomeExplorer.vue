<template>


  <div style="height: 100%;width: 100%">
    <div :style="store.state.SideBar_isOpen? 'width:calc(100% - 280px)' : ' width:calc(100% - 42px)'" style="transition:all 0.5s;position: fixed;background-color: #0e0e0e;height: 150px;top: 0px;margin-top: -10px;padding-top: 5px;">


      <div>
        <span v-show="store.state.current_page==='home'" :class="{'crumbs_path_no_hover_color':!have_crumbs,'crumbs_path_have_hover_color':have_crumbs}" v-on:click="click_go_home()" style="transition:all 0.5s;font-size: 17px;float: left;margin-top: 40px;margin-bottom: 20px;cursor: pointer">文件</span>
        <span v-show="store.state.current_page==='bin'" :class="{'crumbs_path_no_hover_color':!have_crumbs,'crumbs_path_have_hover_color':have_crumbs}"  style="transition:all 0.5s;font-size: 17px;float: left;margin-top: 40px;margin-bottom: 20px;cursor: pointer">回收站</span>
        <span v-show="store.state.current_page==='share_management'" :class="{'crumbs_path_no_hover_color':!have_crumbs,'crumbs_path_have_hover_color':have_crumbs}"  style="transition:all 0.5s;font-size: 17px;float: left;margin-top: 40px;margin-bottom: 20px;cursor: pointer">分享管理</span>


        <span :class="{'crumbs_path_no_hover_color':index===store.state.crumbs_path.length-1,'crumbs_path_have_hover_color':index!==store.state.crumbs_path.length-1}" v-on:click="click_crumbs(path.full_Path)" v-for="(path,index) in store.state.crumbs_path" :key="index" style="transition:all 0.5s;float: left;font-size: 17px;margin-top: 40px;cursor: pointer;">
           <svg fill="currentColor" width="10" height="10" style="color:#676363;margin-left: 5px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"/></svg>
           {{path.folder_name}}
        </span>
      </div>



      <div v-on:click="open_search_file_dialog" style="right: 0;position: fixed;top: 35px;margin-right: 110px;cursor: pointer">
        <img src="../assets/search.png" style="width:30px;height: 30px;">
<!--        <svg fill="currentColor" style="color: #cecece;height: 15px;width: 15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">&lt;!&ndash;! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. &ndash;&gt;<path d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"/></svg>-->
      </div>

<!--      右上角加号图标-->
      <el-dropdown  trigger="click" placement="bottom-end" style="margin-top: 40px;float: right;margin-right: 60px">
        <img v-show="store.state.current_page==='home'" src="../assets/plus.png" style="width: 30px;height: 30px;cursor: pointer">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px;margin-top: 5px" v-on:click="upload">
              <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M365.3 125.3l-106.5-106.5C246.7 6.742 230.5 0 213.5 0H64C28.65 0 0 28.65 0 64l.0065 384c0 35.35 28.65 64 64 64H320c35.35 0 64-28.65 64-64V170.5C384 153.5 377.3 137.3 365.3 125.3zM224 34.08c4.477 1.566 8.666 3.846 12.12 7.299l106.5 106.5C346.1 151.3 348.4 155.5 349.9 160H240C231.2 160 224 152.8 224 144V34.08zM352 448c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V64c0-17.64 14.36-32 32-32h128v112C192 170.5 213.5 192 240 192H352V448zM180.7 228.7l-80 80c-6.25 6.25-6.25 16.38 0 22.62s16.38 6.25 22.62 0L176 278.6V400c0 8.844 7.156 16 16 16s16-7.156 16-16V278.6l52.69 52.69C263.8 334.4 267.9 336 272 336s8.188-1.562 11.31-4.688c6.25-6.25 6.25-16.38 0-22.62l-80-80C197.1 222.4 186.9 222.4 180.7 228.7z"/></svg>
              上传文件
            </el-dropdown-item>

            <el-dropdown-item style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px" v-on:click="upload_folder">
              <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 96h-176L226.7 50.75C214.7 38.74 198.5 32 181.5 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V160C512 124.7 483.3 96 448 96zM480 416c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h117.5c8.549 0 16.58 3.328 22.63 9.375L258.7 128H448c17.64 0 32 14.36 32 32V416zM267.3 196.7c-6.25-6.25-16.38-6.25-22.62 0l-80 80c-6.25 6.25-6.25 16.38 0 22.62s16.38 6.25 22.62 0L240 246.6V368c0 8.844 7.156 16 16 16s16-7.156 16-16V246.6l52.69 52.69C327.8 302.4 331.9 304 336 304s8.188-1.562 11.31-4.688c6.25-6.25 6.25-16.38 0-22.62L267.3 196.7z"/></svg>
              上传文件夹
            </el-dropdown-item>

            <el-dropdown-item divided style="color: #19bb4d;font-size: 15px;width: 150px;margin-left: 8px;margin-bottom: 5px" v-on:click="open_new_file_dialog()">
              <svg fill="currentColor" style="color:#28dd22;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 96h-176L226.7 50.75C214.7 38.74 198.5 32 181.5 32H64C28.66 32 0 60.65 0 96v320c0 35.35 28.66 64 64 64h384c35.34 0 64-28.65 64-64V160C512 124.7 483.3 96 448 96zM480 416c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h117.5c8.547 0 16.58 3.328 22.62 9.375L258.7 128H448c17.64 0 32 14.36 32 32V416zM336 272h-64V207.1C272 199.2 264.8 192 256 192S240 199.2 240 207.1V272h-64C167.2 272 160 279.2 160 288c0 8.834 7.156 15.1 16 15.1h64v64C240 376.8 247.2 384 256 384c8.836 0 16-7.16 16-15.1V303.1h64C344.8 303.1 352 296.8 352 288S344.8 272 336 272z"/></svg>
              新建文件夹
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>



      <div  :style="store.state.current_page==='home'?'float: right;width: 40px;height: 20px;margin-top:100px;margin-bottom:10px;margin-right:-35px;':'float: right;width: 40px;height: 20px;margin-top:100px;margin-bottom:10px;margin-right:-5px;'">
        <div v-on:click="change_to_big_icon_mode" class="display_mode_change_button" style="cursor:pointer;float: right;width: 20px;border-radius: 0px 5px 5px 0px;">
          <svg fill="currentColor" :style="store.state.enable_big_icon_mode?'color:#4eb467':'color: #7f7f85'" style="width: 15px;height: 15px;margin-top: 4px;margin-left: 2px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 80C0 53.49 21.49 32 48 32H144C170.5 32 192 53.49 192 80V176C192 202.5 170.5 224 144 224H48C21.49 224 0 202.5 0 176V80zM32 80V176C32 184.8 39.16 192 48 192H144C152.8 192 160 184.8 160 176V80C160 71.16 152.8 64 144 64H48C39.16 64 32 71.16 32 80zM0 336C0 309.5 21.49 288 48 288H144C170.5 288 192 309.5 192 336V432C192 458.5 170.5 480 144 480H48C21.49 480 0 458.5 0 432V336zM32 336V432C32 440.8 39.16 448 48 448H144C152.8 448 160 440.8 160 432V336C160 327.2 152.8 320 144 320H48C39.16 320 32 327.2 32 336zM400 32C426.5 32 448 53.49 448 80V176C448 202.5 426.5 224 400 224H304C277.5 224 256 202.5 256 176V80C256 53.49 277.5 32 304 32H400zM400 64H304C295.2 64 288 71.16 288 80V176C288 184.8 295.2 192 304 192H400C408.8 192 416 184.8 416 176V80C416 71.16 408.8 64 400 64zM256 336C256 309.5 277.5 288 304 288H400C426.5 288 448 309.5 448 336V432C448 458.5 426.5 480 400 480H304C277.5 480 256 458.5 256 432V336zM288 336V432C288 440.8 295.2 448 304 448H400C408.8 448 416 440.8 416 432V336C416 327.2 408.8 320 400 320H304C295.2 320 288 327.2 288 336z"/></svg>
        </div>

        <div v-on:click="change_to_list_mode" class="display_mode_change_button" style="cursor:pointer;float: right;width: 20px;border-radius: 5px 0 0 5px">
          <svg fill="currentColor" :style="!store.state.enable_big_icon_mode?'color:#4eb467':'color: #7f7f85'" style="width: 15px;height: 15px;margin-top: 4px;margin-left: 2px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 80C0 71.16 7.164 64 16 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H16C7.164 96 0 88.84 0 80zM0 240C0 231.2 7.164 224 16 224H432C440.8 224 448 231.2 448 240C448 248.8 440.8 256 432 256H16C7.164 256 0 248.8 0 240zM432 416H16C7.164 416 0 408.8 0 400C0 391.2 7.164 384 16 384H432C440.8 384 448 391.2 448 400C448 408.8 440.8 416 432 416z"/></svg>
        </div>
      </div>

<!--     <file-attribute v-show="!store.state.enable_big_icon_mode"></file-attribute>-->
    </div>


    <router-view></router-view>


    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  新建文件夹对话框-->
    <el-dialog v-model="NewFolderDialogVisible" width="350px" title="新建文件夹" top="15%" class="EditNameDialog" style="border-radius: 15px">
        <img class="file_icon_in_editName_dialog" style=" margin-left:85px;width: 140px;height: 140px" src="../assets/folder.png">

      <el-input type="text" v-model="file_name_in_new_folder_dialog" clearable style="--el-input-focus-border-color: #569b3f;"/>

      <template #footer>
      <span class="dialog-footer">
          <el-button type="success" style="margin-top: -10px" v-on:click="confirm_create_folder(file_name_in_new_folder_dialog)">确定</el-button>
      </span>
      </template>
    </el-dialog>
    <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  新建文件夹对话框-->



    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  搜索对话框-->
    <el-dialog v-model="SearchFileDialogVisible" width="550px" :modal="false" title="搜索" top="15%" @close="close_search_file_dialog" class="EditNameDialog" style="border-radius: 15px;height: 500px;z-index: 1">
      <el-input placeholder="搜索文件"   size="large" type="text" @input="search" v-model="search_name" clearable style="--el-input-focus-border-color: #569b3f;"/>

      <div style="height: 360px;width: 520px;margin-top: 10px">
        <el-scrollbar>
          <table style="width: calc(100% - 15px);border-collapse: collapse;">
            <tr class="table_area" v-for="file in file_list_in_search_dialog.data" :key="file" >
              <td class="file_infor_td" v-on:click="open_video_or_image(file)" v-on:click.right="click_drop_down(file)" style="height:45px;font-size: 10px;width: 77%;border-radius: 10px 0px 0px 10px;color: #c0c0c0;overflow: hidden">
                <div style="display: inline"  v-lazy-container="{ selector: 'img', loading: loading_image}">
                  <img class="file_icon"  style="border-radius: 5px;width: 30px;height: 30px;vertical-align: -70%;margin-left: 5px" :data-src="show_thumbnail(file)" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">
                </div>
                <img class="file_icon" src="../assets/folder.png" style="height: 40px;width: 40px;vertical-align: -90%" v-on:click="inToFolder(file.file_path)"   v-show="file.suffix=='folder'">

                <img class="file_icon" src="../assets/document.png"  v-show="file.suffix=='txt'||file.suffix=='ini'||file.suffix=='lua'||file.suffix=='json'">
                <img class="file_icon" src="../assets/music.png"  v-show="file.suffix=='mp3'||file.suffix=='wma'||file.suffix=='wav'||file.suffix=='ape'||file.suffix=='flac'">
                <img class="file_icon" src="../assets/zip.png"  v-show="file.suffix=='zip'||file.suffix=='7z'||file.suffix=='tar'||file.suffix=='rar'">
                <img class="file_icon" src="../assets/video.png"  v-show="file.suffix=='mov'||file.suffix=='mp4'||file.suffix=='avi'||file.suffix=='flv'||file.suffix=='wmv'||file.suffix=='mpeg'">
                <img class="file_icon" src="../assets/word.png"  v-show="file.suffix=='doc'||file.suffix=='docx'">
                <img class="file_icon" src="../assets/ppt.png"  v-show="file.suffix=='ppt'||file.suffix=='pptx'">
                <img class="file_icon" src="../assets/pdf.png"  v-show="file.suffix=='pdf'">
                <img class="file_icon" src="../assets/other.png"  v-show="file.suffix=='exe'">
                <img class="file_icon" src="../assets/other.png"  v-show="file.suffix!=='jpg'&&file.suffix!=='png'&&file.suffix!=='jpeg'&&file.suffix!=='bmp'&&file.suffix!=='gif'&&
file.suffix!=='txt'&&file.suffix!=='ini'&&file.suffix!=='lua'&&file.suffix!=='json'&&file.suffix!=='mp3'&&file.suffix!=='wma'&&file.suffix!=='wav'&&file.suffix!=='ape'&&file.suffix!=='flac'&&
file.suffix!=='zip'&&file.suffix!=='7z'&&file.suffix!=='tar'&&file.suffix!=='rar'&&file.suffix!=='mov'&&file.suffix!=='mp4'&&file.suffix!=='avi'&&file.suffix!=='flv'&&file.suffix!=='wmv'&&file.suffix!=='mpeg'&&
file.suffix!=='doc'&&file.suffix!=='docx'&&file.suffix!=='ppt'&&file.suffix!=='pptx'&&file.suffix!=='pdf'&&file.suffix!=='exe'&&file.suffix!=='folder'">
                 {{file.file_name}}
              </td>

              <td  class="file_infor_td" style="height:45px;font-size: 5px;width: 12%" ></td>
              <td  class="file_infor_td" style="height:45px;font-size: 5px;border-radius: 0px 10px 10px 0px" ></td>
            </tr>
          </table>
        </el-scrollbar>
      </div>

    </el-dialog>
    <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  搜索对话框-->


    <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  下拉框-->
    <el-dropdown trigger="click" id="my_drop_down_in_search_dialog" placement="bottom-start">
      <div class="ellipsis"   style="position:fixed;" >
        <!--        <svg class="ellipsis_svg" fill="currentColor" style="width: 22px;height: 22px;color: #dcdbdb;margin-top: 2px;margin-left: 1px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">&lt;!&ndash;! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. &ndash;&gt;<path d="M352 256C352 238.3 366.3 224 384 224C401.7 224 416 238.3 416 256C416 273.7 401.7 288 384 288C366.3 288 352 273.7 352 256zM192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256zM96 256C96 273.7 81.67 288 64 288C46.33 288 32 273.7 32 256C32 238.3 46.33 224 64 224C81.67 224 96 238.3 96 256z"/></svg>-->
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="drop_down_item_download" style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 6px;margin-bottom: 5px;margin-top: 5px" @click="download(drop_down_file_infor)">
            <svg  fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 352c4.094 0 8.188-1.562 11.31-4.688l144-144c6.25-6.25 6.25-16.38 0-22.62s-16.38-6.25-22.62 0L240 297.4V16C240 7.156 232.8 0 224 0S208 7.156 208 16v281.4L91.31 180.7c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62l144 144C215.8 350.4 219.9 352 224 352zM448 432v-96c0-8.844-7.156-16-16-16S416 327.2 416 336v96c0 26.47-21.53 48-48 48h-288C53.53 480 32 458.5 32 432v-96C32 327.2 24.84 320 16 320S0 327.2 0 336v96C0 476.1 35.88 512 80 512h288C412.1 512 448 476.1 448 432z"/></svg>
            下载
          </el-dropdown-item>

          <el-dropdown-item class="drop_down_item_download" style="color: #e0e0e0;font-size: 15px;width: 150px;margin-left: 6px;margin-bottom: 5px;margin-top: 5px" @click="inToFolder(drop_down_file_infor.parent_path)">
            <svg fill="currentColor" style="color:#e0e0e0;width: 15px;height: 15px;margin-right: 10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M447.1 96H272L226.7 50.75C214.7 38.74 198.5 32 181.5 32H63.1c-35.35 0-64 28.65-64 64v320c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V160C511.1 124.7 483.3 96 447.1 96zM480 416c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V96c0-17.64 14.36-32 32-32h117.5c8.549 0 16.58 3.328 22.63 9.375L258.7 128H448c17.64 0 32 14.36 32 32V416z"/></svg>
            前往文件夹
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑  下拉框-->


    <!--    <div style="background-color: #282828;width:350px;height: 450px;position: fixed;right: 0;bottom: 0;margin-right: 25px;margin-bottom: 10px;border-radius: 10px">-->
       <global-uploader></global-uploader>



  </div>



<!--<div style="position:relative;margin-top: 70px;width:100%;height:10%;overflow: hidden;">-->


<!--  <div class="table_area" v-for="folder in folder_list.folder_data" :key="folder " style="overflow:hidden;display: flex;justify-content: space-between;align-items: baseline;overflow: hidden">-->
<!--    <div class="file_infor_td" style="font-size: 15px;flex:  1 ;flex-basis: 60%;" >-->
<!--      <img class="file_icon" src="../assets/8707276_folder_document_file_archive_icon.png" >-->
<!--      {{folder.file_name}}-->
<!--    </div>-->

<!--    <td  class="file_infor_td" style="font-size: 5px;flex:  1">{{folder.create_time}}</td>-->
<!--  </div>-->


<!--  <div class="table_area" v-for="file in file_list.file_data" :key="file" style="overflow:hidden;display: flex;justify-content: space-between;align-items: baseline;overflow: hidden">-->
<!--    <div class="file_infor_td" style="font-size: 15px;flex:  1 ;flex-basis: 70%;" >-->
<!--      <img class="file_icon" src="../assets/image_file_icon.png" v-show="file.suffix=='jpg'||file.suffix=='png'||file.suffix=='jpeg'||file.suffix=='bmp'||file.suffix=='gif'">-->
<!--      <img class="file_icon" src="../assets/8712657_file_text_document_icon.png"  v-show="file.suffix=='txt'||file.suffix=='ini'||file.suffix=='lua'||file.suffix=='doc'||file.suffix=='docx'">-->
<!--      <img class="file_icon" src="../assets/8704004_music_sound_audio_icon.png"  v-show="file.suffix=='mp3'||file.suffix=='wma'||file.suffix=='wav'||file.suffix=='ape'||file.suffix=='flac'">-->
<!--      <img class="file_icon" src="../assets/8712531_travel_luggage_suitcase_icon.png"  v-show="file.suffix=='zip'||file.suffix=='7z'||file.suffix=='tar'||file.suffix=='rar'">-->
<!--      <img class="file_icon" src="../assets/8712557_video_camera_icon.png"  v-show="file.suffix=='mov'||file.suffix=='mp4'||file.suffix=='avi'||file.suffix=='flv'||file.suffix=='wmv'||file.suffix=='mpeg'">-->
<!--      {{file.file_name}}-->
<!--    </div>-->

<!--    <div  class="file_infor_td" style="font-size: 5px;flex:  1 ">{{file.create_time}}</div>-->
<!--    <div class="file_infor_td" style="font-size: 5px;flex:  1 ">{{file.file_size}}</div>-->
<!--  </div>-->
<!--</div>-->
</template>


<script setup>

import store from "@/store";
import FileAttribute from "@/components/FileAttribute";
import router from "@/router";
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import cookie from "js-cookie";
import {ElMessage} from "element-plus";


let NewFolderDialogVisible=ref(false);
let file_name_in_new_folder_dialog=ref("新建文件夹");


let SearchFileDialogVisible=ref(false);
let search_name=ref("");
let file_list_in_search_dialog=reactive({data:[]});

let file_upload_dialog=ref(true);
let drawer=ref(true)



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
    SearchFileDialogVisible.value=false
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
    SearchFileDialogVisible.value=false
    let p=file.parent_path.indexOf('\\');
    let p2=file.parent_path.indexOf('\\',p+1);

    let path=file.parent_path.substr(p2,file.parent_path.length)+'\\'+file.file_name;
    store.commit('set_video_file_path',path);
    view_image();
  }
}
let image_list=ref([]);
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


let drop_down_file_infor=ref([]);
function click_drop_down(file)
{
  console.log(file)
  document.oncontextmenu = function (event) {
    event.preventDefault();
  };

  drop_down_file_infor.value=file;
  // console.log(drop_down_file_infor.value)

  processClick();
  document.getElementById('my_drop_down_in_search_dialog').click();
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
  document.getElementById('my_drop_down_in_search_dialog').setAttribute('style',style);
}
/////↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑   设置下拉框出现的位置，因为把下拉框设置在每个文件项里页面很卡，所以之设置一个下拉框，鼠标点击图标时设置下拉框位置

////↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 文件和文件夹下载
function download(file)
{
  console.log(file)
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

function inToFolder(folder_path)
{
  SearchFileDialogVisible.value=false
  router.push({path:"/home/folder/"+folder_path});
}

function close_search_file_dialog()
{
  file_list_in_search_dialog.data=null;
  search_name.value=null
}



import axios from "axios";
import GlobalUploader from "@/components/GlobalUploader";
import Bus from "@/script/uploader/bus";
import Viewer from "viewerjs";
import fileDownload from "js-file-download";

const upload = () => {
  // 打开文件选择框
  Bus.emit('openUploader', {
    // 给服务端的额外参数
    params: {
      user_name:cookie.get("user_name"),


      current_upload_path:store.state.current_upload_path//设置上传的目标路径
    },
    options: {
      target: 'http://localhost:8081/chunk',

    }
  })
}

const upload_folder = () => {
  // 打开文件选择框
  Bus.emit('openUploader_enable_folder_upload', {
    // 给服务端的额外参数
    //自定义添加的post参数
    params: {
      user_name:cookie.get("user_name"),
      current_upload_path:store.state.current_upload_path  ///////设置文件上传后保存的目标路径
    },
    options: {
      target: 'http://localhost:8081/chunk',
    }
  })
}

function open_search_file_dialog()
{
  SearchFileDialogVisible.value=true;
}

function search()
{
  if(search_name.value!=="")
  {
    axios.get("/search_file", {
      params: {
        user_name: cookie.get("user_name"),
        key_name:search_name.value
      }
    }).then(function (response) {
      file_list_in_search_dialog.data=response.data;
      //
    })
  }

}

function click_crumbs(path)
{
  router.push({path:"/home/folder/"+path});
}

function click_go_home()
{
  router.push({path:"/home"});
}

function open_new_file_dialog()
{
  NewFolderDialogVisible.value=true;
}

function confirm_create_folder(folder_name)
{
  store.commit("set_have_confirmed_create_folder",true);
  axios.get("/create_folder", {
    params: {
      user_name: cookie.get("user_name"),
      folder_name:folder_name,
      path:store.state.current_path_for_create_folder_function
    }
  }).then(function (response) {
    if (!response.data)//////java返回null，浏览器为undefined
    {  ElMessage({
      message: '创建失败',
      type: 'error',
    })
    } else {
      ElMessage({
        message: '创建成功',
        type: 'success',
      })
      NewFolderDialogVisible.value=false;
    }
  })
  file_name_in_new_folder_dialog.value="新建文件夹";
}

let have_crumbs=ref(false);

const route=useRoute();
watch(()=>route.path,()=>
{
  // console.log(route.path)
  if (route.path.includes("/folder"))
    have_crumbs.value=true;
  else
    have_crumbs.value=false;
}), { immediate: true, deep: true }

onMounted(()=>
{
  if (route.path.includes("/folder"))
    have_crumbs.value=true;
  else
    have_crumbs.value=false;
})


function change_to_big_icon_mode()
{
  store.state.enable_big_icon_mode=true;
}

function change_to_list_mode()
{
  store.state.enable_big_icon_mode=false;
}


</script>





<style scoped>

/*.fileTable*/
/*{*/
/*  !*border-collapse: separate;*!*/
/*  !*border-spacing: 10px;*!*/
/*  !*margin-left: 20px;*!*/
/*  width: 100%;*/
/*  !*table-layout: fixed;*!*/
/*  border-collapse: collapse;*/
/*  border-spacing: 0;*/
/*  !*overflow: hidden;*!*/
/*}*/
.table_area
{
  transition: all 0.5s;
  cursor: pointer;
}

.table_area:hover
{
  background-color: #1f1f22;
}

.file_infor_td
{
  color: #a6a5a5;
  height: 55px;
  border-top: #1f1f23 solid 1px;
}
.file_icon
{
  margin-right: 10px;
  height: 40px;
  width: 40px;
  vertical-align: -90%;
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

.display_mode_change_button
{
  transition: all 0.5s;
}

.display_mode_change_button:hover
{
  background-color: #3e3e41;
}

/deep/ .el-dropdown-menu__item:not(.is-disabled):focus {
  border-radius: 5px;
  background-color: #313131;
}

</style>
