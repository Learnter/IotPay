<template>
	<view class="yifukuan">
		<view class="yifukuanhead">
			<text @click="clickNav"   :class="active == 0?'colorActive':''">已付款</text>
			<text @click="clickNav1" :class="active == 1?'colorActive':''">待付款</text>		
		</view>
		<view class="box">
			<view class="box1" >
				<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=455855200,625763634&fm=26&gp=0.jpg">
				<view class="center">
					<text>地址:sadfsfasdfasdfas</text>
					<text style="color:#ccc">门店</text>
				</view>
				<view class="right">
					<i class="iconfont icon-dianhua"></i>	
				</view>
			</view>
			<view class="box1" >
				<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=455855200,625763634&fm=26&gp=0.jpg">
				<view class="center">
					<text>地址:sadfsfasdfasdfas</text>
					<text style="color:#ccc">门店</text>
				</view>
				<view class="right">
					<i class="iconfont icon-dianhua"></i>	
				</view>
			</view>
			<view class="box1" >
				<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=455855200,625763634&fm=26&gp=0.jpg">
				<view class="center">
					<text>地址:sadfsfasdfasdfas</text>
					<text style="color:#ccc">门店</text>
				</view>
				<view class="right">
					<i class="iconfont icon-dianhua"></i>	
				</view>
			</view>
			<view class="box1" >
				<img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=455855200,625763634&fm=26&gp=0.jpg">
				<view class="center">
					<text>地址:sadfsfasdfasdfas</text>
					<text style="color:#ccc">门店</text>
				</view>
				<view class="right">
					<i class="iconfont icon-dianhua"></i>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "../../static/jinzhangguiIconfont/iconfont.css"
	export default{
		data() {
			return {
				active:0,
				box:[
					{
						src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=455855200,625763634&fm=26&gp=0.jpg",
						address:"地址:sadfsfasdfasdfas",
						name:"门店"
					},{
						src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=455855200,625763634&fm=26&gp=0.jpg",
						address:"地址:sadfsfasdfasdfas",
						name:"门店"
					},{
						src:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=455855200,625763634&fm=26&gp=0.jpg",
						address:"地址:sadfsfasdfasdfas",
						name:"门店"
					}
				]
			}
		},
		methods:{
			clickNav(e){
				this.active = 0
				
			},
			clickNav1(e){
				this.active = 1
			}
		}
	}
</script>

<style scoped>
	.yifukuan{
		background:
	}
	.yifukuanhead{
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}
	.yifukuanhead text{
		flex:1;
		height:98rpx;
		text-align: center;
		font-size:30rpx;
		line-height: 98rpx;
		color:#7d7e80;
		background:white
	}
	.colorActive{
		color:rgb(233, 122, 14)!important;
	
	}
	.box1{
		width:100%;
		height:150rpx;
		display: flex;
		padding-left: 10rpx;
		align-items: center;
		position: relative;
		background:white
	}
	.box1 img{
		width:112rpx;
		height:112rpx;
		border-radius: 50%;
		margin-right:20rpx
	}
	.box1 .center{
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		justify-content: space-around;
		border-bottom: 2rpx solid #ccc;
		height:112rpx;
		font-size:30rpx
	}
	.box1 .right{
		position:absolute;
		top:50%;
		right:10rpx;
		border-left:2rpx solid #ccc;
		width:112rpx;
		text-align:center;
		transform: translateY(-50%);
	
	}
	.right i{
		font-size:56rpx;
		color:#0080FF
	}
</style>
