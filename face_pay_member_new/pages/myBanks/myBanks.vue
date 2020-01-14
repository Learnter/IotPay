<template>
  <view class="content">
   <!-- <uni-swipe-action :options="options1" v-for="(item,index) in bankList" :key="index" style="background:#FAFAFA"
      @click="deleteBank($event,index)"> -->
      <view class="bankItem uni-inline-item" v-for="(item,index) in bankList" :key="index">
        <view class="bankLogo">
          <image :src="item.logo"></image>
        </view>
        <view class="">
          <view class="bankName">{{item.name}}</view>
          <view class="bankNum">{{item.bank_account}}</view>
        </view>
      </view>
    <!-- </uni-swipe-action> -->
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
    </view>
    <view class="bankButton">
       <button class="addBank" type="primary" @click="addBtn">添加银行卡</button>
    </view>
  </view>
</template>

<script>
  import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
  export default {
    data() {
      return {
        options1: [{
          text: '删除',
          style: {
            backgroundColor: '#FC444D'
          }
        }],
        isEmpty: false,
        bankList: [] //银行卡列表
      };
    },
    onLoad(){
      this.fetchBanks();
    },
    methods: {
      fetchBanks() { //获取银行卡列表
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.post(this.$api.me.bankList).then(res => {
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
          if (res.code === 200) {
            if (!res.data || res.data.length === 0) return this.isEmpty = true;
            this.bankList = res.data;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      },
      addBtn(){ //添加银行卡
        uni.redirectTo({
          url:'/pages/myBanks/addBank/addBank'
        })
      },
      deleteBank(){ //删除银行卡
        
      }
    },
    components: {
      uniSwipeAction
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    box-sizing: border-box;
    padding: 20rpx 30rpx 0;
    margin-bottom:100rpx;
  }

  .bankItem {
    padding: 20rpx 0;
    border-bottom: 1px solid #F1F1F1;
    margin-bottom:10rpx;
  }

  .bankLogo {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 20rpx;
    border: 2rpx solid #F2F2F2;
    overflow: hidden;

    image {
      border-radius: 50%;
    }
  }

  .bankName {
    font-size: 32rpx;
    font-family: PingFangSC-regular;
    color: #000000;
  }

  .bankNum {
    font-size: 26rpx;
    font-family: PingFangSC-regular;
    color: #888888;
  }
  
  .bankButton{
    position:fixed;
    left:0;
    bottom:0;
    right:0;
    height:100rpx;
    box-sizing:border-box;
    padding-top:10rpx;
    background:#FFFFFF;
  }

  .addBank {
    width: 80%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 60rpx;
    background: #FA5951;
  }

  .emptyBox {
    margin: 50% auto 0;
    width: 400rpx;
    height: 400rpx;
    transform: translateY(-50%);
    text-align: center;
    font-size: 32rpx;
    color: #999999;
  }
</style>
