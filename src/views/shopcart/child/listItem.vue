<template>
    <div class="list-item">
        <check-button class="check" :isChecked="product.checked" @click.native="checkClick"></check-button>
        <div class="itemMess">
            <div class="left"><img :src="product.image" alt=""></div>
            <div class="right">
                <div class="title">{{product.title}}</div>
                <div class="desc">{{product.desc}}</div>
                <div class="bottom">
                    <span class="price">${{product.price}}</span>
                    <span class="count">X{{product.count}}</span>
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script>
import checkButton from "components/common/checkButton/checkButton"
export default {
     name:"listItem",
     props:{
         product:{
             type:Object,
             default(){
                 return {}
             }
         }
     },
    data() {
        return {

        };
    },
    components:{
        checkButton,
     },
    created() {

    },
    mounted() {

    },
    methods: {
        checkClick(){
            this.product.checked=!this.product.checked
        }
    }
};
</script>

<style scoped >
.list-item{
    display:flex;
    height: 100px;
    align-items: center;
}
.check{
    width:8%;
}
.itemMess{
    width:92%;
    height: 100%;
    display:flex;
    align-items: center;
}
.left{
    height: 100%;
    width: 30%;
    display:flex;
    align-items: center;
    justify-content: center;

}
.left img{
    width: 80%;
    height: 90%;
}
.right{
    height: 90%;

    width:70%;
    /* display: flex; */
    display: flex;
    align-content:space-between;
    justify-content:center;
    
    flex-wrap: wrap;
}
.right .title{
    /* text-align: center; */
    width:80%;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
}
.right .desc{
    /* text-align: center; */
    width:80%;
    font-size: 12px;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
}
.right .bottom{
    width:80%;

}
.bottom .price{
    float: left;
    margin-left: 10px;
    color:#ff1511;
    font-size: 14px;
}
.bottom .count{
    float: right;
    margin-right: 10px;
    font-size: 14px;
}

</style>
