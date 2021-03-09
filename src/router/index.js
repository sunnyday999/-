import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Index from "@/views/Index"
// user
import Home from "@/views/index/Home";
import ApplyMeeting from "@/views/index/ApplyMeeting";
import My from "@/views/index/My";
import Error from "@/views/index/Error";
import Message from "@/views/index/Message";
// admin
import MeetingMange from "@/views/index/MeetingMange";
import MessageMange from "@/views/index/MessageMange";
import UserMange from "@/views/index/UserMange";
import MeetingRoomMange from "@/views/index/MeetingRoomMange";


import vuex from "@/vuex/vuex";
import axios from "axios";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        children:[
            {
                path: '/home',
                name: 'home',
                component: Home
            },
            {
                path: '/applymetting',
                name: 'applymetting',
                component: ApplyMeeting
            },
            {
                path: '/my',
                name: 'my',
                component: My
            },
            {
                path: '/message',
                name: 'message',
                component: Message
            },
            {
                path: '/meetingmange',
                name: 'meetingmange',
                component: MeetingMange
            },
            {
                path: '/meetingroommange',
                name: 'meetingroommange',
                component: MeetingRoomMange
            },
            {
                path: '/usermange',
                name: 'usermange',
                component: UserMange
            },
            {
                path: '/messagemange',
                name: 'messagemange',
                component: MessageMange
            },
        ]},
    {
        path: '/login',
        name:'login',
        component: Login
    },
    {
        path: '*',
        name: 'error',
        component: Error
    }
]

const router = new VueRouter({
  routes
})

export default router;
/*/!*每次切换页面的时候就判断下*!/
router.beforeEach((to,from,next)=>{
// 如果是登录页可访问
    if (to.name ==='error' || to.name==='login'){
        next();
    }
    // 如果是其他页面,先检测是否有token,没有token则跳转到登录页
    let tokenValue = vuex.state.token.tokenValue;
    if (tokenValue===undefined || tokenValue===''){
        next({
            path: '/login'
        })
    }
    // 如果是从登录界面过来的且有token
    if (from.name==='login'){
        console.log("有token放行")
        next()
    }
    //如果是普通的界面，有token需要检测是否正确
    axios.post("/user/token", null, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            tokenValue: vuex.state.token.tokenValue,
        }
    }).then(r=>{
        if (r.data.code===200){
            next()
        }
        else{
            next({
                path: '/login'
            })
        }
    }).catch(r=>{
        next({
            path: '/login'
        })
    });
})*/

