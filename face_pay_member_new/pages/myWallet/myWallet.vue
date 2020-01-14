<template>
	<view class="content">
		<view class="amountBox">
		  <view class="amountTitle">总资产 (元)</view>
      <view class="amountBottom uni-inline-item">
        <text>¥ {{walletAmount}}</text>
        <navigator :url="'/pages/myWallet/withdraw/withdraw?balance='+walletAmount" class="withdrawBtn uni-inline-item" hover-class="none">
          <view class="withIcon">
            <image src="/static/icon/2019slyw_21.png"></image>
          </view>
          <text>提现</text>
        </navigator>
      </view>
		</view>
    <view class="logTitle">提现记录</view>
    <view class="listBox">
      <view class="listItem" v-for="(item,index) in walletList" :key="index">
        <view class="listItemTop uni-inline-item">
          <text>{{item.carryname}}</text>
          <text style="color:#FA5951">{{item.add_money}} ¥</text>
        </view>
        <view class="listItemBottom  uni-inline-item">
          <text>{{item.add_time}}</text>
          <text v-if="item.status === 1">待审核</text>
          <text v-else-if="item.status === 2">已审核</text>
          <text v-else-if="item.status === 3">已拒绝</text>
          <text v-else-if="item.status === 4">已撤销</text>
          <text v-else-if="item.status === 9">已完成</text>
        </view>
      </view>
    </view>
    <uni-load-more v-if="!isEmpty" :status="status" :content-text="contentText" />
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
      <text>无提现记录</text>
    </view>
	</view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				isloadEnd: false,
				isEmpty:false,
				status: 'more',
				contentText: {
				  contentdown: '查看更多',
				  contentrefresh: '加载中...',
				  contentnomore: '没有更多数据了'
				},
        reConfig: {
          page:0,
          page_num:10
        },
        walletList:[] ,//钱包列表
        walletAmount:'' //钱包余额
			};
		},
    onLoad() {
      this.fetchWithdrawList();
    },
    methods:{
      fetchWithdrawList(){
        uni.showLoading({
            mask: true,
            title: '加载中...'
          })
          this.$Request.post(this.$api.me.walletList, this.reConfig).then(res => {
            setTimeout(() => {
              uni.hideLoading();
            }, 500)
            if (res.code === 200) {
              let {balance,list} = res.data;
              this.walletAmount = balance;
              if(!list || list.length === 0) return this.isEmpty = true; //非空判断
              if (this.reConfig.page_num > list.length) {
                this.isLoadEnd = true;
                this.status = 'noMore';
              }
              this.walletList = list;
            } else {
              uni.showToast({
                title: res.msg,
                duration: 2000,
                icon:'none'
              })
            }
          })  
        }
    },
    onReachBottom() { //页面触底事件
      if (this.isLoadEnd) return;
      this.status = 'loading';
      this.reConfig.page++;
      this.$Request.post(this.$api.me.walletList, this.reConfig).then(res => {
        if (res.code === 200) {
          let {list} = res.data;
          this.walletList = this.walletList.concat(list);
          if (this.reConfig.page_num > list.length) {
            this.isLoadEnd = true;
            this.status = 'noMore';
          } else {
            this.status = 'more';
          }
        } else {
          uni.showToast({
            title: res.msg,
            duration: 2000,
            icon: 'none'
          })
        }
      })
    },
    components:{
      uniLoadMore
    }
	}
</script>

<style lang="scss" scoped>
  .content{
    box-sizing:border-box;
    padding:30rpx 40rpx 0;
    min-height:100%;
  }
  
  .amountBox{
    height:180rpx;
    padding:30rpx 20rpx 30rpx 30rpx;
    background:#FA5951;
    border-radius:10rpx;
  }
  
  .amountTitle{
    font-size:40rpx;
    color:#FFFFFF;
    padding:20rpx 0 16rpx;
  }
  
  .amountBottom{
    font-size:40rpx;
    color:#FEDD3C;
    justify-content:space-between;
  }
  
  .withdrawBtn{
    background:#FFFFFF;
    padding:10rpx 30rpx;
    border-radius:40rpx;
    color:#333333;
    font-size:30rpx;
  }
  .withIcon{
    width:40rpx;
    height:40rpx;
  }
  
  .logTitle{
    font-size:34rpx;
    padding:16rpx 0 10rpx;
  }
  
  .listItem{
    padding:16rpx 0;
    border-bottom:1px solid #F4F4F4;
  }
  
  .listItemBottom,.listItemTop{
    justify-content:space-between;
  }
  
  .listItemTop{
    font-size:30rpx;
    padding-bottom:6rpx;
    color:#333333;
  }
  
  .listItemBottom{
    color:#999999;
    font-size:26rpx;
  }
  
  .emptyBox{
    margin:0 auto;
    width:300rpx;
    height:400rpx;
    text-align:center;
    font-size:32rpx;
    color:#999999;
  }
  

</style>
