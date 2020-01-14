<template>
	<view class="content">
     <view class="loginImg">
       <image src="/static/icon/logo.png" mode="widthFix"></image>
     </view>
		 <view class="title">刷脸支付</view>
     
     <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_7.png"></image>
       </view>
       <input type="number" v-model="reConfig.name" placeholder="请输入账号" placeholder-class="inputHolder" />
     </view>
     <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_10.png"></image>
       </view>
       <input type="number" v-model="reConfig.phone" placeholder="请输入手机号" placeholder-class="inputHolder" />
     </view>
     <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_8.png" ></image>
       </view>
       <input  password="true" v-model="reConfig.pwd" placeholder="请输入密码"   placeholder-class="inputHolder"/>
     </view>
     <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_8.png" ></image>
       </view>
       <input password="true" v-model="reConfig.pwd" placeholder="请再次输入密码"   placeholder-class="inputHolder"/>
     </view>
     <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_9.png"></image>
       </view>
       <input type="number" v-model="reConfig.code" placeholder="请输入验证码"  placeholder-class="inputHolder" />
       <view class="codeImg">
         <image src="/static/holder/验证码.png" mode="scaleToFill"></image>
       </view>
     </view>
     <view class="listInput">
       <view class="inputIcon">
         <image src="/static/icon/2019slzf_9.png"></image>
       </view>
       <input type="number" v-model="reConfig.code" placeholder="请输入短信验证码"  placeholder-class="inputHolder" />
       <view class="msgText">{{msgText}}</view>
     </view>
     <button type="primary" class="loginBtn" @click="registerSubmit">注册</button>
     <navigator class="loginButton" hover-class="none" url="/pages/login/login">立即登录</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        msgText:'获取验证码',
				reConfig:{
          name:'',
          phone:'',
          pwd:'',
          code:''
        }
			};
		},
    methods:{
      /*注册*/
      registerSubmit(){
        
      }
      /*注册*/
    }
	}
</script>

<style lang="scss" scoped>
  .content{
    width:100%;
    min-height:100%;
    background:#FA5951;
  }
  
  .loginImg{
    width:180rpx;
    padding:30rpx 0 20rpx;
    margin:0 auto;
  }
  
  .title{
    font-size:40rpx;
    line-height:40rpx;
    color:#FFFFFF;
    text-align:center;
    letter-spacing:2rpx;
    margin-bottom:60rpx;
  }
  
  .listInput{
    box-sizing:border-box;
    width:80%;
    margin:auto;
    padding:10rpx 30rpx;
    display:flex;
    margin-bottom:50rpx;
    border:1px solid rgba(255,255,255,0.5);
    border-radius:40rpx;
    background:#FA6962;
    justify-content:space-between;
    input{
       caret-color: rgba(255,255,255,0.5);
       color:#333333;
       flex:1;
    }
  }
  
  .inputIcon{
    width:50rpx;
    height:50rpx;
    margin-right:16rpx;
  }
  
  .loginBtn{
    width:80%;
    height:88rpx;
    line-height:88rpx;
    border-radius:50rpx;
    background:#FFFFFF;
    color:#000000;
  }
  
  .loginButton{
    color:#FFFFFF;
    font-size:30rpx;
    text-align:center;
    letter-spacing:4rpx;
    padding:30rpx 0;
  }
  
  .inputHolder{
    padding-left:10rpx;
    font-size:28rpx;
    color:rgba(255,255,255,0.5);
  }
  
  .codeImg{
    width:90rpx;
    margin-left:10rpx;
  }
  
  .msgText{
    margin-left:10rpx;
    font-size:26rpx;
    color:#007AFF;
    line-height:50rpx;
  }
  
</style>
