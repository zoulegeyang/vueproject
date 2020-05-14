<template>
  <div class="category">
      <div class="warpper"><div class="header">商品分类</div></div>
      <div class="content">
          <bscroll class="aside-scroll" >
          <div class="sidebar">
          <van-sidebar v-model="firstActive" @change="onChange">
          <van-sidebar-item v-for="item in cateTittle" :key="item.maitKey" :title="item.title"></van-sidebar-item>
      </van-sidebar>
      
      </div>
      </bscroll>
      <div class="main" ref="container" >
          <!-- <van-tabs></van-tabs> -->
          <grid :grid-data="subCateData.GridData"> </grid>
          <!-- <van-sticky :offset-top="44" :container="container"> -->
              <tabs :type-data="subCateData.TypeData" @change-active="getActive" ref="tabs" class="tabs"></tabs>
          <!-- </van-sticky> -->
          
      </div>
      </div>
      
      
      
  </div>
  
</template>

<script>
import Tabs from "./child/Tabs"
import Grid from "./child/Grid"
import Bscroll from "@/components/common/bscroll/Bscroll"
import { getCategory, getSubCategory,getCategoryDetail} from "@/network/category"
export default {
    name:'Category',
    data() {
        return {
            //第一级菜单的数据
            cateTittle: [],
            firstActive:0,//一级菜单被选中的项
            tabActive:'pop',

            
            // 下级菜单的数据
            subCateData: {
                GridData:[],
                TypeData:{
                    pop:[],
                    sell:[],
                    new:[]
                }
            },
            container:null,
        }
    },
    created() {
        getCategory().then(res=>{
            console.log(res)
            this.cateTittle = res.data.category.list
            this.onChange(0)
        })
        // this.onChange()
        
    },
    mounted () {
        // this.container =this.$refs.container
    },
    methods: {
        //sidebar 变动时触发的事件 
        onChange(index) {
            // console.log(index)
            this.firstActive = index
            let maitKey = this.cateTittle[index].maitKey
            let miniWallkey = this.cateTittle[index].miniWallkey
            
            // 获取分类数据  每次获取分类数据 要将子分类数据都要渲染
            getSubCategory(maitKey)
                .then(res=>{
                    this.subCateData.GridData = res.data.list
                    // 获取 子分类数据
                    // console.log(res.data.list)
                    //每次获取子类数据的时候 都要将其的所有子分类数据都要渲染
                    for (let key of ['pop','sell','new']) {
                        
                        getCategoryDetail(miniWallkey,key).then(res=>{
                
                this.subCateData.TypeData[key] = res
                //同时将tabs的 active 变为第一个pop
                this.$refs.tabs.active = 'pop'
                
            })
                    }
                    
                })
            
        },
        //获取tab数据
        getActive(active) {
            // console.log(active)
            // this.tabActive = active
            let miniWallkey = this.cateTittle[this.firstActive].miniWallkey
            getCategoryDetail(miniWallkey,active).then(res=>{
                // console.log(res)
                this.subCateData.TypeData[active] = res
                // console.log(res)
                
            })
        }

    },
    components: {
        Bscroll,
        Grid,
        Tabs
    },
}   
</script>

<style scoped> 
.header {
    position: fixed;
    background-color: #f08899;
    font-size: 17px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    width:100%;
    height: 44px;
    line-height: 44px;
    
}
.aside-scroll{
  position: absolute;
  top: 44px;
  bottom:49px;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 85px;
}
.main {
    position: absolute;
    height: 400px;
    /* background-color: black; */
    top:44px;
    left: 85px;
    right: 0px;
    overflow: scroll;
    height: calc(100% - 93px);
    width:calc(100% - 85px);
}
/* .tabs {
    position: sticky;
    top:44px;
} */
</style>