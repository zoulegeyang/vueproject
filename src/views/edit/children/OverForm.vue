<template>
  <div>
    <van-overlay :show="show" @click="$emit('update:show',false)">
      <div class="wrapper" @click.stop :style="{height:flag=='用户名'?'200px':'300px'}">
        <div class="form">
          <van-form validate-first @failed="onFailed" @submit="onSubmit">
            <van-nav-bar :title="'修改'+flag" class="nav-title"></van-nav-bar>
            <van-field
              v-model="username"
              placeholder="请输入用户名"
              label="用户名"
              v-if="flag=='用户名'"
              maxlength="10"
            ></van-field>

            <div v-else>
              <van-field
                v-model="phone"
                placeholder="请输入手机号"
                type="tel"
                required
                maxlength="11"
                label="手机号"
                :rules="[{pattern:/^1[3456789]\d{9}$/,message:'手机格式不对'}]"
                v-if="flag=='手机号'"
              ></van-field>
              <van-field
                v-model="password"
                placeholder="请输入密码"
                type="password"
                required
                label="密码"
                v-else-if="flag=='密码'"
                maxlength="12"
              ></van-field>
              <van-field
                v-model="email"
                placeholder="请输入邮箱"
                v-else
                label="邮箱"
                required
                :rules="[{pattern:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,message:'邮箱格式不对'}]"
              ></van-field>

              <van-field
                v-model="authCode"
                placeholder="请输入验证码"
                label="验证码"
                :rules="[{pattern:/^[0-9]{6}$/,message:'验证码格式不对'}]"
              ></van-field>
              <van-button
                size="large"
                color="#f08899"
                @click="getAuthCode"
                :disabled="isDisable"
              >{{buttonText}}</van-button>
            </div>

            <div class="form-buttons">
              <van-button
                class="button"
                type="info"
                @click="$emit('update:show',false)"
                native-type="reset"
              >取消</van-button>
              <van-button class="button" type="primary" native-type="submit">确认修改</van-button>
            </div>
          </van-form>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isDisable: false,
      username: "",
      phone: "",
      password: "",
      email: "",
      authCode: "",
      buttonText: "获取验证码"
    };
  },
  created() {
    console.log("11");
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return false;
      }
    },
    flag: String
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    ...mapActions(["updateUserInfo"]),
    onFailed() {
      console.log("失败了");
    },
    onSubmit() {
      // console.log("成功");
      // 根据flag的值动态发请求
        var tmp='';
        switch (this.flag) {
          case '手机号':
              tmp='phone'
              break
          case '密码':
              tmp = 'password'
              break
          case '邮箱':
              tmp = 'email'
              break
          case '用户名':
            tmp = 'username'
            break;
          default:
            break;
        }
        
      this.$http
        .post(`update/${tmp}`, {
          [tmp]: this[tmp],
          authCode: this.authCode 
        
        })
        .then(res => {
          console.log(tmp)
          console.log(res)
          if (res.data.code == 200) {
            if(tmp =='phone') {
              sessionStorage.setItem("token", res.data.token);
              
            }
            console.log(this[tmp],tmp)
            this.updateUserInfo({value:this[tmp],name:tmp}); // 更新状态值
            this.$toast.show("更新成功",2000);
            this.$emit('update:show',false)    
          }else if (res.data.code == 500) {
            this.$toast.show('账号已存在',2000)
          }else if(res.data.code == 501) {
            this.$toast.show('未知错误',2000)
          }else if(res.data.code==402) {
            this.$toast.show('验证码出错',2000)
          }else if(res.data.code == 401) {
            this.$toast.show('验证码失效',2000)
          }else {
            return 
          }
        })
        .catch(err => console.log(err));
    },
    getAuthCode() {
      this.$http
        .get("getAuthcode", {
          params: {
            phone: this.getUserInfo.phone
          }
        })
        .then(res => {
          console.log(res)
          this.$toast.show("验证码已发出");
        })
        .catch(err => {
          console.log(err);
        });

      this.isDisable = true;
      let time = 10;
      let timer = setInterval(() => {
        this.buttonText = "还剩" + time + "s";
        time--;
      }, 1000);
      setTimeout(() => {
        clearInterval(timer), (this.isDisable = false);
        this.buttonText = "获取验证码";
      }, 10000);
    },

    phoneValidator(val) {
      console.log("sss");
      return /^1[3456789]\d{9}$/.test(val);
    }
  }
};
</script>

<style  scoped>
.wrapper {
  width: 350px;
  /* height: 300px; */
  background-color: #fff;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  top: 30%;
}
.form-buttons {
  display: flex;
  justify-content: space-around;
  flex: 1;
}
.nav-title {
  margin-bottom: 10px;
}

.button {
  margin-top: 10px;
  width: 48%;
}
</style>