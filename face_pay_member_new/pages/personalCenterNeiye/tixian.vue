<template>
	<view >
		<view class="fui-cell-title" >
			<span>可提现金额：￥11100</span>
			<span style="text-decoration: underline;color:rgb(233, 122, 14)">全部提现</span>
		</view>
		<view class="fui-cell-group">
			<view class="fui-cell-title">
				提现金额
			</view>
			<view class="qian">
				<text>￥</text>
				<input type="number" value="" />
			</view>
		</view>
		<view class="way">
			<view class="way1">提现方式</view>
			<radio-group @change="radioChange">
			<view class="way1">
					<img src="../../static/images/zfb.png">
					<text>提现到支付宝</text>
					 <label class="radio"><radio value="0" @change="changes"  name ="aaa" color="rgb(233, 122, 14)"/></label>	
			</view>
			<view  class="hidden">
				 <view class="line">
					 <text style="color:#ccc">姓名</text>
					 <input type="text" placeholder="请填写姓名" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">支付宝账户</text>
				 					 <input type="text" placeholder="请填写支付宝账户" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">确认账户</text>
				 					 <input type="text" placeholder="请确认账户" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">支付密码</text>
				 					 <input type="text" placeholder="请确认支付密码" placeholder-style="color:#ccc"/>
				 </view>
			</view>
			<view class="way1">
				<img src="../../static/images/zfb.png">
				<text>提现到微信</text>
				<label class="radio"><radio value="1"  name ="aaa" color="rgb(233, 122, 14)"/></label>
			</view>
			<view  class="hidden">
				 <view class="line">
					 <text style="color:#ccc">姓名</text>
					 <input type="text" placeholder="请填写姓名" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">支付宝账户</text>
				 					 <input type="text" placeholder="请填写支付宝账户" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">确认账户</text>
				 					 <input type="text" placeholder="请确认账户" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">支付密码</text>
				 					 <input type="text" placeholder="请确认支付密码" placeholder-style="color:#ccc"/>
				 </view>
			</view>
			<view class="way1">
				<img src="../../static/images/zfb.png">
				<text>提现到银行卡</text>
				<label class="radio"><radio value="2"  name ="aaa" color="rgb(233, 122, 14)"/></label>
			</view>
			<view  class="hidden">
				 <view class="line">
					 <text style="color:#ccc">姓名</text>
					 <input type="text" placeholder="请填写姓名" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">支付宝账户</text>
				 					 <input type="text" placeholder="请填写支付宝账户" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">确认账户</text>
				 					 <input type="text" placeholder="请确认账户" placeholder-style="color:#ccc"/>
				 </view>
				 <view class="line">
				 					 <text style="color:#ccc">支付密码</text>
				 					 <input type="text" placeholder="请确认支付密码" placeholder-style="color:#ccc"/>
				 </view>
			</view>
			</radio-group>
		</view>
		<view class="p">

                    最小提现金额为 ￥10， 如果不是退全资产，必须为10的倍数

        </view>
		<view class="btn">
			<view class="btn1">提现</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				index : 0,
				
			}
		},
		methods:{
			changes(){
				
			},
			radioChange(evt){
				console.log(evt)
				var hidden = document.getElementsByClassName("hidden")
				var index = evt.detail.value;
				for(var i =0,len=hidden.length;i<len;i++){
					hidden[i].style.display = "none"
				}
				hidden[index].style.display = "block"
			}
		}
	}
</script>

<style scoped>
	.line text{
		width:280rpx;
	}
	.line{
		width:100%;
		padding:30rpx 0;
		border-bottom: 2rpx solid #ccc;
		display: flex;
	}
	
	.hidden{
		display: none;
		
	}
	.btn{
		display: flex;
		justify-content: center;
		padding-top:30rpx ;
	}
	.btn1{
		width:80%;
		font-size:32rpx;
		color:white;
		background:rgb(233, 122, 14);
		border-radius: 20rpx;
		line-height:80rpx;
		text-align:center
	}
	.p{
		line-height: 44rpx;
		padding: 30rpx 40rpx;
		color:#666
	}
	.way1{
		padding:30rpx 0;
		border-bottom: 2rpx solid #ccc;
		overflow: hidden;
		display: flex;
		align-items: center;

	}
	.way1 img{
		float:left;
		width:70rpx;
		height:70rpx;
		margin-right:20rpx
	}
	.way1 text{
		width:560rpx
	}
	.way1 radio{
		width:40rpx;
		height:40rpx;
		border-radius: 50%;
	
		float:right;
	}
	.way{
		
		padding:0 24rpx;
		margin-top: 35rpx; 
		background-color: #fff;	
		font-size: 60rpx;
		overflow: hidden;
		position: relative;
		display: block;
	}
	.qian{
		width:100%;
		height:80rpx;
		padding: 0 42rpx 30rpx;
		font-size:50rpx;
		display: flex;
		align-items:center ;
	}
	.qian input{
		display: flex;
		flex-grow: 1;
		height:100rpx;
		font-size:52rpx
	}
	.fui-cell-group{
		background-color: #fff;
		    line-height: 1.4;
		    font-size: 60rpx;
		    overflow: hidden;
		    position: relative;
		    display: block;
			margin-top: 0;
	}
	.fui-cell-title{

		    font-size: 30rpx;
		    padding: 35rpx 52.5rpx;
			    color: #666;
			    position: relative;
	
			    line-height: 50rpx;
				display: flex;
				justify-content: space-between;
	}
</style>
