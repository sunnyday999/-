<template>
  <v-app>
    <AppBar/>
    <AppDrawer/>
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
  components:{
    AppBar: ( ) =>import('../components/bar/AppBar.vue'),
    AppDrawer: ()=>import('../components/bar/AppDrawer')
  },
  data(){
    return{
    };
  },
  methods:{

  },
}
</script>

<style scoped>

</style>