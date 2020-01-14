<template>
  <view v-if="details">
    <view class="userInfo uni-inline-item">
      <text class="iconfont icondingwei"></text>
      <view class="userRight">
        <view class="textSize">
          <text>{{details.consignee}}</text>
          <text>{{details.mobile}}</text>
        </view>
        <view class="uni-ellipsis textSize">{{details.address}}</view>
      </view>
    </view>
    <view class="orderbox uni-inline-item" v-for="(item,index) in details.goods" :key="index">
      <view class="orderImg">
        <image :src="item.img" mode="widthFix"></image>
      </view>
     <view class="rightInfo">
       <view class="right_info_row uni-ellipsis">{{item.goods_name}}</view>
       <view class="right_info_row">数量：X{{item.goods_num}}</view>
       <view class="right_info_row">金额：{{item.goods_price}}</view>
     </view>
    </view>
    <view class="detailBox">
      <view class="textSize">商品总价：{{details.order_amount}}</view>
      <view class="textSize">下单时间：{{details.add_time}}</view>
      <view class="textSize">订单编号：{{details.order_sn}}</view>
      <view class="textSize">订单状态：{{details.status_msg}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        details: null
      };
    },
    onLoad(e) {
      let {
        orderId
      } = e;
      if (orderId) {
        this.fetchDetail(orderId);
      }
    },
    methods: {
      fetchDetail(id) { //获取订单详情
        this.$Request.post(this.$api.order.detail, {
          order_id: id
        }).then(res => {
          if (res.code === 200) {
            this.details = res.data;
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

<style lang="scss" scoped>
  .userInfo{
    box-sizing:border-box;
    padding:20rpx;
    border-bottom: 1px solid #F3F3F3;
  }
  
  .icondingwei{
    font-size:60rpx;
    color:#FA5951;
  }
  
  .userRight{
    flex:1;
    align-self:stretch;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  
  .orderbox {
    box-sizing: border-box;
    height:200rpx;
    padding:20rpx 20rpx 20rpx 30rpx;
    border-bottom: 1px solid #F3F3F3;
  }

  .orderImg {
    width:180rpx;
    height:100%;
    margin-right: 20rpx;
    overflow: hidden;
  }
  
  .rightInfo{
    flex:1;
    align-self:stretch;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    overflow:hidden;
  }
  .right_info_row{
    font-size:30rpx;
  }
  
  .detailBox{
    box-sizing: border-box;
    padding:20rpx 20rpx 20rpx 30rpx;
    border-bottom: 1px solid #F3F3F3;
  }
  
  .textSize{
    font-size:30rpx;
    padding:10rpx 0;
  }
</style>
