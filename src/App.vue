<template>
  <div id="app">
    <keep-alive exclude="detail,confirm">
      <router-view></router-view>
    </keep-alive>
        
    <main-tab-bar/>
    
    
  </div>
</template>

<script>

import MainTabBar from "components/contents/mainTabBar"


export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>
<style>
@import "assets/css/base.css";
img {
  margin-top:0!important;
}
</style>
