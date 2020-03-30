<template>
  <div class="goods-item" @click="jumpDetail">
      <div class="dimg"><img :src="showImage" alt="" @load="imgLoad"></div>
      <div class="item-text">
          <!-- <p>{{item.title}}</p> -->
          <span>{{item.price}}</span>
          <span>{{item.cfav}}</span>
      </div>

  </div>
</template>

<script>
export default {
    name:"goodsListItem",
    props:{
        item:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
      showImage(){
          if(this.item.image){
            //   console.log(this.item.image)
              return this.item.image
          }else{
            //   console.log(this.item.show.img)
              return this.item.show.img
          }
          
      }
    //   showImage(){
    //       if(this.item.show.img){
    //           console.log("----好奇怪----")
    //           return this.item.image
    //       }else if(this.item.image){
    //           console.log("好奇怪")
    //         //   return this.item.image
    //       }
          
    //   }   
    },  
    methods:{
        // 这里需要进行处理 由于goodsitem不仅home需要使用 detail也需要使用 但是进入detail的时候并不需要home页面并不需要监听这个事件 所以需要处理
        // 有两种方案 方案1通过 路由的路径判断当前的路由是哪个页面根据路由来设置需不需要发送监听事件
        // imgLoad(){
        //     if(this.$route.path.indexOf('/home')){
        //         this.$bus.$emit('imgLoad')
        //     }else if(this.$route.path.indexOf('/detail')){
        //         this.$bus.$emit('imgLoad')
        //     }
            
        // },
        // 第二种方案 不区分路由地址 但是组件内根据自己的消亡或激活状态选中监听不监听
        imgLoad(){
            this.$bus.$emit('imgLoad')
        },
        jumpDetail(){
            // console.log(this.item.iid)
            this.$router.push("/detail/"+this.item.iid)
        },
        // showImage(){
        //     if(this.item.show.img){
        //         console.log("----好奇怪----")
        //         return this.item.show.img
        //     }else{
        //         console.log("好奇怪")
        //         return this.item.image
        //     }
        
        // }  

    }
}
</script>

<style scoped>
.goods-item{
    position: relative;
    padding-bottom:50px;
    text-align:center;
}

.dimg img{
    width: 100%;
    height: 100%;
}
.item-text{
    position: absolute;
    left: 0;
    right: 0;
    bottom:5px;
}
.item-text p{
    overflow: hidden;
    font-size: 2px;
}

</style>