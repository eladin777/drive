import { createApp } from 'vue'
import App from './App.vue'
import { useRouter } from 'vue-router'

import router from './router'


import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'



import 'element-plus/theme-chalk/dark/css-vars.css'
import axios from 'axios'

import uploader from 'vue-simple-uploader'
import 'vue-simple-uploader/dist/style.css'

import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import VueLazyload from 'vue-lazyload'

const app=createApp(App);


app.use(ElementPlus, {
  locale: zhCn,
})



app.use(store);
app.use(router);

app.use(uploader);

app.use(VueVideoPlayer);

app.use(VueViewer);
app.use(VueLazyload);

app.config.globalProperties.axios = axios

axios.defaults.baseURL='http://localhost:8081/'
// app.config.globalProperties.$http = axios

app.mount('#app');


// axios封装
//
// const instance = axios.create({
//   baseURL: 'https://localhost:8080',
//   timeout: 1000,
//   // useTokenAuthorization:true
// });

// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });
//
// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });
// // axios封装
//
// export default axios;
