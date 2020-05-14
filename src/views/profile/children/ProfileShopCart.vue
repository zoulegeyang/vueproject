<template>
  <div class="shop-cart">
    <div class="shop">
      <div class="shop-wrap">
        <div class="shoptext">购物车</div>
      <div class="imgwarp">
        <img src="@/assets/img/cart/shopcart.jpeg" alt="">
      </div>
      </div>
    </div>
    <div class="cells">
      <van-cell-group class="cell-group">
  <van-cell title="蘑菇呗"  is-link  value-class="right"   class="c-right"/>
  <van-cell title="会员" value="退货补运费" is-link  value-class="right"  class="c-right"/>
  <van-cell title="我的钱包" value="白富美在这" is-link  value-class="right"  class="c-right"/>

</van-cell-group>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.shop-cart {
  height: 140px;
  display: flex;
  justify-content: space-between;
  background-color: #EEE;
}
.shop {
  width:48%;
  background-color: #eee;
  box-sizing: border-box;
  padding:10px 0;
}
.shoptext {
  padding: 10px;
}
.shop-wrap {
  background-color: #fff;
  height: 100%;
}
.cells {
  width:49%;
    padding:10px 0;
    overflow: hidden;

}
.imgwarp {
  height: 80%;
  position: relative;
  left: 44%;
  bottom: 20px;
}
img {
  width:50%;
}
.right {
  font-size: 12px;
  
}
.c-right {
height: 33%;
}
.cell-group {
  height: 100%!important;
}
</style>