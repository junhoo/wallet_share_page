<template>
  <div id="actDetail" :style="{ height: ListHeight }">
    <!-- <navi showTitle="列表详情"></navi> -->
    <div class="content">
      <p>{{dataInfo.title}}</p>
      <div class="line">
        <span>全民：原创</span>
        <span>{{dataInfo.add_time}}</span>
      </div>
      <div class="line1">
        <span></span>
        <i></i>
      </div>
      <div class="line2" v-html="dataInfo.content"></div>
    </div>
  </div>
</template>

<script>
import searchParams from '../../static/getUrl.js'
import axios from 'axios'
import navi from "./header.vue"
import reqInfo from "./Request/rquestFormat.js"
  export default {
    name: "actDetail",
    components: {navi},
    data() {
      return {
        dataInfo: {},
        ListHeight: 0
      }
    },
    created () {
      this.getActicleInfo()
      this.$nextTick(()=> {
        this.ListHeight = document.documentElement.clientHeight / 75 + 'rem' 
      })
    },
    methods: {
      getActicleInfo() {
        console.log('detail')
        console.log(searchParams)
        const body = {
          "mark": "article",
          "article_id": searchParams.fori // this.$route.query.fori
        }

        const tokenKey = sessionStorage.getItem('token')
        const reqData = reqInfo.fnFormat(body, tokenKey)

        axios.post(this.$api.url + 'Api/Index/article', reqData)
          .then(res => {
            console.log(res.data)
            if (res.data.body.status === 200) {
              const _obj = res.data.body.result
              const addtime = parseInt(_obj.add_time) * 1000
              _obj.add_time = this.formatDate(addtime)
              _obj.content = _obj.content.replace(/<img /g, '<img style="width: 3.5rem; margin-left: -28px;" ');
              this.dataInfo = _obj
            } else {
              this.$toast(res.data.body.message)
            }
          })
          .catch(e => {
            console.log(e)
          })
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
    }
  };
</script>
<style lang="less">
#actDetail{
   background: #1C1F3E;
 .content{
   position: relative;
   padding: .2rem .17rem 0;
   overflow: hidden;
   text-align: left;
   p{
     font-size: .19rem;
     color: #333;
     margin-bottom: .16rem;
     color: #ffffff;
   }
   .line{
     font-size: .13rem;
     color: #999;
     margin-bottom: .3rem;
     span{
       margin-right: .2rem;
     }
   }
   .line1{
     margin-bottom: .17rem;
     span{
       display: inline-block;
       width: .05rem;
       height: .05rem;
       border-radius: 50%;
       border: 1px solid #72728D;
     }
     i{
       display: inline-block;
       width: .8rem;
       height: .01rem;
       background-color: #72728D;
       margin-bottom: .03rem;
     }
   }
   .line2{
     font-size: .15rem;
     color:#ffffff;
   }
 }
}
</style>
