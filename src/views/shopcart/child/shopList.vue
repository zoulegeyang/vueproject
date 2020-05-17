<template>
    <div class="shop-list">
       
        <div class="list-item" v-for="(item,index) in products" :key="index" >
        <check-button class="check" :isChecked="item.checked" @click.native="item.checked=!item.checked"></check-button>
        <div class="itemMess">
            <div class="left"><img :src="item.image" alt=""></div>
            <div class="right">
                <div class="title">{{item.title}}</div>
                <!-- <div class="desc">{{product.desc}}</div> -->
                <div class="bottom">
                    <span class="price">${{item.price}}</span>
                    <span class="count">X{{item.count}}</span>
                    <!-- <van-stepper v-model="item.count" /> -->
                </div>
                
            </div>
            
        </div>
    </div>
    </div>
</template>

<script>
// import listItem from "./listItem"
import checkButton from "components/common/checkButton/checkButton"
import { mapGetters } from 'vuex';
export default {
     name:"shopList",
    data() {
        return {

        };
    },
    computed:{
        // ...mapGetters({
        //     products:'list'
        // })
        products :{
            get () {
                return this.$store.state.cartList
            },
            // set(value) {
            //     this.$store.commit('addCounter',{value,type:'count'})
            // }
        }
    },
    components:{
        // listItem,
        checkButton
     },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped >
.list-item{
    display:flex;
    height: 120px;
    align-items: center;
    border-bottom: 1px solid #ccc;
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
    padding-top: 10px;
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
    font-size: 30px;
    font-weight: 1000;
    margin-bottom: 10px;

}
.bottom .price{
    float: left;
    margin-left: 10px;
    color:#ff1511;
    font-size: 14px;
}
.bottom .count{
    margin-left: 10px;
    float: left;
    margin-right: 10px;
    font-size: 14px;
}
</style>
