<template>
  <div id="register">
    <div id="navi">
      <div class="texts">
          <img  class="backIcon" src="../assets/re-text.png" alt="back">
      </div>
      <div class="title">
        <span>注册</span>
      </div>
    </div>
    <div class="msgBox">
      <div class="item">
        <p>用户名</p>
        <input type="text" placeholder="字母开头6~20位用户名" maxlength="20" v-model="userName" @blur="cetifyUser()">
      </div>
      <div class="item">
        <p>登录密码</p>
        <input type="password" placeholder="字母开头8~12位密码" maxlength="12" v-model="password1">
      </div>
      <div class="item">
        <p>确认密码</p>
        <input type="password" placeholder="请再次确认登录密码" maxlength="12" v-model="password2">
      </div>
      <div class="item">
        <p>支付密码</p>
        <input type="password" placeholder="6位支付密码" maxlength="6" v-model="pwd1">
      </div>
      <div class="item">
        <p>支付密码</p>
        <input type="password" placeholder="请再次确认支付密码" maxlength="6" v-model="pwd2">
      </div>
      <div class="item">
        <p>推荐码</p>
        <input type="text" placeholder="请输入推荐码" readonly v-model="recommend" value="recommend">
      </div>
      <div class="item" ref="imgs">
        <p>验证码</p>
        <input type="text" placeholder="请输入验证码" v-model="identify">
        <img class="code" :src="Url" alt="" @click="ddd">
      </div>
    </div>
    <div class="aggree">
      <i :class="{'iActi': !isAgree}"></i><span @click="agree()">我已阅读并同意《法律申明》+《用户协议》</span>
    </div>
    <div class="submit"><span class="gradient" @click="submit()">注册</span></div>
  </div>
</template>

