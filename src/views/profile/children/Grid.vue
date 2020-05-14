<template>
  <div class="grid">
    <van-grid :column-num="5" :border="false">
      <van-grid-item :border="false">
        <van-icon name="wap-home" color="pink" size="40" class="icon"/>
        <span style="font-size:12px">个人主页</span>
    </van-grid-item>
    <van-grid-item :border="false">
        <van-icon name="chat" color="skyblue" size="40" class="icon"/>
        <span style="font-size:12px">消息</span>
    </van-grid-item>
    <van-grid-item :border="false">
        <van-icon name="star" color="orange" size="40" class="icon"/>
        <span style="font-size:12px">收藏</span>
    </van-grid-item>
    <van-grid-item :border="false">
        <van-icon name="friends" color="pink" size="40" class="icon"/>
        <span style="font-size:12px">关注</span>
    </van-grid-item>
    <van-grid-item :border="false">
        <van-icon name="bag" color="gray" size="40" class="icon"/>
        <span style="font-size:12px">足迹</span>
    </van-grid-item>
     

    </van-grid>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style  scoped>
.grid {
  border-bottom: 1px solid #eeeeee;
}
.icon {
  margin-bottom: 5px;
}
</style>