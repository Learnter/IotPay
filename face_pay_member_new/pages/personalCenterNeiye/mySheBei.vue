<template>
  <view>
    <view class="section_item">
      <p class="padge_tit">我的设备总数：{{myCount}} (台)
      </p>
      <view class="section_item_ul">
        <view class="li">
          <view class="section_item_ul_a">
            <view class="section_item_ul_cen">
              <view class="num_chen">
                3
              </view>
              <view class="num_chen_tit">
                可用设备
              </view>
            </view>
          </view>
        </view>
        <view class="li">
          <view class="section_item_ul_a">
            <view class="section_item_ul_cen">
              <view class="num_chen">
                3
              </view>
              <view class="num_chen_tit">
                可用设备
              </view>
            </view>
          </view>
        </view>
        <view class="li">
          <view class="section_item_ul_a">
            <view class="section_item_ul_cen">
              <view class="num_chen">
                3
              </view>
              <view class="num_chen_tit">
                可用设备
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="box">
      <view class="box1" v-for="(item,index) in storeList" :key="index">
        <img :src="item.logo">
        <view class="uni-inline-item uni-flex-item box1_right">
          <view class="center">
            <view class="uni-ellipsis">地址：{{item.address}}</view>
            <view style="color:#ccc">门店：{{item.store_name}}</view>
          </view>
          <view class="right">
            <i class="iconfont icondianhua" @tap="callTel(item.mobile)"></i>
          </view>
        </view>
      </view>
      <!-- 	<view class="box1" >
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
			</view> -->
    </view>
    <uni-load-more v-if="!isEmpty && storeList.length > 0" :status="status" :content-text="contentText" />
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/a024laner_105.png"></image>
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
        isloadEnd: false,
        isEmpty: false,
        status: 'more',
        contentText: {
          contentdown: '查看更多',
          contentrefresh: '加载中...',
          contentnomore: '没有更多数据了'
        },
        reConfig: {
          page: 0,
          page_num: 10
        },
        myCount:0,//我的设备
        storeList: [] //商店列表
      }
    },
    onLoad() {
      this.fetchStores();
    },
    methods: {
      fetchStores() { //获取店铺列表
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.post(this.$api.equipment.storelist, this.reConfig).then(res => {
          uni.hideLoading();
          if (res.code === 200) {
            let {list,count} = res.data;
            this.myCount = count;
            // console.log(res.data);
            if (!list || list.length === 0) return this.isEmpty = true;
            if (this.reConfig.page_num > list.length) {
              this.isLoadEnd = true;
              this.status = 'noMore';
            }
            this.storeList = list;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      },
      callTel(value) { //打电话
        uni.makePhoneCall({
          phoneNumber: value
        })
      }
    },
    onReachBottom() { //页面触底事件
      if (this.isLoadEnd) return;
      this.status = 'loading';
      this.reConfig.page++;
      this.$Request.post(this.$api.equipment.storelist, this.reConfig).then(res => {
        if (res.code === 200) {
          let {
            list
          } = res.data;
          if (this.reConfig.page_num > list.length) {
            this.isLoadEnd = true;
            this.status = 'noMore';
          } else {
            this.status = 'more';
          }
          this.storeList = this.storeList.concat(list);
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
  .box{
    padding-top:360rpx;
  }
  .box1 {
    width: 100%;
    height: 150rpx;
    box-sizing: border-box;
    padding: 10rpx;
    display: flex;
    align-items: center;
    position: relative;
    background: white
  }

  .box1_right {
    border-bottom: 2rpx solid #ccc;
    overflow: hidden;
  }

  .box1 img {
    flex-shrink: 0;
    width: 112rpx;
    height: 112rpx;
    border-radius: 50%;
    margin-right: 20rpx;
    margin-left: 20rpx
  }

  .box1 .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 112rpx;
    font-size: 30rpx;
    overflow: hidden;
    padding-right: 16rpx;
  }

  .box1 .right {
    border-left: 2rpx solid #ccc;
    width: 100rpx;
    text-align: center;
  }

  .right i {
    font-size: 56rpx;
    color: #0080FF
  }

  .num_chen {
    font-size: 60rpx;
    width: 100%;
  }

  .num_chen_tit {
    font-size: 28.5rpx;
    width: 100%;
  }

  .section_item_ul_cen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    text-align: center;
  }

  .section_item_ul_a {
    width: 100%;
    height: 60%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .section_item_ul .li:nth-child(1) {
    background: rgb(67, 186, 238);
  }

  .section_item_ul .li:nth-child(2) {
    background: rgb(120, 197, 163);
  }

  .section_item_ul .li:nth-child(3) {
    background: rgb(176, 161, 207);
  }

  .section_item_ul .li {
    width: 31%;
    height: 262.5rpx;
    border-radius: 15rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .section_item_ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .padge_tit {
    font-size: 25.5rpx;
    color: #444;
    letter-spacing: 0.75rpx;
    margin: 0;
    padding: 18.75rpx 0;
  }

  .section_item {
    position:fixed;
    left:0;
    top:0;
    right:0;
    z-index:10;
    box-sizing:border-box;
    padding: 0% 3%;
    height: 360rpx;
    background: rgb(249, 249, 252);
  }

  .emptyBox {
    position: fixed;
    left: 50%;
    top: 60%;
    width: 400rpx;
    height: 400rpx;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 32rpx;
    color: #158DFF;
  }
</style>
