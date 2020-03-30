<template>
    <div class="des" v-if="Object.keys(des)!==0">
        <div class="title">
            {{des.title}}
        </div>
        <div class="price">
            <span class="left-price">${{des.price}}</span>
            <span class="old-price">{{des.oldPrice}}</span>
            <!-- Vue一般不用style属性 除非从某处得到一个css属性的值则会用 一般是用class 来动态的决定用不用某个属性 -->
            <span class="discount" :style="{backgroundColor:des.discountBgc}">{{des.discount}}</span>
        </div>
        <!-- 需要加v-if判断 不加会报错 虽然结果不影响 -->
        <div class="sell" v-if="des.columns&&des.services">
            <span>{{des.columns[0]}}</span>
            <span>{{des.columns[1]}}</span>
            <span>
                <img :src="des.deliverIcon" alt="">
                <span>{{des.deliver}}</span>
            </span>

        </div>
        <div class="service" v-if="des.services">
            <span v-for="index in des.services.length-1" :key="index">
                <img :src="des.services[index-1].icon" alt="">
                <span>{{des.services[index-1].name}}</span>
            </span>
        </div>
    </div>
  
</template>

<script>
export default {
    name:"detailDes",
    data(){
        return {
            // discountBgc:this.des.discountBgc
        }
    },
    props:{
        des:{
            type:Object,
            defalut(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
img{
    width: 10px;
    height: 10px;
    
}
.title{
    padding:10px 0;
    
}
.price span{
    margin-left: 10px;
}
.left-price{
    color: pink;
    font-size: 24px;
    font-weight: bold;
}
.old-price{
    text-decoration: line-through;
}
.discount{
    background-color: pink;
    padding: 3px;
    color: #fff;
    text-align: center;
    border-radius: 5px;
}
.sell{
    display:flex;
    margin-top: 10px;
    color:#ccc;
    font-size: 10px;
    justify-content: space-between;
}
.service{
    /* height: 50px; */
    display:flex;
    margin-top: 10px;
    /* justify-content: space-between; */
    border-top:2px solid rgba(189,189,189,.3);
    border-bottom:1px solid rgba(189,189,189,.3);
    padding:10px 0;
}
.service span{
    font-size: 12px;
    margin-left: 5px;
    /* flex:1 1 20px; */
}
/* .service:last-child{
    width:30px
} */
</style>