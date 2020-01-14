<template>
	<view class="content">
		<view class="circleBg">
		  <image src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
      <view class="payMoney" v-if="payInfo">¥{{payInfo.price}}</view>
		</view>
    <view class="payBox">
      <view class="payTitle">当前支付方式</view>
      <view class="uni-inline-item uni-flex-between payMethod">
        <view class="uni-inline-item">
          <view class="payIcon">
             <image :src="currentPay.icon"></image>
          </view>
          <text>{{currentPay.name}}</text>
        </view>
      </view>
      <view class="payTitle">请选择支付方式</view>
      <view class="uni-inline-item uni-flex-between payMethod" v-for="(item,index) in payMethods" :key="index" @click="switchPayMethod(item)">
        <view class="uni-inline-item">
          <view class="payIcon">
             <image :src="item.icon"></image>
          </view>
          <text>{{item.name}}</text>
        </view>
        <text class="iconfont iconxiangyou1"></text>
      </view>
    </view>
    <button type="primary" class="comfirmBut" @click="comfirmPay">确认支付</button>
	</view>
</template>

<script>
  import {APIHOST} from "@/common/config.js";
	export default {
		data() {
			return {
				payInfo:null, //支付的信息
        currentPay:{icon:'/static/icon/2019slyw_33.png',name:'支付宝支付',type:1},//当前支付方式
        payMethods:[{icon:'/static/icon/2019slyw_33.png',name:'支付宝支付',type:1},{icon:'/static/icon/2019slyw_34.png',name:'微信支付',type:2}] ,//支付方式
        orderId:'',//订单id
        payWay:1 //支付方式
			};
		},
    onLoad(e){
      this.fetchPayInfo(e);
    },
    methods:{
      fetchPayInfo(e){ //获取支付的信息
        if(!e.data) return false;
         let data = JSON.parse(e.data);
         this.payInfo = data;
         this.orderId = data.order_id;
      },
      switchPayMethod(obj){ //切换支付方式
        this.currentPay = obj;
        this.payWay = obj.type;
      },
      comfirmPay(){ //确认支付
          let payUrl = APIHOST + this.$api.order.comfirmPay +'?order_id='+this.orderId+'&pay_way='+this.payWay;
         // #ifdef H5
          location.href = payUrl;
         // #endif
         // #ifdef APP-PLUS
          plus.runtime.openURL(payUrl);
         // #endif
        
      }  
    }
	}
</script>

<style lang="scss" scoped>
  .circleBg{
    position:relative;
  }
  .payMoney{
    position:absolute;
    left:50%;
    top:40%;
    transform:translate(-50%,-50%);
    font-size:50rpx;
    color:yellow;
  }
  .payBox{
    box-sizing:border-box;
    padding:0 30rpx;
  }
  .payTitle{
    font-size:32rpx;
    padding-top:20rpx;
  }
  .payMethod{
    padding: 30rpx 0;
    border-bottom:1px solid #F3F3F3;
  }
  .payIcon{
    width:70rpx;
    height:70rpx;
  }
  .comfirmBut{
    width:80%;
    height:80rpx;
    line-height:80rpx;
    margin-top:60rpx;
    border-radius:40rpx;
    background:#FA5951;
  }
</style>
