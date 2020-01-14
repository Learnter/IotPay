<template>
  <view class="content">
    <view class="circleBg">
      <image src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
    </view>
    <!--  <view class="brokerageTitle">设置</view> -->
    
    <!-- <view class="infoBox">
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
    
    
    <view class="outBox">
      
      <view class="insideBox">
        
<!--        <view class="loginImg">
          <image :src="systemInfo.logo" mode="widthFix"></image>
        </view>
        <view class="title">代理级别：{{systemInfo.name}}</view> -->
        
        <view class="infoBox">
          <view class="userIcon">
            <image :src="userInfo.head"></image>
          </view>
          <view class="userName">{{userInfo.nickname}}</view>
          <view class="userPhone">{{userInfo.mobile}}</view>
         <!-- <view class="infoBottom uni-inline-item">
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
          </view> -->
        </view>
        <view class="amountBox">
          余额：¥{{userInfo.balance}}
          <navigator class="withdrawBox" hover-class="none" url="/pages/myWallet/withdraw/withdraw">
            <image src="/static/icon/2019slyw_15.png"></image>
          </navigator>
        </view>
        
        <view class="cai">
          <view class="cai_top">
            <navigator href="javascript:;" class="cai_top_a">
              <span>采购管理</span>
              <i class="iconfont icon-youicon right_loac"></i>
            </navigator>
          </view>
          <view class="cai_bt">
            <view class="cai_bt_left">
              <!-- <navigator url="/pages/personalCenterNeiye/yiFuKuan" hover-class="none"> -->
              <view class="">
                <view class="kuan_img">
                  <image src="/static/holder/yi.png" mode="widthFix" />
                </view>
                <p class="jnm">
                  已付款
                </p>
              </view>

              <!-- </navigator> -->
            </view>
            <view class="cai_bt_right">
              <!--  <navigator url="/pages/personalCenterNeiye/yiFuKuan" hover-class="none"> -->
              <view class="">
                <view class="kuan_img">
                  <image src="/static/holder/wei.png" mode="widthFix" />
                </view>
                <p class="jnm">
                  待付款
                </p>
              </view>
              <!-- </navigator> -->
            </view>
          </view>
        </view>
        <view class="listBox">
          <navigator url="/pages/personalCenterNeiye/personalZiLiao" hover-class="none" class="list_item uni-inline-item">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/geren.png"></image>
              </view>
              <text>个人资料</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>
          
          <navigator  url="/pages/brokerage/borkerageDetail/borkerageDetail" hover-class="none" class="list_item uni-inline-item">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/2019slyw_12.png"></image>
              </view>
              <text>佣金明细</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>
          
         <navigator url="/pages/me/storeList/storeList" hover-class="none" class="list_item uni-inline-item">
           <view class="list_item_left uni-inline-item">
             <view class="listIcon">
               <image src="/static/icon/2019slyw_13.png"></image>
             </view>
             <text>商家列表</text>
           </view>
           <text class="iconfont iconxiangyou1"></text>
         </navigator> 

          <navigator url="/pages/personalCenterNeiye/tuiGuang" open-type="switchTab" hover-class="none" class="list_item uni-inline-item">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/erweima.png"></image>
              </view>
              <text>推广二维码</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>

          <navigator url="/pages/personalCenterNeiye/feiLv" hover-class="none" class="list_item uni-inline-item">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/huilv.png"></image>
              </view>
              <text>商家费率分润</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>

          <navigator url="/pages/personalCenterNeiye/jiaoyi" hover-class="none" class="list_item uni-inline-item">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/chaxun.png"></image>
              </view>
              <text>交易查询</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>


          <navigator url="/pages/myWallet/myWallet" hover-class="none" class="list_item uni-inline-item">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/qianbao.png"></image>
              </view>
              <text>我的钱包</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>
          <navigator url="/pages/recruitment/recruitment" class="list_item uni-inline-item" hover-class="none">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/shangjia.png"></image>
              </view>
              <text>商家入驻</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>
          <navigator url="/pages/orders/orders" class="list_item uni-inline-item" hover-class="none">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/dingdan.png"></image>
              </view>
              <text>订单列表</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>
          <navigator url="/pages/store/medicOrders/medicOrders" class="list_item uni-inline-item" hover-class="none">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/puhuo.png"></image>
              </view>
              <text>铺货订单</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>
          <navigator url="/pages/myBanks/myBanks" hover-class="none" class="list_item uni-inline-item">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/yinhangka.png"></image>
              </view>
              <text>我的银行卡</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </navigator>
          <view @click="clickKefu" class="list_item uni-inline-item" hover-class="none">
            <view class="list_item_left uni-inline-item">
              <view class="listIcon">
                <image src="/static/icon/kehu.png"></image>
              </view>
              <text>联系客服</text>
            </view>
            <text class="iconfont iconxiangyou1"></text>
          </view>
        </view>

        <navigator class="listItem uni-inline-item" url="/pages/setUp/updatePwd/updatePwd" hover-class="none">
          <text class="itemText">修改密码</text>
          <text class="iconfont iconxiangyou1"></text>
        </navigator>
        <navigator class="listItem uni-inline-item" url="/pages/setUp/aboutUs/aboutUs" hover-class="none">
          <text class="itemText">关于我们</text>
          <text class="iconfont iconxiangyou1"></text>
        </navigator>
        <navigator class="listItem uni-inline-item" url="/pages/setUp/help/help" hover-class="none">
          <text class="itemText">帮助中心</text>
          <text class="iconfont iconxiangyou1"></text>
        </navigator>
        <view class="" style="padding:60rpx 0">
           <view class="submitBox" @click="exit">退出登录</view>
        </view>
      </view>
    </view>
    <view class="curtain" :style="flag ? 'display:block': 'display:none'" @click="clickKefu" @touchmove.stop.prevent="preventScroll">
      <view class="curtain1">
        <p>客服电话：0769－85474656</p>
        <p>微信号:qintang5137</p>
        <p>微信公众号：财狮管家</p>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        userInfo: {
          head: '',
          mobile: '',
          nickname: '',
          balance: ''
        },
        systemInfo: null,
        flag: false
      };
    },
    onLoad() {
      // this.systemInfo = this.$SysCache.get('system_info');
      this.fetchInfo();
    },
    methods: {
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
      exit() { //退出登录
        uni.showModal({
          title: '温馨提示',
          content: '您确定要退出吗?',
          success: (e) => {
            if (e.confirm) {
              this.$SysCache.remove('app_token'); //清空全部缓存
              uni.reLaunch({
                url: '/pages/login/login'
              })
            }
          }
        })
      },
      clickKefu() { //显示客服联系方式
        this.flag = !this.flag
      },
      preventScroll(e){ //阻止页面滚动
        e.stopPropagation = true;
      }
    },
    onPullDownRefresh() { //监听下拉
      this.fetchInfo();
    }
  }
