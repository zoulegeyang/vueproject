<template>
  <div>
      <swiper>
          <swiper-Item v-for="item in banners">
              <a :href="item.link">
                  <img :src="item.image" alt="" @load="swiperLoad">
              </a>
          </swiper-Item>

      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
    name:"homeSwiper",
    data(){
        return {
            isLoad:false,
        }
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
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

<style>

</style>