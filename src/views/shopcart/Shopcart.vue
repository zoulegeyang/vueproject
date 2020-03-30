<template>
  <div class="category">
      <nav-bar class="nav">                 
        <div slot="center" class="center">购物车({{length}})</div>
      </nav-bar>
      <bscroll class="scroll" ref="scroll">
          <shop-list></shop-list>
      </bscroll>
      <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
// 获取vuex中getters定义的计算属性 注意只能这么写
import { mapGetters} from "vuex"

import navBar from "components/common/navBar"
import bscroll from "components/common/bscroll/Bscroll"

import shopList from "./child/shopList"
import cartBottomBar from "./child/cartBottomBar"

export default {
    name:'Shopcart',
    data(){
      return{
       
      }
    },
    computed:{
      // 这里会获取vuex中getters定义的计算属性,只能这种写法
      ...mapGetters({
        length:'length',
        list:'list'
        
      }),
      // shopLength(){
      //   // 函数记得返回
      //   return this.$store.state.cartList.length
      // }
    },
    mounted(){
      
    },
    activated(){
      // 暂时先这样解决 每次进购物车都要刷一下 不考虑图片的加载问题
      this.$refs.scroll.refresh()
      // console.log('----')
    },
    components:{
      navBar,
      bscroll,
      shopList,
      cartBottomBar,
    }
}

</script>

<style>
.nav{
  background-color: pink;
  height: 44px;
  line-height: 44px;
} 
.nav .center{
  color:#fff;
  text-align: center;

}
.scroll{
  position: absolute;
  left: 0;
  right:0;
  top:44px;
  bottom:89px;
  overflow: hidden;
}

</style>