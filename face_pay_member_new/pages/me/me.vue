<template>
  <view class="content">
   <!-- <image class="bgImg" src="/static/icon/2019slyw_1.png" mode="widthFix"></image>
    <view class="infoBox">
      <view class="userIcon">
        <image :src="userInfo.head"></image>
      </view>
      <view class="userName">{{userInfo.nickname}}</view>
      <view class="userPhone">{{userInfo.mobile}}</view>
      <view class="infoBottom uni-inline-item">
        <navigator url="/pages/brokerage/borkerageDetail/borkerageDetail" hover-class="none">
          <view class="bottomImg">
            <image src="/static/icon/2019slyw_12.png"></image>
          </view>
          <view>佣金明细</view>
        </navigator>
        <navigator url="/pages/me/storeList/storeList" hover-class="none">
          <view class="bottomImg">
            <image src="/static/icon/2019slyw_13.png"></image>
          </view>
          <view>商家列表</view>
        </navigator>
      </view>
    </view>
    <view class="amountBox">
      余额：¥{{userInfo.balance}}
      <navigator class="withdrawBox" hover-class="none" url="/pages/myWallet/withdraw/withdraw">
        <image src="/static/icon/2019slyw_15.png"></image>
      </navigator>
    </view> -->
    <swiper class="swiperBox"  :skip-hidden-item-layout="true" :circular="true" :indicator-dots="true" :autoplay="true" indicator-color="rgba(255,255,255,0.7)">
      <swiper-item class="swiper-item" v-for="(item,index) in carousel" :key="index">
        <image :src="item.banner"></image>
      </swiper-item>
    </swiper>
    
    <uni-notice-bar :show-icon="true" :scrollable="true" :single="true" :text="noticeText" :speed="70" />
    
    <view class="add_borbg">
      <!--van-notice-bar  >
	  <span class="notice_text">11月14日晚，中国国家队在40强赛比赛中1比2不敌叙利亚队。赛后，国家队主帅里皮宣布辞职。随后，中国足协也发表官方声明，表示接受这一辞职请求</span>
	</van-notice-bar-->
      <view class="index_ul">
        <view class="index_ul_li">
          <navigator class="index_ul_li_a" url="/pages/personalCenterNeiye/mySheBei" hover-class="none">
            <img src="/static/holder/list11.png" class="index_li_img" />
            <view class="index_li_text">
              我的设备
            </view>
          </navigator>
        </view>
        <view class="index_ul_li">
          <navigator class="index_ul_li_a" url="/pages/personalCenterNeiye/tuandui" hover-class="none">
            <img src="/static/holder/list22.png" class="index_li_img" />
            <view class="index_li_text">
              团队设备
            </view>
          </navigator>
        </view>
        <view class="index_ul_li">
          <navigator url="/pages/agent/agent" class="index_ul_li_a" hover-class="none">
            <img src="/static/holder/list33.png" class="index_li_img" />
            <view class="index_li_text">
              代理中心
            </view>
          </navigator>
        </view>
        <view class="index_ul_li">
          <navigator class="index_ul_li_a" url="/pages/personalCenterNeiye/shangxueyuan" hover-class="none">
            <img src="/static/holder/list44.png" class="index_li_img" />
            <view class="index_li_text">
              商学院
            </view>
          </navigator>
        </view>
      </view>
    </view>
    <block v-if="productList.length > 0">
      <view class="index_cen" style="margin-top:20px">
        <p class="index_cen_tit">
          <!-- <span class="bor"></span> -->
          <span style="margin-left:.3rem">活动专场</span>
        </p>
      </view>
      <view class="cen_index_ul">
        <view class="cen_index_ul_li" v-for="(item,index) in productList" :key="index">
          <navigator :url="'/pages/products/productDetail/productDetail?product_id='+item.goods_id" hover-class="none" class="cen_index_ul_li_a">
            <view class="cen_index_ul_li_left">
              <img :src="item.picture" />
            </view>
            <view class="cen_index_ul_li_right">
              <p class="">
                <span class="add_text2">超值礼包</span>
              </p>
              <p class="cen_ul_tit">
                {{item.goods_name}}
              </p>
              <p class="cen_ul_text">
                {{item.goods_desc}}
              </p>
              <p class="cen_ul_btn">
                <!-- <span class="cen_btn1"> 超值礼包</span> -->
                <span>采购&nbsp¥{{item.shop_price}}</span>
              </p>
            </view>
          </navigator>
        </view>
      </view>
      <uni-load-more v-if="!isEmpty && productList.length > 0" :status="status" :content-text="contentText" />
    </block>
  </view>
</template>

