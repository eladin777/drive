<template>
  <keep-alive>
    <canvas id="background"></canvas>
  </keep-alive>
  <div id="password_form"  >
    <span style="position: fixed;margin-top: 30px;color: #dedede;font-size: 20px;margin-left: 150px">{{user_name}}的分享</span>
    <span style="top: 55%;position: relative;font-size: 14px;color: #e1e1e1;">请输入提取码</span>
    <el-input   size="large" type="text"  v-model="password" clearable style="--el-input-focus-border-color: #569b3f;width: 80%;top: 60%"/>
    <el-button type="success" v-on:click="check_password" style="top: 60%;position: relative;margin-left: 10px" >确定</el-button>
  </div>
 </template>

<script setup>
import  '../script/login-background/background.js'
import {ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import router from "@/router";
import cookie from "js-cookie";
let password=ref("");
let route=useRoute();
let user_name=ref("")

function check_password()
{
  axios.get("/check_share_password", {
    params: {
      uuid:route.params.path,
      password:password.value
    }
  }).then(function (response) {
    if (response.data.length===0)//////java返回null，浏览器为undefined
    {
      ElMessage({
        message: '密码错误',
        type: 'error',
        customClass:'message'
      })
      // error_password_alert();
    } else {
      router.push({path:"/share/"+route.params.path+"/"+password.value});
    }
  })

}

axios.get("/shared_page", {
  params: {
    uuid:route.params.path
  }

}).then(function (response) {
  if (!response.data)//////java返回null，浏览器为undefined
  {
    // error_password_alert();
  } else {
    // file_list.file_data = response.data;
    user_name.value=response.data[0].user_name;
  }
})


</script>

<style scoped>
#background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
}
#password_form{

  margin: auto;
  width:400px;
  height:300px;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  backdrop-filter: blur(60px);


  position: fixed;
  top:0;
  left:0;
  bottom:0;
  right: 0;

}
</style>

<style>
/*bug element plus 输入框选中没有蓝色背景!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
.el-input__inner::selection {
  background-color: #30b92b !important;
  color: #fff !important;
}
</style>
