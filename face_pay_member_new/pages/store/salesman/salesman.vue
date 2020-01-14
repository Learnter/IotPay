<template>
  <view>
    <view class="uni-inline-item orderItem" v-for="(item,index) in orderList" :key="index" @click="watchDetail(item.id)">
      <view class="leftImg">
        <image :src="item.logo"></image>
      </view>
      <view class="rightInfo">
        <view class="uni-inline-item uni-flex-between">
          <view class="uni-ellipsis right_info_name">{{item.store_name}}</view>
          <!-- <view class="right_info_status1" v-if="item.status == 1">申请中</view> -->
          <view class="right_info_status2">已完成</view>
          <!-- <view class="right_info_status3" v-else-if="item.status == 2">已失效</view> -->
        </view>
        <view class="">订单号：{{item.order_sn}}</view>
        <view class="">申请时间：{{item.add_time}}</view>
      </view>
    </view>
    <uni-load-more v-if="!isEmpty && orderList.length > 0" :status="status" :content-text="contentText" />
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/a024laner_116.png" mode="widthFix"></image>
      <text>空空如也</text>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      uniLoadMore
    },
    data() {
      return {
        isloadEnd: false,
        isEmpty: false,
        status: 'more',
        contentText: {
          contentdown: '查看更多',
          contentrefresh: '加载中...',
          contentnomore: '没有更多数据了'
        },
        reConfig: {
          page: 0,
          page_num: 10,
          status: 9
        },
        orderList: [] //订单列表
      };
    },
    onLoad() {
      this.fetchList();
    },
    methods: {
      fetchList() { //获取订单列表
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.post(this.$api.medic.medicOrders, this.reConfig).then(res => {
          uni.hideLoading();
          if (res.code === 200) {
            if (!res.data || res.data.length === 0) {
              this.isEmpty = true;
              return false;
            }
            if (res.data.length < this.reConfig.page_num) {
              this.isloadEnd = true;
              this.status = 'noMore';
            }
            this.orderList = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      loadMore() { //加载更多
        if (this.isloadEnd) return false;
        this.reConfig.page++;
        this.status = "loading";
        this.$Request.post(this.$api.medic.medicOrders, this.reConfig).then(res => {
          if (res.code === 200) {
            if (res.data.length < this.reConfig.page_num) {
              this.isloadEnd = true;
              this.status = 'noMore';
            } else {
              this.status = 'more';
            }
            this.orderList = this.orderList.concat(res.data);
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      }
    },
    onReachBottom() {
      this.loadMore();
    }
  }
</script>

<style lang="scss" scoped>
  .orderItem {
    box-sizing: border-box;
    height: 180rpx;
    padding: 10rpx 20rpx;
    border-bottom: 1px solid #F3F3F3;
    margin-top: 16rpx;
  }

  .leftImg {
    width: 160rpx;
    height: 100%;
    padding:10rpx;
    box-sizing:border-box;
    margin-right: 20rpx;
    border-radius:50%;
    overflow: hidden;
    background:linear-gradient(right,#F8AF62,#F47F28);
    image{
      border-radius:50%;
    }
  }

  .rightInfo {
    flex: 1;
    align-self: stretch;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .right_info_name {
      flex: 1;
      font-size: 32rpx;
      margin-right: 20rpx;
    }

    .right_info_status1 {
      color: #007AFF;
      font-size: 30rpx;
      flex-shrink: 0;
    }

    .right_info_status2 {
      color: #999999;
      font-size: 30rpx;
      flex-shrink: 0;
    }

    .right_info_status3 {
      color: #999999;
      font-size: 30rpx;
      flex-shrink: 0;
      text-decoration: line-through;
    }
  }

  .emptyBox {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 90%;
    height: auto;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 32rpx;
    color: #999999;
  }
</style>
