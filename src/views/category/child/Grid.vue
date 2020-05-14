<template>
  <div>
    <van-grid :column-num="3" :border="false" :gutter="10">
      <van-grid-item v-for="item in gridData" :key="item.image">
        <van-image :src="item.image"></van-image>
        <span class="title">{{item.title}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  export default {
    name:"Grid",
    props: {
      gridData: {
        type: Array,
        default() {
          return []
        }
      },
    },
  }
</script>

<style  scoped>
.title {
  margin-top: 20px;
  font-size: 12px;
}
</style>