<template>
  <view class="content">
    <!--   <navigator :url="'/pages/products/productDetail/productDetail?product_id='+item.goods_id" hover-class="none" class="uni-inline-item productBox" v-for="(item,index) in productList" :key="index">
      <view class="leftPicture">
        <image :src="item.picture"></image>
      </view>
      <view class="rightInfo">
        <view class="right_one_row uni-ellipsis">{{item.goods_name}}</view>
        <view class="right_second_row uni-ellipsis">{{item.goods_desc}}</view>
        <view class="right_last_row">商家申请<text style="font-size:26rpx">采购 ¥ {{item.shop_price}}</text></view>
        <view class="right_bottom_line"></view>
      </view>
    </navigator> -->
    <!-- 轮播 -->
    <swiper class="swiperBox" indicator-color="rgba(255,255,255,0.7)" :skip-hidden-item-layout="true" :circular="true" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000">
      <swiper-item class="swiper-item" v-for="(item,index) in carousel" :key="index">
        <image :src="item.banner"></image>
      </swiper-item>
    </swiper>
    <!-- <view class="m-slider" data-ydui-slider>
      <view class="slider-wrapper">
        <view class="slider-item">
          <navigator href="bag.html">
            <img src="/static/images/3c.jpg" alt="">
          </navigator>
        </view>
        <view class="slider-item">
          <navigator >
            <img src="/static/images/banner2.png" alt="">
          </navigator>
        </view>
        <view class="slider-item">
          <navigator>
            <img src="/static/images/1c.jpg" alt="">
          </navigator>
        </view>
      </view>
      <view class="slider-pagination"></view>
    </view> -->
    <!-- 轮播 -->
    <view class="jqui-palace jqui-palace-one">
      <navigator class="jqui-palace-grid" hover-class="none" :url="'/pages/personalCenterNeiye/shangpin?cateId='+item.cate_id"
        v-for="(item,index) in categoryList" :key="index">
        <view class="jqui-palace-grid-icon">
          <image :src="item.icon"></image>
        </view>
        <view class="jqui-palace-grid-text">
          <h2>{{item.name}}</h2>
        </view>
      </navigator>
      <!-- <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-002.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>商米蜻蜓</h2>
          </view>
        </navigator>
        <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-003.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>青蛙支付</h2>
          </view>
        </navigator>
        <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-004.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>热销产品</h2>
          </view>
        </navigator>
        <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-005.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>猜你喜欢</h2>
          </view>
        </navigator>
        <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-006.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>用户推荐</h2>
          </view>
        </navigator>
        <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-007.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>经济实用</h2>
          </view>
        </navigator>
        <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-008.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>品质质保</h2>
          </view>
        </navigator>
        <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-009.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>高端设备</h2>
          </view>
        </navigator>
        <navigator class="jqui-palace-grid" url="/pages/personalCenterNeiye/shangpin">
          <view class="jqui-palace-grid-icon">
            <img src="/static/icon/nav-010.png" alt="">
          </view>
          <view class="jqui-palace-grid-text">
            <h2>易淘商城</h2>
          </view>
        </navigator> -->
    </view>
    <!--  <view class="jqui-ad-img">
        <img src="/static/icon/ad-001.png" alt="">
      </view>
      <view class="jqui-flex jqui-flex-two" style="padding:5px;">
        <view class="jqui-flex-box jqui-flex-box-one">
          <img src="/static/icon/ad-002.png" alt="" >
        </view>
        <view class="jqui-flex-box">
          <view class="sml-img" style="margin-bottom:5px;">
            <img src="/static/icon/ad-003.png" alt="">
          </view>
          <view class="sml-img">
            <img src="/static/icon/ad-004.png" alt="">
          </view>
        </view>
      </view> -->


    <view class="viewHeight"></view>
    <view class="jqui-flex">
      <view class="jqui-flex-box">
        <h3>精选好物 <em>选你所选</em></h3>
      </view>
    </view>
    <view class="jqui-palace jqui-palace-two">
      <navigator class="jqui-palace-grid" :url="'/pages/products/productDetail/productDetail?product_id='+item.goods_id"  hover-class="none"  v-for="(item,index) in recommendList" :key="index">
        <view class="jqui-palace-grid-icon">
          <img :src="item.picture" alt="">
        </view>
        <view class="jqui-palace-grid-text">
          <h2>{{item.goods_name}}</h2>
          <span><em><i>￥</i>{{item.shop_price}}</em></span>
        </view>
      </navigator>
     <!-- <navigator class="jqui-palace-grid">
        <view class="jqui-palace-grid-icon">
          <img src="/static/icon/ad-006.png" alt="">
        </view>
        <view class="jqui-palace-grid-text">
          <h2>支付宝青蛙刷脸支付机系统</h2>
          <span><em><i>￥</i>1323.00</em></span>
        </view>
      </navigator>
      <navigator class="jqui-palace-grid">
        <view class="jqui-palace-grid-icon">
          <img src="/static/icon/ad-007.png" alt="">
        </view>
        <view class="jqui-palace-grid-text">
          <h2>SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</h2>
          <span><em><i>￥</i>32.90</em></span>
        </view>
      </navigator> -->
    </view>
    <view class="viewHeight"></view>
   <!-- <view class="jqui-flex">
      <view class="jqui-flex-box">
        <h3>特色频道 <em>专属定制</em></h3>
      </view>
    </view>
    <view class="jqui-flex jqui-flex-sml">
      <view class="jqui-flex-box">
        <navigator class="jnm"><img src="/static/icon/ad-008.png" alt=""></navigator>
      </view>
      <view class="jqui-flex-box">
        <navigator class="jnm"><img src="/static/icon/ad-009.png" alt=""></navigator>
      </view>
    </view>
    <view class="jqui-flex jqui-flex-sml mar"></a>
      <view class="jqui-flex-box">
        <navigator class="jnm"> <img src="/static/icon/ad-010.png" alt=""></navigator>
      </view>
      <view class="jqui-flex-box">
        <navigator class="jnm"> <img src="/static/icon/ad-011.png" alt=""></navigator>
      </view>
    </view>

    <view class="viewHeight"></view>
    <view class="jqui-material-list">
      <view class="jqui-material-item">
        <view class="jqui-flex">
          <view class="jqui-flex-box">
            <img src="/static/icon/ad-012.png" alt="">
          </view>
        </view>
        <view class="jqui-palace jqui-palace-two">
          <navigator class="jqui-palace-grid">
            <view class="jqui-palace-grid-icon">
              <img src="/static/icon/ad-005.png" alt="">
            </view>
            <view class="jqui-palace-grid-text">
              <h2>SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</h2>
              <span><em><i>￥</i>2321</em></span>
            </view>
          </navigator>
          <navigator class="jqui-palace-grid">
            <view class="jqui-palace-grid-icon">
              <img src="/static/icon/ad-014.png" alt="">
            </view>
            <view class="jqui-palace-grid-text">
              <h2>支付宝青蛙刷脸支付机系统</h2>
              <span><em><i>￥</i>31231</em></span>
            </view>
          </navigator>
          <navigator class="jqui-palace-grid">
            <view class="jqui-palace-grid-icon">
              <img src="/static/icon/ad-005.png" alt="">
            </view>
            <view class="jqui-palace-grid-text">
              <h2>SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</h2>
              <span><em><i>￥</i>13211</em></span>
            </view>
          </navigator>
        </view>
      </view>
      <view class="viewHeight"></view> -->
      <view class="jqui-flex">
        <view class="jqui-flex-box">
          <h3>精品热销 <em>知你所爱</em></h3>
        </view>
      </view>
      <view class="jqui-material-item">
       <!-- <view class="jqui-flex">
          <view class="jqui-flex-box">
            <img src="/static/icon/ad-012.png" alt="">
          </view>
        </view> -->
        <view class="jqui-palace jqui-palace-two">
          <navigator class="jqui-palace-grid" :url="'/pages/products/productDetail/productDetail?product_id='+item.goods_id"  hover-class="none"  v-for="(item,index) in hostSaleList" :key="index">
            <view class="jqui-palace-grid-icon">
              <img :src="item.picture" alt="">
            </view>
            <view class="jqui-palace-grid-text">
              <h2>{{item.goods_name}}</h2>
              <span><em><i>￥</i>{{item.shop_price}}</em></span>
            </view>
          </navigator>
        <!--  <navigator class="jqui-palace-grid">
            <view class="jqui-palace-grid-icon">
              <img src="/static/icon/ad-014.png" alt="">
            </view>
            <view class="jqui-palace-grid-text">
              <h2>支付宝青蛙刷脸支付机系统</h2>
              <span><em><i>￥</i>31231</em></span>
            </view>
          </navigator>
          <navigator class="jqui-palace-grid">
            <view class="jqui-palace-grid-icon">
              <img src="/static/icon/ad-005.png" alt="">
            </view>
            <view class="jqui-palace-grid-text">
              <h2>SUNMI商米蜻蜓T3B00刷脸支付机支付宝刷脸收款机</h2>
              <span><em><i>￥</i>13211</em></span>
            </view>
          </navigator> -->
        </view>
      </view>
    </view>
    <!-- <view style="height:52px;"></view> -->
    <!-- <uni-load-more v-if="!isEmpty && productList.length > 0" :status="status" :content-text="contentText" />
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
      <text>空空如也</text>
    </view> -->
  </view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    data() {
      return {
        carousel: [], //轮播列表
        categoryList: [], //分类列表
        recommendList:[],//推荐列表
        hostSaleList:[] //热卖列表
      };
    },
    onLoad() {
      this.fetchCarousel();
      this.fetchCategory();
      this.fetchRecommend();
      this.fetchHostSale();
    },
    methods: {
      fetchCarousel() { //获取轮播图
        this.$Request.post(this.$api.carousel).then(res => {
          if (res.code === 200) {
            this.carousel = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      fetchCategory() { //获取分类列表
        uni.showLoading({
          mask: true,
          title: '加载中...'
        });
        this.$Request.post(this.$api.product.category).then(res => {
          uni.hideLoading();
          if (res.code === 200) {
            this.categoryList = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      fetchRecommend() { //获取推荐列表
        this.$Request.post(this.$api.product.recommend,{page:0,page_num:6}).then(res => {
          if (res.code === 200) {
            this.recommendList = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      fetchHostSale() { //获取热卖列表
        this.$Request.post(this.$api.product.hotSale,{page:0,page_num:6}).then(res => {
          if(res.code === 200){
            this.hostSaleList = res.data;
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      }
    },
    components: {
      uniLoadMore
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    box-sizing: border-box;
    padding: 20rpx 20rpx 0;
    min-height: 100%;
  }

  .swiperBox {
    height: 300rpx;
    border-radius:16rpx;
    margin-bottom:20rpx;
    .swiper-item{
      width:100%;
      height:100%;
      overflow:hidden;
      border-radius:16rpx;
      image{
        border-radius:16rpx;
      }
    }
  }

  .productBox {
    margin-bottom: 20rpx;
  }

  .leftPicture {
    width: 170rpx;
    height: 170rpx;
    margin-right: 20rpx;
  }

  .rightInfo {
    align-self: stretch;
    flex: 1;
    overflow: hidden;
    font-family: PingFangSC-regular;
  }

  .right_one_row {
    font-size: 34rpx;
  }

  .right_second_row {
    font-size: 28rpx;
    color: rgba(16, 16, 16, 0.5);
    padding: 10rpx 0 12rpx;
  }

  .right_last_row {
    font-size: 30rpx;
    color: #FEBB3C;
    padding-bottom: 10rpx;
  }

  .right_bottom_line {
    margin-left: 40rpx;
    height: 1px;
    background: #BBBBBB;
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



  .jqui-palace {
    padding: 0.3rem 0;
    position: relative;
    overflow: hidden;
  }

  .jqui-palace-grid {
    position: relative;
    float: left;
    padding: 1px;
    width: 20%;
    box-sizing: border-box;
    margin: 5px 0;
  }

  .jqui-palace-good {
    position: relative;
    float: left;
    padding: 1px;
    width: 31%;
    box-sizing: border-box;
    margin: 5px 0;
  }


  .jqui-palace-grid-icon {
    width: 30px;
    height: 30px;
    margin: 0 auto;
  }

  .jqui-palace-grid-icon image {
    display: block;
    width: 100%;
    height: 100%;
    border: none;

  }

  .jqui-palace-grid-text {
    display: block;
    text-align: center;
    color: #333;
    font-size: 25px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: .2rem;
  }

  .jqui-palace-grid-text h2 {
    font-size: 14px;
    font-weight: normal;
    color: #666666;
  }

  .jqui-palace-one .jqui-palace-grid-icon {
    width: 55px;
    height: 55px;
  }

  .jqui-flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: .15rem .3rem;
    position: relative;
  }

  .jqui-flex-box {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    min-width: 0;
    font-size: 14px;
    color: #333;
  }

  /* 必要布局样式css */

  .jqui-flexView {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .jqui-material-list .jqui-material-item {
    display: block;
  }

  .jqui-flex-two .jqui-flex-box {
    height: 7.5rem;
    border-radius: 8px;
    overflow: hidden;
  }

  .jqui-flex-two .jqui-flex-box-one {
    margin-right: 0.6rem;
  }

  .jqui-flex-color {
    padding-top: 0;
  }


  .jqui-palace-two {
    padding: 0 5px 10px 5px;
  }

  .jqui-palace-two .jqui-palace-grid {
    width: 30.5%;
    margin: 0 1% 1% 1%;
    background: #f5f5f5;
    padding: .2rem;
    border-radius: .3rem;
  }

  .jqui-palace-two .jqui-palace-grid-icon {
    display: block;
    width: 5.3rem;
    height: 6rem;
    border: none;
    object-fit: cover;
  }

  .jqui-palace-two .jqui-palace-grid-icon {
    display: block;
    width: 5.3rem;
    height: 6rem;
    border: none;
    object-fit: cover;
  }

  .jqui-flex-sml .jqui-flex-box img {
    width: 8.5rem;
    height: 4.5rem;
    object-fit: cover;
    border-radius: .2rem;
  }

  .jqui-palace-two .jqui-palace-grid-text h2 {
    color: #020202;
    word-wrap: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: justify;
    margin-top: 0.2rem;
  }

  .jqui-palace-two .jqui-palace-grid-text span {
    color: #676767;
    font-size: 14px;
  }

  .jqui-palace-two .jqui-palace-grid-text span em {
    color: #f47838;
    font-style: normal;
    font-size: 14px;
  }

  .jqui-palace-two .jqui-palace-grid-text span em i {
    font-style: normal;
    font-size: 14px;
  }



  img {
    width: 100%;
    height: auto;
    display: block;
    border: 0;
  }
</style>
