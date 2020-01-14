<template>
	<view class="ziliao">
		<view class="box">
			<view class="line">
				<img :src="info.head"/>
				<view class="right uni-inline-item">修改图像<text class="iconfont iconedit-hover" @tap="openAlbum"></text></view>
			</view>
		<!-- 	<view class="line">
				<text class="left">用户名</text>
				<text class="right" ><span style="color:rgb(233, 122, 14)">180111155555</span><i class="iconfont icon-arrow-right"></i></text>
			</view> -->
			<view class="line">
				<text class="left">昵称</text>
				<view class="right" >
          <input type="text" v-model="info.nickname" />
        </view>
			</view>
		</view>
	<!-- 	<view class="line1 line ">
			<text class="left">修改密码</text>
			<text class="right" ><i class="iconfont icon-arrow-right"></i></text>
		</view>
		<view style="background:white">
			
			<view class="line">
				<text class="left">银行卡绑定</text>
				<text class="right" ><span>中国银行</span><i class="iconfont icon-arrow-right"></i></text>
			</view>
			<view class="line line2">
				<text class="left">清除缓存</text>
				<text class="right" ><span>1.8M</span> <span class="btn">清除缓存</span></text>
			</view>
		</view> -->
		<view style="display: flex;justify-content: center;" @tap="updateInfo">
			<text class="btn2">保存</text>
		</view>
	</view>
</template>

<script>
	// import "../../static/jinzhangguiIconfont/iconfont.css"
  export default{
    data(){
      return {
        info:{ //配置信息
          head:'',
          nickname:''
        }
      }
    },
    onLoad() {
      this.getUserInfo();
    },
    methods:{
      getUserInfo(){ //获取个人资料
       this.info = this.$SysCache.get("app_user_info");
      },
      updateInfo(){ //更新资料
        uni.showToast({icon:'loading',title:'提交中...'})
        this.$Request.post(this.$api.me.editManInfo,this.info).then(res => {
          if(res.code === 200){
            this.$SysCache.put('app_user_info',this.info);
            uni.navigateBack();
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      openAlbum(){ //打开相册
        uni.chooseImage({
          count:1,
          success: (res) => {
            this.$Request.upload(this.$api.uploadFile, res.tempFilePaths[0], 'pic', {
              'field': 'pic'
            }).then(res => {
              if (res.code === 200) {
                this.info.head = res.data.src;
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
    }
  }
	
</script>

<style scoped>
	.line2{
		border-bottom: none!important;
	}
	.line1{
		border-bottom: none!important;
		margin:22.5rpx 0;
		background:white
	}
	.line{
		padding:15rpx 18rpx 15rpx 36rpx;
		display: flex;
		align-items:center ;
		justify-content: space-between;
		border-bottom: 2rpx solid #F4F4F4;
	}
	.box{
		background:white;
		border-top:2rpx solid #ccc;
		margin-bottom: ;
	}
	.box img{
		width:136rpx;
		height:136rpx;
		border-radius:50%;
	}
	.line .right{
		color:#999;
		font-size:30rpx;
    text-align:right;
	}
	.line .left{
		color:#333;
		font-weight: bold;
		font-size: 36rpx;
	}
	i{
		font-size:40rpx;
		
	}
	.right .btn{
		border-radius: 30rpx;
		border-color: rgb(236, 169, 103);
		color:rgb(236, 169, 103);
		margin-left:18rpx;
		border: 2rpx solid rgb(236, 169, 103);
		padding: 7.5rpx 15rpx;
	}
	.btn2{
		display: inline-block;
		margin:52rpx auto;
		padding:14rpx 150rpx;
		color:white;
		background:rgb(206, 141, 78);
		border-radius:10rpx;
		
	}
  .iconedit-hover{
    font-size:56rpx;
    color:#f08207;
  }
</style>
