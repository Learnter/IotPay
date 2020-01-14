<template>
  <view class="content">
    <view class="loginImg">
      <image :src="systemInfo.logo" mode="widthFix"></image>
    </view>
    <view class="title">{{systemInfo.name}}</view>
    <view class="listInput">
      <view class="inputIcon">
        <image src="/static/icon/2019slzf_10.png"></image>
      </view>
      <input type="text" v-model="reConfig.account" placeholder="请输入商家账号" placeholder-class="inputHolder" />
    </view>
    <view class="listInput">
      <view class="inputIcon">
        <image src="/static/icon/2019slzf_8.png"></image>
      </view>
      <input password="true" v-model="reConfig.password" placeholder="请输入新密码" placeholder-class="inputHolder" />
    </view>
    <view class="listInput">
      <view class="inputIcon">
        <image src="/static/icon/2019slzf_8.png"></image>
      </view>
      <input password="true" v-model="reConfig.repassword" placeholder="请再次新输入密码" placeholder-class="inputHolder" />
    </view>
    <view class="listInput">
      <view class="inputIcon">
        <image src="/static/icon/2019slzf_9.png"></image>
      </view>
      <view class="uni-flex uni-flex-item">
        <input type="number" class="uni-flex" v-model="reConfig.mobileCode" placeholder="请输入短息验证码" placeholder-class="inputHolder" />
        <view class="msgText" @click="sendCode">{{msgText}}</view>
      </view>
    </view>
    <button type="primary" class="loginBtn" @click="findSubmit">找回密码</button>
    <navigator class="loginButton" hover-class="none" url="/pages/login/login">立即登录</navigator>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        systemInfo: null, //系统信息
        interval: null, //倒计时对象
        msgText: '获取验证码',
        reConfig: {
          account: '', //商家账号
          password: '', //新密码
          repassword: '', //重复密码
          mobileCode: '' //短信验证码
        }
      };
    },
    onLoad() {
      this.systemInfo = this.$SysCache.get('system_info');
    },
    methods: {
      /*找回密码*/
      findSubmit() {
        let {
          account,
          password,
          repassword,
          mobileCode
        } = this.reConfig;
        if (!account) {
          return uni.showToast({
            title: '请输入商家账号',
            icon: 'none'
          });
        } else if (!password) {
          return uni.showToast({
            title: '请输入新密码',
            icon: 'none'
          });
        } else if (password !== repassword) {
          return uni.showToast({
            title: '两次密码输入不一致',
            icon: 'none'
          });
        } else if (!mobileCode) {
          return uni.showToast({
            title: '请输入手机验证码',
            icon: 'none'
          });
        }
        uni.showLoading({
          mask: true,
          title: "提交中..."
        })
        this.$Request.post(this.$api.forgot, this.reConfig).then(res => {
          setTimeout(function() {
            uni.hideLoading();
          }, 500);
          if (res.code === 200) {
            uni.showToast({
              title: '设置成功'
            })
            setTimeout(() => {
              uni.navigateBack();
            }, 1500)
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      },
      /*找回密码*/
      sendCode() { //获取短信验证码
        let {
          account
        } = this.reConfig;
        if (!account) return uni.showToast({
          title: '请输入商家账号',
          icon: 'none'
        })
        this.$Request.post(this.$api.mobileCode, {
          account: account,
          type: 2
        }).then(res => {
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
    onUnload() { //页面卸载清除倒计时对象
      clearInterval(this.interval);
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100rpx;
    background: #FA5951;
  }

  .loginImg {
    width: 210rpx;
    padding: 30rpx 0 20rpx;
    margin: 0 auto;
  }

  .title {
    font-size: 40rpx;
    line-height: 40rpx;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 6rpx;
    margin-bottom: 40rpx;
  }

  .listInput {
    box-sizing: border-box;
    width: 80%;
    margin: auto;
    padding: 10rpx 30rpx;
    display: flex;
    margin-bottom: 50rpx;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 40rpx;
    background: #FA6962;

    input {
      caret-color: rgba(255, 255, 255, 0.5);
      color: #FFFFFF;
      flex: 1;
    }
    /deep/.inputHolder {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #FFFFFF;
    }
  }

  .inputIcon {
    width: 50rpx;
    height: 50rpx;
    margin-right: 16rpx;
  }

  .loginBtn {
    width: 80%;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 50rpx;
    background: #FFFFFF;
    color: #000000;
  }

  .loginButton {
    width: 80%;
    color: #FFFFFF;
    font-size: 30rpx;
    margin: 30rpx auto;
    text-align: center;
    letter-spacing: 4rpx;
  }

  .inputHolder {
    padding-left: 10rpx;
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.5);
  }

  .msgText {
    margin-left: 10rpx;
    font-size: 28rpx;
    color: #007AFF;
    line-height: 50rpx;
  }
</style>
