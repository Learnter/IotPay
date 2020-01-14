<template>
	<view class="" style="width:94%;margin:0 auto;display: flex;flex-wrap: wrap;justify-content: center;" v-html="content">
<!-- 		<img src="../../static/images/dingbg.png" style="width:80%;margin:20rpx auto;">
		<view>
			
      在此特别提醒您（用户）在注册成为用户之前，请认真阅读本《用户协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。本协议约定南京金掌柜科技有限公司（以下简称“金掌柜”）与用户之间关于“金掌柜”软件服务（以下简称“服务“）的权利义务。“用户”是指注册、登录、使用本服务的个人。本协议可由金掌柜随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本APP中查阅最新版协议条款。在修改协议条款后，如果用户不接受修改后的条款，请立即停止使用金掌柜提供的服务，用户继续使用服务将被视为接受修改后的协议。
      
		</view>
		<view class="headline">
			一、账号注册
		</view>
		<view class="sm_text">
			
        1、用户在使用本服务前需要注册一个“金掌柜”账号。“金掌柜”账号应当使用手机号码绑定注册，请用户使用尚未与“金掌柜”账号绑定的手机号码，以及未被服务根据本协议封禁的手机号码注册“金掌柜”账号。服务可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。
          
		</view>
		<view class="sm_text">
			
		1、用户在使用本服务前需要注册一个“金掌柜”账号。“金掌柜”账号应当使用手机号码绑定注册，请用户使用尚未与“金掌柜”账号绑定的手机号码，以及未被服务根据本协议封禁的手机号码注册“金掌柜”账号。服务可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。
		  
		</view>
		<view class="sm_text">
			
		1、用户在使用本服务前需要注册一个“金掌柜”账号。“金掌柜”账号应当使用手机号码绑定注册，请用户使用尚未与“金掌柜”账号绑定的手机号码，以及未被服务根据本协议封禁的手机号码注册“金掌柜”账号。服务可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。
		  
		</view>
		<view class="headline">
			二、用户个人隐私信息保护
		</view>
		<img src="../../static/images/tuiGuang.png" style="width:80%;margin:20rpx auto;">
		<view class="sm_text">
			
		1、用户在使用本服务前需要注册一个“金掌柜”账号。“金掌柜”账号应当使用手机号码绑定注册，请用户使用尚未与“金掌柜”账号绑定的手机号码，以及未被服务根据本协议封禁的手机号码注册“金掌柜”账号。服务可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。
		  
		</view>
		<view class="sm_text">
			
		1、用户在使用本服务前需要注册一个“金掌柜”账号。“金掌柜”账号应当使用手机号码绑定注册，请用户使用尚未与“金掌柜”账号绑定的手机号码，以及未被服务根据本协议封禁的手机号码注册“金掌柜”账号。服务可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。
		  
		</view> -->
	</view>
</template>

<script>
  export default {
    data() {
      return {
        content:'', //详情
        reConfig:{ //请求配置
          id:''
        } 
      }
    },
    onLoad(e) {
     this.reConfig.id = e.id;
     this.fetchDetails();
    },
    methods: {
      fetchDetails(){
        uni.showLoading({
          mask:true,
          title:'加载中...'
        })
        this.$Request.post(this.$api.business.details,this.reConfig).then(res => {
          uni.hideLoading();
          if (res.code === 200) {
            this.content = res.data.content.replace(/<img/g,'<img style="max-width:100%;height:auto"');
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
	.sm_text{
		width: 100%;
		    margin-top: 22rpx;
	}
	.headline{
		width:100%;
		font-size: 30rpx;
		    padding: 15rpx 0;
		    background: #f5f5f5;
		    margin-top: 15rpx;
	}
</style>
