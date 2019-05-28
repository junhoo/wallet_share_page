<template>
  <div class="reg-body">
    <p class="title">注册成为交易员</p>
    <div class="color"></div>
    <div class="wrapper">
      <div class="blank"></div>
      <div class="item">
        <div class="number">+86</div>
        <input type="text" v-model="keywordPhone" placeholder="请输入手机号" @input="handleInput" maxlength="11">
      </div>
      <div class="item">
        <input v-model="keywordSms" type="text" placeholder="短信验证码">
        <p class="send-text" v-text="btnMsmText" @click="sendCode"></p>
      </div>
      <div class="item">
        <input v-model="keywordPassword" :type="[showPassword ? 'text' : 'password']" placeholder="密码（6-20字符）" maxlength="20">
        <div class="eyeicon" :class="{'show-icon': showPassword}" @click="clickPassword"></div>
      </div>
      <div class="item">
        <input v-model="keywordRecommend" type="text" placeholder="团队推荐码（选填）" readonly>
      </div>

      <button v-show="!useClick" class="use-btn"></button>
      <button v-show="useClick" class="use-btn-ok" @click="checkCode"></button>
    </div>
    <p class="detail" @click="jumpDetail">点击查看详情及下载app</p>
  </div>
</template>

<script>
import axios from 'axios'
import reqInfo from "./Request/rquestFormat.js"
  export default {
    name: "reg",
    data() {
      return {
        btnMsmText: '发送验证码',
        keywordPhone: '',
        keywordSms: '',
        keywordPassword: '',
        keywordRecommend: '',
        showPassword: false,
        verify: '',
        localhost: ''
      }
    },
    computed: {
      useClick () {
        const pools = [this.keywordPhone, this.keywordSms, this.keywordRecommend]
        for (const item of pools) {
          if (item === '') {
            return false
          }
        }
        if (this.keywordPassword.length < 6) {
          return false
        }
        return true
      }
    },
    created () {
      this.keywordRecommend = this.$route.query.code
      this.localhost = window.location.hostname
    },
    methods: {
      sendCode () {
        if (this.keywordPhone.length < 11) {
          this.$toast('请输入11位手机号')
          return false
        }
        const data =  {
          account: this.keywordPhone,
          type: 1
        }
        const url = this.$api.url + '/api/code/send_code'
        console.log(url)
        axios.post(url, data)
          .then(res => {
            const _res = res.data
            if (parseInt(_res.code) === 10000) {
              this.verify = _res.msg
              this.btnMsmText = '重新发送'
            } else {
              this.$toast(_res.msg)
            }
          })
          .catch(e => {
            console.log('send_code')
            console.log(e)
            this.$toast('发送短信失败')
          })
      },

      checkCode () {
        const data =  {
          account: this.keywordPhone,
          code: this.keywordSms,
          type: 1
        }
        const url = this.$api.url + '/api/code/check_code'
        axios.post(url, data)
          .then(res => {
            const _res = res.data
            if (parseInt(_res.code) === 10000) {
              if (_res.data.list) {
                this.sendApi()
              }
            } else {
              this.$toast(_res.msg)
            }
          })
          .catch(e => {
            console.log('check_code')
            console.log(e)
            this.$toast(e.msg)
          })
      },

      sendApi () {
        const url = this.$api.url + '/api/login/register'
        const data = {
          type: 2, // 1A 2B
          mobile: this.keywordPhone, // 手机号
          password: this.keywordPassword, // 密码
          code: this.keywordSms, // 验证码
          ref_code: this.keywordRecommend // 推荐码
        }
        axios.post(url, data)
          .then(res => {
            const _res = res.data
            if (parseInt(_res.code) === 10000) {
            } else {
              this.$toast(_res.msg)
            }
          })
          .catch(e => {
            console.log('register')
            console.log(e)
            this.$toast(e.msg)
          })
      },
      clickPassword () {
        this.showPassword = !this.showPassword
      },
      handleInput (e) {
        this.keywordPhone = this.keywordPhone.replace(/[^\d]/g, '')
        this.keywordPhone = this.keywordPhone.replace('.', '')
      },
      jumpDetail () {
        this.$router.go(-1)
      }
    }
  };
</script>
<style lang="less">
.reg-body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  background: #111622;
  .title {
    height: .48rem;
    font-size: .34rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color:#fff;
    line-height: .48rem;
    margin-top: .43rem;
    margin-left: .15rem;
    margin-bottom: .62rem;
    text-align: left;
  }
  .color {
    height: .012rem;
    margin-left: .15rem;
    margin-right: .15rem;
    background:linear-gradient(315deg,rgba(126,0,255,1) 0%,rgba(0,120,255,1) 100%);
  }
  .wrapper {
    position: relative;
    margin-left: .15rem;
    margin-right: .15rem;
    padding-left: .20rem;
    padding-bottom: 1rem;
    background: #1A202E;

    .blank {
      height: .53rem;
    }

    .item {
      display: flex;
      margin-top: .18rem;
      border-bottom: .012rem solid #2E3546;
      padding-top: 0.1rem;
      padding-bottom: 0.1rem;
      font-size: .14rem;
      .number {
        color: #FFFFFF;
        height: .22rem;
        line-height: .22rem;
        width: .53rem;
        text-align: left;
        background: url('~imgurl/e-xiala.png') no-repeat right .1rem center;
        background-size: .11rem .06rem
      }
      input {
        flex: 1;
        width: 100%;
        height: .22rem;
        line-height: .22rem;
        border: none;
        color: #FFFFFF;
        background: #1A202E;
        &::placeholder{
          color: #6D778B;
        }
      }
      .send-text {
        color: #0078FF;
        height: .22rem;
        line-height: .22rem;
        margin-right: .2rem;
        text-align: right;
      }
      .eyeicon {
        height: .22rem;
        line-height: .22rem;
        width: .22rem;
        margin-right: .2rem;
        background: url('~imgurl/eye-close.png') no-repeat right .02rem center;
        background-size: .2rem .1rem;
      }
      .show-icon {
        background: url('~imgurl/eye-open.png') no-repeat right 0 center;
        background-size: .22rem .12rem;
      }
    }

    .use-btn {
      position: absolute;
      right: .3rem;
      bottom: .24rem;
      width: .49rem;
      height: .49rem;
      border: none;
      background: url('~imgurl/btn_d.png') no-repeat center;
      background-size: 100%;
    }
    .use-btn-ok {
      position: absolute;
      right: .3rem;
      bottom: .24rem;
      width: .49rem;
      height: .49rem;
      border: none;
      background: url('~imgurl/btn_a.png') no-repeat center;
      background-size: 100%;
    }
  }
  .detail {
    position: fixed;
    left: 0;
    right: 0;
    bottom: .2rem;
    font-size: .14rem;
    color: #0078FF;
  }
}
</style>
