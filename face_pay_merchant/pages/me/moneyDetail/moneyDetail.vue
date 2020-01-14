<template>
  <view class="content">
    <view class="circleBg">
      <image src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
    </view>
    <scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x>
      <view v-for="(tab,index) in month" :key="index" class="swiper-tab-list" :class="reConfig.type === tab.type ?'active':''"
        @click="chooseMonth(tab.type)">{{tab.name}}</view>
    </scroll-view>
    <view class="gatherBox" v-if="detailData">
      <view class="shadowBox">
        <view class="title uni-inline-item">
          <text>全部入账银行卡总额</text>
          <text class="sumCount">共{{detailData.count}}笔</text>
        </view>
        <view class="inputBox uni-inline-item">
          <text style="font-weight:bold;">¥</text>
          <input type="number" :value="detailData.amount" disabled  placeholder="0.00" />
        </view>
        <view class="uni-inline-item listTitle">
          <text>方式</text>
          <text>明细</text>
          <text>时间</text>
        </view>
        <scroll-view scroll-y="true" class="listBox" @scrolltolower="loadMore">
          <view class="listItem uni-inline-item" v-for="(item,index) in detailData.list" :key="index">
            <text style="flex:1" v-if="item.pay_code === 1">支付宝</text>
            <text style="flex:1" v-if="item.pay_code === 2">微信</text>
            <text style="flex:1;text-align:center;">¥{{item.order_pv}}</text>
            <text class="itmeTime">{{item.pay_time}}</text>
          </view>
          <uni-load-more v-if="!isEmpty" :status="status" :content-text="contentText" />
          <view class="emptybg" v-if="isEmpty">
            <image src="/static/holder/a024laner_105.png"></image>
            <view class="">本月收银空空如也</view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    data() {
      return {
        isLoadEnd:false,
        isEmpty:false,
        status: 'more',
        contentText: {
          contentdown: '查看更多',
          contentrefresh: '加载中...',
          contentnomore: '没有更多数据了'
        },
        month:[{name:'全部',type:0},{name:'一月',type:1},{name:'二月',type:2},{name:'三月',type:3},{name:'四月',type:4},{name:'五月',type:5},{name:'六月',type:6},
               {name:'七月',type:7},{name:'八月',type:8},{name:'九月',type:9},{name:'十月',type:10},{name:'十一月',type:11},{name:'十二月',type:12}],
        reConfig: {
          page: 0,
          page_num: 10,
          type: 0
        },
        detailData:null //收银明细
      };
    },
    onLoad() {
      this.fetchDetail();
    },
    methods: {
      fetchDetail() { //获取收银员明细信息
        uni.showLoading({mask:true,title:'加载中...'});
        this.$Request.post(this.$api.me.collectDetail,this.reConfig).then(res => {
           setTimeout(()=>{
             uni.hideLoading();
           },500)
          if (res.code === 200) { 
            this.detailData = res.data;
            if(res.data.list.length === 0){
              this.isEmpty = true;
            }else{
              if(this.reConfig.page_num > res.data.list.length){
                this.status = 'noMore',this.isLoadEnd = true;
              }
            } 
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon:'none'
            })
          }
        })
      },
      /*选择月份*/
      chooseMonth(value) {
        this.reConfig.type = value,this.reConfig.page = 0,this.isEmpty = false,this.isLoadEnd = false;
        this.fetchDetail();
      },
      /*选择月份*/
      loadMore(){ //加载更多
        if(this.isLoadEnd) return;
        this.status = 'loading';
        this.reConfig.page++;
        this.$Request.post(this.$api.me.collectDetail,this.reConfig).then(res => {
          if (res.code === 200) { 
             this.detailData.list = this.detailData.list.concat(res.data.list);
             if(this.reConfig.page_num > res.data.list.length){
               this.isLoadEnd = true;
               this.status = "noMore";
             }else{
               this.status = "more";
             }
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon:'none'
            })
          }
        })
      }
    },
    components:{
      uniLoadMore
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .circleBg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .uni-swiper-tab {
    position: relative;
    z-index: 10;
    height: 120rpx;
    line-height: 120rpx;
  }

  .swiper-tab-list {
    font-size: 32rpx;
    color: #FFFFFF;
  }

  .gatherBox {
    position: relative;
    z-index: 10;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 120rpx);
    padding: 0 30rpx 20rpx;
    overflow: hidden;

    .title {
      padding: 30rpx 30rpx 10rpx;
      font-size: 36rpx;
      font-family: PingFangSC-regular;
      color: #101010;
      font-weight: 600;
      letter-spacing: 1px;
      justify-content: space-between;

      .sumCount {
        font-size: 28rpx;
        color: #999999;
      }
    }

    .inputBox {
      margin: 0 30rpx;
      padding: 20rpx 0;
      font-size: 40rpx;
      border-bottom: 1px solid #F4F4F4;

      input {
        font-size: 50rpx;
      }
    }

    .listTitle {
      justify-content: space-between;
      padding: 30rpx 30rpx 0rpx;
      font-family: PingFangSC-bold;
      font-size: 30rpx;
      font-weight: bold;
    }

    .listBox {
      padding: 10rpx 16rpx;
      box-sizing: border-box;
      height: calc(100% - 280rpx);
    }

    .listItem {
      justify-content: space-between;
      padding: 16rpx 0 16rpx 16rpx;
      color: #888888;
      border-bottom: 1px solid #F4F4F4;

      .itmeTime {
        flex: 1;
        width: 100rpx;
        font-size: 24rpx;
        text-align: right;
      }
    }
  }

  .shadowBox {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 10rpx;
  }

  .active {
    position: relative;

    &:before {
      position: absolute;
      left: 0;
      right: 0;
      top: 105%;
      bottom: 0;
      content: '';
      width: 40%;
      height: 4rpx;
      border-radius: 10rpx;
      background: #FFFFFF;
      margin: 0 auto;
    }
  }
  .emptybg {
      width: 400rpx;
      height: 400rpx;
      text-align: center;
      margin: 50% auto;
      transform: translateY(-50%);
      color: #999999;
    }
</style>
