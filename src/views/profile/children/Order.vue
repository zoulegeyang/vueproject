<template>
  <div>
    <van-cell title="我的订单" value="全部" is-link></van-cell>
    <van-grid :column-num="5" :border="false">
      <van-grid-item :border="false">
        <van-icon name="paid" size="30" class="icon" />
        <span style="font-size:12px">待付款</span>
    </van-grid-item>
    <van-grid-item :border="false">
      <van-icon name="logistics" size="30" class="icon"/>
        
        <span style="font-size:12px">待发货</span>
    </van-grid-item>
    <van-grid-item :border="false">
        
        <van-icon name="gift-o" size="30" class="icon"/>
        <span style="font-size:12px">待收货</span>
    </van-grid-item>
    <van-grid-item :border="false">
        
        <van-icon name="chat-o" size="30" class="icon"/>
        <span style="font-size:12px">评价</span>
    </van-grid-item>
    <van-grid-item :border="false">
        <van-icon name="refund-o" size="30" class="icon"/>
        <span style="font-size:12px">退款售后</span>
    </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>