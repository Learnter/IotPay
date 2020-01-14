<template>
	<view>
    <view class="uni-inline-item listItem">
      <text class="leftText">会员名称</text>
      <input type="text" placeholder="请输入会员名称" v-model="reConfig.username" class="inputBox" />
    </view>
    <view class="uni-inline-item listItem">
      <text class="leftText">密码</text>
      <input password="true"  placeholder="请输入密码"   v-model="reConfig.password"  class="inputBox" />
    </view>
    <view class="uni-inline-item listItem">
      <text class="leftText">手机号码</text>
      <input type="number" placeholder="请输入会员手机号"  v-model="reConfig.mobile" maxlength="11" class="inputBox" />
    </view>
    <view class="submitBox" @click="confirmBtn">确认添加</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reConfig:{
				  username:'',
				  password:'',
          mobile:''
				},
			};
		},
    methods:{
      confirmBtn(){ //添加会员
        let {username,password,mobile}  = this.reConfig;
        if(!username){
          return uni.showToast({
            title:'请输入会员名称',
            icon:'none'
          })
        }else if(!password){
          return uni.showToast({
            title:'请输入密码',
            icon:'none'
          })
        }else if(!mobile){
          return uni.showToast({
            title:'请输入会员手机号',
            icon:'none'
          })
        }
        uni.showLoading({
          mask: true,
          title: '提交中...'
        })
        this.$Request.post(this.$api.me.addCashier, this.reConfig).then(res => {
            setTimeout(()=>{
               uni.hideLoading();
            },500)
            if(res.code === 200) {
              setTimeout(()=>{
                uni.redirectTo({
                  url:'/pages/me/cashiers/cashiers'
                });
              },1500)
            } else {
              uni.showToast({
                title: res.msg,
                duration: 2000
              })
            }
          })
        }
      }
    }  
</script>

<style lang="scss" scoped>
  .listItem{
    padding: 30rpx;
    font-size:32rpx;
    color:#333333;
    border-bottom:1px solid #F4F4F4;
    .leftText {
      font-size:32rpx;
      min-width:120rpx;
      white-space:nowrap;
    }
    input{
      flex:1
    }
  }
  .inputBox{
    font-size:28rpx;
    color:#888888;
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
</style>
