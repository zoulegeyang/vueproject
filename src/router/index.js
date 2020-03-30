import Vue from 'vue'
import VueRouter from 'vue-router'

// const shopcart=()=>import shopcart from ""
// 注意这里导入时候和普通的es6写法的区别
const Shopcart=()=>import ("../views/shopcart/Shopcart")
const Category=()=>import ("../views/category/Category")
const Home=()=>import ("../views/home/Home")
const Profile=()=>import ("../views/profile/Profile")
const Detail=()=>import ("../views/detail/Detail")



// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
]
const router = new VueRouter({
  routes,
  // base: '/Users/zhouyang/codes/vscodeworkplace/vuemall1/dist/',
  mode: 'history'
})


export default router

