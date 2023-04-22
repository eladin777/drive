
<template>
  <div class="sidebar" :class="isOpened ? 'open' : ''" :style="cssVars">

    <div class="logo-details" style="margin: 6px 14px 0 14px;">
      <img class="icon" src="../assets/logo.png" style="vertical-align: -70%;height: 30px;width: 30px"/>
      <div class="logo_name" >
        {{ menuTitle }}
      </div>
<!--&lt;!&ndash;      折叠按钮&ndash;&gt;-->
<!--      <i style="left: 100%;display: flex"-->
<!--          class="bx"-->
<!--          :class="isOpened ? 'bi bi-caret-left' : 'bi bi-caret-right'"-->
<!--          id="btn"-->
<!--          @click="isOpened = !isOpened"-->
<!--      />-->
    </div>

    <div style="display: flex ; flex-direction:column; justify-content: space-between; flex-grow: 1; max-height: calc(100% - 60px); ">
      <div
          id="my-scroll"
          style="margin: 6px 14px 0 14px;"
      >
        <ul
            class="nav-list"
            style="overflow: visible;"
        >
<!--          <li-->
<!--              v-if="isSearch"-->
<!--              @click="isOpened = true"-->
<!--          >-->
<!--            <i class="bx bx-search" />-->
<!--            <input-->
<!--                type="text"-->
<!--                :placeholder="searchPlaceholder"-->
<!--                @input="$emit('search-input-emit', $event.target.value)"-->
<!--            >-->
<!--            <span class="tooltip">{{ searchTooltip }}</span>-->
<!--          </li>-->

<!--          <span v-for="(menuItem, index) in menuItems"  :key="index">-->

<!--            <li >-->
<!--              <a href="menuItem.link" style="height: 40px;" >&lt;!&ndash;/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!这里设置选项高度*/&ndash;&gt;-->


<!--                <i class="bi" :class="menuItem.icon" />-->
<!--                <span class="links_name">{{ menuItem.name }}</span>-->

<!--              </a>-->
<!--&lt;!&ndash;              <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>&ndash;&gt;-->
<!--            </li>-->

<!--          </span>-->
          <span >

            <li>
                <router-link id="all_file_selection" to="/home" style="height: 40px;"  ><!--/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!这里设置选项高度*/-->

                <svg fill="currentColor" style="width: 20px;height: 20px;color: #949494;margin-left: 10px;margin-right: 20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 64C0 28.65 28.65 0 64 0H220.1C232.8 0 245.1 5.057 254.1 14.06L369.9 129.9C378.9 138.9 384 151.2 384 163.9V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM352 192H240C213.5 192 192 170.5 192 144V32H64C46.33 32 32 46.33 32 64V448C32 465.7 46.33 480 64 480H320C337.7 480 352 465.7 352 448V192zM347.3 152.6L231.4 36.69C229.4 34.62 226.8 33.18 224 32.48V144C224 152.8 231.2 160 240 160H351.5C350.8 157.2 349.4 154.6 347.3 152.6z"/></svg>
                <span class="links_name">所有文件</span>

              </router-link>
              <!--              <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>-->
            </li>

            <li  >
                <router-link to="/bin" style="height: 40px;"  ><!--/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!这里设置选项高度*/-->

                 <svg fill="currentColor" style="width: 20px;height: 20px;color: #949494;margin-left: 10px;margin-right: 20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M144 400C144 408.8 136.8 416 128 416C119.2 416 112 408.8 112 400V176C112 167.2 119.2 160 128 160C136.8 160 144 167.2 144 176V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V176C208 167.2 215.2 160 224 160C232.8 160 240 167.2 240 176V400zM336 400C336 408.8 328.8 416 320 416C311.2 416 304 408.8 304 400V176C304 167.2 311.2 160 320 160C328.8 160 336 167.2 336 176V400zM310.1 22.56L336.9 64H432C440.8 64 448 71.16 448 80C448 88.84 440.8 96 432 96H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V96H16C7.164 96 0 88.84 0 80C0 71.16 7.164 64 16 64H111.1L137 22.56C145.8 8.526 161.2 0 177.7 0H270.3C286.8 0 302.2 8.526 310.1 22.56V22.56zM148.9 64H299.1L283.8 39.52C280.9 34.84 275.8 32 270.3 32H177.7C172.2 32 167.1 34.84 164.2 39.52L148.9 64zM64 432C64 458.5 85.49 480 112 480H336C362.5 480 384 458.5 384 432V96H64V432z"/></svg>
                  <span class="links_name">回收站</span>

              </router-link>
                   <!--              <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>-->
            </li>

               <li  >
                <router-link to="/share_management" style="height: 40px;"  ><!--/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!这里设置选项高度*/-->

                  <svg fill="currentColor" style="width: 20px;height: 20px;color: #949494;margin-left: 12px;margin-right: 18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M400 352c-8.836 0-16 7.164-16 16v79.1C384 465.7 369.7 480 352 480H64c-17.67 0-32-14.33-32-32V160c0-17.67 14.33-32 32-32h112C184.8 128 192 120.8 192 112S184.8 96 176 96H64C28.65 96 0 124.7 0 160v287.1c0 35.34 28.65 64 64 64L352 512c35.35 0 64-28.66 64-64v-80C416 359.2 408.8 352 400 352zM570.3 131.7l-160-127.1c-6.75-5.656-16.84-4.781-22.53 2.031c-5.656 6.781-4.75 16.88 2.031 22.53L515.8 128H368C270.1 128 192 206.1 192 304v32C192 344.8 199.2 352 208 352S224 344.8 224 336v-32C224 224.6 288.6 160 368 160h147.8l-126.1 99.72c-6.781 5.656-7.688 15.75-2.031 22.53C390.9 286 395.4 288 400 288c3.625 0 7.25-1.219 10.25-3.719l160-128C573.9 153.3 576 148.7 576 143.1S573.9 134.8 570.3 131.7z"/></svg>
               <span class="links_name">分享管理</span>

              </router-link>
                 <!--              <span class="tooltip">{{ menuItem.tooltip || menuItem.name }}</span>-->
            </li>

          </span>

        </ul>
      </div>

            <div
              class="profile"
            >
              <div class="profile-details">
