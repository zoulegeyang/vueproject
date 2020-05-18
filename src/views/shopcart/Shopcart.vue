<template>
  <div class="category">
    <nav-bar class="nav">
      <div slot="center" class="center">购物车({{length}})</div>
      <div slot='right' class="nav-right" v-show="length>0">
        <!-- <van-button type="danger" size="small" plain  class="edit-button" @click="!goodTabShow">编辑</van-button> -->
        <div  @click="editClick" class="edit-text" >{{goodTabShow?'编辑':'完成'}}</div>
      </div>
    </nav-bar>
    <bscroll class="scroll" ref="bscroll" 
    :style="{'bottom':length>0?'89px':'49px'}"
    @pullingUp="loadMore" @gundong="xianshi" :probe-type="3">
      <div class="have" v-if="length>0">
        <shop-list></shop-list>

        
      </div>
      <div v-else class="not-have">
        <div class="img">
          <img src="@/assets/img/cart/emptyshopcart.gif" />
          <div>购物车还是空的哦~</div>
          <van-button color="#f08899" to="/home" class="van-button">去逛逛</van-button>
          
        </div>
        <div class="like">
            <guess-like :goods="goodsList"></guess-like>
          </div>
      </div>
      
    </bscroll>
    <cart-bottom-bar class="cart-bar" v-if="length>0" :barShow="goodTabShow"></cart-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
// 获取vuex中getters定义的计算属性 注意只能这么写
import { mapGetters } from "vuex";

import navBar from "components/common/navBar";
import bscroll from "components/common/bscroll/Bscroll";
import backTop from "components/contents/backTop"


import shopList from "./child/shopList";
import cartBottomBar from "./child/cartBottomBar";
import { getMultidata, getGoods } from "network/home.js";

import GuessLike from "./child/GuessLike";
export default {
  name: "Shopcart",
  data() {
    return {
      goodsList: [],
      page:0,
      isShow:false,
      goodTabShow:true, //底部栏的切换
    };
  },
  computed: {
    // 这里会获取vuex中getters定义的计算属性,只能这种写法
    ...mapGetters({
      length: "length",
      list: "list"
    })
    // shopLength(){
    //   // 函数记得返回
    //   return this.$store.state.cartList.length
    // }
  },
  // 直接将首页数据渲染到猜你喜欢数据里
  mounted() {
    this.getGoods('pop')
  },
  activated() { 
    // 每次进来也要默认优先让下部的控制栏 为结算bar
    this.goodTabShow = true;
    // 暂时先这样解决 每次进购物车都要刷一下 不考虑图片的加载问题
    if (this.length > 0) {
      //购物车有货的时候
      this.$refs.bscroll.refresh();
    }

    // console.log('----')
  },
  methods: {
    getGoods(type){
        let page=this.page+1;
        // console.log(this.goods[type].list);
        getGoods(type,page).then(
          res=>{
            // console.log(res)
            this.goodsList.push(...res.data.list)
            this.page+=1;
            
            // 得到数据要做两个事 第一个 刷新区域 第二个表示加载完毕
            this.$refs.bscroll.refresh()
            this.$refs.bscroll.finishPullUp()

            
            
          }
        );
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
          
        }
        
        
      },
  loadMore(){
        // console.log("上啦加载更多")
        this.getGoods('pop')
      },
  editClick() {
    this.goodTabShow=!this.goodTabShow
  }
  },
  components: {
    navBar,
    bscroll,
    shopList,
    cartBottomBar,
    GuessLike,
    backTop
  }
};
</script>

<style>
.category {
  height: 100vh;
}
.nav {
  background-color: pink;
  height: 44px;
  line-height: 44px;
}
.nav .center {
  color: #fff;
  text-align: center;
}
.scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  /* bottom: 89px; */
  overflow: hidden;
}
.cart-bar {
  position:absolute;
    left: 0;
    right: 0;
    bottom: 49px;
}
.have {
  height: 100%;
}

.img {
  height: 280px;
  text-align: center;
}
img {
  margin-top: 20px;
  width: 70%;
}
.van-button {
  margin-top: 10px;
}
.like {
  margin-top: 10px;
  padding-top: 5px;
  background-color: #eee;
}
.nav-right {
  /* margin-right: 40px!important; */
  /* padding:0 20px */
  position: relative;
  right: 20px;
}
.edit-text {
  color:white;
}

</style>