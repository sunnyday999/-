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
/*每次切换页面的时候就判断下*/
/*router.beforeEach((to,from,next)=>{
    // 如果是登录页可访问
    if (to.name ==='error' || to.name==='login'){
        next();
    }
    // 如果是其他页面，则要鉴定是否登录,
    // 假设这里拿到了token，表示登陆过，
    let item = localStorage.getItem('token');
    if (true){
        // 登陆后，对角色进行判断
        if('')


    }

})*/


