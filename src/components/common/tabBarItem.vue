<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="img"></slot></div>
      <div v-else><slot name="actimg"></slot></div>
      <div :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
    name:'tarBarItem',
    
    props:{
        path:String
    },
    computed: {
        isActive() {
            return this.$route.path.indexOf(this.path) !== -1
            },
        activeStyle(){
            // 需要注意的是通过vue设置style属性 属性值一律都要加引号
            return this.isActive?{color:'red'}:{}
            }
    },
    //   isActive() {
    //     // /home -> item1(/home) = true
    //     // /home -> item1(/category) = false
    //     // /home -> item1(/cart) = true
    //     // /home -> item1(/profile) = true
    //     return this.$route.path.indexOf(this.path) !== -1
    //   }
    // }
        
        
    methods:{
        itemClick(){
            this.$router.replace(this.path)
         },
         

    // }
   
}}
</script>

<style scoped>
    .tab-bar-item{
        flex:1;
        height: 49px;
        /* line-height: 100px; */
        text-align: center;
    }
    .tab-bar-item img{
        height:30px;
        vertical-align: middle;
    }

</style>