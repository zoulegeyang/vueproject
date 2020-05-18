// getters相当于Vue组件中的computed 所以里面的对象都是函数实现的方法
export default {
    length(state){
        return state.userInfo.cartList.length
    },
    list(state){
        return state.userInfo.cartList
    },

    getUserInfo(state) {
        return state.userInfo
    },
    getTrait(state) {
        return state.userInfo.protrait
    }
}