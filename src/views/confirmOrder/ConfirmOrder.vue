<template>
<!-- 确认订单页面 -->
  <div class="confirm-order">
    
    <van-nav-bar @click-left="$router.go(-1)" title="确认订单" left-arrow />
    <bscroll class="scroll" ref="scroll">
    <van-cell title="请填写收货地址" icon="location-o" is-link class="location"  @click="showOperation"/>
    <list-item v-for="(item,index) in list" :product="item" :key="index" class="list"></list-item>
    </bscroll>
    <confirm-bar></confirm-bar>
    <location ref="location"></location>
  </div>
</template>

<script>
import Location from "./children/Location"
import Bscroll from "@/components/common/bscroll/Bscroll"
import ConfirmBar from "./children/ConfirmBar"
import listItem from "../shopcart/child/listItem"
import {mapGetters} from "vuex"
  export default {  
    name:'confirm',
    computed: {
      ...mapGetters(['list']),
    },
    components: {
      listItem,
      ConfirmBar,
      Bscroll,
      Location
    },
    activated () {
      this.$refs.scroll.refresh();
    },
    methods: {
      showOperation() {
        this.$refs.location.show=true
      }
    },
  }
</script>

<style scoped>
.confirm-order {
  background-color: #eee;
  height: 100vh;
}
.location {
  margin-bottom: 10px;
}
.list {
  background-color: #fff;
}
.scroll {
  position: absolute;
  right: 0;
  left: 0;
  top:46px;
  bottom:49px;
  overflow: hidden;
}
</style>