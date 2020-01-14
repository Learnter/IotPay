<script>
  export default {
    onLaunch: function() {
      /*系统信息*/
        this.$Request.post(this.$api.system).then(res => {
          if (res.code === 200) {
            this.$SysCache.put('system_info', res.data);
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg,
              duration: 2000
            })
          }
        });
        
      /*加载银行卡类型列表*/
      this.$Request.post(this.$api.banksType).then(res => {
        if (res.code === 200) {
          this.$SysCache.put('banks_type', res.data);
        } else {
          uni.showToast({
            icon: 'none',
            title: res.msg,
            duration: 2000
          })
        }
      });

      /*所有地址*/
      let allRegion = this.$SysCache.get('all_region');
      if (!allRegion) {
        this.$Request.post(this.$api.allRegion).then(res => {
          if (res.code === 200) {
            this.$SysCache.put('all_region', res.data);
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg,
              duration: 2000
            })
          }
        });
      }
      /*加载用户信息*/
      let token = this.$SysCache.get('app_token');
      if (token) {
        uni.switchTab({
          url: '/pages/me/me'
        })
      }
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  /*每个页面公共css */
  @import url("/common/uni.css");
  /*引用字体库*/
  @import "./common/iconfont/iconfont.css";

  page {
    background: #FAFAFA;
    width: 100%;
    height: 100%;
    font-size: 28rpx;
    line-height: 1.5;
    font-family: 'MicrosoftYaHei';
    overflow-y: scroll;
  }

  image {
    width: 100%;
    height: 100%;
  }

  .emptyBox {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 400rpx;
    height: 400rpx;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 32rpx;
    color: #FA5951;
  }
</style>
