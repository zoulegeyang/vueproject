<template>
    <div class="cart-bottom-bar">
        <check-button class="check" :isChecked="isChecked" @click.native="checkAll"></check-button>
        <div class="check-text">全选</div>
        <!-- <div v-if="barShow" class="showMai"> -->
            <div class="total-price" v-if="barShow"><span>合计:${{totalPrice}}</span></div>
            <div class="total" v-if="barShow" @click="$router.push('/confirm')"><span>去计算({{totalCount}})</span></div>

            <!-- <div v-else class="delete-bar"> -->
                <van-button round plain size="small" class="dele-button" v-else @click="deletGoods">删除</van-button>
            <!-- </div>   -->
   
    </div>
</template>

<script>
import {mapActions} from "vuex"
import checkButton from "components/common/checkButton/checkButton"
export default {
     name:"cartBottomBar",
    data() {
        return {    

        };
    },
    props: {
        barShow: {
            type: Boolean,
        },
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
            return this.$store.state.userInfo.cartList.filter(item=>{
                return item.checked
            }).reduce((pre,item)=>{
                return pre+item.price*item.count
            },0).toFixed(2)
        },
        // 总数量
        totalCount(){
            return this.$store.state.userInfo.cartList.filter(item=>{
                return item.checked
            }).reduce((pre,item)=>{
                return pre+item.count
            },0)
        },
        // 判断全选按钮是否显示点击时候的样子
        isChecked(){
            // 这个判断是表明购物车没有东西的时候全选按钮也为false 不然下面的函数虽然没有找到一个勾选的东西 也会返回false  但是所有的都没有找到打钩的时候以为全选了 
            // 下面的逻辑是判断没有打钩 而不是判断所有的打钩
            if(this.$store.state.userInfo.cartList.length==0)
                return false
            // 逻辑谁这样子的 只要找到一个没有选中的就返回成功就是true 但是成功找到一个没有选中 是要表明全选按钮不选 所以在加个!
            
            return !this.$store.state.userInfo.cartList.find(item=>{
                return !item.checked
            })
        },
       
    },
    methods: {
        ...mapActions(['updateUserInfo']),
         checkAll(){
            // isChecked是上面的计算属性 代表是否被全部选中  逻辑点击全选按钮的时候 如果原来为全部选中则 将所有的checked的改为false,否则(包括部分选中以及全没选中)全部改为true
            if(this.isChecked){
                this.$store.state.userInfo.cartList.forEach(item=>{
                    item.checked=false;
                })
            }else{
                this.$store.state.userInfo.cartList.forEach(item=>{
                    item.checked=true;
                })
            }
            // 不能像下面这样写 由于isChecked和check的是相互影响的 我们并没有主动设isChecked的值,都是通过checked决定的
            // this.$store.cartList.forEach(item=>{
            //     item.checked=!isChecked
            // })
        },
        deletGoods() {
            // 先看有无商品被选中 若有才能进行下一步 若无 提示选择商品
            let tmp = this.$store.state.userInfo.cartList.some(item=>{
                return item.checked == true
            })
            if(tmp) {
                // 先提示用户是否确认删除
            this.$dialog.alert({
                title:'确认删除选中的商品吗',
                confirmButtonColor:"#ff0000",
                confirmButtonText:"心意已决",
                cancelButtonText:"手滑了",
                showCancelButton:true,
            })
            .then(()=>{
                let goods = []
            this.$store.state.userInfo.cartList.forEach(item=>{
                if(item.checked == true) {
                    goods.push(item.iid)
                }
            })

            this.$http.post('cart/remove',{
                ids:goods
            })
            .then(res=>{
                if (res.data.code == 200) {
                    console.log(goods)
                let newCart = this.$store.state.userInfo.cartList.filter(item=>{
                    for (let i of goods) {
                        console.log(i)
                        // 不能比较不相等 因为比较不相等就返回true的话会导致循环也结束了还有一些没比
                        // 然而return false 的情形是 只要一个不符合 则那个元素就不符合 所以可以终止循环
                        if(item.iid==i){
                            return false
                        }
                        
                    }
                    return true
                })
                    this.updateUserInfo({name:'cartList',value:newCart})
                    this.$toast.show('删除成功',2000)
                }else {
                    this.$toast.show('删除失败',2000)
                }
            })
            console.log(goods)
            })
            .catch(()=>{
                return
            })
            }else {
                this.$toast.show('还未选择商品',2000)
            }
            

            
        }
    }
};
</script>

<style scoped >
.cart-bottom-bar{
    
    display:flex;
    height: 40px;
    line-height: 40px;
    background-color: #eeeeef;
    align-items: center;

}
.check-text {
    font-size: 10px;
}
.check{
    width: 8%;
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
.delete-bar {
    position: absolute;
    top:0;
    right: 20px;
    height: 100%;
    line-height: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}
.dele-button {
    position: absolute;
    right: 20px;
    height: 100%;
    top:-9px;
    /* transform: translate(-50%); */
}
</style>
