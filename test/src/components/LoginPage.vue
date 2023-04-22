
<template>
  <keep-alive>
    <canvas id="background"></canvas>
  </keep-alive>

  <img src="../assets/logo.png" style="height: 3%;width: 3%;vertical-align:middle">
  <h2 id="login-title">我的网盘</h2>


   <router-view></router-view>


</template>

<script setup>

import  '../script/login-background/background.js'
// import { ref } from 'vue'
// import {reactive} from "vue";
// import axios from 'axios'
// import md5 from 'js-md5'
// import router from "@/router";

// import loginForm from "@/components/LoginForm";

// 引入axios接口
// import {login} from "@/axios-api/login.js";




// ////强制只刷新一次页面,因canvas动画在路由跳转后不显示
// if (location.href.indexOf("#reloaded") == -1) {
//   location.href = location.href + "#reloaded";
//   location.reload();
// }



</script>

<style scoped>

#background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
}

#login-title{
  color: #5ed961;
  font-size: 200%;
  /*margin-left: 2%;*/
  /*margin-left: 40%;*/
  display: inline-block;
}

</style>
