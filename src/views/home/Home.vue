<template>
  <div class='shouye'>
    <nav-bar class="nav">
      <div slot="left"></div>
      <div slot="center" class="center">购物街</div>
      <div slot="right"></div>
    </nav-bar>
    <!-- 用样式来控制显示和隐藏 v-show和v-if会导致$refs获取不到组件 -->
    <div :class="controlIsshow?'controlwrap':'NoShowControlWrap'">
    <tab-control :titles="['流行','新款','好物']" @tabClick="tabClick" ref="control1" class="control"></tab-control>

    </div>
    <bscroll class="content" ref="bscroll" :probe-type="3" 
    @gundong="xianshi" @pullingUp="loadMore">
      <home-swiper :class="{swiper:activated}" :banners="banners" @imageLoad="imageLoad" ref="swiper"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <tab-control :titles="['流行','新款','好物']" @tabClick="tabClick" ref="control2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </bscroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>



<script>
import navBar from "components/common/navBar.vue"
import tabControl from "components/contents/tabControl"
import goodsList from "components/contents/goods/goodsList"
import Bscroll from "components/common/bscroll/Bscroll"
import backTop from "components/contents/backTop"

import { mapActions} from "vuex"
// import {debounce} from "common/util"
import {listenerMix,backTopMIx} from "common/imgLoad"

import homeSwiper from "./childHome/homeSwiper"
import homeRecommend from "./childHome/homeRecommend"

