import {debounce} from "common/util"
export const listenerMix={
    data(){
        return{
            imgLoad:null,
            refresh:null,
        }
    },
    mounted(){
        // console.log("111111")
        // console.log(debounce)
        this.refresh=debounce(this.$refs.bscroll.refresh,100)
        this.imgLoad=()=>{this.refresh() }
        this.$bus.$on('imgLoad',this.imgLoad)
          // this.debounce(this.$refs.bscroll.refresh,50)
          // this.$refs.bscroll.refresh()
          
        // console.log('mix1')
       
      },
}
export const backTopMIx={
  data(){
    return{
      isShow:false,
    }
  },
  methods:{
    xianshi(position){
      // 检测回到顶部按钮是否显示
      if((-(position.y))>1000){
        this.isShow=true
      }else{
        this.isShow=false
          // console.log(-(position.y))
        }
      },
    backClick(){
      this.$refs.bscroll.scrollTo(0,0)
    },
    }
}
