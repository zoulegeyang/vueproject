<template>
  <div class="detail-nav">
      <nav-bar>
          <div class="left" slot="left" @click="backClick" >
              <!-- <img src="~assets/img/common/back.png" class="back"> -->
              <span class="back">返回</span>
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
.left{
    height: 100%;
    /* line-height: 100%; */
    display: flex;
}
.back{
    /* position:absolute;
     */
    align-content: center;
    font-size:13px ;
    font-weight: bold;
    /* margin-bottom:5px; */
    margin-left: 10px;
    color: #666;
    /* width: 100%; */
    /* left: ; */
    /* height: 100%; */
}
.back:hover{
    color:pink;
}
</style>