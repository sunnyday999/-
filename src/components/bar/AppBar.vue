<template>
  <!--顶部导航-->
  <v-app-bar app flat>
    <v-app-bar-nav-icon @click="init"/>
    <v-list-item-title class="body-1 ml-3">{{ this.$store.state.title }}</v-list-item-title>

    <v-spacer/>
    <!--消息盒子-->
    <v-menu  offset-x offset-y
             transition="slide-y-transition"
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
</template>

<script>
export default {
  name: "AppBar",
  data(){
    return{
      // 用户消息相关
      readMessageNum: 1,
      unreadMessageNum: 10,
    };
  },
  methods:{
    init(){
      this.$store.commit("unPermanent");
      this.$store.commit("unMini");
    },
    /*我的信息*/
    myInfo(){

    },
    /*登出*/
    signOut(){

    },
  },
}
</script>

<style scoped>

</style>