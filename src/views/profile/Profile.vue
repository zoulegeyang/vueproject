<template>
  <div class="profile">
    <div class="nav">蘑菇街商城</div>
    <bscroll class="scroll" ref="scroll">
      <user-info></user-info>
    <treasure :treasure="treasure"></treasure>
    <grid></grid>
    <profile-shop-cart></profile-shop-cart>
    <div class="wrap">
      <order></order>
      <utils></utils>
    </div>
    </bscroll>
    
    
  </div>
</template>

<script>
import UserInfo from "./children/UserInfo"
import Treasure from "./children/Treasure"
import Grid from "./children/Grid"
import ProfileShopCart from "./children/ProfileShopCart"
import Order from "./children/Order"
import Utils from "./children/Utils"

import Bscroll from "components/common/bscroll/Bscroll"

export default {
    name:'Profile',
    data() {
      return {
        treasure: {
          balance:122.1,
          discount:1,
          credit:100
        }
      }
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    components: {
      UserInfo,
      Treasure,
      Grid,
      ProfileShopCart,
      Order,
      Utils,
      Bscroll
    },

}
</script>

<style>
.profile {
  height: 100vh;
}
.nav  {
  width:100%;
  color: #fff;
  background-color: #f08899;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-weight: bold;
  position: fixed;
}
.wrap {
  background-color: #eee;
  padding: 5px;
}
.scroll{

  position: absolute;
  top: 43px;
  bottom:49px;
  left: 0;
  right: 0;
  overflow: hidden;

}

</style>