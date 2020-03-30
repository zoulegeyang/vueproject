<template>
  <div class="recommend">
      <goods-list :goods="recommend"></goods-list>
  </div>
</template>

<script>
import goodsList from "components/contents/goods/goodsList"
export default {
    name:"detailRecommend",
    props:{
        recommend:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        goodsList,
    }
}
</script>

<style scoped>
.test{
    width: 300px;
    height: 300px;
    background-color: #ff00ff;
}

</style>