<template>
  <div class="bar">
    <div class="left">
      <span class="total">总价</span>
      <span class="fuhao">$ </span><span class="price">99</span>
    </div>
    <div class="right">
      <span class="right-des">共两件商品</span>
      <div class="button">提交订单</div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style  scoped>
.bar {
  width:100%;
  display: flex;
  position: fixed;
  bottom: 0;
  height: 49px;
  line-height: 49px;
  z-index: 999;
  background-color: #fff;
  justify-content: space-between;
}
.total{
  margin:0 10px;
}
.price {
  font-size: 20px;
  color:#f84087
}
.right {
  display: flex;
}
.fuhao {
color:#f84087
}
.right-des {
  font-size: 10px;
  margin-right: 10px;
}
.button {
  background-color: #f84087;
  color: white;
  font-size: 16px;
  /*  不要设置垂直上的padding 由于flex布局自动拉伸到充满 */
  padding:0 20px;

}
</style>