<template>
  <div class="goods-list">
      <goods-list-item v-for="(item,index) in goods" :item="item" class="zitem" :key="index">

      </goods-list-item>
  </div>
</template>

<script>
import goodsListItem from "./goodsListItem"

export default {
    name:"goodsList",
    components:{
        goodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.goods-list{
    margin-top:10px;
    width:100%;
    display:flex;

    flex-wrap: wrap;
    justify-content: space-around;
}
.zitem{
    /* flex:1; */
    width: 48%;
    /* background-color: #0f0f; */
    
}

</style>