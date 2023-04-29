import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import LoginPage from "@/components/LoginPage.vue";
import axios from "axios";


import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cookie from 'js-cookie'

NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})


const routes= [
  {
    path: "/",
    redirect:"/login_page/l",
    // alias:'/login_page/l'
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/MainPage.vue'),
    children:
    [
      {
        path:"",
        component: () => import(/* webpackChunkName: "about1" */ '../components/HomeFileList.vue')
      },
      {
        path: "folder/:path",
        name: 'folder',
        component: () => import('../components/FolderFileList.vue')
      },
      {
        path:"/bin",
        component: () => import(/* webpackChunkName: "about1" */ '../components/BinFileList.vue')
      },
      {
        path:"/share_management",
        component: () => import(/* webpackChunkName: "about1" */ '../components/ShareManagementPage.vue')
      }
    ]
  },
  {
    path: '/share/:path/:password',
    name: 'share',
    component: () => import(/* webpackChunkName: "about" */ '../components/SharePage.vue'),
  },
  {
    path: '/share2/:path',
    name: 'share2',
    component: () => import(/* webpackChunkName: "about" */ '../components/SharePassword.vue'),
  },
  {
    path: '/login_page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/LoginPage.vue'),
    children:[
      {
        path:"l",
        component: () => import(/* webpackChunkName: "about1" */ '../components/LoginForm.vue')
      },
      {
        path: "r",
        component: () => import(/* webpackChunkName: "about2" */ '../components/RegisterForm.vue')
      }
    ]
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes:routes
})


router.beforeEach((to,from,next)=>{

  NProgress.start();

  // console.log(from.path)

  // if(from.path==="/"||from.path===" ")
  // {
  //   axios({
  //     url:"/check_token",
  //     method:"get",
  //     headers:{
  //       token:window.localStorage.getItem("user-token")
  //     }
  //   }).then((response)=>{
  //     // console.log("token的返回"+response.data);
  //     if(response.data===false)
  //     {
  //       // next({path:"/login_page"});
  //       router.replace({path:"/login_page/l"});
  //     }
  //     else
  //     {
  //       router.replace({path:"/home"});
  //     }
  //   })
  //   next();
  // }

  if(to.path.includes("/login_page/l"))
  {
    window.localStorage.removeItem("user-token");
    cookie.remove("user_name");
    next();
  }
  else if(!window.localStorage.getItem("user-token")&&!to.path.includes("/share/")&&!to.path.includes("/share2/"))
  {
      if(!to.path.includes("/login_page/r"))
         router.replace({path:"/login_page/l"});
      else/////注册页面不跳转
         next();
  }
  else
  {
    if(!to.path.includes("/share/")&&!to.path.includes("/share2/"))
    {
      axios({
        url:"/check_token",
        method:"get",
        headers:{
          token:window.localStorage.getItem("user-token")
        }
      }).then((response)=>{
        // console.log("token的返回"+response.data);
        if(response.data===false)
        {
          // next({path:"/login_page"});
          router.replace({path:"/login_page/l"});
        }
      })
    }
  }
    next();
})

router.afterEach(()=>
{
  NProgress.done();
  // 顶部加载条
})

export default router


