<template>
  <v-app>
    <!--顶部导航-->
    <v-app-bar app flat hide-on-scroll  absolute   >
      <v-app-bar-nav-icon @click="permanent=!permanent;mini=!mini"/>
      <v-list-item-title class="body-1 ml-3">{{ title }}</v-list-item-title>
      <v-spacer/>
      <!--消息盒子-->
      <v-menu   offset-y
                :close-on-content-click="false">
        <!--消息盒子的按钮-->
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small large
                 v-bind="attrs"
                 v-on="on"
                 class="mr-5">
            <v-badge dot left color="pink">
              <i class="fa fa-bell-o fa-lg"></i>
            </v-badge>
          </v-btn>
        </template>
        <!--点击要展开的数据-->
        <v-list width="400">
          <!--顶部按钮-->
          <v-list-item>
            <v-btn small elevation="0">查看已读消息({{readMessageNum}})</v-btn>
            <v-spacer/>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn small large icon>
                  <i v-bind="attrs" v-on="on" class="fa fa-envelope-open"></i>
                </v-btn>
              </template>
              <span>全部标记为已读</span>
            </v-tooltip>
          </v-list-item>
          <v-divider/>
          <!--下部分消息内容-->
          <v-virtual-scroll
              :items="items"
              height="300"
              item-height="64"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item">
                <v-list-item-content>
                  <v-list-item-title>
                    User Database Record <strong>ID {{ item }}</strong>
                  </v-list-item-title>
                </v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn small large icon>
                      <i v-bind="attrs" v-on="on" class="fa fa-envelope-open"></i>
                    </v-btn>
                  </template>
                  <span>标记为已读</span>
                </v-tooltip>
              </v-list-item>

              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-list>
      </v-menu>


      <!--个人信息-->
      <v-menu offset-y  transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
              v-bind="attrs"
              v-on="on"
              size="30">
            <v-img src="http://img.yangcc.top/header.jpg" alt="Avatar"/>
          </v-avatar>
        </template>
        <v-list dense>
          <v-list-item @click="myInfo">
            <v-icon small class=mr-3>fa fa-pencil-square-o</v-icon>
            <span class="body-2">我的信息</span>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="signOut">
            <v-icon small class=mr-3>fa fa-sign-out</v-icon>
            <span class="body-2">退出</span>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!--导航抽屉-->
    <v-navigation-drawer
        src="http://img.yangcc.top/image1.jpg"
        :dark="barColor !== 'rgba(228, 226, 226, 1)'"
        app
        v-model="drawer"
        :mini-variant="mini"
        :permanent="permanent">
      <template v-slot:img="props">
        <v-img
            :gradient="`to bottom, ${barColor}`"
            v-bind="props"
        />
      </template>
      <!--上方标题-->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-center mt-3 text-h6">
            <strong>高校会议审批</strong>
          </v-list-item-title>
          <v-divider class="mt-5"/>
        </v-list-item-content>
      </v-list-item>

      <!--路由列表-->
      <v-list  nav>
        <div v-for="item in  menuList" :key="item.id">
          <!--如果没有子路由-->
          <div v-if="item.items.length===0">
            <v-list-item
                @click="title = item.title"
                :to="item.path"
                active-class="success white--text"
                color="success"
            >
              <!--二级icon-->
              <v-icon
                  small
                  color="white"
                  class="mr-3">{{ item.icon }}</v-icon>
              <v-list-item-content
                  class="white--text">
                {{item.title}}
              </v-list-item-content>
            </v-list-item>
          </div>
          <!--如果有子路由-->
          <div v-else>
            <v-list-group
                @click="title = item.title"
                append-icon="mdi-menu-up"
                color="success"
            >
              <!--icon-->
              <template v-slot:activator>
                <v-icon
                    small
                    color="white"
                    class="mr-3">
                  {{item.icon}}
                </v-icon>
                <!--title-->
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>
              <!--二级菜单-->
              <v-list-item
                  @click="title = item.title +' > '+subItem.title "
                  v-for="subItem in item.items"
                  :key="subItem.id"
                  :to="item.path + subItem.path"
                  active-class="success white--text"
                  color="success"
                  dense
              >
                <!--二级icon-->
                <v-icon
                    small
                    color="white"
                    class="mr-3 ml-5">{{ subItem.icon }}</v-icon>
                <v-list-item-content
                    class="white--text">
                  {{subItem.title}}
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>


    <!--主页-->
    <v-main app>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Index",
  data(){
    return{
      // 导航相关
      drawer: true,
      mini: false,     // 默认不是mini
      permanent:true,  // 默认是侧栏展开
      title: "首页", // 默认首页
      //后台拿到的列表
      menuList: [
        { id:'1',title: '首页', icon: 'fa fa-home',path:'/home',items: []},
        { id:'2',title: '会议管理', icon: 'fa fa-briefcase',path:'/meeting',
          items:[
            {title: '会议列表', icon: 'fa fa-briefcase',path:'/meetingList' },
            {title: '会议室列表', icon: 'fa fa-home',path:'/meetingRoomList' },
            {title: '院系列表', icon: 'fa fa-university',path:'/facultyList' },
          ]},
        { id:'3',title: '用户管理', icon: 'fa fa-users',path:'/user',
          items:[
            {title: '角色列表', icon: 'fa fa-address-book-o',path:'/roleList'},
            {title: '用户列表', icon: 'fa fa-users',path:'/userList'},
            {title: '管理员列表', icon: 'fa fa-user-circle-o',path:'/adminList'},
          ]},
        { id:'4', title: '消息管理', icon: 'fa fa-comments',path:'#',items:[]},
        { id:'5',title: '我的', icon: 'fa fa-user-circle-o',path: '/my',
          items:[
            {title: '我的会议', icon: 'fa fa-pencil-square',path: '/myMeeting' },
            {title: '我的消息', icon: 'fa fa-commenting',path: '/myMessage' },
            {title: '我的信息', icon: 'fa fa-address-card-o',path: '/myInfo'},
          ]},
      ],
      // 用户消息相关
      readMessageNum: 1,
      unreadMessageNum: 10,
      barColor: 'rgba(0, 0, 0, 0.7), rgba(0, 0, 0,0.7)',
      items: [],
      // 用户导航相关
      user_menu: [
        { title: '我的信息',icon: 'fa fa-home'},
        { title: '退出' ,icon: 'fa fa-home'},
      ],
    };
  },
  created() {
    this.initMenu();
  },
  methods:{
    //获取菜单信息
    initMenu(){
      this.$axios.post("/menu/findAllMenu").then((res)=>{
        if (res.data.code===200){
          this.$store.commit("setMenuList",res.data.data);
        }
      });
    },
    //我的信息
    myInfo(){

    },
    //登出
    signOut(){

    },
  },
}
</script>

<style scoped>
</style>