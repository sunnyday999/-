<template>
  <v-app>
    <div class="background">
      <div class="color">
        <v-card class="login">
          <!--顶部logo-->
          <v-card class="white--text success mycard text-center mb-5 pa-7">
            <div class="text-h6">
              <strong>用户登录</strong>
            </div>
          </v-card>
          <!--下方输入框-->
          <v-container>
            <v-text-field
                label="学号/学工号"
                type="text"
                v-model="username"
                :rules="usernameRules"
            />
            <v-text-field
                label="密码"
                type="password"
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                :rules="passwordRules"
            />
            <v-btn block color="success" class="mt-3" @click="vuetify">登录</v-btn>
            <!--滑动拼图验证组件-->
            <Verify @success="success"
            :mode="'pop'"
            :captchaType="'blockPuzzle'"
            :imgSize="{ width: '330px', height: '155px' }"
            ref="verify"
            ></Verify>
          </v-container>
        </v-card>
        <!--弹出提示-->
        <v-alert
            class="alert"
            v-model="alert"
            transition="slide-y-reverse-transition"
            dense
            max-width="300"
            dismissible
            elevation="12"
            :type=this.type
        >{{text}}</v-alert>

      </div>
    </div>
  </v-app>
</template>

<script>
import Verify from "./../components/verifition/Verify";
export default {
  name: "Login",
  components: {
    Verify,
  },
  data(){
    return{
      show: false, //验证图片是否展示
      // 保存账户信息
      username: '',
      password: '',
      alert: false,
      // 提示框内的文本
      text: '',
      // 表单校验
      type: 'success',
      usernameRules: [
        value => !!value || 'Required.',
      ],
      passwordRules: [
        value => !!value || 'Required.',
      ],
    };
  },
  methods:{
    // 点击登录后显示滑动框
    vuetify(){
      this.$refs.verify.show()
    },
    // 验证成功的回调函数
    success(params){
      this.$axios.post("/user/verify",params)
          .then((response)=>{
            // 如果通过二次验证，则验证账号密码
            if (response.data.repCode ==='0000'){
              this.login();
            }
            else{
              this.text='验证失败，没有通过第二次验证';
              this.type='error';
              this.alert =true;
              // 延迟几秒执行
              setTimeout(this.closeAlert, 3* 1000);
            }
          })
          // 如果验证失败，打印服务器返回信息
          .catch(()=>{
            this.text= '验证失败';
            this.type='error';
            this.alert =true;
            // 延迟几秒执行
            setTimeout(this.closeAlert, 3* 1000);
          })
    },
    // 关闭alert
    closeAlert(){
      this.alert =false;
    },
    //登录
    login(){
      this.$axios.post("/user/login",{
        username: this.username,
        password: this.password
      })
          .then((response)=>{
            console.log(response.data.data);
            if (response.data.code===200){
              this.text='登录成功';
              this.type='success';
              this.alert =true;
              // 延迟几秒执行
              setTimeout(this.closeAlert, 3* 1000);
              this.$router.push("/home")
            }
          })
          .catch(()=>{
            this.text='登录失败,请检查学工号/密码';
            this.type='error';
            this.alert =true;
            // 延迟几秒执行
            setTimeout(this.closeAlert, 3* 1000);
          })
    }
  }
}
</script>

<style scoped>
/*背景图片*/
.background{
  position: absolute;
  background-image: url("http://img.yangcc.top/image1.jpg");
  background-size: cover; /*自适应*/
  width: 100%;
  height: 100%;
}
/*黑色图层*/
.color{
  height:100%;
  width:100%;
  background: rgba(0,0,0,0.4);
}
/*登录框在页面中央*/
.login{
  position: absolute;
  z-index: 1;
  width: 350px;
  height: 370px;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -185px;
  padding: 20px;
  border-radius: 5px; /*圆角*/
  background: #FFFFFF;
}
/*标题突出一部分*/
.mycard{
  width: 100%;
  height: 100px;
  margin-top: -40px;
}
/*提示框*/
.alert{
  left: 75%;
  top: 15%;
}
</style>