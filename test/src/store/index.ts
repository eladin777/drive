import { createStore } from 'vuex'

export default createStore({
  state: {
    SideBar_isOpen:true,


    crumbs_path:[], //保存文件路径面包屑信息


    enable_big_icon_mode:false, //表示启用大图标显示模式

    current_path_for_create_folder_function:"",
    have_confirmed_create_folder:false,

    simple_uploader_enable_folder_upload_button:true,

    current_page:"",

    video_file_path:"",
    VideoDialogVisible:false,

    video_name:"",

    current_upload_path:"",    //代表上传文件的目标路径


    check_current_path_and_upload_path:"",
    one_file_has_been_uploaded:false,


    sort_state:"file_name_asc"



  },
  getters: {
    // getSideBar_isOpen(state)
    // {
    //   return state.SideBar_isOpen;
    // }
  },
  mutations: {  // 修改状态值的方法
    // 改变菜单是否折叠状态
    setSideBar_isOpen(state,payload)
    {
      state.SideBar_isOpen=payload;
    },
    set_crumbs_path(state,val)
    {
      state.crumbs_path=val;
    },
    set_current_path_for_create_folder_function(state, val)
    {
      state.current_path_for_create_folder_function=val;
    },
    set_have_confirmed_create_folder(state,val)
    {
      state.have_confirmed_create_folder=val;
    },
    set_simple_uploader_enable_folder_upload_button(state,val)
    {
      state.simple_uploader_enable_folder_upload_button=val;
    },
    set_current_page(state,val)
    {
      state.current_page=val;
    },
    set_video_file_path(state,val)
    {
      state.video_file_path=val;
    },
    set_VideoDialogVisible(state,val)
    {
      state.VideoDialogVisible=val;
    },
    set_video_name(state,val)
    {
      state.video_name=val;
    },
    set_current_upload_path(state,val)
    {
      state.current_upload_path=val;
    },
    set_sort_state(state,val)
    {
      state.sort_state=val;
    },
    set_check_current_path_and_upload_path(state,val)
    {
      state.check_current_path_and_upload_path=val;
    },
    set_one_file_has_been_uploaded(state,val)
    {
      state.one_file_has_been_uploaded=val;
    },
  },
  actions: {
  },
  modules: {
  }
})
