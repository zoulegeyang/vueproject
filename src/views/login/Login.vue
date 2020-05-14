<template>
  <div>
    <van-nav-bar
      v-if="isNote"
      fixed
      title="手机号登录注册"
      right-text="密码登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onclickRight"
    ></van-nav-bar>
    <van-nav-bar
      v-else
      fixed
      title="密码登录"
      right-text="短信登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onclickRight"
    ></van-nav-bar>
    <div class="logo">
      <img
        src="https://s10.mogucdn.com/mlcdn/c45406/190102_088f4i166l4gkl08k297h5kk8690i_260x200.png"
        alt
      />
    </div>

    <div class="form">
      <!-- <van-cell title="中国大陆" is-link v-show="isNote"></van-cell> -->
      <van-field
        v-model="phone"
        placeholder="请输入手机号"
        label="+86"
        type="tel"
        :error="telIserr"
        @input="telInput"
        
        @touchstart.native.stop="phoneTouch"
      >
        <template #button v-if="isNote">
          <van-button
            color="#f08899"
            :disabled="isDisableVer"
            :class="{ button: !isDisableVer }"
            size="small"
            @click="getVerify"
            plain
            ref="verifyButton"
            :text="text"
          ></van-button>
        </template>
      </van-field>
      <!-- 短信登录显示区域 -->
      <div class="authLogin" v-if="isNote">
        <van-field
          v-model="authCode"
          placeholder="请输入验证码"
          label="验证码"
          :error="codeIserr"
          @input="codeInput"
          @touchstart.native.stop="codeTouch"
        ></van-field>
        <van-button color="#f08899" block :disabled="verdisable" @click="submits">验证登录</van-button>
      </div>
      <!-- 密码登录显示区域 -->
      <div class="pwdLogin" v-else>
        <van-field
          v-model="password"
          placeholder="请输入密码"
          label="密码"
          type="password"
          clearable
          :error="pwdIserr"
          @input="pwdInput"
          
          @touchstart.native.stop="pwdkeyboardShow = true"
        >
          <template #button v-if="!isNote">
            <van-button plain color="#f08899" size="small" @click="forgetClick" text="忘记密码"></van-button>
            <!-- <div>忘记密码</div> -->
          </template>
        </van-field>
        <div class="buttonarea">
          <van-button class="van-button" block plain color="#f08899" width="50%" size="normal" @click="isNote=true">注册</van-button>
        <van-button class="van-button" block color="#f08899" size="normal" width="50%"  @click="pwdsubmits">登录</van-button>
        </div>
        
      </div>

      <!-- 图片验证码 -->
      <slide-verify
        v-if="isShow"
        ref="slideblock"
        @again="onAgain"
        @fulfilled="onFulfilled"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :imgs="imgs"
        :accuracy="3"
        slider-text="向右滑"
      ></slide-verify>
      <!-- 输入手机的键盘 -->
      <van-number-keyboard v-model="phone" :show="keyboardShow" @blur="keyboardShow = false"/>
      <van-number-keyboard v-model="authCode" :show="codekeyboardShow" @blur="codekeyboardShow = false"/>
      <van-number-keyboard v-model="password" :show="pwdkeyboardShow" @blur="pwdkeyboardShow = false"/>

      <!-- actionsheet -->
      <action-sheet @select-item="hanleSelect" ref="actionSheet"></action-sheet>
    </div>
  </div>
</template>

<script>
//拖动验证码组件
import { mapActions } from "vuex"

import { getCode, submit } from "@/network/login";

