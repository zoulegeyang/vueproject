import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

// import "./assets/css/base.css";
// 注册插件式组件
import toast from "components/common/toast"
import SlideVerify from "vue-monoplasty-slide-verify";
import { NavBar,Sidebar, SidebarItem, Grid, GridItem,Image,Tab,Tabs,Icon, Sticky, List,Uploader,
Button,
CellGroup,
Cell,
Swipe,
SwipeItem,
Field,
NumberKeyboard,
ActionSheet

} from "vant"
import 'vant/lib/index.css';
Vue.use(NavBar)
.use(Sidebar).use(SidebarItem)
.use(Grid)
.use(SlideVerify)
.use(GridItem)
.use(Image)
.use(Tab)
.use(Tabs)
.use(Icon)
.use(Sticky)
.use(List)
.use(Field)
.use(Uploader)
.use(Button)
.use(CellGroup)
.use(Cell)
.use(Swipe)
.use(SwipeItem)
.use(NumberKeyboard)
.use(ActionSheet)
// .use(Toast)
Vue.config.productionTip = false
// 事件总线 用来管理不同组件之间的事件通信
Vue.prototype.$bus=new Vue()
// 还需要安装
Vue.use(toast)

const instance = axios.create({
  baseURL:"http://localhost:5000",
  withCredentials:true
})
Vue.prototype.$http = instance
new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')
