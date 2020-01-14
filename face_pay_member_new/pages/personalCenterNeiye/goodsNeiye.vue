<template>
  <view class="">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item>
        <view class="swiper-item"></view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item"></view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item"></view>
      </swiper-item>
    </swiper>
    <view class="box">
      <p class="" style="font-size:40rpx">
        超值礼包
      </p>
      <p style="color:#ccc">

        刷脸设备一台+增值服务（课程培训）+增值服务（课程培训）

      </p>
      <p style="color:rgb(233, 122, 14)">
        ¥1999 超值礼包
      </p>
    </view>
    <view style="padding: 0 22rpx;background:white;margin-top:30rpx">
      <view style="font-size:40rpx;padding:20rpx 0">商品详情</view>
      <img src="../../static/images/cc.jpg" style="width:100%">
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        reConfig: { //请求配置
          goods_id: ''
        },
        goodsDetail: null
      }
    },
    onLoad(e) {
      this.reConfig.goods_id = e.goodsId;
      this.fetchDetails();
    },
    methods: {
      fetchDetails() { //获取商品详情
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.post(this.$api.product.detail, this.reConfig).then(res => {
          setTimeout(() => {uni.hideLoading();}, 500)
          if (res.code === 200) {
            this.goodsDetail = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .box p {
    padding: 20rpx 0
  }

  .box {
    background: #fff;
    margin-top: 50rpx;
    padding: 22rpx;
  }

  swiper-item {
    height: max-content;
  }

  .swiper-item {
    background: url(../../static/images/c.jpg) no-repeat center;
    height: 100%;
    background-size: cover
  }
</style>
