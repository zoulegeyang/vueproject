<template>
  <!-- 由于css属性不支持驼峰 故将类名设置为-的形式   -->
  <div class="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:'tabBar'
}
</script>

<style scoped>
.tab-bar{
    display:flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
}

</style>