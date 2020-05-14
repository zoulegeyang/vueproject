import {request} from "./request"

export function getMultidata(){
    return request({
        url:'/home/multidata'
    })
}
export function getGoods(type,page){
    return request({
        url:"/home/data",
        params:{
            type,
            page
        }
    })
}