export default {
    // 和mutations的区别是第一个参数context
    //由于点击购物车后需要 确保商品已经添加到购物车里才能,显示购物已经添加成功有个先后关系 所以对这个函数搞一个promise封装
    cartKeeper(context,payload){
      return new Promise((resolve,reject)=>{
      let temp=null
      for (let item of context.state.cartList) {
        if(item.iid==payload.iid){
            temp=item
        }
      }
      if(temp){
        // mutations通常都做单一的事情 actions做逻辑处理等到真要改变state的状态时 再交给mutaitions处理
        // temp.count+=1; 由于mutations无法取到temp 所以需要将这个东西发出去
        context.commit('addCounter',temp)
        resolve('商品数量加1')
      }else{
        
        // 这一行直接注释 由于mutations可以取到state
        // context.state.cartList.push(payload)
        // 但是要和mutations的事务绑定在一起
        context.commit('addCart',payload)
        resolve('商品已添加到购物车')

        
        }
      })
      // 这个写在判断最后不管有没有重复都添加到购物车里
      
      // console.log(temp.iid)
      // console.log(temp.count)

      },
      userKeeper(context,payload) {
        return new Promise((resolve,reject)=>{
          context.commit('setInitUserInfo',payload)
          resolve(context.state.userInfo)
        })
      },
      updateUserProtrait(context,payload) {
        context.commit('updateUserProtrait',payload)
      },
      updateUserInfo(context,payload) {
        context.commit('updateUserInfo',payload)
      }
  }