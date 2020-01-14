<template>
	<view>
		<view class="content">
			<view class="circleBg">
			  <image src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
			</view>
		  <view class="outBox">
		    <view class="insideBox" v-html="content">
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        content:'' //主内容
			};
		},
    onLoad() {
      this.fetchContent();
    },
    methods:{
      fetchContent(){
        this.$Request.post(this.$api.setUp.issue,{type:1}).then(res => {
          if(res.code === 200){
            this.content = res.data.content_cn.replace(/\<img/gi,"<img style='max-width:100%;height:auto'");
          }else{
            uni.showToast({
              title:res.msg,
              icon:'none'
            })
          }
        });
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
    padding:30rpx 20rpx;
    background:#FFFFFF;
    border-radius:20rpx;
    height:1000rpx;
    box-shadow: 0 6rpx 12rpx 0rpx #FA5951;
  }
</style>
