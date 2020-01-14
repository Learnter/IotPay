<template>
  <view class="content">
    <image class="bgaImg" src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
    <!-- <view class="brokerageTitle">佣金收益</view> -->
    <view class="earningBox">
      <view class="yesterdayEarn">昨天收益 (元)</view>
      <view class="yesterdayMoney">¥{{yesterdayAmount}}</view>
      <view class="earnItem uni-inline-item">
        <view class="earnItemLeft uni-flex-item">
          <view class="earnMoney">{{todayAmount}}</view>
          <view class="earningTitle">今日收益 (元)</view>
        </view>
        <view class="earnItemRight uni-flex-item">
          <view class="earnMoney">{{thisMonthAmount}}</view>
          <view class="earningTitle">本月营业额 (元)</view>
        </view>
      </view>
      <view class="earnItem uni-inline-item">
        <view class="earnItemLeft uni-flex-item">
          <view class="earnMoney">{{lastMonthAmount}}</view>
          <view class="earningTitle">上个月营业额 (元)</view>
        </view>
        <view class="earnItemRight uni-flex-item">
          <view class="earnMoney">{{allAmount}}</view>
          <view class="earningTitle">累积营业额 (元)</view>
        </view>
      </view>
    </view>
    <view class="uni-inline-item listTitle">
      <text>方式</text>
      <text>明细</text>
      <text>时间</text>
    </view>
    <view class="listBox">
      <view class="listItem uni-inline-item" v-for="(item,index) in list" :key="index">
        <text style="flex:1" v-if="item.from_type === 1">支付宝</text>
        <text style="flex:1" v-else-if="item.from_type === 2">微信</text>
        <text style="flex:1;text-align:center;">¥ {{item.money}}</text>
        <text class="itmeTime">{{item.add_time}}</text>
      </view>
    </view>
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
      <text>无佣金收益记录</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isEmpty: false,
        reConfig: {
          page: 0,
          page_num: 10
        },
        yesterdayAmount: '',
        allAmount: '',
        todayAmount: '',
        thisMonthAmount: '',
        lastMonthAmount: '',
        list: ''
      };
    },
    onLoad() {
      this.fetchBrokerage();
    },
    methods: {
      fetchBrokerage() {
        this.$Request.post(this.$api.me.brokerage, this.reConfig).then(res => {
          setTimeout(() => {
            uni.stopPullDownRefresh();
          }, 500)
          if (res.code === 200) {
            let {yesterdayAmount,allAmount,todayAmount,thisMonthAmount,lastMonthAmount,list} = res.data;
            this.yesterdayAmount = yesterdayAmount;
            this.allAmount = allAmount;
            this.todayAmount = todayAmount;
            this.thisMonthAmount = thisMonthAmount;
            this.lastMonthAmount = lastMonthAmount;
            this.list = list;
            if (!list || list.length === 0) this.isEmpty = true; //非空判断
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      }
    },
    onPullDownRefresh() { //监听下拉
      this.fetchBrokerage();
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    box-sizing: border-box;
    padding: 30rpx 30rpx 0;
    height: 100%;
    position: relative;
  }

  .bgaImg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .brokerageTitle {
    position: relative;
    z-index: 10;
    font-size: 36rpx;
    text-align: center;
    color: #FFFFFF;
    letter-spacing: 4rpx;
  }

  .earningBox {
    position: relative;
    z-index: 10;
    padding: 30rpx 0 50rpx 0;
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-top: 20rpx;
  }

  .yesterdayEarn {
    font-size: 36rpx;
    text-align: center;
    color: #999999;
  }

  .yesterdayMoney {
    font-size: 44rpx;
    color: #FA5951;
    text-align: center;
  }

  .earningTitle {
    font-size: 30rpx;
    text-align: center;
    color: #999999;
  }

  .earnItemLeft,
  .earnItemRight {
    text-align: center;
    padding: 16rpx;
  }

  .earnMoney {
    height: 50rpx;
    font-size: 34rpx;
  }

  .listTitle {
    justify-content: space-between;
    padding: 30rpx 30rpx 20rpx;
    font-family: PingFangSC-bold;
    font-size: 30rpx;
    font-weight: bold;
  }

  .listBox {
    padding: 10rpx 16rpx 0;
    box-sizing: border-box;
  }

  .listItem {
    justify-content: space-between;
    padding: 16rpx 0 16rpx 16rpx;
    color: #888888;
    border-bottom: 1px solid #F4F4F4;

    .itmeTime {
      flex: 1;
      width: 100rpx;
      font-size: 24rpx;
      text-align: right;
    }
  }

  .emptyBox {
    margin: 0 auto;
    width: 400rpx;
    height: 400rpx;
    text-align: center;
    font-size: 32rpx;
    color: #999999;
  }
</style>
