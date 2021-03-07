import Vue from 'vue'
import App from './App.vue'
// 引入router
import router from './router'
// 引入vuetify
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false
// 引入axios
import axios from 'axios'
//引入vuex
import store from "@/vuex/vuex";
Vue.prototype.$axios=axios
new Vue({
  router,
  vuetify,
  render: h => h(App),
  store,
}).$mount('#app')


