<template>
  <div class="header">
    <div class="user-info">
      <div class="upload" v-show="!isLogin">
        <van-uploader image-fit :after-read="afterRead" class="uploader" :before-read="beforeRead" v-model="fileList" max-count="1" >
          <!-- <input type="file" @change="afterRead" ref="fileLoad"> -->
          <div class="uploadarea" v-show="fileList.length==0" @click="afterRead">
            <van-icon name="user-circle-o" class="icon" />
          </div>
        </van-uploader>
      </div>
      <div class="info" v-show="!isLogin">
        <div @click="Login">
          <span>{{getUserInfo.username}}</span>
          <span v-if="getUserInfo.phone=='10000000000'||!getUserInfo.phone">(点击登录)</span>
          <span v-else>(注销)</span>
          <!-- <span v-else>还未登录</span> -->
        </div>
        <div class="text">
          <van-icon name="phone-o" />
          <!--  调用计算属性不要写() 可以直接. 来得到返回值的后续 -->
          <span v-if="getUserInfo.phone!='10000000000'&&getUserInfo.phone">{{getUserInfo.phone}}</span>
          <span v-else>手机未绑定</span>
        </div>
      </div>
      
    </div>
    <!-- 编辑用户详情页面 -->
    <van-icon name="arrow" class="arrow" color="#fff" @click="$router.push('edit')"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {mapActions} from "vuex"

export default {
  name: "upload",
  data() {
    return {
      isLogin: false,
      fileList:[],

    };
  },
  // 初始化时看
  activated () {
    // 判断vuex里是否有userInfo 
    if(this.$store.getters.getUserInfo.protrait) {
      this.fileList=[{url:'http://localhost:5000'+this.$store.getters.getUserInfo.protrait}]
    }
    },
  // },
  computed: {
    ...mapGetters(['getUserInfo']),
    userInfo(){
      return this.getUserInfo.protrait
    }
  },
  // 可以监听计算属性 
  watch: {
    userInfo() {
      console.log(this.getUserInfo.protrait)
      console.log('11111')
      console.log(this.$store.getters.getUserInfo.protrait)
      if(this.getUserInfo.protrait){
        this.fileList=[{url:'http://localhost:5000'+this.getUserInfo.protrait}]
        console.log(this.fileList)
      }else {
        this.fileList = []
      }
      
    }
  },
  methods: {
    ...mapActions(['updateUserProtrait']),
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        this.$toast.show("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
    // chufaLoad() {
    //   this.fileLoad
    // },
    afterRead(file) {
      // let file=$event.target.files[0]
      // console.log($event)
      file.status = 'uploading';
      file.message = '上传中...';
      let formdata = new FormData()
      formdata.append('image',file.file)
      this.$http.post('upload',formdata)
      .then(res=>{
        // 成功以后更新vuex
        if(res.data.code == 200) {
          // this.fileList.push({url:res.data.webpath})
          // console.log(res.data.webpath)
          // console.log('111')
          this.updateUserProtrait(res.data.webpath)
          file.status = 'uploaded'
          this.showupload =false
        }else {
          console.log(res)
        }
      })
      .catch(err=>console.log(err))
      
    },
    Login() {
      this.$router.push('/login')
    }
  }
};
</script>

<style  scoped>
.header {
  height: 90px;
  /* line-height: 90px; */
  display: flex;
  align-items: center;
  background-color: #f08899;
  justify-content: space-between;
  margin-top: -1px;
}
.user-info {
  
  
  
  display: flex;
  align-items: center;
}
.upload {
  margin-left: 20px;
}
.uploadarea {
  height: 60px;
  border-radius: 50%;
  width: 60px;
  background-color: #fff;
  line-height: 60px;
  text-align: center;
  font-size: 60px;
  overflow: hidden;
}
.info {
  margin-left: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.text {
  font-size: 14px;
  font-weight: normal;
  margin-top: 5px;
}
.arrow {
  font-size: 16px;
  margin-right: 10px;
}
/* 可让上传区域上传图片的时候始终保持只有一个圆形框框 上传完不显示另一个框 */
.uploader {
  margin:0!important;
  border-radius: 50%!important;
  width:60px;
  height: 60px;
  overflow: hidden;
}
img{
  margin:0!important;
}


</style>