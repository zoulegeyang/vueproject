<template>
  <div class="detail">
        <!-- 注意子传父  如果有参数只需要在子组件里写 函数里面写-->
        <detail-nav @itemClick="itemClick" ref="nav"></detail-nav>
        <bscroll class="scroll" ref="bscroll" @gundong="scrollPos" :probe-type="3">
            <detail-swiper :images="topImages"></detail-swiper>
            <!-- 经测试 v-for中的index是从1开始的 -->
            <!-- <div v-for="index in 5">{{index}}</div> -->
            <detail-des :des="desc"></detail-des>
            <detail-shop-Info :shopInfo="shopInfo" class="shop-info"></detail-shop-Info>
            <detail-image-info :detailImage="detailImage" @imgLoad="imageLoad"></detail-image-info>
            <detail-params ref="params"></detail-params>
            <detail-comment ref="comment"></detail-comment>
            <detail-recommend :recommend="recommend" ref="recommend"></detail-recommend>
        </bscroll>
        <back-top @click.native="backClick" v-show="isShow"></back-top>
        <detail-tabbar @cartTo="cartTO"></detail-tabbar>
    </div>
</template>

<script>
// import {Swiper,SwiperIten} from "components/swiper"

import {getDetail,des,shopInfo,getRecommend} from "network/detail"

import { mapActions } from "vuex"

import Bscroll from "components/common/bscroll/Bscroll"
import backTop from "components/contents/backTop"

import {listenerMix,backTopMIx} from "common/imgLoad"
import {debounce} from "common/util"

import detailNav from "./child/detailNav"
import detailSwiper from "./child/detailSwiper"
import detailDes from "./child/detailDes"
import detailShopInfo from "./child/detailShopInfo"
import detailImageInfo from "./child/detailImageInfo"
import detailComment from "./child/detailComment"
import detailParams from "./child/detailParams"
import detailRecommend from "./child/detailRecommend"
import detailTabbar from "./child/detailTabbar"
export default {
    name:"detail",
    data(){
        return{
            result:{},
            iid:null,
            topImages:[],
            // 注意给data取值得时候 什出错么值后面要接对应的类型不然可能
            desc:{},
            shopInfo:{},
            detailImage:{},
            recommend:[],
            offset:[],
            jump:null,
            
            }
        
    },
    components:{
        detailNav,
        detailSwiper,
        detailDes,
        Bscroll,
        detailShopInfo,
        detailImageInfo,
        detailComment,
        detailParams,
        detailRecommend,
        detailTabbar,
        backTop,
    },
    mixins:[listenerMix,backTopMIx,],
    created(){
        this.iid=this.$route.params.iid;
        // 获取详情数据
        getDetail(this.iid).then(

                res=>{
                    this.result=res.result;
                    // console.log(this.result)
                    this.topImages=res.result.itemInfo.topImages
                    // console.log(this.topImages)
                    
                    this.desc=new des(this.result.itemInfo,this.result.columns,this.result.shopInfo.services);
                    this.shopInfo=new shopInfo(this.result.shopInfo)
                    this.detailImage=res.result.detailInfo;

                        
                }
            );
        // 不能这样写 因为其它地方不能拿到created中创建的东西 所以需要找一个公共的地方来存放函数 
        // let jump=debounce(
        

        
        
        
        
        
        // 获取推荐数据
        getRecommend().then(
            res=>{
                // console.log(res)
                this.recommend=res.data.list
            })

        // 监听事件
        // 监听图片载入
        
    },
    mounted(){
        this.jump =debounce(
            ()=>{
            this.offset=[]
            this.offset.push(0)
            this.offset.push(this.$refs.params.$el.offsetTop)
            this.offset.push(this.$refs.comment.$el.offsetTop)
            this.offset.push(this.$refs.recommend.$el.offsetTop)
            this.offset.push(Number.MAX_VALUE)
            // console.log(this.offset)
            },
        500)
    },
    destroyed(){
        // 当出去detail的时候事件总线在处理图片加载的时候不要在处理detail里面的, 这里的imgLoad封装在mixin里
        this.$bus.$off('imgLoad',this.imgLoad)

    },
    methods:{
        // 都是从vuex管理的函数就是这样简写 下面可以直接调用
        ...mapActions(['cartKeeper']),
        imageLoad(){
            // 刷新页面 这里的refresh是mixins里面的 
            this.refresh()

            // 这两个没有联系 只是一个点击事件触发两个任务
            // 点击跳转 需要在图片载入处获取offsetTop不然 无法获取真实高度
            this.jump()
            // console.log(this.offset)

        },
        itemClick(index){
            // console.log(index)
            // console.log(this.offset)    
            this.$refs.bscroll.scrollTo(0,-this.offset[index],500)
        },
        scrollPos(position){
            // 这个代码不能直接用到scroll的滚动事件中 由于detail的滚动事件 有两个作用 一个显示回到顶部按钮 一个下拉内容对应的标题变红
            this.xianshi(position)
            let pos=-position.y
            for (let i=0;i<this.offset.length-1;i++) {
                // 非常奇怪的一个东西 要用&&连接不能 <=pos< 
                if (this.$refs.nav.currentIndex!=i&&this.offset[i]<=pos&&pos<this.offset[i+1]) {
                    
                    this.$refs.nav.currentIndex=i
                    // 踩坑笔记 下面的代码居然是true!!! 由于js的比较从左到右执行 结果的第一个为false 自动转化为0 在与1比较所以为true
                    // console.log(5<3<1)
                    
                } 
            }
            // console.log(-position.y)
        },
        cartTO(){
            // console.log(111)
            let good={
                image:this.topImages[0],
                desc:this.desc.title,
                price:this.desc.price,
                title:this.desc.title,
                iid:this.iid,
                count:0,
                checked:false,
            }
            // 直接传给mutations 但是官方不建议这样做 这样做不能跟踪state的改变,
            // this.$store.commit('cartKeeper',good)

            // 传给actions 然后actions在传给mutations
            // 不是dispath
            // 这里调用的cartkeeper是vuex里的actions的函数 且这个函数返回的是一个promise对象 由于必须确保数据先提交过去,才能通知用户商品的成功提交
            this.cartKeeper(good).then(res=>{
                // console.log(this.$toast)
                this.$toast.show(res,2000)
                // console.log('111')
            })
        },
    }
}
</script>

<style scoped>
.detail{
    position: relative;
    height: 100vh;
    background-color: #fff;
}
.scroll{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;

}

</style>