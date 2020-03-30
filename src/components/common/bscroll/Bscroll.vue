<template>
    <div class="wrapper" ref="wrap">
        <div class="content">
            <slot></slot>
        </div>
    </div>
  
</template>

<script>
import BScroll from "better-scroll"
export default {
    name:"Bscroll",
    data(){
        return{
            bscroll:null,
            message:"zz"
            
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        }
    },
    mounted(){
        this.bscroll=new BScroll(this.$refs.wrap,{
            // 该值可以使得 在滚动区域内的div可以被点击 一些可以被点击的东西 值设置为false 也是可以点击的
            click:true,
            // 设置为 动态值 这样可以决定什么时候需要监听 滚动事件 面的浪费资源监听滚动事件
            probeType:this.probeType,
            pullUpLoad:true,
        }),
        this.bscroll.on('scroll',(position)=>{
            // console.log(position)
            this.$emit('gundong',position)
        }),
        this.bscroll.on('pullingUp',()=>{
            // console.log("上啦加载更多")
            this.$emit('pullingUp')
        })
    },
    methods:{
        scrollTo(x,y,time=300){
            this.bscroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.bscroll.finishPullUp()
        },
        refresh(){
            this.bscroll&&this.bscroll.refresh();
            // console.log("----")
        }
    }
}
</script>

<style scoped>
/* .wrapper{
     position: absolute;
  bottom:49px;
  top: 44px;
  left: 0;
  right: 0;
} */

</style>
