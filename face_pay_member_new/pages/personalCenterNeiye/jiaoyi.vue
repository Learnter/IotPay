<template>
  <view>
    <view class="up">
      <view class="h_top_left">
        <input class="h_top_left_input" type="text" v-model="reConfig.sn" placeholder="请输入设备sn查询" />
      </view>
      <view class="h_top_right">
        <view class="h_btn" @tap="findBtn">查询</view>
      </view>
    </view>
    <view class="down">
      <view class="h_btbox_tit">查询列表</view>
      <view class="h_btbox_tp">
        <view class="li">结算月份</view>
        <view class="li">设备号</view>
        <view class="li">交易笔数</view>
      </view>
      <view class="h_btbox_tp  h_btbox_center" v-for="(item,index) in dealList" :key="index">
        <view class="li">{{item.time}}</view>
        <view class="li">{{item.sn.slice(-6)}}</view>
        <view class="li">{{item.count}}笔</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isEmpty: false,
        teamCount: 0,
        dealList: [], //交易列表
        reConfig:{
          sn:''
        }
      }
    },
    methods: {
      findBtn() { //获取店铺列表
       if(!this.reConfig.sn) return uni.showToast({
         icon:'none',
         title:'设备sn不能为空!'
       })
        uni.showLoading({
          mask: true,
          title: '查询中...'
        })
        this.$Request.post(this.$api.find.sn,this.reConfig).then(res => {
          uni.hideLoading();
          if (res.code === 200) {
            this.dealList = res.data;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .h_btbox_center {
    height: 60rpx !important;
    color: #a7a7a7 !important;
    font-weight: 400 !important;
  }

  .h_btbox_tp {
    width: 100%;
    height: 67.5rpx;
    font-size: 30rpx;
    color: #605f5f;
    font-weight: 700;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .li {
    width: 33%;
    text-align: center;
  }

  .h_btbox_tit {
    background: rgb(232, 183, 138);
    width: 100%;
    height: 97.5rpx;
    line-height: 97.5rpx;
    font-size: 37.5rpx;
    color: #fff;
    border-radius: 15rpx 15rpx 0 0;
    font-weight: 700;
    text-indent: 37.5rpx;
    border-bottom: 2rpx solid #ccc;
  }

  .down {
    width: 96%;
    margin: 0 auto;
    background: #fff;
    border-radius: 15rpx;
    padding-bottom: 20rpx;
    box-shadow: 2px 2px 10px #ccc;
  }

  .h_top_right {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .h_btn {
    width: 172.5rem;
    height: 60rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 75rpx;
    background: rgb(226, 177, 131);
    font-weight: 500;
    color: #333;
    font-size: 28.5rpx;
  }

  .h_top_left {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .h_top_left_input {
    width: 100%;
    height: 67.5rpx;
    box-sizing:border-box;
    padding: 0 20rpx;
    color: #999;
    border-radius: 150rpx;
    outline: none;
    border: 2rpx solid #999;
    background: rgb(245, 246, 248);
  }

  .up {
    width: 92%;
    height: 97.5rpx;
    padding: 15rpx;
    margin: 22.5rpx auto;
    background: #fff;
    border-radius: 15rpx;
    box-shadow: 2px 2px 10px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
