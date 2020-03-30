<template>
    <!-- <div class="detail-swiper"> -->
        <swiper class="detail-swip">
            <swiper-item v-for="item in images">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
    <!-- </div> -->
  
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
    name:"detailSwiper",
    props:{
        images:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>
.detail-swip{
    height:300px;
}

</style>