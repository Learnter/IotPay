<template>
  <view class="content">
    <view class="circleBg">
      <image src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
    </view>
    <view class="infoBox">
      <view class="userInfo">
        <view class="uni-inline-item listItem">
          <text>头像</text>
          <image class="userLogo" :src="reConfig.head" @click="updatePicture"></image>
        </view>
        <view class="uni-inline-item listItem">
          <text>店铺名称</text>
          <input type="text" v-model="reConfig.store_name" class="inputBox" />
        </view>
        <view class="uni-inline-item listItem">
          <text>联系人</text>
          <input type="text" v-model="reConfig.username" class="inputBox" />
        </view>
        <view class="uni-inline-item listItem">
          <text>联系人电话</text>
          <input type="number" v-model="reConfig.mobile" class="inputBox" maxlength="11" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        reConfig: {
          head: '', //头像
          store_name: '', //店铺名
          username: '', //用户名
          tel_name: '',
          mobile: '' //手机号
        }
      };
    },
    onLoad() {
      this.fetchUserInfo();
    },
    methods: {
      fetchUserInfo() { //获取用户信息
        uni.showLoading({mask:true,title:'加载中...'})
        this.$Request.post(this.$api.me.myInfo).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if (res.code === 200) {
            this.reConfig = res.data;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon:'none'
            })
          }
        })
      },
      updatePicture() { //更新头像图片
        uni.chooseImage({
          count: 1,
          success: (res) => {
            this.$Request.upload(this.$api.updatePicture, res.tempFilePaths[0], 'pic', {
              'field': 'pic'
            }).then(res => {
              if (res.code === 200) {
                this.reConfig.head = res.data.src;
              } else {
                uni.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    },
    onNavigationBarButtonTap() { //监听导航栏保存按钮
      let {
        head,
        store_name,
        username,
        mobile
      } = this.reConfig;
      if (!head) {
        return uni.showToast({
          title: '请选择头像',
          icon:'none'
        })
      } else if (!store_name) {
        return uni.showToast({
          title: '请输入店铺名称',
          icon:'none'
        })
      } else if (!username) {
        return uni.showToast({
          title: '请输入用户名称',
          icon:'none'
        })
      } else if (!mobile) {
        return uni.showToast({
          title: '请输入手机号',
          icon:'none'
        })
      }
      uni.showLoading({
        mask: true,
        title: '提交中...'
      })
      this.$Request.post(this.$api.me.editInfo, this.reConfig).then(res => {
        setTimeout(()=>{
           uni.hideLoading();
        },500)
        if (res.code === 200) {
          setTimeout(() => {
            uni.navigateBack();
          }, 1500)
        } else {
          uni.showToast({
            title: res.msg,
            duration: 2000,
            icon:'none'
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    position: relative;
    width: 100%;
    min-height: 100%;
  }

  .circleBg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .infoBox {
    position: absolute;
    z-index: 10;
    left: 30rpx;
    top: 60rpx;
    right: 30rpx;
    bottom: 100rpx;

    .userInfo {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
      background: #FFFFFF;
      box-shadow: 0 1px 20rpx #999999;
    }
  }

  .listItem {
    justify-content: space-between;
    padding: 30rpx 20rpx;
    font-size: 30rpx;
    color: #333333;
    border-bottom: 1px solid #F4F4F4;
  }

  .userLogo {
    width: 100rpx;
    height: 100rpx;
    background: #FF3333;
    border-radius: 50%;
    margin-right: 20rpx;
  }

  .inputBox {
    font-size: 28rpx;
    text-align: right;
    color: #888888;
  }
</style>