<!--                <img-->
<!--                  v-if="profileImg"-->
<!--                  :src="profileImg"-->
<!--                  alt="profileImg"-->
<!--                >-->
<!--                <i-->
<!--                  v-else-->
<!--                  class="bx bxs-user-rectangle"-->
<!--                />-->
                <div class="name_job" style="margin-left: 100px;margin-top: 10px;">
                  <div class="name" style="float: left">
                    {{ profileName }}
                  </div>
                  <router-link to="/login_page/l">
                    <el-tooltip
                        content="登出"
                        effect="light"
                        placement="top">
                      <div style="float:right;margin-top: 7px;margin-left: 25px">
                        <svg fill="currentColor" style="width: 15px;height: 15px;cursor: pointer;color: #919191" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M507.3 244.7l-144-144c-6.25-6.25-16.38-6.25-22.62 0s-6.25 16.38 0 22.62L457.4 240H176C167.2 240 160 247.2 160 256s7.156 16 16 16h281.4l-116.7 116.7c-6.25 6.25-6.25 16.38 0 22.62s16.38 6.25 22.62 0l144-144C510.4 264.2 512 260.1 512 256S510.4 247.8 507.3 244.7zM176 448h-96C53.53 448 32 426.5 32 400v-288C32 85.53 53.53 64 80 64h96C184.8 64 192 56.84 192 48S184.8 32 176 32h-96C35.88 32 0 67.88 0 112v288C0 444.1 35.88 480 80 480h96C184.8 480 192 472.8 192 464S184.8 448 176 448z"/></svg>
                      </div>
                    </el-tooltip>
                  </router-link>


<!--                  <div class="job">-->
<!--                    {{ profileRole }}-->
<!--                  </div>-->
                </div>
              </div>

<!--              <i-->
<!--                v-if="isExitButton"-->
<!--                class="bx bx-log-out"-->
<!--                id="log_out"-->
<!--                @click.stop="$emit('button-exit-clicked')"-->
<!--              />-->
            </div>
    </div>


    <!--      折叠按钮-->

    <div @mouseover="hover=true" @mouseleave="hover = false">
      <div v-show="!hover" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 64 512" width="30" height="30" style="color: #19bb4d;left: 100%;position: absolute;top:45%;cursor: pointer;transition: 1s">
          <path  d="M32 512c-17.67 0-32-14.33-32-32V32c0-17.67 14.33-32 32-32s32 14.33 32 32v448C64 497.7 49.67 512 32 512z"/>
        </svg>
      </div>

      <div v-show="hover">

        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512" width="30" height="30" style="color: #19bb4d;left: 98%;position: absolute;top:45%;cursor: pointer;" v-show="isOpened" @click="isOpened = !isOpened">
          <!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/>
        </svg>


        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"  fill="currentColor" width="30" height="30" style="color: #19bb4d;left: 98%;position: absolute;top:45%;cursor: pointer;" v-show="!isOpened" @click="isOpened = !isOpened">
          <!--! Font Awesome Pro 6.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/>
        </svg>

