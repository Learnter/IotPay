<template>
	<view>
		<swiper class="swiperBox" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		  <swiper-item v-for="(item,index) in swipers" :key="index">
		    <image :src="item"></image>
		  </swiper-item>
		</swiper>
    <view class="productInfo">
      <view class="info_one_row uni-ellipsis">{{goodsName}}</view>
      <view class="info_second_row uni-ellipsis">{{goodsDesc}}</view>
      <view class="info_last_row">¥ {{shopPrice}} <text  style="margin-left:20rpx">申请采购</text></view>
    </view>
    <view class="detailBox" v-if="content">
      <view class="info_one_row">商品详情</view>
      <view v-html="content"></view>
    </view>
    <button type="primary" class="buyBox" @click="buyNow">立即采购</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers:[],//轮播图
        content:'',//详情内容
        goodsName:'',//名称
        goodsDesc:'',//简介
        shopPrice:'',//单价
        picture:'',//图片
        goodId:'' //商品id
			};
		},
    onLoad(e){
     let {product_id} = e;    
     if(product_id){
       this.goodId = product_id;
       this.fetchDetails();
     }
    },
    methods:{
      fetchDetails(id){
        uni.showLoading({
            mask: true,
            title: '加载中...'
          })
          this.$Request.post(this.$api.product.detail,{goods_id:this.goodId}).then(res => {
            setTimeout(() => {
              uni.hideLoading();
            }, 500)
            if (res.code === 200) {
              let {goods_img,goods_desc,goods_name,shop_price,content,picture} = res.data;
              this.goodsName = goods_name,this.goodsDesc = goods_desc,
              this.swipers = goods_img,this.shopPrice = shop_price,this.picture = picture,
              this.content = content.replace(/\<img/gi,'<img style="max-width:100%;height:auto"');
            } else {
              uni.showToast({
                title: res.msg,
                duration: 2000,
                icon:'none'
              })
            }
          })  
      },
      buyNow(){ //立即购买
       let obj = {
         picture:this.picture,
         title:this.goodsName,
         desc:this.goodsDesc,
         price:this.shopPrice,
         goodId:this.goodId
       }
        uni.navigateTo({
          url:'/pages/products/submitOrder/submitOrder?data='+JSON.stringify(obj)
        })
      }
    } 
	}
</script>

<style lang="scss" scoped>
  
  .swiperBox{
    height:400rpx;
  }
  .productInfo{
    box-sizing:border-box;
    height:180rpx;
    background:#FFFFFF;
    padding: 10rpx 20rpx;
    margin-bottom:20rpx;
  }
  
  .info_one_row {
    font-size: 34rpx;
    padding-bottom:10rpx;
  }
  
  .info_second_row {
    font-size: 28rpx;
    color: rgba(16, 16, 16, 0.5);
    padding-bottom:10rpx;
  }
  
  .info_last_row {
    font-size: 30rpx;
    color: #FEBB3C;
  }
  
  .buyBox{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    background-color:#FA5951;
    font-size:34rpx;
    height:90rpx;
    line-height:90rpx;
    color:#fff;
    border-radius: 10rpx 10rpx 0 0;
  }
  
  .detailBox{
    background:#FFFFFF;
    padding: 10rpx 20rpx;
  }

</style>
