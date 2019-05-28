<template>
  <div id="register2">
     <div id="navi">
        <img  class="backIcon" src="../assets/arrowleft.png" alt="back"><span>返回</span>
    </div>
    <div class="contenbox">
      <div class="tip">
        <span>请务必</span>
        <p>正确抄写12个单词密语</p>
        <i>* 不建议截屏</i><br>
        <span>密语是恢复您资产的唯一途径</span><br>
        <i>一旦丢失，资产将无法找回</i>
      </div>
      <div class="textBox">
        <div class="line"> <span></span></div>
        <ul class="wordT">
            <li v-for="(item, index) in wordList" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="submit">
      <span class="gradient" @click="submit(0)">我已抄好，去验证</span>
      <span class="gras" @click="submit(1)">以后抄，跳过（不建议）</span>
    </div>
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
        recommend:'',
        identify:'',
        wordList:[]
      }
    },
    created () {
      this.getWord()
    },
    methods: {
      // 获取助记词
      getWord(){
          axios.get(this.$api.url + '/Api/Other/words')
          .then(res => {
            console.log(res)
            if (res.status == 200) {
              if (res.data) {
                this.wordList = res.data
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      submit(idx){
        this.$dialog.confirm({
          className: 'enSure',
          cancelButtonText: '我要再次验证',
          cancelButtonColor: '#000',
          confirmButtonText: '抄好了，下一步',
          confirmButtonColor: '#000',
          message: '<span class="tip1">抄错任何一字都会导致</span><p>无法恢复账户，</p><span class="tip1">请务必验证一遍确保密语正确。</span>'
        }).then(() => {
          this.$router.push({ path: "/register3"}) // on confirm
        }).catch(() => {
          // on cancel
        });
        // if (idx == 0) {
        //   this.$router.push({ path: "/register3"})
        // }
      }
    }
  };
</script>
<style lang="less">
#register2{
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: fixed;
  background-color: #F8F8F8;
  #navi{
    height: .64rem;
    text-align: left;
    font-size: .16rem;
    color: #999;
    padding-top: .23rem;
    box-sizing: border-box;
    img{
      width: .1rem;
      margin: 0 .1rem 0 .15rem
    }
  }
  .contenbox{
    width: 100%;
    height: 3.75rem;
    box-sizing: border-box;
    background: url('../assets/re-big.png') center / 100% no-repeat;
    position: relative;
    padding-top: .25rem;
    margin-bottom: 1rem;
    .tip{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      span{
        font-size: .13rem;
        color: #666;
      }
      p{
        font-size: .18rem;
        color: #666;
        font-weight: bold;
      }
      i{
        display: inline-block;
        font-size: .14rem;
        color: #FD3F2C;
        margin: .05rem 0;
        &:last-of-type{
          margin-bottom: 0
        }
      }
    }
    .textBox{
      background: url('../assets/re-small.png') center / 100% no-repeat;
      width: 94.66%;
      height: 2.71rem;
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -.11rem;
      position: relative;
      .line{
      width: 100%;
      position: absolute;
      top: 1.05rem;
      box-sizing: border-box;
      padding: 0 .24rem;
        span{
          display: inline-block;
          width: 100%;
          border-bottom: 1px dashed #D2D1D1;
        }
      }
      .wordT{
        width: 100%;
        padding-top: 35%;
        text-align: center;
        position: absolute;
        height: 70%;
        li{
          height: .46rem;
          line-height: .46rem;
          width: 33.3%;
          float: left;
        }
      }
    }
  }
  .submit{
    padding: 0 .93rem .35rem;
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
      margin-bottom: .1rem
    }
    :root .gradient{filter:none;}
    .gras{
      color: #72728D;
      background: url('../assets/re-rectangle.png') center / 100% no-repeat;

    }
  }
}
.enSure{
  .van-dialog__cancel{
    .van-button__text{
      color: #999
    }
  }
  .van-dialog__confirm{
    .van-button__text{
      color: #FD3F2C
    }
  }
  .van-button--large{
    height: .52rem;
  }
  .van-dialog__message{
    padding: .2rem 20%;
    text-align: left;
    .tip1{
      font-size: .13rem;
      color: #333
    }
    p{
      font-size: .16rem;
      color: #333;
      margin: .1rem 0 !important
    }
  }
}
</style>
