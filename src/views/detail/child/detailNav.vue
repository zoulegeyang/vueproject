<template>
  <div class="detail-nav">
      <nav-bar>
          <div class="left" slot="left" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="" class="back">
          </div>
          <div slot="center" class="center">
              <div v-for="(item,index) in titles" class="item" :class="{active:index==currentIndex}" @click="itemClick(index)" :key="index">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import navBar from "components/common/navBar"
export default {
    name:"detailNav",
    data(){
      return{
          titles:['商品','参数','评论','推荐'],
          currentIndex:0,
      }  
    },

    components:{
        navBar,
    },
    methods:{
        itemClick(index){
            this.currentIndex=index 
            this.$emit('itemClick',index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
/* .detail-nav{
    background-color: blue;
} */
.center{
    display:flex;
    text-align: center;
    font-size: 13px;
}
.item{
    flex:1
}
.active{
    color:pink;
}
.back{
    margin-top:9px;
    margin-left: 10px;
}
</style>