<!--        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"-->
<!--             class="bi bi-chevron-compact-left"-->
<!--             viewBox="0 0 16 16" style="left: 97%;position: absolute;top:45%;cursor: pointer;color: #22dd47" v-show="isOpened" @click="isOpened = !isOpened">-->

<!--          <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>-->
<!--        </svg>-->
<!--        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
             class="bi bi-chevron-compact-right"
             viewBox="0 0 16 16" style="left: 95%;position: absolute;top:45%;cursor: pointer;color: #5ed961" v-show="!isOpened" @click="isOpened = !isOpened">

          <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
        </svg>-->

      </div>


    </div>



  </div>






    </template>

    <script>
    import cookie from "js-cookie";
    import store from "@/store";

    export default {
      name: 'SideBar',
      props: {
        //! Menu settings
        isMenuOpen: {
          type: Boolean,
          default: true,
        },
        menuTitle: {
          type: String,
          default: 'loivgehoto的盘',
        },
        menuLogo: {
          type: String,
          default: '',
        },
        menuIcon: {
          type: String,
          default: 'bxl-c-plus-plus',
        },
        isPaddingLeft: {
          type: Boolean,
          default: true,
        },
        menuOpenedPaddingLeftBody: {
          type: String,
          default: '270px'
        },
        menuClosedPaddingLeftBody: {
          type: String,
          default: '32px'
        },
//////////////////折叠菜单的右侧边距设置



        //! Menu items
        menuItems: {
          type: Array,
          default: () => [
            {
              link: '/about',
              name: '所有文件',
              tooltip: 'Dashboard',
              icon: 'bi-file-earmark',
            },
            {
              link: '',
              name: '回收站',
              tooltip: 'User',
              icon: 'bi-trash',
            },
            {
              link: '',
              name: '分享',
              tooltip: 'Messages',
              icon: 'bi-share',
            },
            // {
            //   // link: '',
            //   name: 'Analytics',
            //   tooltip: 'Analytics',
            //   icon: 'bx-pie-chart-alt-2',
            // },
            // {
            //   // link: '',
            //   name: 'File Manager',
            //   tooltip: 'Files',
            //   icon: 'bx-folder',
            // },
            // {
            //   link: '',
            //   name: 'Order',
            //   tooltip: 'Order',
            //   icon: 'bx-cart-alt',
            // },
            // {
            //   link: '#',
            //   name: 'Saved',
            //   tooltip: 'Saved',
            //   icon: 'bx-heart',
            // },
            // {
            //   link: '#',
            //   name: 'Setting',
            //   tooltip: 'Setting',
            //   icon: 'bx-cog',
            // },
          ],
        },

        // //! Search
        // isSearch: {
        //   type: Boolean,
        //   default: false,
        // },
        // searchPlaceholder: {
        //   type: String,
        //   default: 'Search...',
        // },
        // searchTooltip: {
        //   type: String,
        //   default: 'Search',
        // },

        //! Profile detailes
        // profileImg: {
        //   type: String,
        //   default: require('../assets/img/photo.jpg'),
        // },
        profileName: {
          type: String,
          default: cookie.get("user_name")
        },
        profileRole: {
          type: String,
          default: 'Frontend vue developer',
        },
        isExitButton: {
          type: Boolean,
          default: true,
        },

        //! Styles
        bgColor: {
          type: String,
          default: '#171717',
        },
        secondaryColor: {
          type: String,
          default: '#171717',
        },
        homeSectionColor: {
          type: String,
          default: '#e4e9f7',
        },
        logoTitleColor: {
          type: String,
          default: '#c2c2c2',
        },
        iconsColor: {
          type: String,
          default: '#cbcbcb',
        },
        itemsTooltipColor: {
          type: String,
          default: '#e4e9f7',
        },
        searchInputTextColor: {
          type: String,
          default: '#fff',
        },
        menuItemsHoverColor: {
          type: String,
          default: '#343333',
        },
        menuItemsTextColor: {
          type: String,
          default: '#eeeeee',
        },
        menuFooterTextColor: {
          type: String,
          default: '#fff',
        },
      },
      data() {
        return {
          isOpened: false,
          hover:false
        }
      },
      mounted() {
        this.isOpened = this.isMenuOpen

        // store.commit('setSideBar_isOpen',this.isOpened);        // vuex菜单是否折叠属性

      },
      computed: {
        cssVars() {
          return {
            '--padding-left-body': this.isOpened ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody,
            '--bg-color': this.bgColor,
            '--secondary-color': this.secondaryColor,
            '--home-section-color': this.homeSectionColor,
            '--logo-title-color': this.logoTitleColor,
            '--icons-color': this.iconsColor,
            '--items-tooltip-color': this.itemsTooltipColor,
            '--serach-input-text-color': this.searchInputTextColor,
            '--menu-items-hover-color': this.menuItemsHoverColor,
            '--menu-items-text-color': this.menuItemsTextColor,
            '--menu-footer-text-color': this.menuFooterTextColor,
          }
        },
      },
      watch: {
        isOpened() {
          window.document.body.style.paddingLeft = this.isOpened && this.isPaddingLeft ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody;
          store.commit('setSideBar_isOpen',this.isOpened);        // vuex菜单是否折叠属性
        },
      }
    }
    </script>

    <style>
    /* Google Font Link */
    /*@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');*/
    /*@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');*/
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");
    * {
      /*margin: 0;*/
      /*padding: 0;*/
      /*box-sizing: border-box;*/

      /*font-family: 'Poppins', sans-serif;*/
    }
    #all_file_selection:focus
    {
      background-color: #3a3a3a;
    }
    body {
      transition: all 0.5s ease;
    }
    .menu-logo {
      width: 30px;
      margin: 0 10px 0 10px;
    }
    .sidebar {
      position: relative;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      min-height: min-content;
      /* overflow-y: auto; */
      width: 0px;
      background: var(--bg-color);
      /* padding: 6px 14px 0 14px; */
      z-index: 99;
      transition: all 0.5s ease;

    }
    .sidebar.open {
      width: 240px;
    }
    .sidebar .logo-details {
      height: 60px;
      display: flex;
      align-items: center;
      position: relative;
    }
    .sidebar .logo-details .icon {
      opacity: 0;
      transition: all 0.2s ease;
    }
    .sidebar .logo-details .logo_name {

      white-space: nowrap;
      /*大标题文字强制不换行*/

      color: var(--logo-title-color);
      font-size: 15px;
      font-weight: 600;
      opacity: 0;
      transition: all 0.2s ease;
    }
    .sidebar.open .logo-details .icon,
    .sidebar.open .logo-details .logo_name {
      opacity: 1;
    }
    .sidebar .logo-details #btn {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      font-size: 22px;
      transition: all 0.4s ease;
      font-size: 23px;
      text-align: center;
      cursor: pointer;
      transition: all 0.5s ease;
    }
    .sidebar.open .logo-details #btn {
      text-align: right;
    }
    .sidebar i {
      color: var(--icons-color);
      height: 60px;
      min-width: 50px;
      font-size: 28px;
      text-align: center;
      line-height: 60px;
    }
    .sidebar .nav-list {
      margin-top: 20px;
      /* margin-bottom: 60px; */
      /* height: 100%; */
      /* min-height: min-content; */
    }
    .sidebar li {
      position: relative;
      /*margin: 8px 0;*/
      margin-bottom: 5px;
      margin-left: -40px;
      list-style: none;
    }



    .sidebar li .tooltip {
      position: absolute;
      top: -20px;
      left: calc(100% + 15px);
      z-index: 3;
      background: var(--items-tooltip-color);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 400;
      opacity: 0;
      white-space: nowrap;
      pointer-events: none;
      transition: 0s;
    }
    .sidebar li:hover .tooltip {
      opacity: 1;
      pointer-events: auto;
      transition: all 0.4s ease;
      top: 50%;
      transform: translateY(-50%);
    }
    .sidebar.open li .tooltip {
      display: none;
    }
    .sidebar input {
      font-size: 15px;
      color: var(--serach-input-text-color);
      font-weight: 400;
      outline: none;
      height: 50px;
      width: 100%;
      width: 50px;
      border: none;
      border-radius: 12px;
      transition: all 0.5s ease;
      background: var(--secondary-color);
    }
    .sidebar.open input {
      padding: 0 20px 0 50px;
      width: 100%;
    }
    .sidebar .bx-search {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      font-size: 22px;
      background: var(--secondary-color);
      color: var(--icons-color);
    }
    .sidebar.open .bx-search:hover {
      background: var(--secondary-color);
      color: var(--icons-color);
    }
    .sidebar .bx-search:hover {
      background: var(--menu-items-hover-color);
      color: var(--bg-color);
    }
    .sidebar li a {
      display: flex;
      /*height: 20%;*/
      width: 100%;
      border-radius: 7px;
      align-items: center;
      text-decoration: none;
      transition: all 0.4s ease;
      background: var(--bg-color);
    }
    .sidebar li a:hover {
      background: var(--menu-items-hover-color);
      /*height: 10%;*/
    }
    .sidebar li a .links_name {
      color: var(--menu-items-text-color);
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;

      opacity: 0;
      /*opacity: 1;*/
      /*菜单折叠后标题文字不消失*/


      pointer-events: none;

      transition: 0.5s;
      /*菜单选项的标题过渡速度*/

    }
    .sidebar.open li a .links_name {
      opacity: 1;
      pointer-events: auto;
    }
    .sidebar li a:hover .links_name,
    .sidebar li a:hover i {
      transition: all 0.5s ease;
      /*color: var(--bg-color);*/
      color: var(--menu-items-text-color);
    }

    .sidebar li i {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      border-radius: 12px;
    }
    .sidebar div.profile {
      position: relative;
      height: 80px;
      width: 0px;
      /* left: 0;
      bottom: 0; */
      padding: 0px 0px;
      background: var(--secondary-color);
      border-top: #444844 solid 1px;
      transition: all 0.5s ease;
      overflow: hidden;
    }
    .sidebar.open div.profile {
      width: 240px;
    }
    .sidebar div .profile-details {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }
    .sidebar div img {
      height: 45px;
      width: 45px;
      object-fit: cover;
      border-radius: 6px;
      margin-right: 10px;
    }
    .sidebar div.profile .name,
    .sidebar div.profile .job {
      margin-top: 10px;
      font-size: 15px;
      font-weight: 400;
      color: #989797;
      white-space: nowrap;
    }
    .sidebar div.profile .job {
      font-size: 12px;
    }
    .sidebar .profile #log_out {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      background: var(--secondary-color);
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-radius: 0px;
      transition: all 0.5s ease;
    }
    .sidebar.open .profile #log_out {
      width: 50px;
      background: var(--secondary-color);
      opacity: 0;
    }
    .sidebar.open .profile:hover #log_out {
      opacity: 1;
    }
    .sidebar.open .profile #log_out:hover {
      opacity: 1;
      color: red;
    }
    .sidebar .profile #log_out:hover {
      color: red;
    }
    .home-section {
      position: relative;
      background: var(--home-section-color);
      min-height: 100vh;
      top: 0;
      left: 78px;
      width: calc(100% - 78px);
      transition: all 0.5s ease;
      z-index: 2;
    }
    .sidebar.open ~ .home-section {
      left: 250px;
      width: calc(100% - 250px);
    }
    .home-section .text {
      display: inline-block;
      color: var(--bg-color);
      font-size: 25px;
      font-weight: 500;
      margin: 18px;
    }
    .my-scroll-active {
      overflow-y: auto;
    }
    #my-scroll {
      overflow-y: auto;
      height: calc(100% - 60px);
    }
    #my-scroll::-webkit-scrollbar{
      display:none;
      /* background-color: rgba(255, 255, 255, 0.2);
      width: 10px;
      border-radius:5px  */
    }
    /* #my-scroll::-webkit-scrollbar-thumb{
      background-color: red;
      border-radius:5px
    }
    #my-scroll::-webkit-scrollbar-button:vertical:start:decrement{
      display:none;
    }
    #my-scroll::-webkit-scrollbar-button:vertical:end:increment{
      display:none;
    } */
    @media (max-width: 420px) {
      .sidebar li .tooltip {
        display: none;
      }
    }


    </style>
