<template>
  <view>
    <view class="listItem uni-inline-item" v-for="(item,index) in shopList" :key="index">
      <view class="itemLeft">
        <text class="itmeText uni-ellipsis">{{item.store_name}}
        <!-- <text class="itemName">[商家名称]</text> -->
        </text>
        <text class="itemTime">{{item.add_time}}</text>
      </view>
      <view class="">商家入驻</view>
    </view>
    <uni-load-more v-if="!isEmpty && shopList.length > 0" :status="status" :content-text="contentText" />
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
      <text>空空如也</text>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
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
        shopList:[]
      };
    },
    onLoad() {
      this.fetchShopList();
    },
    methods: {
      fetchShopList() { //获取商家列表
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.post(this.$api.me.shopList, this.reConfig).then(res => {
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
          if (res.code === 200) {
            if(!res.data || res.data.length === 0) return this.isEmpty = true; //非空判断
            if (this.reConfig.page_num > res.data.length) {
              this.isLoadEnd = true;
              this.status = 'noMore';
            }
            this.shopList = res.data;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000
            })
          }
        })
      }
    },
    onReachBottom() { //页面触底事件
      if (this.isLoadEnd) return;
      this.status = 'loading';
      this.reConfig.page++;
      this.$Request.post(this.$api.me.shopList, this.reConfig).then(res => {
        if (res.code === 200) {
          if (this.reConfig.page_num > res.data.length) {
            this.isLoadEnd = true;
            this.status = 'noMore';
          } else {
            this.status = 'more';
          }
          this.shopList = this.shopList.concat(res.data);
        } else {
          uni.showToast({
            title: res.msg,
            duration: 2000,
            icon: 'none'
          })
        }
      })
    },
    components: {
      uniLoadMore
    }
  }
</script>

<style lang="less" scoped>
  .listItem{
    justify-content:space-between;
    padding: 0 30rpx 20rpx;
    margin-top:16rpx;
    &:nth-child(even){
      background:#F7F7F7;
    }
  }
  .itemLeft{
    flex:1;
    display:flex;
    flex-direction:column;
    .itemTime{
      margin-left:0;
      color:#999999;
      font-size:28rpx;
    }
  }
  
  .itmeText{
    font-family:PingFangSC-regular;
    color:#000000;
    font-size:30rpx;
  }
  
  .itemName{
    color:#999999;
  }
  
  .emptyBox {
    position:fixed;
    left:50%;
    top:40%;
    width: 400rpx;
    height: 400rpx;
    transform: translate(-50%,-50%);
    text-align: center;
    font-size: 32rpx;
    color: #FA5951;
  }
</style>
