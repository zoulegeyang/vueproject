<template>
    <div class="shop-info">
        <div class="top">
            <span class="image">
                <img :src="shopInfo.logo" alt="">
            </span>
            <span>{{shopInfo.name}}</span>
        </div>
        <div class="middle">
            <div class="left">
                <div class="first">
                    <div>{{shopInfo.sells}}</div>
                    <div>总销量</div>
                </div>
                <div class="second">
                    <div>{{shopInfo.goods}}</div>
                    <div>全部宝贝</div>
                </div>
            </div>
            <div class="right">
                <div class="score" v-for="(item,index) in shopInfo.score" :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.score}}</span>
                    <i v-if="shopInfo.score.isbetter==true" class="better">高</i>
                    <i v-else class="bad">低</i>
                </div>
            </div>
        </div>
        <div class="bottom">
            <button>进店逛逛</button>
        </div>
    </div>
  
</template>

<script>
export default {
    name:"detailShopInfo",
    props:{
        shopInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
.top{
    /* width:40px; */
    height: 60px;
    display: flex;
    align-items: center
    
}
.top .image{
    margin-left: 20px;
    margin-right: 20px;

}
.top img{
    width: 40px;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 20px;
}
.top span{
    color:#aaa;
    font-size: 14px;
}
.middle{
    display:flex;
    height: 70px;
    align-items: center;
}
.middle .left{
    width: 50%;
    display: flex;
    justify-content:space-evenly;
    font-size: 14px;
    
}
.middle .right{
    font-size: 14px;
    
}
.middle .right span{
    display: inline-block;
    width: 60px;
    margin-bottom:4px;
}
.middle .right .better{
    background-color: #11ff00;
}
.middle .right .bad{
    background-color: #ff1111;
}
.bottom{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding-bottom: 20px;
    border-bottom:1px solid rgba(189,189,189,.3);
}
.bottom button{
    border:none;
    border-radius: 10px;
    display: inline-block;
    margin:0 auto;
    width: 80px;
    height: 30px;
    background-color: #999;
    font-size: 14px;
    color: #333;
    
}

</style>