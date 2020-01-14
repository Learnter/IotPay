<template>
  <view class="content">
    <view class="top">
      <image :src="qrCode"></image>
      <view class="banner">
        <view class="sharbuttn">
          <view class="btn" @click="save">保存二维码</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    base64ToPath
  } from "@/common/index.js";
  import transferShopPoster from '@/components/transfershop-poster/transfershop-poster.vue';
  export default {
    components: {
      transferShopPoster
    },
    data() {
      return {
        qrCode: '', //二维码图片
      }
    },
    onLoad() {
      this.fetchQrCode();
    },
    methods: {
      fetchQrCode() { //获取二维码
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.get(this.$api.myPoster).then(res => {
          uni.hideLoading();
          if (res.code === 200) {
            this.qrCode = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      //保存图片到相册
      save() {
        uni.showLoading({
          mask: true,
          title: '保存中...'
        })
        uni.getImageInfo({
          src:this.qrCode,
          success: (res) => {
            uni.saveImageToPhotosAlbum({
              filePath: res.path,
              success(res2) {
                uni.hideLoading();
                uni.showToast({
                  title: '图片保存成功',
                  duration: 2000
                })
              },
              fail() {
                uni.showToast({
                  title: '保存失败，稍后再试',
                  duration: 2000,
                  icon: 'none'
                })
                uni.hideLoading();
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
 
 
  .sharbuttn {
    display: flex;
    justify-content: center;
  }

  .content {
    width: 100%;
    background-color: #ffffff;
  }

  .top {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index:10;
  }

  .banner {
    position:absolute;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
  }
  
  .btn {
    width: 70%;
    height: 70upx;
    line-height: 70upx;
    margin: 45upx auto;
    border-radius: 40upx;
    border: 0;
    outline: 0;
    background: #F8AF62;
    color: #FFFFFF;
    text-align: center;
  }

</style>
