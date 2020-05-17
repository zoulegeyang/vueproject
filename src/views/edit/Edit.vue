<template>
  <div class="edit">
    <van-nav-bar @click-left="$router.go(-1)" title="编辑用户详情" left-arrow></van-nav-bar>
    <van-cell-group>
      <van-cell title="更改头像">
        <span class="showImage">
          <div class="inline-block" >
            <van-icon class="icon" name="manager-o" v-if="!getUserInfo.protrait"/>
            <div class="block" v-else>
            <img :src="'http://localhost:5000'+getUserInfo.protrait">
            </div>
          <input type="file" class="inputImage" @change="fileUpload" ref="file">
          </div>
          
        </span>
       
      </van-cell>
      <van-cell title="修改用户名" :value="getUserInfo.username?getUserInfo.username:'还没用户名'" @click="open('用户名')"/>
      <van-cell title="修改手机号" :value="getUserInfo.phone" @click="open('手机号')"/>
      <van-cell title="修改密码"  @click="open('密码')"></van-cell>
      <van-cell title="修改邮箱" :value="getUserInfo.email?getUserInfo.email:'还没邮箱'" @click="open('邮箱')"></van-cell>

    </van-cell-group>

    <over-form :flag="flag" :show.sync="show"></over-form>


<!-- 验证码相关 -->
    <!-- 输入手机的键盘 -->
      <!-- <van-number-keyboard v-model="phone" :show="keyboardShow" @blur="keyboardShow = false"/>
      <van-number-keyboard v-model="authCode" :show="codekeyboardShow" @blur="codekeyboardShow = false"/>
      <van-number-keyboard v-model="password" :show="pwdkeyboardShow" @blur="pwdkeyboardShow = false"/> -->
  </div>
</template>

<script>
import OverForm from "./children/OverForm"

import {mapGetters,mapActions} from "vuex"
  export default {
    name:'edit',
    components: {
      OverForm,
    },
    data() {
      return {
        keyboardShow: false,
        codekeyboardShow:false,
        pwdkeyboardShow:false,
        // username:'',
        // phone:'',
        // password:'',
        // email:'',
        // authCode:'',
        show:false,// 控制遮罩层的显示和隐藏
        flag:'', //控制表单的显示哪一个
        
        // isDisable:false, 
      }
    },
    computed: {
      ...mapGetters(['getUserInfo']),
      
    },
    methods: {
      ...mapActions(['updateUserProtrait']),
      open(flag) {
        this.flag= flag;
        this.show = true
      },
      fileUpload() {
        let formdata = new FormData()
        formdata.append('image',this.$refs.file.files[0])
        this.$http.post('upload',formdata)
      .then(res=>{
        // 成功以后更新vuex
        if(res.data.code == 200) {
          this.updateUserProtrait(res.data.webpath)
          this.$toast.show('修改成功',2000)
        }else {
          console.log(res)
        }
      })
      .catch(err=>console.log(err))
      },
      // open(flag) {
      //   this.flag= flag;
      //   this.show = true
      // },
      // getAuthCode() {
      //   this.isDisable = true;
      //   let time = 10;
      //   let timer=setInterval(()=> {
      //     this.buttonText = '还剩'+time+'s';
      //     time--;
      //   },1000)
      //   setTimeout(()=> {
      //     clearInterval(timer),
      //     this.isDisable = false;
      //     this.buttonText = '获取验证码'
      //   },10000)
      // }
    },
  }
</script>

<style scoped>
.showImage {
   display: block;
   position: relative;
   left: 120px;
   overflow: hidden;
   /* background-color: pink; */
   width: 40px;
   height: 30px;
   /* background-color: pink; */
     border-radius: 50%;

   
}
/*  icon头像的设置问题 注意都是用i 的::before来设置的所以要在包含块的第一个元素那  */
.icon {
  position: absolute;
  right: 5px;
  display: block;
  font-size: 30px;
  /* margin-right: 5px; */
  width:100%;
  /* z-index: 99; */
}
.inputImage {
  display: inline-block;
  position: relative;

  left: 0px;
  opacity: 0;
}
.inline-block {
  display: inline-block
}
.block {
  position: absolute;
  height: 30px;
  width:40px;
  border-radius: 50%;

}
img {
  margin: 0 !important;
  padding-top:5px;
  width:100%;
  /* height: 100%; */
}


</style>