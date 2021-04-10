import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login"
import Index from "@/views/Index"
//home
import Home from "@/views/index/Home";
// meeting
import MeetingList from "@/views/index/meeting/MeetingList";
import MeetingRoomList from "@/views/index/meeting/MeetingRoomList";
import FacultyList from "@/views/index/meeting/FacultyList";

// user
import RoleList from "@/views/index/user/RoleList";
import UserList from "@/views/index/user/UserList";
import AdminList from "@/views/index/user/AdminList";

//my
import MyMeeting from "@/views/index/my/MyMeeting";
import MyMessage from "@/views/index/my/MyMessage";
import MyInfo from "@/views/index/my/MyInfo";



import vuex from "@/vuex/vuex";
import axios from "axios";
import * as path from "path";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        children:[
            {path: '/home', name: 'home', component: Home},
            {path: '/meeting/meetingList', name: 'meetingList', component: MeetingList},
            {
                path: '/meeting/meetingRoomList',
                name: 'meetingRoomList',
                component: MeetingRoomList,
            },
            {path: '/meeting/facultyList', name: 'facultyList', component: FacultyList},

            {path: '/user/roleList', name: 'roleList', component: RoleList},
            {path: '/user/userList', name: 'userList', component: UserList},
            {path: '/user/adminList', name: 'adminList', component: AdminList},

            {path: '/my/myInfo', name: 'myInfo', component: MyInfo},
            {path: '/my/myMessage', name: 'myMessage', component: MyMessage},
            {path: '/my/myMeeting', name: 'myMeeting', component: MyMeeting},

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
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

