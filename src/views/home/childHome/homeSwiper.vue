<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="(item,index) in banners" :key="index"> 
    <a :href="item.link">
                  <img :src="item.image" @load="swiperLoad" class="image">
              </a>
  </van-swipe-item>
  
</van-swipe>
  </div>
</template>

<script>
  export default {
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      },
    },
    methods:{
        swiperLoad(){
            
            if(!this.isLoad){
                // console.log("----")
                this.$emit("imageLoad")
                this.isLoad=true
            }
            
        }
    }
  }
</script>

<style  scoped>
.image {
  width:100%;
  margin:0!important
}
.my-swipe {
  height: 195px!important;
  overflow: hidden;
  background-color: pink;
}
</style>