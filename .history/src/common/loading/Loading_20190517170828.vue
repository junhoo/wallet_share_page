<template>
  <div v-if="show">
      <div class="loading-mask" v-show="mask"></div>
      <div class="loading_box" @click.stop>
        <div class="loading-icon"></div>
        <!-- <div class="loading-text">正在加载...</div> -->
      </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    mask: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.loading-mask {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9000;
    background: rgba(0, 0, 0, .1);
}
.loading_box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  background: rgba(0, 0, 0, .7);
  border-radius: .16rem;
  z-index: 9999;
  .loading-icon {
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: url('~imgurl/loading.gif') no-repeat center;
    background-size: .62rem .62rem;
  }
  .loading-text {
    margin-top: -.25rem;
    height: .7rem;
    line-height: .7rem;
    color: #ffffff;
    font-size: .24rem;
  }
}
</style>
