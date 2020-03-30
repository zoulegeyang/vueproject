<template>
    <!-- 对toast准备采用插件方式的封装 由于这个组件需要被多个地方调用 -->
    <div class="toast tt" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
     name:"toast",
    data() {
        return {
            message:'',
            isShow:false,
        };
    },
    components:{

     },
    created() {

    },
    mounted() {
        
    },
    methods: {
        show(message,druation){
            // console.log('222')
            this.message=message;
            this.isShow=true;
            
            setTimeout(()=>{
                this.message=''
                this.isShow=false;
            },druation)
        }
    }
};
</script>

<style scoped >
    .toast{
        /* 注意这里的布局由于 这里的组件被设置成全局组件 估计父元素是窗口 所以一般的相对定位没有用 因为父元素没有设置成相对定位 */
        font-size: 14px;
        line-height: 50px;
        width:150px;
        height: 50px;
        position: fixed;
        /* margin: 0 auto; */
        z-index: 9999;
        /* 这三个属性也是居中对齐的一种方式 */
        left: 50%;
        transform: translate(-50%,-50%);
        top: 50%;
        
        background-color:rgba(0,0,0,.75);
        color:white;
        text-align: center;
    }
</style>