<script>
  import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      uniLoadMore,
      uniNoticeBar
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
        userInfo: {
          head: '',
          mobile: '',
          nickname: '',
          balance: ''
        },
        reConfig: {
          page: 0,
          page_num: 10
        },
        carousel: [], //轮播列表
        productList: [], //产品列表
        noticeText:'' //公告
      }
    },
    onLoad() {
      this.fetchNewCategory();
      this.fetchCarousel();
      this.fetchProducts();
    },
    methods: {
      fetchNewCategory() { //公告分类
        new Promise((resolve, reject) => {
          this.$Request.post(this.$api.business.newCategory).then(res => {
            if (res.code === 200) {
              resolve(res.data[0]);
            } else {
              uni.showToast({
                icon: 'none',
                title: res.msg
              })
            }
          })
        }).then(succ => {
          let requestNotice = {
            page: 0,
            page_num: 1,
            id: succ.id
          }
          this.$Request.post(this.$api.business.cateIdNews, requestNotice).then(res => {
            if (res.code === 200) {
              this.noticeText = res.data[0].description;
            } else {
              uni.showToast({
                icon: 'none',
                title: res.msg
              })
            }
          })
        })
      },
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
      fetchInfo() {
        this.$Request.post(this.$api.me.myData).then(res => {
          setTimeout(() => {
            uni.stopPullDownRefresh();
          }, 500)
          if (res.code === 200) {
            this.userInfo = res.data.user;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      },
      fetchProducts() {
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.post(this.$api.product.list, this.reConfig).then(res => {
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
          if (res.code === 200) {
            let {data} = res;
            if (!data || data.length === 0) return this.isEmpty = true; //非空判断
            if (this.reConfig.page_num > data.length) {
              this.isLoadEnd = true;
              this.status = 'noMore';
            }
            this.productList = data;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      }
    },
    onReachBottom() { //页面触底事件
      if (this.isLoadEnd) return;
      this.status = 'loading';
      this.reConfig.page++;
      this.$Request.post(this.$api.product.list, this.reConfig).then(res => {
        if (res.code === 200) {
          let {data} = res;
          this.productList = this.productList.concat(data);
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
  .content {
    box-sizing: border-box;
    padding: 20rpx 30rpx 0;
    height: 100%;
    position: relative;
  }
  
  .swiperBox {
    height: 350rpx;
    margin-bottom:20rpx;
    border-radius:16rpx;
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

  .bgImg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .infoBox {
    position: relative;
    z-index: 10;
    margin-top: 20rpx;
    background: #FFFFFF;
    padding: 20rpx;
    border-radius: 10rpx;
    box-shadow: 0 6rpx 20rpx 0 rgba(255, 152, 0, 0.4);
  }

  .userIcon {
    margin: 0 auto;
    width: 120rpx;
    height: 120rpx;
    padding: 8rpx;
    background-color: #FF9800;
    border-radius: 50%;

    image {
      border-radius: 50%;
    }
  }

  .userName {
    text-align: center;
    font-size: 34rpx;
    letter-spacing: 4rpx;
    padding: 10rpx 0;
  }

  .userPhone {
    text-align: center;
    font-size: 32rpx;
  }

  .infoBottom {
    margin-top: 10rpx;
    justify-content: space-around;
  }

  .bottomImg {
    width: 80rpx;
    height: 80rpx;
    margin: 10rpx auto 16rpx;
  }

  .amountBox {
    margin: 16rpx auto;
    height: 140rpx;
    line-height: 140rpx;
    text-align: center;
    background-image: url(~@/static/icon/2019slyw_14.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    justify-content: space-between;
    font-size: 34rpx;
    color: #935A00;
    position: relative;
  }

  .withdrawBox {
    position: absolute;
    top: 0;
    right: 10rpx;
    width: 100rpx;
    height: 100rpx;
    padding: 20rpx;
  }

  .list_item {
    height: 120rpx;
    justify-content: space-between;
    border-bottom: 1px solid #F3F3F3;
  }

  .listIcon {
    width: 70rpx;
    height: 70rpx;
  }

  .iconxiangyou1 {
    font-size: 26rpx;
    font-weight: bold;
    color: #999999;
  }


  .index_ul {
    width: 100%;
    display: flex;
    height: 60px;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
  }

  .index_ul_li {
    flex: 1;
    height: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .index_li_img {
    width: 40px;
    height: 40px;
    padding: 2px 0;
  }

  .index_ul_li_a {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .index_li_text {
    width: 100%;
    text-align: center;
    color: #333;
    font-weight: 500;
    font-size: 14px;
    background: #fff;
    padding-bottom: 10px;
  }

  .add_borbg {
    background: #fff;
    border-radius: 10px 10px 0 0;
    padding-top: 2px;
    padding-bottom: 10px;
  }



  .index_cen {
    width: 100%;
    margin-top: 10px;
    background: #fff;
  }

  .index_cen_tit {
    height: 38px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
    padding: .18rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 0;
  }

  .bor {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: rgb(233, 122, 14);
    margin-right: 10px;
    margin-left: 10px;
  }

  .cen_index_ul {
    width: 100%;
    background: #fff;
  }

  .cen_index_ul_li {
    width: 98%;
    height: 120px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: .3rem 0 .15rem .2rem;
  }

  .cen_index_ul_li_a {
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cen_index_ul_li_a p {
    margin: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cen_index_ul_li_left {
    width: 27%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background: #eaeaea; */
    border-radius: 5px;
  }

  .cen_index_ul_li_left img {
    width: 95%;
    height: 95%;
    /* object-fit: cover; */
    border-radius: .2rem;
  }

  .cen_index_ul_li_right {
    width: 69%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    border-bottom: .01rem solid #ccc;
    padding-bottom: .15rem;
  }

  .cen_ul_tit {
    color: #333;
    font-weight: 500;
    font-size: 16px;
  }

  .cen_ul_btn {
    color: rgb(236, 148, 63);
    display: flex;
    width: 80% !important;
    justify-content: space-between;
    align-items: center;
  }

  .cen_btn1 {
    font-size: 16px;
  }

  .cen_ul_text {}

  .add_text2 {
    padding: 1px 6px;
    display: inline-block;
    border-radius: 5px;
    color: rgb(236, 148, 63);
    border: 1px solid rgb(236, 148, 63);
  }
</style>
