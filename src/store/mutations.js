export default {
  // 这个是获取整体的购物车
    addCounter(state,payload){
      payload.count++
    },
    addCart(state,payload){
      payload.count=1;
      state.cartList.push(payload)
    },
    
    // 设置用户信息
    setInitUserInfo(state,payload) {
      state.userInfo = {...payload}
    },
    // 更改用户头像
    updateUserProtrait(state,payload) {
      state.userInfo.protrait = payload 
      // 由于修改的是对象 所以用通过下面的这种方法来使得值的修改可以被vue检测到
      let tmp = {...state.userInfo}
      state.userInfo = {...tmp}
    },
    updateUserInfo(state,payload) {
      state.userInfo[payload.name] = payload.value
      
    }
  }