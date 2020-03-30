<template>
    <div class="image-info">
        <div class="top">
            <p>{{detailImage.desc}}</p>
            
        </div>
        <div class="images" v-if="detailImage.detailImage">
            <span>{{detailImage.detailImage[0].key+':'}}</span>
            <div v-for="(item,index) in detailImage.detailImage[0].list" class="dd" :key="index">
                <img :src="item" alt="" @load="imgLoad">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"detailImageInfo",
    props:{
        detailImage:{
            type:Object,
            default(){
            return {}
            }
        }
        
    },
    methods:{
        // 监听商品详情图是否全部载入 并利用混入里面的的bounce函数 实现防抖
        imgLoad(){
            this.$emit('imgLoad')
        }
    }
}
</script>

<style scoped>
.top{
    height: 80px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.top p{
    /* height: 70%; */
    width:80%;
    /* 超出文本以省略号的形式显示 */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    /* margin: 0 auto; */


}
.images span{
    font-size: 12px;
    margin-left: 10px;
    /* padding-bottom: 100px; */
}
.dd{
    margin-top: 10px;
}
.images img{
    width: 100%;
}

</style>