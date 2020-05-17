<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" class="item" :key="index"
      @click="itemClick(index)">
          <span :class="{active:index===currentIndex}">{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:"tabControl",
    data(){
     return {
         currentIndex:0
     }
    },
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex=index;
            // 向外界发送时间点击同时传递信息 组件之间的交互
            this.$emit('tabClick',index)
        },
        
    }
}
</script>

<style scoped>
.tab-control{
    display:flex;
    line-height: 30px;
    height: 30px;
    /* margin-top:10px; */

}
.item{
    flex:1;
    text-align: center;
}
.item span{
    padding:4px;
    /* border-bottom:1px solid  */
}
.active{
    color:pink;
    border-bottom: 1px solid pink;
}

</style>