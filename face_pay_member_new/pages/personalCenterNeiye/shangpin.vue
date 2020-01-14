<template>
  <view style="padding:0 2%">
   <!-- <view class="head">共有326件商品</view>
    <view class="" style="width:100%;height:auto;">
      <img src="/static/images/dingbg.png" style="width:100%;margin-bottom: 30rpx;">
    </view> -->
    <view class="cont_box">
      <view class="cont_box_sp" @click="tiao(item)" v-for="(item,index) in shopsList" :key="index">
        <view class="cont_box_img">
          <image :src="item.picture" mode="widthFix"/>
        </view>
        <p class="text">{{item.goods_name}}</p>
        <p class="text1">￥{{item.goods_id}}</p>
      </view>
      <!-- 	<view class="cont_box_sp" @click="tiao">
				<img src="/static/images/ad-005.png" style="width:100%">
				<p class="text">SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</p>
				<p class="text1">￥ 68</p>
			</view>
			<view class="cont_box_sp" @click="tiao">
				<img src="/static/images/ad-005.png" style="width:100%">
				<p class="text">SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</p>
				<p class="text1">￥ 68</p>
			</view>
			<view class="cont_box_sp" @click="tiao">
				<img src="/static/images/ad-005.png" style="width:100%">
				<p class="text">SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</p>
				<p class="text1">￥ 68</p>
			</view>
			<view class="cont_box_sp" @click="tiao">
				<img src="/static/images/ad-005.png" style="width:100%">
				<p class="text">SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</p>
				<p class="text1">￥ 68</p>
			</view>
			<view class="cont_box_sp" @click="tiao">
				<img src="/static/images/ad-005.png" style="width:100%">
				<p class="text">SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</p>
				<p class="text1">￥ 68</p>
			</view> -->
    </view>
    <uni-load-more v-if="!isEmpty && shopsList.length > 0" :status="status" :content-text="contentText" />
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
      <text>空空如也</text>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    components: {
      uniLoadMore
    },
    data() {
      return {
        isEmpty: false,
        isLoadEnd: false,
        status: 'more',
        contentText: {
          contentdown: '查看更多',
          contentrefresh: '加载中...',
          contentnomore: '没有更多数据了'
        },
        shopsList: [], //商品列表
        reConfig: { //请求配置
          page: 0,
          page_num: 10,
          cate_id: ''
        }
      }
    },
    onLoad(e) {
      this.reConfig.cate_id = e.cateId;
      this.fetchShopsList();
    },
    methods: {
      fetchShopsList() { //获取商品列表
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.post(this.$api.product.cateGoods, this.reConfig).then(res => {
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
          if (res.code === 200) {
            let {
              data
            } = res;
            if (!data || data.length === 0) return this.isEmpty = true; //非空判断
            if (this.reConfig.page_num > data.length) {
              this.isLoadEnd = true;
              this.status = 'noMore';
            }
            this.shopsList = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      tiao(obj) { //跳转商品详情
        uni.navigateTo({
          url: "/pages/products/productDetail/productDetail?product_id=" + obj.goods_id
        })
      }
    },
    onReachBottom() { //页面触底事件
      if (this.isLoadEnd) return;
      this.status = 'loading';
      this.reConfig.page++;
      this.$Request.post(this.$api.product.cateGoods, this.reConfig).then(res => {
        if (res.code === 200) {
          let {
            data
          } = res;
          this.shopsList = this.shopsList.concat(data);
          if (this.reConfig.page_num > data.length) {
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
    }
  }
</script>

<style lang="scss" scoped>
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cont_box_sp {
    width: 27%;
    padding: 22.5rpx 20rpx;
    text-align: center;
    margin-top: 22.5rpx;
    border-radius: 22.5rpx;
    background: #f5f5f5;
  }
  
  .cont_box_img{
    width:100%;
  }

  .cont_box {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .head {
    display: flex;
    line-height: 75rpx;
    justify-content: flex-end;
  }

  .emptyBox {
    position: fixed;
    left: 50%;
    top: 40%;
    width: 400rpx;
    height: 400rpx;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 32rpx;
    color: #FA5951;
  }
</style>
