import Toast from "./Toast"
const obj={}

// 这个函数在main.js vue安装这个插件的时候就会执行
obj.install=function(Vue){
    // console.log('执行了安装');
    // 要想有这个组件变为全局的vue插件 需要先有个组件构造器来构造这个组件
    const constructor=Vue.extend(Toast)
    // 创建这个构造器的对象实例
    const toast=new constructor()
    // 然后需要将这个对象实例挂载到某个元素上
    toast.$mount(document.createElement('div'))
    // 然后需要把这个元素放入body中  tt.$el就是对应的挂载的div元素
    document.body.appendChild(toast.$el)
    // 接下来和原型绑定 其它地方就可以全局的使用了
    Vue.prototype.$toast=toast
    // console.log('333')
    
}
export default obj