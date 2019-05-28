<template>
  <div id="shareDetail">
    <div class="page">
      <div class="title">
        <div class="friend">你的好友{{phone|changephone}}邀请您</div>
        <div class="tip">注册成为盾付宝交易员</div>
      </div>
      <img src="../assets/indexBg1.png" alt="" class="page1">
      <div @click="toregister()" class="toRegister"><img src="../assets/regisIcon.png" alt=""></div>
      <div class="download">
       <a :href="ios" class="downBtn ios"></a>
        <a :href="android" class="downBtn andr"></a>
      </div>
    </div>
    <div class="page">
      <img src="../assets/indexBg2.png" alt="" class="page2">
      <div class="download download2">
        <a :href="ios" class="downBtn ios"></a>
        <a :href="android" class="downBtn andr"></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Share",
  data() {
    return {
      url:'https://fir.im/ragw',
      phone: null, // 好友手机号
      code: null, // 推荐码
      ios: '',
      android: '' 
    }
  },
  created () {
    this.phone = this.$route.query.phone
    this.code = this.$route.query.code
    console.log(this.phone, this.code)
    this.getAppurl()
  },
  methods: {
    getAppurl () {
      const data =  {}
      const url = this.$api.url + '/api/user/downloadurl'
      axios.post(url, data)
        .then(res => {
          const _res = res.data
          if (parseInt(_res.code) === 10000) {
            console.log(_res)
          } else {
            this.$toast(_res.msg)
          }
        })
        .catch(e => {
          this.$toast(e.msg)
        })
    },
    toregister() {
      this.$router.push({
        path: '/reg',
        query:{
          code: this.code
        }
      })
    }
  },
  filters: {
    changephone(value) {
      value = "" + value;
      var reg=/(\d{3})\d{4}(\d{4})/;
      value = value.replace(reg, "$1****$2")
      return value
    }
  }
};
</script>
<style lang="less">
#shareDetail{
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: fixed;
  .page1{
    width: 100%;
    margin-top: -118px
  }
  .page2{
    width: 100%;
    margin-top: -60px;
    margin-bottom: -100px
  }
  .page{
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    .title{
      position: absolute;
      width: 100%;
      top: 16%;
      padding: 0 21px;
      box-sizing: border-box;
      .tip{
        color: #fff;
        font-size: .32rem;
        text-align: center
      }
      .friend{
        color: #fff;
        font-size: 15px;
        text-align: center;
        margin-bottom: .4rem
      }
    }
    .toRegister{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%);
        img{
          height: 68px;
        }
    }
    .download{
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0 40px;
      .downBtn{
        flex: 1;
        display: inline-block;
        height: 67px;
        border-radius: 2px;
        z-index: 999
      }
      .andr{
        background: url('../assets/Android-icon.png') center / 100%  no-repeat;
        margin-left: 40px;
      }
      .ios{
        background: url('../assets/iOS-icon.png') center / 100%  no-repeat
      }
    }
  }
}
</style>
