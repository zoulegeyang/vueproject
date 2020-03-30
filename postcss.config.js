// 不知道为什么就是没有用
module.export={
    // 配置插件的选项
    plugins:{
        "autoprefixer":{},
        // 插件名
        "postcss-px-to-viewport":{
            viewportWidth:375,//开发时的宽度 后面所有的适配都以这个基础为相对宽度进行适配
            viewportHeight:667,
            unitPrecision:5 , //转化后保留多少小数
            viewportUnit:'vw', //适配的单位 一般只需要窗口宽度
            selectorBlackList:[],//适配类的黑名单这些类不需要适配
            minPixelValue:1,//多少像素一下不需要适配
            mediaQuery:false,//媒体查询不适用   

        },
    }
}