<template>
	<view class="content">
     <view class="loginImg">
       <image :src="systemInfo.logo" mode="widthFix"></image>
     </view>
		 <view class="title">{{systemInfo.name}}</view>
     <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_7.png"></image>
       </view>
       <input type="text" v-model="reConfig.account" placeholder="请输入会员账号" placeholder-class="inputHolder"  />
     </view>
     <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_8.png" ></image>
       </view>
       <input password="true" v-model="reConfig.password" placeholder="请输入密码"  placeholder-class="inputHolder"/>
     </view>
    <!-- <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_9.png"></image>
       </view>
       <view class="uni-flex uni-flex-item">
         <input type="number" class="uni-flex" v-model="reConfig.mobileCode" placeholder="请输入短息验证码"  placeholder-class="inputHolder" />
         <view class="msgText" @click="sendCode">{{msgText}}</view>
       </view>
     </view> -->
     <button type="primary" class="loginBtn" @click="loginSubmit">登录</button>
     <view class="uni-inline-item loginButton">
       <navigator hover-class="none" url="/pages/findPwd/findPwd">忘记密码</navigator>
       <!-- <navigator hover-class="none" url="/pages/register/register">立即注册</navigator> -->
     </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        systemInfo:null,//系统信息
        interval:null,//倒计时对象
        msgText: '获取验证码',
				reConfig:{
          account:'', //商家账号
          password:'', //密码
          mobileCode:'' //短信验证码
        }
			};
		},
    onLoad() {
      this.systemInfo = this.$SysCache.get('system_info');
    },
    methods:{
      /*登录*/
      loginSubmit(){
        let {account,password,code} = this.reConfig;
        if(!account){
          return uni.showToast({
            title:'请输入会员账号',
            icon:'none'
          })
        }else if(!password){
          return uni.showToast({
            title:'请输入密码',
            icon:'none'
          })
        }
        this.$Request.post(this.$api.login,this.reConfig).then(res => {
          if(res.code === 200){
            this.$SysCache.put('app_token',res.data.token);
            this.$SysCache.put('app_user_info',res.data.userInfo);
            uni.switchTab({
              url:'/pages/me/me'
            })
          }else{
            uni.showToast({
              title:res.msg,
              duration:2000,
              icon:'none'
            })
          }
        })
      },
      /*登录*/
      sendCode() { //获取短信验证码
        let {account} = this.reConfig;
        if (!account) return uni.showToast({
          title: '请输入会员账号',
          icon: 'none'
        })
        this.$Request.post(this.$api.mobileCode, {
          account: account,
          type: 3
        }).then(res => {
          if (res.code === 200) {
            let timeOut = 60;
            this.interval= setInterval(() => {
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
  .content{
    width:100%;
    height:100%;
    box-sizing:border-box;
    background:#FFFDEF;
    padding-top:100rpx;
  }
  
  .loginImg{
    width:210rpx;
    padding:30rpx 0 20rpx;
    margin:0 auto;
  }
  
  .title{
    font-size:40rpx;
    line-height:40rpx;
    color:#FFFFFF;
    text-align:center;
    letter-spacing:6rpx;
    margin-bottom:40rpx;
  }
  
  .listInput{
    box-sizing:border-box;
    width:80%;
    margin:auto;
    padding:10rpx 30rpx;
    display:flex;
    align-items:center;
    margin-bottom:50rpx;
    border:1px solid rgba(255,255,255,0.5);
    border-radius:40rpx;
    background:#f08207;
    input{
       caret-color: rgba(255,255,255,0.5);
       color:#FFFFFF;
       flex:1;
    }
    /deep/.inputHolder{
      padding-left:10rpx;
      font-size:28rpx;
      color:#FFFFFF
    }
  }
  
  .inputIcon{
    width:60rpx;
    height:60rpx;
    margin-right:16rpx;
  }
  
  .loginBtn{
    width:80%;
    height:88rpx;
    line-height:88rpx;
    border-radius:50rpx;
    background:#DF5000;
    color:#fff;
  }
  
  .loginButton{
    width:80%;
    justify-content:center;
    color:#FFFFFF;
    font-size:30rpx;
    margin: 40rpx auto;
  }
  
  .msgText {
    margin-left: 10rpx;
    font-size: 28rpx;
    color: #007AFF;
    line-height: 50rpx;
  }
</style>