<script>
import axios from 'axios'
import reqInfo from "./Request/rquestFormat.js"
  export default {
    name: "actDetail",
    data() {
      return {
        isAgree:1,
        userName:'',
        password1:'',
        password2:'',
        pwd1:'',
        pwd2:'',
        recommend:'100086',
        identify:'',
        Url:'http://192.168.1.73/Api/Other/code',
        msg:{
            head: {
                "version": "1.0.1",
                "time": "13245613",
                "token": "MTIzQHFxLmNvbSxOb3Nzd1QsMTkyLjE2OC4xLjEw",
                "encrypt": "25fc5f3bb4d1c830a135b18326b0e67d"
            },
            body: {}
        }
      }
    },
    created () {
      this.recommend = this.$route.query.oid
    },
    methods: {
      agree(){
        this.isAgree = !this.isAgree
      },
       // 校验是否为空
      submit(){
        var reg1 = /^[0-9]{6}$/ // 支付密码
        var reg2 = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})$/ // 用户名
        var reg3 = /^[a-zA-Z]([-_a-zA-Z0-9]{7,11})$/ // 登录密码
        this.cetifyCode2()
        if (!this.userName) {
          this.$toast('用户名不能为空')
        } else if (!reg2.test(this.userName)) {
          this.$toast('用户名格式不正确')
          this.userName = ''
        } else if (!this.password1) {
          this.$toast('登录密码不能为空')
        } else if (!reg3.test(this.password1)) {
          this.$toast('登录密码格式不正确')
          this.password1 = ''
        }else if (!this.password2) {
          this.$toast('确认登录密码不能为空')
        } else if (this.password2 != this.password1) {
          this.$toast('两次输入登录密码不一致')
          this.password2 = ''
        }else if (!this.pwd1) {
          this.$toast('支付密码不能为空')
        } else if (!reg1.test(this.pwd1)) {
          this.$toast('支付密码格式不正确')
          this.pwd1 = ''
        }else if (!this.pwd2) {
          this.$toast('确认支付密码不能为空')
        } else if (this.pwd2 != this.pwd1) {
          this.$toast('两次输入支付密码不一致')
          this.pwd2 = ''
        }else if (!this.identify) {
          this.$toast('验证码不能为空')
        }else if (!this.isAgree) {
          this.$toast('请勾选同意法律声明和用户协议')
        } else {
          this.referralCode()
        }

      },
      // 获取验证码
      ddd(){
          this.Url = ''
          axios.get(this.$api.url + '/Api/Other/code')
          .then(res => {
            if (res.status == 200) {
              this.Url = 'http://192.168.1.73/Api/Other/code'
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      // 校验验证码
      cetifyCode2(){
        this.msg.body.verifycode = this.identify
          axios.post(this.$api.url + '/Api/Public/yzis_verifycode',this.msg)
          .then(res => {
            if (res.status == 200) {
              if (res.data.body.status == 400) {
                this.$toast(res.data.body.message)
              }  else {
              this.$toast(res.data.body.message)
              }
            } else {}
          })
          .catch(e => {
            console.log(e)
          })
      },
      // 校验推荐码
      referralCode(){
          this.msg.body.pathcode = this.recommend
          axios.post(this.$api.url + '/Api/Public/yzis_pathcode',this.msg)
          .then(res => {
            if (res.status == 200) {
              if (res.data.body.status == 200) {
                this.register()
              }  else {
              this.$toast(res.data.body.message)
              return false
              }
            } else {
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      // 校验用户是否存在
      cetifyUser(){
        this.msg.body.username = this.userName
          axios.post(this.$api.url + '/Api/Public/yzis_user',this.msg)
          .then(res => {
            if (res.status == 200) {
              if (res.data.body.status == 200) {
              }  else {
              this.$toast(res.data.body.message)
              }
            } else {
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      // 注册
      register(){
        var msgBody = {
          username: this.userName,
          password: this.password1,
          password2: this.password2,
          paypwd: this.pwd1,
          paypwd2: this.pwd2,
          pathcode: this.recommend,
          verifycode: this.identify,
          agreement: 1,
          mnemonic: "mobilsherpicnzoopeenatuetigerheadlglassensuexieaeye"
        }
        sessionStorage.setItem('msgBody', JSON.stringify(msgBody))
        this.$router.push({
          path: "/register2",
        })
      },
    }
  };
</script>
<style lang="less">
#register{
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: fixed;
  background-color: #ffffff;
  #navi{
    width: 100%;
    height: 2.51rem;
    background: url('../assets/re-bg.png') center / 100% no-repeat;
    .texts{
      img{
        height: .83rem;
        position: absolute;
        top: .9rem;
        left: 8%;
      }
    }
    .title{
      position: absolute;
      left: 11.2%;
      bottom: .1rem;
      font-size: .16rem;
      color: #fff
    }
  }
  .msgBox{
    padding: .15rem;
    .item{
      padding: .3rem .17rem .11rem;
      border-bottom: 1px solid #89CB9D;
      position: relative;
      p{
        width: 100%;
        text-align: left;
        font-size: .1rem;
        color: #5CB5A3;
        margin-bottom: .16rem
      }
      input{
        width: 100%;
        font-size: .15rem;
        color: #D2D1D1;
        border: none;
        &::placeholder{
          color: #D2D1D1;
        }
      }
      .code{
        position: absolute;
        top: .57rem;
        right: .1rem;
        display: inline-block;
        border: 1px solid #52DDC1;
        border-radius: .05rem;
        width: .75rem;
        height: .25rem;
        line-height: .25rem
      }
    }
  }
  .aggree{
    font-size: .12rem;
    color: #5CB5A3;
    text-align: left;
    padding-left: .17rem;
    margin-bottom: .35rem;
    i{
      display: inline-block;
      width: 0.13rem;
      height: 0.13rem;
      background: url('../assets/re-check-1.png') center / 100% no-repeat;
      margin-right: .05rem
    }
    .iActi{
      background: url('../assets/re-check-0.png') center / 100% no-repeat;
    }
  }
  .submit{
    padding: 0 1.1rem .35rem;
    span{
      display: inline-block;
      font-size: .14rem;
      color: #fff;
      height: .37rem;
      line-height: .37rem;
      width: 100%;
      border-radius: .18rem
    }
    .gradient{
      background: #000000;
      background: -moz-linear-gradient(left,  #54CDD1 0%, #52E2BC 100%);
      background: -webkit-gradient(linear, top left, top right, color-stop(0%,#54CDD1), color-stop(100%,#52E2BC));
      background: -webkit-linear-gradient(left,  #54CDD1 0%,#52E2BC 100%);
      background: -o-linear-gradient(left,  #54CDD1 0%,#52E2BC 100%);
      background: -ms-linear-gradient(left,  #54CDD1 0%,#52E2BC 100%);
      background: linear-gradient(to right,  #54CDD1 0%,#52E2BC 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#54CDD1', endColorstr='#52E2BC',GradientType=0 );
    }
    :root .gradient{filter:none;}
  }
}
</style>
