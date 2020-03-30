export default {
    addCounter(state,payload){
      payload.count++
    },
    addCart(state,payload){
      payload.count=1;
      state.cartList.push(payload)
    }
  }