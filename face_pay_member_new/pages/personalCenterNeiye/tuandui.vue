<template>
  <view>
    <view class="section_item">
      <p class="padge_tit">团队设备总数：{{teamCount}} (台)
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
    </view>  
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
        isEmpty: false,
        teamCount: 0,
        storeList: [] //设备列表
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
        this.$Request.post(this.$api.teamEquipment.list).then(res => {
          uni.hideLoading();
          if (res.code === 200) {
            let {list,count} = res.data;
            this.teamCount = count;
            if (!list || list.length === 0) return this.isEmpty = true;
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
    }
  }
</script>

<style lang="scss" scoped>
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
    width: 47%;
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
    width: 94%;
    padding: 0% 3%;
    height: 360rpx;

    background: rgb(249, 249, 252);
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
