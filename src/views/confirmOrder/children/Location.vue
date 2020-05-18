<template>
  <div>
    <van-action-sheet v-model="show" title="编辑地址">
      <div class="content">
        <span v-if="!ishave">还没有收货地址,添加一个吧~</span>
        <div class="form">
          <van-form validate-first>
            <div v-if="ishave">
              <van-field
                label="收件人"
                v-model="username"
                autofocus
                :rules="[{required:true,message:'必填字段',trigger:'onBlur'}]"
              ></van-field>
              <van-field
                label="手机号码"
                v-model="phone"
                :rules="[{pattern:/^1[3456789]\d{9}$/,message:'手机号格式不对'}]"
              ></van-field>
              <!-- 该项不可以用双向绑定 由于它的值是通过选择器来设置的 -->
              <van-field label="地区信息" readonly clickable name="picker" :value="address" @click="showPicker"></van-field>
              <van-field
                label="详细地址"
                v-model="detailAddress"
                :rules="[{required:true,message:'必填字段'}]"
              ></van-field>
              <van-field label="邮政编码" v-model="postcode" :rules="[{required:true,message:'必填字段'}]"></van-field>
            </div>
            <div class="buttons">
              <van-button
                color="pink"
                block
                native-type="reset"
                size="normal"
                class="v-button"
                @click="show=!show"
              >取消</van-button>
              <van-button
                color="rgb(243, 46, 46)"
                class="v-button"
                size="normal"
                block
                native-type="submit"
                v-if="ishave"
              >保存</van-button>
              <van-button
                color="rgb(243, 46, 46)"
                class="v-button"
                size="normal"
                block
                @click="ishave=!ishave"
                v-else
              >添加</van-button>
            </div>
            
          </van-form>
          <form-picker @picker-value="pickValue" ref="picker"></form-picker>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>

import FormPicker from "./FormPicker"
export default {
  data() {
    return {
      show: false,
      ishave: false,
      username: "",
      phone: "",
      address: "", 
      detailAddress: "",
      postcode: ""
    };
  },
  methods: {
    pickValue(value) {
      this.address = value
    },
    showPicker() {
      this.$refs.picker.showPicker = true
    }
  },
  components: {
    FormPicker,
  },
};
</script>

<style  scoped>
.content {
  border-top: 1px solid #eee;
  width: 100%;
  height: 400px;
  background-color: #fff;
  text-align: center;
  line-height: 400px;
}
.buttons {
  display: flex;
  width: 100%;
  height: 49px;
  line-height: 49px;
  position: fixed;
  bottom: 0;
  text-align: center;
  align-items: center;
}
.cancel {
  background-color: pink;
}
.button {
  width: 50%;
  display: flex;
}
.confirm {
  background-color: rgb(243, 46, 46);
  color: #fff;
}
.v-button {
  height: 100%;
  line-height: 100%;
}
</style>