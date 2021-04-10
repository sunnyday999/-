<template>
  <v-container>
    <!--按钮组-->
    <v-card elevation="0" class="mb-3">
      <v-card-actions>
        <v-spacer/>
        <v-btn-toggle mandatory dense borderless class="elevation-2">
          <v-btn  link to="/mymeeting/history" value="left"  active-class="success white--text">
            <span class="hidden-sm-and-down"><strong>我的会议</strong></span>
          </v-btn>
          <v-btn link to="/mymeeting/apply" value="right"  active-class="success white--text">
            <span class="hidden-sm-and-down"><strong>申请会议</strong></span>
          </v-btn>
        </v-btn-toggle>
      </v-card-actions>
    </v-card>

    <!--子路由展示的页面-->
    <router-view/>
  </v-container>
</template>

<script>
export default {
  name: "ApplyMeeting",
  data(){
    return {

    }
  },
  created() {

  },
  methods:{
  },
}
</script>

<style scoped>

</style>