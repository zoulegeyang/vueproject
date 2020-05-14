<template>
  <div class="utils">
    <van-cell title="我的工具"></van-cell>
    <div class="content">
      <van-grid :column-num="5" :border="false">
        <van-grid-item :border="false">
          <van-icon name="sign" size="30" class="icon" />
          <span style="font-size:12px">签到</span>
        </van-grid-item>
        <van-grid-item :border="false">
          <van-icon name="bulb-o" size="30" class="icon" />

          <span style="font-size:12px">大姨妈</span>
        </van-grid-item>
        <van-grid-item :border="false">
          <van-icon name="service-o" size="30" class="icon" />
          <span style="font-size:12px">=客服</span>
        </van-grid-item>
        <van-grid-item :border="false">
          <van-icon name="award-o" size="30" class="icon" />
          <span style="font-size:12px">达人中心</span>
        </van-grid-item>
        <van-grid-item :border="false">
          <van-icon name="records" size="30" class="icon" />
          <span style="font-size:12px">意见反馈</span>
        </van-grid-item>
        <van-grid-item :border="false">
          <van-icon name="location-o" size="30" class="icon" />
          <span style="font-size:12px">收货地址</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.utils {
  margin-top: 5px;
}
.content {
  background-color: #fff;
}
</style>