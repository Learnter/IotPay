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
      
		  /*加载用户信息*/
		  let token =  this.$SysCache.get('app_token');
		  if (token) {
		  	uni.switchTab({
		  	  url:'/pages/index/index'
		  	})
		  }else{
        uni.reLaunch({
          url:'/pages/login/login'
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

<style class="scss">
	/*每个页面公共css */
  @import url("./common/uni.css");
  /*引用字体库*/
  @import "./common/iconfont/iconfont.css";
  page {
  	background: #FAFAFA;
    width:100%;
    height:100%;
  	min-height:100%;
  	font-size:28rpx;
  	line-height:1.5;
  	font-family: 'MicrosoftYaHei';
  }
  image{
    width:100%;
    height:100%;
  }
</style>
