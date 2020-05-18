<template>
  <div>
    <!-- 地区选择器 -->
            <van-popup :value="showPicker" position="bottom">
              <van-picker
              title="标题"
              toolbar-position="bottom"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                confirm-button-text="test"
                @cancel="showPicker = false"
              >
              <div ></div>
              </van-picker>
            </van-popup>
  </div>
</template>

<script>
  export default {
    data() {
        return {
          showPicker: false,
          columns:['杭州', '宁波', '温州', '嘉兴', '湖州'],
        }
      },
    methods: {
      
      onConfirm(value) {
        this.$emit('picker-value',value)
        console.log('111')
      }
    },
  }
</script>

<style  scoped>

</style>