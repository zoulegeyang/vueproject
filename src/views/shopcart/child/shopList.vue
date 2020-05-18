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
                    <div class="b-left">
                        <span class="price">${{item.price}}</span>
                    <span class="count">X{{item.count}}</span>
                    </div>
                    <div class="b-right">
                    <van-stepper :value="item.count" @change="stepChange($event,index,item.iid)"/>

                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
    </div>
</template>

<script>
// import listItem from "./listItem"
import {mapActions} from "vuex"
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
                return this.$store.state.userInfo.cartList
            },
            // 计数器和vuex值中每个id商品数据的绑定 由于需要修改的时候需要传参无法实现 改用方法修改
            // set(value) {
            //     this.$store.commit('addCounter',{value,type:'count'})
            // }
        }
    },
    components:{
        // listItem,
        checkButton
     },
    
    methods: {
        ...mapActions(['updateGoodCount']),
        // 做两个事 一个更新vuex里的数据 一个更新数据库
        stepChange(value,index,iid) {
            this.updateGoodCount({index,value})
            this.$http.post('cart/goodCount', {
                iid,
                count:value
            })
            .then(res =>{
                console.log(res)
            })
        }
    }
};
</script>

<style scoped >
.list-item{
    display:flex;
    height: 120px;
    align-items: center;
    border-bottom: 1px solid #eee;
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
    width:90%;
    font-size: 30px;
    font-weight: 1000;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content:space-around;
}
.bottom .b-left {
    line-height: 100%;
    display: flex;
    align-items: center;
}
.bottom .price{
    /* float: left; */
    margin-left: 10px;
    color:#ff1511;
    font-size: 14px;
}
.bottom .count{
    margin-left: 10px;
    /* float: left; */
    margin-right: 10px;
    font-size: 14px;
}
.b-right {
    /* width: 100%; */
    height: 100%;
    font-size: 10px;
}
</style>
