<template>
  <view class="content">
    <view class="circleBg">
      <image src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
    </view>
    <view class="outBox">
      <view class="insideBox">
        <view class="uni-inline-item listItem">
          <text class="leftText">账号</text>
          <input type="text" placeholder="请输入商户账号" v-model="reConfig.account" class="inputBox" />
        </view>
        <view class="uni-inline-item listItem">
          <text class="leftText">密码</text>
          <input password="true" placeholder="请设置新密码" v-model="reConfig.password" class="inputBox" />
        </view>
        <view class="uni-inline-item listItem">
          <text class="leftText">验证码</text>
          <input type="number" placeholder="请输入验证码" v-model="reConfig.mobileCode" class="inputBox" />
          <view class="msgText" @click="sendCode">{{msgText}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    countdownTime: '',
    data() {
      return {
        interval: null, //倒计时对象
        msgText: '获取验证码',
        reConfig: {
          account: '', //手机号
          password: '', //密码
          mobileCode: '' //短信验证码
        }
      };
    },
    methods: {
      sendCode() { //获取短信验证码
        let {account} = this.reConfig;
        if (!account) return uni.showToast({
          title: '请输入商户账号',
          icon: 'none'
        })
        this.$Request.post(this.$api.mobileCode, {account: account,type:2}).then(res => {
          if (res.code === 200) {
            let timeOut = 60;
            this.interval = setInterval(() => {
              if (timeOut <= 0) {
                this.msgText = "获取验证码";
                clearInterval(this.interval);
              } else {
                timeOut--;
                this.msgText = timeOut + '秒';
              }
            }, 1000)
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        });
      }
    },
    onNavigationBarButtonTap() { //监听导航栏点击完成按钮
      let {
        account,
        password,
        mobileCode
      } = this.reConfig;
      if (!account) {
        return uni.showToast({
          title: '请输入商家账号',
          icon: 'none'
        })
      } else if (!password) {
        return uni.showToast({
          title: '请输入密码',
          icon: 'none'
        })
      } else if (!mobileCode) {
        return uni.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
      }
      uni.showLoading({
        mask: true,
        title: '提交中...'
      })
      this.$Request.post(this.$api.updatePwd, this.reConfig).then(res => {
        setTimeout(() => {
          uni.hideLoading();
        }, 500)
        if (res.code === 200) {
          setTimeout(() => {
            uni.navigateBack();
          }, 1500)
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      });
    },
    onUnload() { //页面卸载清除倒计时对象  
      clearInterval(this.interval);
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .circleBg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .outBox {
    position: relative;
    z-index: 10;
    padding: 50rpx 30rpx 0;
  }

  .insideBox {
    background: #FFFFFF;
    border-radius: 20rpx;
    min-height: 900rpx;
    box-shadow: 0 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.09);

    .listItem {
      padding: 30rpx;
      color: #333333;
      border-bottom: 1px solid #F4F4F4;

      .leftText {
        font-size: 32rpx;
        width: 120rpx;
      }
    }

    .inputBox {
      flex: 1;
      font-size: 28rpx;
      color: #333333;
    }
  }

  .msgText {
    margin-left: 10rpx;
    font-size: 28rpx;
    color: #007AFF;
    line-height: 50rpx;
  }
</style>
