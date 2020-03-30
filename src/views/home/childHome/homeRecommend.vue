<template>
  <div class="recommend">
      <div v-for="item in recommends" class="itemm">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:"homeRecommend",
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.recommend{
    display:flex;
    text-align:center;
    font-size:12px;
    padding:10px 0 12px;
    border-bottom:5px solid #eee;
}
.itemm{
    flex:1;
}
.itemm img{
    width: 75px;
    height: 75px;
    margin-bottom:3px;
}

</style>