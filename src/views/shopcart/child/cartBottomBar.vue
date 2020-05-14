<template>
    <div class="cart-bottom-bar">
        <check-button class="check" :isChecked="isChecked" @click.native="checkAll"></check-button>
        <div class="total-price"><span>合计:${{totalPrice}}</span></div>
        <div class="total"><span>去计算({{totalCount}})</span></div>
    </div>
</template>

<script>
import checkButton from "components/common/checkButton/checkButton"
export default {
     name:"cartBottomBar",
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
    computed:{
        // 由于是vuex管理的数据可以直接拿 不需要向父元素请求
        // 总价格
        totalPrice(){
            return this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((pre,item)=>{
                return pre+item.price*item.count
            },0).toFixed(2)
        },
        // 总数量
        totalCount(){
            return this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((pre,item)=>{
                return pre+item.count
            },0)
        },
        // 判断全选按钮是否显示点击时候的样子
        isChecked(){
            // 这个判断是表明购物车没有东西的时候全选按钮也为false 不然下面的函数虽然没有找到一个勾选的东西 也会返回false  但是所有的都没有找到打钩的时候以为全选了 
            // 下面的逻辑是判断没有打钩 而不是判断所有的打钩
            if(this.$store.state.cartList.length==0)
                return false
            // 逻辑谁这样子的 只要找到一个没有选中的就返回成功就是true 但是成功找到一个没有选中 是要表明全选按钮不选 所以在加个!
            
            return !this.$store.state.cartList.find(item=>{
                return !item.checked
            })
        },
       
    },
    methods: {
         checkAll(){
            // isChecked是上面的计算属性 代表是否被全部选中  逻辑点击全选按钮的时候 如果原来为全部选中则 将所有的checked的改为false,否则(包括部分选中以及全没选中)全部改为true
            if(this.isChecked){
                this.$store.state.cartList.forEach(item=>{
                    item.checked=false;
                })
            }else{
                this.$store.state.cartList.forEach(item=>{
                    item.checked=true;
                })
            }
            // 不能像下面这样写 由于isChecked和check的是相互影响的 我们并没有主动设isChecked的值,都是通过checked决定的
            // this.$store.cartList.forEach(item=>{
            //     item.checked=!isChecked
            // })
        },
    }
};
</script>

<style scoped >
.cart-bottom-bar{
    
    display:flex;
    height: 40px;
    background-color: yellow;

}
.check{
    width: 13%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.total-price{
    flex:1;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    color:#999;
    /* line-height: 100%; */
    /* vertical-align: center; */
    /* text-align: center; */
}
/* .total-price{ */
    /* margin-left: 12px; */
/* } */

.total{
    display: flex;
    height: 100%;
    /* line-height: 100%; */
    text-align: center;
    /* vertical-align: center; */
    width: 33%;
    background-color: red;
    align-items: center;
    justify-content: center;
    color:#fff;

}

</style>
