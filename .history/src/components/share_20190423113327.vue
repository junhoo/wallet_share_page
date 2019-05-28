<template>
  <div id="actDetail">
    <navi showTitle="App下载"></navi>
    <div class="content">
      <div class="logo"><img src="../assets/logo.png" alt=""></div>
      <div class="textbox">
        <h3>区块链产业第一集团</h3>
        <span>帕劳全民集团（PALUA NATIONA GROUP)位于西太阳帕劳群岛帕劳共和国，集团是在全球互联网技术革命和经济一体化的形态下，由帕劳共国前副总统及世界众多知名人士共同成立的涉及全方位、多领域的跨国性集团企业。</span>
      </div>
      <div class="download">
        <a :href="url" class="andr"></a>
        <a :href="url" class="ioss"></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import navi from "./header.vue"
import reqInfo from "./Request/rquestFormat.js"
  export default {
    name: "Share",
    components: {navi},
    data() {
      return {
        url:'https://fir.im/ragw'
      }
    },
    created () {
      
    },
    methods: {

    }
  };
</script>
<style lang="less">
#actDetail{
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: fixed;
  background: url('../assets/indexBg.png') center / cover no-repeat;
  .content{
    .logo{
      position: absolute;
      top: .87rem;
      left: .13rem;
      img{
        height: .41rem;
      }
    }
    .textbox{
      position: absolute;
      box-sizing: border-box;
      top: 1.55rem;
      padding: 0 .24rem;
      text-align: center;
      width: 100%;
      h3{
        font-size: .19rem;
        color: #fff;
        margin-bottom: .19rem
      }
      span{
      font-size: .12rem;
      color: #DCE0F9
      }
    }
    .download{
      position: absolute;
      top: 2.9rem;
      width: 100%;
      a{
        display: inline-block;
        height: .5rem;
        width: 1.5rem;
        &:first-of-type{
          margin-right: .2rem
        }
      }
      .andr{
        background: url('../assets/Android-icon.png') center / 100% no-repeat;
      }
      .ioss{
        background: url('../assets/iOS-icon.png') center / 100% no-repeat;
      }
    }
  }
}
</style>