import ActionSheet from "./children/ActionSheet";
export default {
  data() {
    return {
      isNote: true, //控制显示 是手机登录还是密码登录
      phone: "",
      authCode: "",
      password: "",
      isShow: false, //图片验证的显示和隐藏
      telIserr: false, // 这两个用于控制用户的输入的正确与否 通过提交的时候进行验证
      codeIserr: false,
      pwdIserr: false,
      isDisableVer: false, //控制按钮是否禁用
      imgs: [], //图片验证的图片
      isPass: false, //检测图片验证是否通过
      text: "获取验证码",
      keyboardShow: false, //小键盘的显示
      codekeyboardShow: false,
      pwdkeyboardShow: false
    };
  },
  computed: {
    // 若两个输入框都输入值了则将禁用按钮设置为false
    verdisable() {
      if (this.phone.trim() && this.authCode.trim()) {
        return false;
      } else {
        return true;
      }
    }
  },
  components: {
    ActionSheet
  },
  mounted() {
    this.telInput();
  },
  methods: {
    ...mapActions(['userKeeper']),
    onClickLeft() {
      this.$router.go(-1);
    },
    //点击右边的都是切换 isnote的状态
    onclickRight() {
      this.isNote = !this.isNote;
    },
    //当输入的时候将 验证错误的颜色修正过来
    codeInput() {
      // this.telIserr = false;
      this.keyboardShow = false
      this.codeIserr = false;
    },
    pwdInput() {
      this.pwdIserr = false;
    },
    //将图片验证码显示出来 以及向后台获取验证码
    getVerify() {
      this.isShow = true;
      this.keyboardShow =false
    },
    // 判断验证按钮是否可以被点击 当输入的时候将 验证错误的颜色修正过来
    telInput(val) {
      this.codekeyboardShow = false;
      this.telIserr = false;
      // console.log(val);
      if (!/^1[0-9]{10}$/.test(val)) {
        this.isDisableVer = true;
      } else {
        this.isDisableVer = false;
      }
    },
    // 点击小键盘
    codeTouch() {
      this.codekeyboardShow = true;
      this.keyboardShow =false
    },
    phoneTouch() {
      this.codekeyboardShow = false;
      this.keyboardShow =true
    },
    // 图片验证的功能
    onSuccess() {
      console.log("验证通过");

      // 若通过了 则请求发送短信验证码 以及修改按钮对应的样式 以及将 图片验证码不显示
      this.isShow = false;
      this.$http.get('getAuthcode',{
        params:{
          phone:this.phone
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

      //修改按钮的样式
      this.isDisableVer = true;
      let time = 10;
      let timer1 = setInterval(() => {
        time--;
        // this.$refs.verifyButton.$el.text = "还有" + time + "s";
        this.text = "还有" + time + "s";
      }, 1000);
      setTimeout(() => {
        // this.$refs.verifyButton.innerHTML = "获取验证码";
        this.text = "获取验证码";
        this.isDisableVer = false;
        clearInterval(timer1);
      }, 10000);
    },
    onFail() {
      // console.log('验证不通过');
      alert("验证码错误");
      this.isPass = false;
    },
    onRefresh() {
      console.log("点击了刷新小图标");
      // this.msg = ''
    },
    onFulfilled() {
      console.log("刷新成功啦！");
    },
    onAgain() {
      console.log("检测到非人为操作的哦！");
      this.$refs.slideblock.reset();
    },
    // 处理actionSheet
    hanleSelect(item) {
      console.log(item);
    },
    //忘记密码
    forgetClick() {
      this.$refs.actionSheet.show = true;
      this.pwdkeyboardShow = false;
    },
    //  验证表单
    submits() {
      this.$http.get('register',{
        params: {
          phone: this.phone,
          authCode: this.authCode
        }
      }).then(res => {
        //得到结果之后 将接收过来的令牌存放到cookie里

        // cookie.set("mobile", res.data.token);
        // 若登录注册成功 则设置session cookie 以及将用户信息放在vuex里供其他页面使用
        if (res.data.code == 200||res.data.code == 201) {
          sessionStorage.setItem("mobile", res.token);
          console.log(res.data.userInfo._doc)
          this.userKeeper(res.data.userInfo._doc)
          .then(res=>{
            this.$router.push('/home')
          })
          if (res.data.code == 200) {
            this.$toast.show("登录成功",2000);
          }else {
            this.$toast.show("注册成功",2000);
          }
        }else if(res.data.code ==401){
          this.$toast.show('验证码失效',2000);
        }else if(res.data.code == 402 ) {
          this.$toast.show('验证码错误',2000)
          this.codeIserr = true;
        }else {
          console.log(res)
        }
      });
    },
    pwdsubmits() {
      this.$http(
        {
          url:'login',
          method:'post',
          data:{
        phone:this.phone,
        password:this.password
      }
        }
      )
      .then(res=>{
        if (res.data.code == 200 ) {
          console.log(res)
          sessionStorage.setItem('token',res.data.token)
        }else {
          console.log(res)
          this.$toast.show('手机号或密码错误',2000)
        }
      })
      .catch(err=>err)
    }
  }
};
</script>

<style  scoped>
.logo {
  height: 120px;
  line-height: 120px;
  text-align: center;
  margin-top: 46px;
  overflow: hidden;
  box-sizing: content-box!important;
}
.logo img {
  /* height: 100%; */
  width: 40%;
  margin-top:0!important
}
.button {
  /* width: 130px; */
  background-color: black !important;
}
.buttonarea {
  display: flex;
  justify-content: space-around;
}
.buttonarea > .van-button{
  margin-top: 10px;
  width:48%
}
.form {
  margin-top: 30px;
  /* margin-bottom: 10px; */
}
</style>