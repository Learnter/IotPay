<template>
	<view class="content">
		<view class="circleBg">
		  <image src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
		</view>
    <view class="outBox">
      <view class="insideBox" v-if="systemInfo">
        <view class="loginImg">
          <image :src="systemInfo.logo" mode="widthFix"></image>
        </view>
        <view class="title">{{systemInfo.name}}</view>
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
         <view class="submitBox" @click="exit">退出登录</view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				systemInfo:null,//系统信息
			};
		},
    onLoad() {
      this.systemInfo = this.$SysCache.get('system_info');
    },
    methods:{
      exit(){ //退出登录
        uni.showModal({
          title:'温馨提示',
          content:'您确定要退出吗?',
          success:(e)=>{
            if(e.confirm){
              this.$SysCache.remove('app_token');//清空全部缓存
              uni.reLaunch({
                url:'/pages/login/login'
              })
            }
          }
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
  .content{
    width:100%;
    height:100%;
    position:relative;
  }
  
  .iconxiangyou1{
    font-weight:bold;
    color:#888888;
  }
  
  .circleBg{
    position:absolute;
    left:0;
    top:0;
    right:0;
    z-index:1;
  }
  
  .outBox{
    position:relative;
    z-index:10;
    padding:50rpx 30rpx 0;
  }
  
  .insideBox{
   background:#FFFFFF;
   border-radius:20rpx;
   min-height:900rpx;
   box-shadow: 0 4rpx 12rpx 0rpx rgba(0,0,0,0.09);
   .loginImg{
     box-sizing:border-box;
     width:180rpx;
     height:auto;
     padding:30rpx 0 20rpx;
     margin:0 auto;
   }
   .title{
     font-size:38rpx;
     text-align:center;
   }
   .listItem{
     justify-content:space-between;
     padding:30rpx 20rpx;
     border-bottom:1px solid #F4F4F4;
     .itemText{
       font-size:32rpx;
       color:#101010;
     }
    }
    .submitBox{
      width:70%;
      height:80rpx;
      line-height:80rpx;
      text-align:center;
      background:#FA5951;
      margin:60rpx auto;
      border-radius:40rpx;
      font-size:34rpx;
      color:#FFFFFF;
     }
  }

</style>
