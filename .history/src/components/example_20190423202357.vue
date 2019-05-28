<template>
  <div id="example" class="body">
    <!-- <navi showTitle="好玩"></navi> -->
    <div class="top">
      <input type="text">
    </div>
    <div class="wrappers">
      <van-list v-model="loading" :finished="finished" @load="onLoad" :loading-text="loadText">
        <div class="content">
          <div
              class="wrapper"
              v-for="(item, index) in activeList"
              :key="index"
              @click="goDetail(item.id)">
              <div
                tab="li"
                class="box">
                <div class="title">{{item.title}}</div>
                <img class="imgs" :src="item.thumb">
                <p class="time">{{item.date}}</p>
              </div>
              <!-- <activeitem :activeData="item"></activeitem> -->
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import searchParams from '../../static/getUrl.js'
import navi from "./header.vue"
import activeitem from "./activeitem.vue"
import axios from 'axios'
import reqInfo from "./Request/rquestFormat.js"
export default {
  name: 'example',
  components: {
    navi,
    activeitem
  },
  data () {
    return {
      page: 1,
      timer: null,
      loadText: '加载中...',
      activeList: [],
      loading: false, // 是否加载提示
      finished: false // 是否加载完成
    }
  },
  created() {
    // this.getActiveInfo()
  },
  methods: {
    // 活动列表
    onLoad () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        // 这里两个原生传参
        // const tokenKey = '4edcyQhzuqYUBC3nkqax0trSlrK7o3lfRxj8yKTxmA5wCpxR3lWD2LF%2F'
        // const nameId = 24
        const nameId = parseInt(searchParams.name_id)
        const tokenKey = searchParams.token
        const body = {
          'mark': "article",
          'nav_id': nameId,
          // 'recommend': 0, // 不需要
          'page': this.page,
          'size': 10
        }
        const reqData = reqInfo.fnFormat(body, tokenKey)
        sessionStorage.setItem('token', tokenKey)

        axios.post(this.$api.url + 'Api/Index/table', reqData)
          .then(res => {
            console.log(res)
            if (res.data.body.status === 200) {
              const array = res.data.body.result
              array.forEach(item => {
                const addtime = parseInt(item.add_time) * 1000
                item.date = this.formatDate(addtime)
                // item.thumb = 'http://192.168.1.180:8082/' + item.thumb
                // item.thumb = this.$api.url + item.thumb
              })
              this.loading = false
              if (array.length < 10) {
                this.finished = true
              } else {
                this.finished = false
                this.page++
              }
              this.activeList = this.activeList.concat(array)
            } else {
              this.$toast(res.data.body.message)
            }
            this.loadText = ' '
          })
          .catch(e => {
            console.log(e)
            this.loadText = ' '
          })
      }, 200)
    },
    goDetail (id) {
      this.$router.push({ path: "/actDetail", query: { fori : id } })
    },
    formatDate (time) {
      var date = new Date(time) // 1398250549490
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = `${date.getDate()} `
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  },
}
</script>

<style lang="less" >
#example{
  background: #1C1F3E;
  height: 100%;
    .van-list__loading-text {
      color: #D2D1D1;
    }
    .content {
      box-sizing: border-box;
      padding: 0 .15rem;
      // position: absolute;
      // top: .64rem;
      // left: 0;
      // right: 0;
      // bottom: 0;
      .wrapper {
        background: #1C1F3E;
        // border-bottom: 1px solid #D2D1D1;
        border-bottom: 1.2px solid #72728D; /** no */
        .box {
          .title {
            margin-top: 0.2rem;
            margin-bottom: 0.1rem;
            height: 0.17rem;
            font-size: 0.16rem;
            font-weight:bold;
            color: #ffffff;
            text-align: left;
          }
          .imgs {
            width: 100%;
            height: 1rem;
          }
          .time {
            color: #ffffff;
            height: 0.10rem;
            font-size: 0.12rem;
            text-align: left;
            margin-bottom: 0.16rem;
          }
        }
      }
      .wrapper:last-child {
        border-bottom: 0px solid #D2D1D1;
      }
    }
}
</style>
