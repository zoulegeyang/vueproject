<template>
  <div id='main'>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="img" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="actimg" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="img" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="actimg" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="text">种类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart"> 
        <img slot="img" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="actimg" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="img" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="actimg" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="text">我的</div>
      </tab-bar-item>
      
    </tab-bar>
  </div>
</template>

<script>

import tabBar from "components/common/tabBar.vue"
import tabBarItem from "components/common/tabBarItem.vue"
export default {
    name:'mainTabBar',
    components:{
        tabBar,
        tabBarItem
    },
    
}
</script>

<style>

</style>