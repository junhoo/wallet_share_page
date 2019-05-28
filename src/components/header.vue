<template>
  <div id="navi">
      <!-- left -->
      <div class="leftbox"  @click="goBack()">
          <img  class="backIcon" src="" alt="back">
      </div>
      <!-- center -->
      <h3 class="title">{{showTitle}}</h3>

      <!-- right -->
      <span class="righttext" @click="torecord()">{{rightText}}</span>
  </div>
</template>

<script>

  export default {
    name: "navi",
    components: {},
    props: {
      showTitle: {
        type: String
      },
      rightText: {
        type: String
      },
    },
    methods: {
      goBack() {
         this.$router.go(-1);
      },
      torecord(){
        this.$router.push('/incapitalDetail')
      }
    }
  };
</script>
<style lang="less">
#navi{
    position: fixed;
    width: 100%;
    height: .64rem;
    display: flex;
    z-index: 999;
    background-color: #1C1F3E;
    .leftbox{
        width: .4rem;
        height: .64rem;
        position: relative;
        img{
            width: .10rem;
            height: .22rem;
            position: absolute;
            top: .3rem;
        }
    }
    h3{
        font-size: .18rem;
        color: #ffffff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: .28rem;
    }
    .righttext{
      position: absolute;
      top: .3rem;
      right: .18rem;
      font-size: .14rem;
      color: #333;
    }
}
</style>

