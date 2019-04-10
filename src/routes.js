import library from './components/library.vue';
import login from './components/login.vue';
import register from './components/register.vue';
import ahome from './components/admin/ahome.vue';
import reports from './components/admin/reports.vue';
import create from './components/admin/create.vue';
import list from './components/admin/list.vue';
import shome from './components/student/shome.vue';
import mybooks from './components/student/mybooks.vue';
import fine from './components/student/fine.vue';
import profile from './components/student/profile.vue';
import admin from './components/admin/admin.vue';
import student from './components/student/student.vue';
import studentdetails from './components/admin/studentdetails.vue';
//import {store} from './store';


export const routes=[
    {path:'/',component:library, },
    {path:'/login',component:login, },
    {path:'/register',component:register,},
    {path:'/admin',component:admin,
    beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}},
    children: [
        {
          path: 'reports',
          component: reports,
          beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}},
          
        },
    {path:'studentdetails',component:studentdetails, beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}} },
    {path:'create',component:create,beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}}},
    {path:'list',component:list,beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}} },
    {path:'ahome',component:ahome,beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}}},

    ],
    },
    {path:'/student',component:student,beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}},
    children:[
    {path:'shome',component:shome ,beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}}},
    {path:'mybooks',component:mybooks,beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}}},
    {path:'fine',component:fine,beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}}}, 
    {path:'profile',component:profile,beforeEnter:(to,from,next)=>{if(localStorage.auth){next();}else{next('/');}}},]}
    
    
];