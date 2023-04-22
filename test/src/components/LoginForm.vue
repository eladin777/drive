

<template>

<!--  <el-button :plain="true" @click="error_password_alert">error</el-button>-->

  <el-form  id="login-form" label-position="top">

    <el-form-item  label="用户名" class="label" style="margin-top: 60%" >
      <el-input type="text" v-model="form.form_data.name"  class="name-password"  ></el-input>
    </el-form-item>

    <el-form-item label="密码" class="label" style="margin-bottom: 0">
      <el-input v-model="form.form_data.password" class="name-password" clearable show-password ></el-input>
    </el-form-item>

    <el-checkbox v-model="checked" label="保存密码" size="large" />

    <el-form-item>
      <button type="button" class="btn login" @click="click_login">登录</button>
    </el-form-item>

    <el-divider style="width: 80%;" />

    <button type="button" class="btn2 register" @click="go_to_register">注册</button>

  </el-form>

</template>


<script setup>


import {reactive, ref} from "vue";
import axios from "axios";
import router from "@/router";
import { ElMessage } from 'element-plus'
import cookie from "js-cookie"

const error_password_alert = () => {
  ElMessage.error({
      type:'error',
      message:"用户名或密码错误"
      });
}

const checked = ref(false)

const form=reactive({
  form_data:{
    name:'',
    password:''
  }
})




function go_to_register()
{
  router.push("/login_page/r");
}

function click_login()
{
  axios.get("/login", {
    params:form.form_data
// username: form.name,
// password: form.password

// data:{
//   username: form.name,
//   password: form.password
// }
  }).then(function (response) {
    if(!response.data)//////java返回null，浏览器为undefined
    {
      error_password_alert();
    }
    else
    {
      localStorage.setItem("user-token",response.data.token);
      cookie.set("user_name",response.data.name,{ expires: 1 });
      router.push({path:"/home"});
    }
    console.log(response.data);
  })
}
</script>



<style scoped>
.label
{
  --el-form-label-font-size: 14px
  /*--el-descriptions-item-bordered-label-background: green;*/
}

.btn {
  border: 0px;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 15px;
  padding: 5px 10px;
  font-weight: 300;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -ms-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
  /*margin-right: 5px;*/
  margin-bottom: 0px;
}
.btn:hover {
  color: white;
  cursor: pointer;
}
.login {
  color: #17dc21;
  width: 80%;
  height: 60%;
  border-radius: 5px;
  /*margin-left: 0%;*/
}
.login:hover {
  border-color: #1bd92c;
  background-color: #1bd92c;
  -webkit-box-shadow: 10px 10px 99px 6px rgb(20, 196, 30);
  -moz-box-shadow: 10px 10px 20px 6px rgb(20, 196, 30);
  box-shadow: 10px 10px 99px 20px rgb(20, 196, 30);
}
.btn2 {
  border: 0px;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 14px;
  /*padding: 5px 10px;*/
  font-weight: 300;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -ms-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
  /*margin-right: 5px;*/
}
.btn2:hover {
  color: #17dc21;
  cursor: pointer;
}
.register {
  width: 80%;

  color: white;


  border-radius: 5px;
  /*margin-left: 0%;*/
}




#login-form{
  width: 35%;

  backdrop-filter: blur(60px);

  padding: 3.5%;

  height: 100%;

  position: fixed;  top:0;
  left:0;
  bottom:0;
  right: 0;
  margin-left: 65%;
}

.name-password
{
  border-radius: 20px;
  /*position:relative;*/
  width:80%;
  height: 40%;
  /*margin: 0 0 2% 0;*/
}



</style>
