import {request} from "./request"

// 这边不是default 外边导入的时候要加{}且不能取别名  大坑 !!!
export function getDetail(iid){
    return request({
        url:"/detail",
        params:{
            iid 
        }
    })
}
export class des{
    constructor(itemInfo,columns,services){
        this.columns=columns;
        this.title=itemInfo.title;
        this.price=itemInfo.lowNowPrice
        this.oldPrice=itemInfo.oldPrice;
        this.discount=itemInfo.discountDesc;
        this.discountBgc=itemInfo.discountBgColor;
        this.deliver=services[services.length-1].name;
        this.deliverIcon=services[services.length-1].icon;
        this.services=services
        this.sells=columns[0]
        this.lov=columns[1]
        


    }
}
export class shopInfo{
    constructor(shopInfo){
        this.logo=shopInfo.shopLogo;
        this.score=shopInfo.score;
        this.goods=shopInfo.cGoods;
        this.sells=shopInfo.cSells;
        this.name=shopInfo.name
    }
}
export function getRecommend(){
    return request({
        url:"/recommend"
    })
}