import {getMultidata,getGoods} from "network/home.js"
export default {
    name:'Home',
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},


        },
        currentType:'pop',
        isShow:false,
        topheight:0,
        controlIsshow:false,
        activated:false,
        y:0,
      }
    },
    components:{
      navBar,
      homeSwiper,
      homeRecommend,
      tabControl,
      goodsList,
      Bscroll,
      backTop,
    },
    mixins:[listenerMix,backTopMIx,],
    // activated () {
    //   console.log('````')
    // // if (this.$store.getters.getUserInfo=='') {
    // //   this.fileList[0]=this.$store.getters.getUserInfo;
    //   console.log(this.$store.getters.getUserInfo)
    // },
    created(){
      /// 每次打开app的时候都是进首页
      
      this.getMultidata(),
      this.getGoods('pop'),
      this.getGoods('sell'),
      this.getGoods('new')
    },
    mounted(){
      // console.log("111111")
      // console.log(debounce)
      // const refresh=debounce(this.$refs.bscroll.refresh,0.000000000001)
      // this.imgLoad=()=>{refresh() }
      // this.$bus.$on('imgLoad',this.imgLoad)
        // this.debounce(this.$refs.bscroll.refresh,50)
        // this.$refs.bscroll.refresh()
        
        
        
     
    },
    
    // actived和deactived实现的是tabbar的跳转之后返回原来的页面 页面的内容没有重置 还是显示原来浏览的页面
    activated(){
      // console.log(-this.y)
      // 和老师的不一样 第三个值经测试不能加
      // this.$refs.bscroll.scrollTo(0,this.y,500)
      // this.$refs.bscroll.refresh()
      // // 只要回来了就还需要继续监听图片的加载 然后重新刷新
      // // 这里的imgLoad被混入到imgLoad.js中了  
      // this.$bus.$on('imgLoad',this.imgLoad)
      // console.log(this.$store.getters.getUserInfo)

      // 在第一次的时候 获取一个 空的用户列表信息
      // 后端需根据这个api 来做处理 若 发这个请求时 客户端有cookie 则返回cookie里用户的信息 若没有则返回空的初始化信息
      // 这个写在activated里是因为防止用户注销 那个时候进行跳转到首页的时候 首页不会再创建
      this.$http.get('empty')
      .then(res=>{
        this.userKeeper(res.data.userInfo)
        console.log(res.data.userInfo)
      })

      this.activated= true
      this.topheight=this.$refs.control2.$el.offsetTop
      // console.log(this.topheight)
      
    },
    deactivated(){
      
      // 该段代码用来使得 首页保持之前的位置
      this.y=this.$refs.bscroll.bscroll.y
      // 用来区分其它路由 可以使得当进入其它路由时相同的时间home页面不监听
      this.$bus.$off('imgLoad',this.imgLoad)
      
    },
    destroyed(){
      console.log("gg")
    },
    methods:{
      ...mapActions(['userKeeper']),
      // 监听事件
      tabClick(index){
          switch(index){
            case 0:
              this.currentType='pop';
              break;
            case 1:
              this.currentType='new'
              break;
            case 2:
              this.currentType='sell'


          }
          this.$refs.control1.currentIndex=index;
          this.$refs.control2.currentIndex=index;
         
          

      },
      backClick(){
        this.$refs.bscroll.scrollTo(0,0)
      },
      xianshi(position){
        // 检测回到顶部按钮是否显示
        if((-(position.y))>1000){
          this.isShow=true
        }else{
          this.isShow=false
          // console.log(-(position.y))
        }
        // 检测tabcontrol是否显示
        if((-(position.y))>this.topheight){
          this.controlIsshow=true
        }else{
          this.controlIsshow=false
          // console.log(-(position.y))
        }
        // console.log(position)
      },
      loadMore(){
        // console.log("上啦加载更多")
        this.getGoods(this.currentType)
      },
      imageLoad(){
        this.topheight=this.$refs.control2.$el.offsetTop
        this.$refs.bscroll.refresh()
        // console.log('----')
        console.log(this.topheight)
        // console.log('222222222222')
      },


      // 功能性函数
      // 防抖动函数
      // debounce(func,delay){
      //   let timer=null
      //   return function(...args){
      //     if(timer){
      //     clearTimeout(timer)
      //   }
      //   timer=setTimeout(()=>{func.apply(this,args)},delay)
      //   }
        
      // },

      // 网络请求事件
      getMultidata(){
        getMultidata().then(
        res=>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }
      )
      },
      getGoods(type){
        let page=this.goods[type].page+1;
        // console.log(this.goods[type].list);
        getGoods(type,page).then(
          res=>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+=1;
            // this.$refs.bscroll.scrollTo(0,0);
            this.$refs.bscroll.refresh()
            this.$refs.bscroll.finishPullUp()

            
            
          }
        );
        // this.$refs.bscroll.finishPullUp()
        
        // console.log(this.$refs.bscroll.message)
        
        // console.log(this.goods[type].page)
      }
    }
}
</script>

<style scoped>
.shouye{
  /* padding-top:44px;  */
  position: relative;
  /* 这个高度必须设置 因为bscroll设置的是absolute相对父元素 如果父元素没有高度的话 那么就会不知道自己摆放在哪里 */
  height: 100vh;

}
.center{
  text-align:center
}
.nav{
  background-color: pink;
  color:cornsilk;
  /* position: fixed;
  top:0;
  left:0;
  right:0;
  z-index: 9; */
}
.controlwrap{
  /* display: block; */
  width: 100%;
  margin-top: -1px;
  position: fixed;
  top:43px;
  background-color: #fff;
  z-index: 9;
}
.NoShowControlWrap {
  /* width: 100%;
  margin-top: -1px; */
  position: fixed;
  /* top:43px;
  background-color: #fff; */
  /* z-index: -20; */
  opacity: 0;
}
.content{
  /* padding-top:44px; */
  position: absolute;
  top: 44px;
  bottom:49px;
  
  left: 0;
  right: 0;
  /* height: 50px; */
  /* 这个必须有 因为定位元素会覆盖其它元素利用这个可以使得超出区域不显示 */
  overflow: hidden;
  /*background-color: red;
  overflow: hidden; */
  /* margin-top: 44px; */
}
.swiper {
  margin-top:-20px;
}

</style>