</script>

<style lang="scss" scoped>
  .curtain1 {
    padding: 14rpx 20rpx;
    background: white;
    position: absolute;
    left: 0;
    bottom:0;
    width: 100%;
    box-sizing: border-box;
    // transform: translateY(-50%);
    p{
       font-size:32rpx;
    }
  }

  .curtain {
    position:fixed;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    z-index: 11;
    background: rgba(0, 0, 0, .7);
    display: none;
  }

  .content {
    box-sizing: border-box;
    padding: 20rpx 30rpx 0;
    height: max-content;
    position: relative;
  }

  .ico {
    width: 25px;
    height: 25px;

  }


  .listBox {
    padding:20rpx;
  }

  .iconxiangyou1 {
    font-weight: bold;
    color: #888888;
  }

  .circleBg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .brokerageTitle {
    position: relative;
    z-index: 10;
    font-size: 36rpx;
    text-align: center;
    color: #FFFFFF;
    letter-spacing: 4rpx;
  }

  .outBox {
    position: relative;
    z-index: 10;
    // padding:40rpx 30rpx 0;
  }

  .insideBox {
    background: #FFFFFF;
    border-radius: 20rpx;
    min-height: 900rpx;
    box-shadow: 0 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.09);
    // padding: 5px;

    .loginImg {
      width: 180rpx;
      padding: 30rpx 0 20rpx;
      margin: 0 auto;
    }

    .title {
      font-size: 38rpx;
      text-align: center;
    }

    .listItem {
      justify-content: space-between;
      padding: 30rpx 20rpx;
      border-bottom: 1px solid #F4F4F4;

      .itemText {
        font-size: 32rpx;
        color: #101010;
      }
    }

    .submitBox {
      width: 70%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background: #FA5951;
      margin: 0 auto;
      border-radius: 40rpx;
      font-size: 34rpx;
      color: #FFFFFF;
    }
  }



  .list_item {
    height: 120rpx;
    justify-content: space-between;
    border-bottom: 1px solid #F3F3F3;
  }

  .listIcon {
    width: 45rpx;
    height: 45rpx;
  }

  .iconxiangyou1 {
    font-size: 26rpx;
    font-weight: bold;
    color: #999999;
  }

  .cai {
    width: 96%;
    height: 130px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 2px 2px 10px #ccc;
    margin: 3px auto 5px;
    margin-top: 10px !important;
  }

  .cai_top {
    width: 95%;
    height: 30px;
    margin: 6px auto 0;
    /* text-indent: .1rem; */
  }

  .cai_top_a {
    padding-top: 2px;
    display: inline-flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #666;
    font-weight: 700;
    border-bottom: 0.5px solid #ccc;
  }

  .right_loac::before {
    font-size: .8rem;
  }

  .cai_bt {
    width: 90%;
    margin: .2rem auto 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: .2rem;
  }


  .cai_bt_left,
  .cai_bt_right {
    width: 50%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }

  .kuan_img {
    width: 60px;
  }


  .my_list_a {
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #333;
    font-size: 14px;
  }

  .right_loac_right {
    font-size: 14px;
    position: absolute;
    right: 0;
    top: 0;
    color: #ccc;
  }

  .add_km_tou {
    border: 0.5px dashed #fff;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  
  
  
  
  /* 头像样式*/
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
    margin: 16rpx 10rpx;
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
  
</style>
