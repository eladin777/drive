<template>


  <SideBar/>

  <home-explorer></home-explorer>

  <!--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  视频对话框-->
  <el-dialog id="video_dialog" destroy-on-close v-model="store.state.VideoDialogVisible" :center="true" :align-center="true" :fullscreen="true" :width="50" :title="store.state.video_name"  class="EditNameDialog" style="border-radius: 15px">
    <div style="height: 70%;width: 60%;padding-left: 20%;position: fixed">
      <VideoPlayer id="myVideoPlayer"></VideoPlayer>
    </div>
  </el-dialog>
  <!--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 视频对话框 -->



</template>

<script setup>
// import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";


import SideBar from "@/components/SideBar";
import HomeExplorer from "@/components/HomeExplorer";
import store from "@/store";
import VideoPlayer from "@/components/VideoPlayer";

</script>



<style scoped>

</style>
