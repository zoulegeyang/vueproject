<template>
    <div class="list-item">
        <div slot="check">
        <check-button class="check" :isChecked="product.checked" @click.native="checkClick"></check-button>
        </div>
        <div class="itemMess">
            <div class="left"><img :src="product.image" ></div>
            <div class="right">
                <div class="title">{{product.title}}</div>
                <!-- <div class="desc">{{product.desc}}</div> -->
                <div class="bottom">
                    <span class="price">${{product.price}}</span>
                    <span class="count">X{{product.count}}</span>
                    
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
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
    // computed:{
    //     ...mapGetters({
    //         product:'list'
    //     })
    // },
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
    height: 120px;
    align-items: center;
    /* border-bottom: 1px solid #ffffff; */
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
