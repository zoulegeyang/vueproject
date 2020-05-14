<template>
  <div>
    <!-- <van-sticky :offset-top="44"> -->
    <van-tabs v-model="active" @change="changeActive" class="tabs">
      <van-tab
        :title="titles[index]"
        v-for="(item,index) in Object.keys(typeData)"
        :key="item"
        :name="item"
      >
        <div class="content">
          <!-- 无线滚动 -->
          <!-- <van-list v-model="loading" class="content" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
            <div
              class="img-item"
              v-for="(ii,index) in typeData[item]"
              :key="index"
              @click="getDetail(ii)"
            >
              <van-image :src="ii.img"></van-image>
              <div class="des">
                <!-- 省略号的这个属性要设置给块级元素或行内块才有用 -->
                <span class="title van-ellipsis">{{ii.title}}</span>
                <div class="desson">
                  <span class="price">${{ii.price}}</span>
                  <van-icon name="star-o" />
                  <span class="fav">{{ii.cfav}}</span>
                </div>
              </div>
            </div>
          <!-- </van-list> -->
        </div>
        <!-- </van-list> -->
      </van-tab>
    </van-tabs>
    <!-- </van-sticky> -->
  </div>
</template>

<script>
export default {
  name: "active",
  data() {
    return {
      active: "pop",
      loading: false,
      finished: false,
      titles: ["流行", "热卖", "新款"]
    };
  },
  methods: {
    changeActive(name) {
      console.log(name);
      this.$emit("change-active", name);
    },
    getDetail(ii) {
      // console.log(ii)
      this.$router.push(`/detail/${ii.iid}`);
    },
    onLoad() {
      console.log('``')
    }
  },
  props: {  
    typeData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style  scoped>
.content {
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.img-item {
  /* flex:1; */
  width: 48%;
  /* overflow: hidden; */
}
.img {
  width: 100%;
}
.des {
  padding: 5px 5px;
  width: 100%;
}
.title {
  display: inline-block;
  width: 100%;
  font-size: 14px;
}
.desson {
  text-align: center;
  font-size: 12px;
}

.price {
  color: #f18798;
  margin-right: 5px;
}
</style>