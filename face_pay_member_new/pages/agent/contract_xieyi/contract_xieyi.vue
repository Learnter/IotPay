<template>
  <view>
    <view class="fu_box" v-html="content"></view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        content:'',//协议内容
        reConfig:{ //请求配置
          type:''
        }
      }
    },
    onLoad(e){
      this.reConfig.type = e.type;
      this.fetchProtocol();
    },
    methods: {
      fetchProtocol(){ //获取协议内容
        this.$Request.post(this.$api.setUp.issue,this.reConfig).then(res => {
          if(res.code === 200){
            this.content = res.data.content_cn.replace(/\<img/gi,"<img style='max-width:100%;height:auto'");
          }else{
            uni.showToast({
              title:res.msg,
              icon:'none'
            })
          }
        })
      },
    }
  }
</script>

<style>
  body {
    color: #333;
    font-weight: 700;
    line-height: .58rem;
    background: #fff;
    letter-spacing: .02rem;
  }

  .fu_box {
    width: 94%;
    margin: 20rpx auto;
  }

</style>
