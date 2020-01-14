<template>
  <view class="content">
    <view class="circleBg">
      <image src="/static/icon/2019slzf_5.png" mode="widthFix"></image>
    </view>
   <view class="gatherTitle"></view>
    <view class="uni-inline-item userBox" v-if="userInfo">
      <view class="userLogo">
        <image :src="userInfo.head"></image>
      </view>
      <view>
        <view class="">手机：{{userInfo.mobile}}</view>
        <view class="">信用：良好</view>
      </view>
    </view>
    <view class="amountBox uni-flex" v-if="turnover">
      <view>
        <view class="money">¥{{turnover.today_amount}}</view>
        <view class="amountText">今日营业额</view>
      </view>
      <view>
        <view class="money">¥{{turnover.week_amount}}</view>
        <view class="amountText">本周营业额</view>
      </view>
      <view>
        <view class="money">¥{{turnover.month_amount}}</view>
        <view class="amountText">本月营业额</view>
      </view>
    </view>
    <view class="sellBox uni-flex" v-if="orderNums">
      <view>
        <view class="money" style="color:#943BE1">{{orderNums.today_order_num}}</view>
        <view class="amountText">今日销售量</view>
      </view>
      <view>
        <view class="money" style="color:#FA5951">{{orderNums.week_order_num}}</view>
        <view class="amountText">本周销售量</view>
      </view>
      <view>
        <view class="money" style="color:#0074FF">{{orderNums.month_order_num}}</view>
        <view class="amountText">本月销售量</view>
      </view>
    </view>
    <view class="listBox">
      <navigator url="/pages/me/cashiers/cashiers" class="listItem uni-inline-item" hover-class="none">
        <view class="uni-flex">
          <view class="itemIcon">
            <image src="/static/icon/2019slzf_11.png"></image>
          </view>
          <view class="itemText">收银员管理</view>
        </view>
        <view><text class="iconfont iconxiangyou1"></text></view>
      </navigator>
      <navigator url="/pages/me/moneyDetail/moneyDetail" class="listItem uni-inline-item" hover-class="none">
        <view class="uni-flex">
          <view class="itemIcon">
            <image src="/static/icon/2019slzf_12.png"></image>
          </view>
          <view class="itemText">收银明细管理</view>
        </view>
        <view><text class="iconfont iconxiangyou1"></text></view>
      </navigator>
      <navigator url="/pages/me/editor/editor" class="listItem uni-inline-item" hover-class="none">
        <view class="uni-flex">
          <view class="itemIcon">
            <image src="/static/icon/2019slzf_13.png"></image>
          </view>
          <view class="itemText">我的资料</view>
        </view>
        <view><text class="iconfont iconxiangyou1"></text></view>
      </navigator>
      <navigator url="#" class="listItem uni-inline-item" hover-class="none"> <!--url="/pages/me/service/service"-->
        <view class="uni-flex">
          <view class="itemIcon">
            <image src="/static/icon/2019slzf_14.png"></image>
          </view>
          <view class="itemText">专属客服</view>
        </view>
        <view><text class="iconfont iconxiangyou1"></text></view>
      </navigator>
      <navigator url="/pages/setUp/setUp" class="listItem uni-inline-item" hover-class="none">
        <view class="uni-flex">
          <view class="itemIcon">
            <image src="/static/icon/2019slzf_15.png"></image>
          </view>
          <view class="itemText">设置</view>
        </view>
        <view><text class="iconfont iconxiangyou1"></text></view>
      </navigator>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: null, //用户信息
        turnover: null, //营业额
        orderNums: null, //订单数量
      };
    },
    onLoad() {
      this.fetchUserData();
    },
    methods: {
      fetchUserData() { //获取用户数据
        uni.showLoading({
          mask:true,
          title:'加载中...'
        })
        this.$Request.post(this.$api.me.myData).then(res => {
          uni.hideLoading();
          if (res.code === 200) {
            let {user,order_num,turnover} = res.data;
            this.userInfo = user, this.turnover = turnover, this.orderNums = order_num;
          }else{
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    },
    onPullDownRefresh() { //监听下拉刷新
      this.$Request.post(this.$api.me.myData).then(res => {
        setTimeout(()=>{
          uni.stopPullDownRefresh();
        },500)
        if (res.code === 200) {
          let {user,order_num,turnover} = res.data;
          this.userInfo = user, this.turnover = turnover, this.orderNums = order_num;
        }else{
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .iconxiangyou1 {
    font-weight: bold;
    color: #888888;
  }

  .content {
    width: 100%;
    min-height: 100%;
    position: relative;
  }

  .circleBg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .gatherTitle {
    position: relative;
    text-align: center;
    z-index: 10;
    color: #FFFFFF;
    font-size: 36rpx;
    font-family: Helvetica-regular;
    padding: 50rpx 0 20rpx;
  }

  .userBox {
    position: relative;
    z-index: 10;
    padding: 16rpx 30rpx;
    color: #FFFEFE;

    .userLogo {
      width: 160rpx;
      height: 160rpx;
      padding: 4rpx;
      background: #FC9591 100%;
      border-radius: 50%;
      margin-right: 16rpx;

      image {
        border-radius: 50%;
      }
    }
  }

  .amountBox {
    position: relative;
    z-index: 10;
    padding: 16rpx 30rpx;
    justify-content: space-between;
    text-align: center;

    .money {
      font-size: 34rpx;
      color: #FBFBFB;
      font-weight: 500;
    }

    .amountText {
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .sellBox {
    margin-top: 140rpx;
    padding: 16rpx 30rpx;
    justify-content: space-between;
    text-align: center;

    .money {
      font-size: 34rpx;
      font-weight: bold;
    }

    .amountText {
      font-size: 26rpx;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  .listBox {
    padding: 20rpx 16rpx 0;

    .listItem {
      justify-content: space-between;
      padding: 30rpx 0 30rpx 16rpx;
      border-bottom: 1px solid #F4F4F4;

      .itemIcon {
        width: 50rpx;
        height: 50rpx;
        margin-right: 10rpx;
      }
    }
  }
</style>
