<template>
  <div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" cancel-text="取消" @cancel="onCancel"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      actions: [
        { name: '手机登录' },
      ],
    };
  },
  methods: {
    onSelect(item) {
      // console.log(item)
      this.show = false;
      this.$emit('select-item',item)

    },
    onCancel() {
      this.show = false;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>