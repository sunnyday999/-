<template>
  <v-container  style="background-color: #EEEEEE">
    <v-card class="mt-5">
      <v-card-text>
        <!--头像-->
        <div class="mx-auto text-center">
          <v-avatar color="success" class="white--text avatar elevation-5"  size="100">
            <img :src="`http://img.yangcc.top/`+user.avatar"
                 lazy-src="http://img.yangcc.top/header.jpg"
                 alt="头像">
          </v-avatar>
        </div>
        <!--个人信息-->
        <v-container>
          <!--学工号-->
          <v-text-field
              prepend-icon="mdi mdi-face"
              color="success"
              v-model="user.username"
              label="学工号"
              :rules="[rules.required]">
          </v-text-field>
          <!--院系-->
          <v-select
              prepend-icon="mdi mdi-bank"
              v-model="user.faculty.name"
              menu-props="auto"
              color="success"
              :items="faculty"
              label="院系"
              :rules="[rules.required]"
          ></v-select>
          <!--密码-->
          <v-text-field
              prepend-icon="mdi mdi-lock-outline"
              color="success"
              v-model="user.password"
              label="重置密码"
              :rules="[rules.required]">
          </v-text-field>
          <v-text-field
              prepend-icon="mdi mdi-lock-outline"
              color="success"
              v-model="password2"
              label="再次输入密码"
              :rules="[rules.required]">
          </v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="success">更改信息</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MyInfo",
  data(){
    return{
      rules: {
        length: len => v => (v || '').length <= len || `最大长度为: ${len}`,
        required: v => !!v || '不能为空',
      },
      faculty: [],
      user: {
        avatar: 'header.jpg',
        username: '1111',
        password: '',
        faculty:{
          id: '',
        }
      },
      password2:'',
    };
  },
  methods: {
  }
}
</script>

<style scoped>
.avatar{
  top: -50px;
}
</style>