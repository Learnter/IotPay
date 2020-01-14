<template>
  <view class="flex">
    <view class="up">
      <view class="up1">
        <view class="up1Left">
          <img :src="userInfo.head">
        </view>
        <view class="up1Right">
          <p style="width: 100%; font-size: 30rpx;">{{userInfo.mobile}}</p>
          <p>费率分润总额:{{userInfo.allAmount}}</p>
        </view>
        <span class="tixian" @click="navigateTo">提现</span>
      </view>
      <view class="down1">
        <view class="down1left">
          已提现：{{userInfo.carry}}
        </view>
        <view class="down1Right">
          未提现：{{userInfo.noCarry}}
        </view>
      </view>
    </view>
    <view class="downBox" v-if="active == 0">
      <view class="head">
        <view class="headleft" :class="active == 0 ?'active':''" @click="clickColor" data-textId="0" style="backgroundColor:rgb(245, 202, 163)">
          分润明细
        </view>
        <view class="headleft" @click="clickColor" style="border-radius: 0px 15rpx 0px 0px;" data-textId="1">
          月份分润
        </view>
      </view>
      <view class="huan_box" style="width:100%">
        <view class="huan_ul" style="border-bottom: 2rpx solid rgb(204, 204, 204); height: 75rpx;">
          <view class="li">
            订单金额
          </view>
          <view class="li">
            分润金额
          </view>
          <view class="li">
            交易时间
          </view>
        </view>
      </view>
      <view class="huan_ul" v-for="(item,index) in shareList" :key="index">
        <view class="li">
          {{item.order_total}}
        </view>
        <view class="li">
          {{item.money}}
        </view>
        <view class="li li_time">
          {{item.add_time}}
        </view>
      </view>
      <uni-load-more v-if="!isEmpty && shareList.length > 0" :status="status" :content-text="contentText" />
    </view>
    <view class="downBox" v-if="active == 1">
      <view class="head">
        <view class="headleft" @click="clickColor" data-textId="0">
          分润明细
        </view>
        <view class="headleft" :class="active == 1 ?'active':''" @click="clickColor" style="border-radius: 0px 15rpx 0px 0px;" data-textId="1">
          月份分润
        </view>
      </view>
      <view class="huan_box" style="width:100%">
        <view class="huan_ul" style="border-bottom: 2rpx solid rgb(204, 204, 204); height: 75rpx;">
          <view class="li">
            订单金额
          </view>
          <view class="li">
            分润金额
          </view>
          <view class="li">
            交易时间
          </view>
        </view>
      </view>
      <view class="huan_ul" v-for="(item,index) in monthList" :key="index">
        <view class="li">
          {{item.orderAmount}}
        </view>
        <view class="li">
          {{item.getAmount}}
        </view>
        <view class="li li_time">
          {{item.time}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      uniLoadMore
    },
    data() {
      return {
        active: 0,
        isLoadEnd: false,
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
        shareList: [], //分润佣金
        monthList:[],//月份分润
        userInfo: {
          head:'',
          allAmount:'',
          carry:'',
          mobile:'',
          name:'',
          noCarry:''
        }
      }
    },
    onLoad() {
      this.shareInfo();
      this.shareDetail();
    },
    methods: {
      shareInfo() { //分润信息
        uni.showLoading({
          mask: true,
          title: '加载中...'
        });
        this.$Request.post(this.$api.me.shareInfo).then(res => {
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
          if (res.code === 200) {
            this.userInfo = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      shareDetail() { //分润明细
        this.$Request.post(this.$api.me.brokerage, this.reConfig).then(res => {
          if (res.code === 200) {
            let {list} = res.data;
            if (!list || list.length === 0) return this.isEmpty = true; //非空判断
            if (list.length < this.reConfig.page_num) {
              this.isLoadEnd = true;
              this.status = 'noMore';
            } else {
              this.status = 'more';
            }
            this.shareList = list;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      },
      shareMonth(){ //月份分润
        this.$Request.post(this.$api.me.shareMonth).then(res => {
          if (res.code === 200) {
            this.monthList = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      clickColor(e) {
        if(this.active == e.target.dataset.textid) return;
        if (e.target.dataset.textid == 0) {
          this.active = 0
          this.reConfig.page = 0;
          this.isLoadEnd = false;
          this.isEmpty = false;
          this.status = 'more';
          this.shareDetail();
        } else {
          this.active = 1
          this.shareMonth();
        }
      },
      navigateTo(e) {
        uni.navigateTo({
          url: "/pages/myWallet/withdraw/withdraw"
        })
      },
      loadMore(){ //加载更多
        if (this.isLoadEnd) return;
        this.status = 'loading';
        this.reConfig.page++;
        this.$Request.post(this.$api.me.brokerage, this.reConfig).then(res => {
          if (res.code === 200) {
            let {list} = res.data;
            if (this.reConfig.page_num > list.length) {
              this.isLoadEnd = true;
              this.status = 'noMore';
            } else {
              this.status = 'more';
            }
            this.shareList = this.shareList.concat(list);
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
    onReachBottom() {
      if(this.active != 0) return;
      this.loadMore();
    }
  }
</script>

<style lang="scss" scoped>
  .huan_ul {
    width: 100%;
    height: 80rpx;
    color: #8d8b8b;
    font-size: 28.5rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #F4F4F4;
  }

  .li {
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }

  .li_time {
    font-size: 26rpx;
    line-height: 26rpx;
    text-align: center;
  }

  .headleft {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #333;
    font-weight: bold;
    font-size: 33.75rpx;
    border-radius: 15rpx 0 0 0;
  }

  .head {
    width: 100%;
    height: 105rpx;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2rpx solid #ccc;
    border-radius: 15rpx 15rpx 0 0;
  }

  .downBox {
    width: 92%;
    padding-bottom: 21rpx;
    margin: 0 auto;
    box-shadow: 4rpx 4rpx 20rpx #ccc;
    border-radius: 15rpx;
    background: #fff;
    font-size: 26.26rpx
  }

  .down1left {
    width: 50%
  }

  .down1 {
    width: 83%;
    display: flex;
    margin: 0 auto;
    justify-content: flex-start;
    align-items: center;
    font-size: 30rpx;
  }

  .flex {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .up1Left {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .up1Left img {
    width: 135rpx;
    height: 135rpx;
    border-radius: 50%;
    border: 2rpx solid #fff;
    object-fit: cover;
  }

  .up1Right {
    width: 70%;
    height: 85%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }

  .tixian {
    display: inline-block;
    width: 112.5rpx;
    height: 52.5rpx;
    border: 2rpx solid #8c8989;
    border-radius: 75rpx;
    background: rgb(242, 214, 177);
    text-align: center;
    line-height: 52.5rpx;
    font-size: 26.25rpx;
    color: #4d4b4b;
    letter-spacing: 3.75rpx;
    position: absolute;
    right: 0;
    top: 15rpx;
  }

  .up1 {
    width: 95%;
    height: 150rpx;
    margin: 30rpx auto 45rpx auto;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .up {
    background: url(../../static/images/bgm.png);
    width: 88%;
    height: 300rpx;
    border-radius: 15rpx;
    color: #585757;
    font-size: 30rpx;
    font-weight: bold;
    padding: 15rpx;
    margin: 15rpx 0
  }

  .active {
    color: rgb(245, 202, 163);
  }
</style>
