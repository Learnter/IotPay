<template>
	<view class="content">
		<!-- <view class="uni-inline-item pageHead">
		  <navigator class="leftImg" url="/pages/me/service/service"  hover-class="none">
		    <image src="/static/icon/2019slzf_14_2.png" mode="widthFix"></image>
		  </navigator>
      <text>刷脸支付</text>
      <text class="rightMap">地图</text>
		</view> -->
    <view class="jzhometopBox">
    	<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.7)" current="0" 
    	indicator-active-color="#4395FC" :autoplay="true" :interval="3000" :duration="1000" circular="true" style="height: 350rpx;">
    		<swiper-item class="bannImg" v-for="(item,index) in swipers" :key="index">
    			<view class="swiper-item">
    				<image :src="item.banner" mode="aspectFill" class="bannImg"></image>
    			</view>
    		</swiper-item>
    	</swiper>
    </view>
    <view>
      <view class="hostNav uni-inline-item">
        <view class="hostImg">
          <image src="/static/icon/2019slzf_3.png"></image>
        </view>
        <navigator url="/pages/index/recruitments/recruitments" hover-class="none">更多</navigator>
      </view>
      <view class="listItem uni-inline-item" v-for="(item,index) in shopList" :key="index">
        <view class="itemLeft">
         <text class="itmeText uni-ellipsis">{{item.store_name}}<!-- <text class="itemName">[商家名称]</text> --></text>
         <text class="itemTime">{{item.add_time}}</text>
        </view>
        <view class="itme_right">商家入驻</view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        isLoadEnd:false,//是否加载完
        isEmpty:false,//是否为空数据
				swipers:[],//轮播图列表
        shopList:[],//商家列表
        reConfig:{
          page:0,
          page_num:10
        }
			}
		},
		onLoad() {
      this.fetchSwiper();
      this.fetchShopList();
		},
		methods: {
      fetchSwiper(){ //获取轮播图列表
         this.$Request.post(this.$api.firstPage.swipers).then(res => {
           if(res.code === 200){
             this.swipers = res.data;
           }else{
             uni.showToast({
               title:res.msg,
               duration:2000,
               icon:'none'
             })
           }
         })
      },
      fetchShopList(){ //获取商家列表
         this.$Request.post(this.$api.firstPage.shopList,this.reConfig).then(res => {
           setTimeout(() => {
             uni.stopPullDownRefresh();
           }, 1000)
           if(res.code === 200){
             if(!res.data || res.data.length === 0) return this.isEmpty = true;
             this.shopList = res.data;
           }else{
             uni.showToast({
               title:res.msg,
               duration:2000,
               icon:'none'
             })
           }
         })
      }
		},
    onPullDownRefresh() { //监听下拉刷新
      this.fetchShopList();
    },
    onNavigationBarButtonTap(e) {
      if(e.index === 1){
        // uni.navigateTo({
        //   url:"/pages/me/service/service"
        // })
      }
    }
    // onReachBottom() { //页面触底事件
    //   if(this.isLoadEnd) return;
    //   this.reConfig.page++;
    //   this.$Request.post(this.$api.firstPage.shopList,this.reConfig).then(res => {
    //        if(res.code === 200){
    //          if(this.reConfig.page_num > res.data.length){
    //            this.isLoadEnd = true;
    //          }
    //          this.shopList = this.shopList.concat(res.data);
    //        }else{
    //          uni.showToast({
    //            title:res.msg,
    //            duration:2000
    //          })
    //        }
    //      })
    //   }
  }
</script>

<style lang="scss" scoped>
  .pageHead{
    font-size:36rpx;
    padding:50rpx 20rpx 20rpx;
    justify-content:space-between;
    background-color:#FA5951;
    color:#FFFFFF;
  }
  .leftImg{
    width:50rpx;
  }
  .rightMap{
    font-size:30rpx;
    color:#ffffff;
    font-family: PingFangSC-regular;
  }
  .jzhometopBox{
    padding:20rpx;
  }
  .swiper-item{
    width:100%;
    height:100%;
    overflow:hidden;
    border-radius:20rpx;
    image{
      border-radius:20rpx;
    }
  }
  .hostNav{
    padding: 0 20rpx 20rpx;
    justify-content:space-between;
    color:#101010;
  }
  .hostImg{
    width:240rpx;
    height:60rpx;
    line-height:60rpx;
    image{
      width:100%;
      height:100%;
    }
  }
  .listItem{
    justify-content:space-between;
    padding:10rpx 20rpx 20rpx;
    &:nth-child(even){
      background:#F7F7F7;
    }
  }
  .itemLeft{
    flex:1;
    display:flex;
    flex-direction:column;
    margin-right:20rpx;
    .itemTime{
      margin-left:0;
      color:#999999;
      font-size:24rpx;
      padding-top:10rpx;
    }
  }
  
  .itme_right{
    flex-shrink:0;
  }
  
  .itmeText{
    font-family:PingFangSC-regular;
    color:#000000;
  }
  
  .itemName{
    color:#999999;
  }
  
</style>
