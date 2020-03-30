import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import "./assets/css/base.css";
// 注册插件式组件
import toast from "components/common/toast"
Vue.config.productionTip = false
// 事件总线 用来管理不同组件之间的事件通信
Vue.prototype.$bus=new Vue()
// 还需要安装
Vue.use(toast)

new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')
