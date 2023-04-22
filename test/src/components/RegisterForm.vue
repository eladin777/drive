<template>
  <el-form  id="login-form" label-position="top">


    <el-form-item  label="用户名" class="label" style="margin-top: 60%" >
      <el-input type="text" v-model="form.name"  class="name-password"  ></el-input>
    </el-form-item>

    <el-form-item label="密码" class="label" style="margin-bottom: 40px">
      <el-input v-model="form.password" class="name-password" clearable show-password ></el-input>
    </el-form-item>

    <!--        <el-checkbox v-model="checked" label="保存密码" size="large" />-->

    <el-form-item>
      <button type="button" class="btn register" @click="click_register" >注册</button>
    </el-form-item>

    <el-divider style="width: 80%;" />

    <button type="button" class="btn2 login" @click="go_to_login">登录</button>

  </el-form>
</template>

<script setup>
import {reactive} from "vue";
import router from "@/router";
import axios from "axios";
import {ElMessage} from "element-plus";

// const checked = ref(false)

const form=reactive({
  name:'',
  password:''
})

const user_exist_alert = () => {
  ElMessage.error({
    type:'error',
    message:"用户已存在"
  });
}

const success_register_alert = () => {
  ElMessage({
    message:"注册成功",
    duration:9000,
    type:'success'
  });
}

function go_to_login()
{
  router.push("/login_page/l");
}

function click_register()
{
  axios.get("/register_check", {
    params:
    {
      username: form.name
    }
  }).then(function (response) {
    if(response.data===false)
    {
      user_exist_alert();
    }
    else if(response.data!==false)
    {
      axios.get("/register",{
        params:
            {
              username:form.name,
              password:form.password
            }
      }).then(function (response)
      {
        if(response.data!==false)
        {
          success_register_alert();
          router.push("/login_page/l");
        }
      })
    }
  })
}

</script>

<style scoped>


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
.register {
  color: #17dc21;
  width: 80%;
  height: 60%;
  border-radius: 5px;
  /*margin-left: 0%;*/
}
.register:hover {
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
.login {
  width: 80%;

  color: white;


  border-radius: 5px;
  /*margin-left: 0%;*/
}



</style>
