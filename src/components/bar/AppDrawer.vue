<template>
  <!--导航抽屉-->
  <v-navigation-drawer
      src="http://img.yangcc.top/image1.jpg"
      :dark="barColor !== 'rgba(228, 226, 226, 1)'"
      app
      v-model="this.$store.state.drawer"
      bottom
      :mini-variant="this.$store.state.mini"
      :permanent="this.$store.state.permanent">
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
          <strong>会议审批系统</strong>
        </v-list-item-title>
        <v-divider class="mt-5"/>
      </v-list-item-content>
    </v-list-item>

    <!--下方列表-->
    <v-list dense nav >
      <v-list-item
          v-for="item in this.$store.state.user_items"
          :key="item.title"
          link
          :to="item.link"
          @click="this.$store.state.title=item.title"
          color="green"
      >
        <v-tooltip right >
          <template v-slot:activator="{ on, attrs }">
            <v-icon small
                    color="white"
                    class="mr-3"
                    v-bind="attrs"
                    v-on="on">
              {{ item.icon }}</v-icon>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title >{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppDrawer",
  data(){
    return{
      barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
      // 用户导航相关
      user_menu: [
        { title: '我的信息',icon: 'fa fa-home',link:'/2' },
        { title: '退出' ,icon: 'fa fa-home',link:'/3' },
      ],
    };
  },
  methods:{
  
  },
}
</script>

<style scoped>

</style>