import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


const store =new Vuex.Store({
    // 共享数据
    state:{
        // 导航相关
        drawer: true,
        mini: false,     // 默认不是mini
        permanent:true,  // 默认是侧栏展开
        title: "首页", // 默认首页
        user_items: [
            { title: '首页', icon: 'fa fa-home',link:'/home' },
            { title: '申报会议', icon: 'fa fa-pencil-square',link: '/applymetting' },
            { title: '我的', icon: 'fa fa-pencil-square',link: '/my' },
            { title: '我的消息', icon: 'fa fa-pencil-square',link: '/message' },
        ],
        // 用户token
        token: {
            tokenName: 'satoken-user',
            tokenValue: '',
        }
    },
    // 修改共享数据的方法
    mutations:{
        /*修改侧栏的展开状态*/
        unPermanent(state){
            state.permanent = !state.permanent;
        },
        /*修改侧栏的样式是否保持mini*/
        unMini(state){
            state.mini =!state.mini;
        },
        /*给tokenName赋值*/
        setTokenName(state,tokenName){
            state.token.tokenName = tokenName;
        },
        /*给tokenValue赋值*/
        setTokenValue(state,tokenValue){
            state.token.tokenValue = tokenValue;
        }
    }

})

// 暴露store对象
export  default  store;