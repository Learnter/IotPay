<template>
  <view>
    <view class="medicBox" v-if="medicInfo">
      <view class="medic_title">商家信息</view>
      <view class="medic_row">商家名称</view>
      <view class="medic_row_text">{{medicInfo.store_name}}</view>
      <view class="medic_row">商家申请时间</view>
      <view class="medic_row_text">{{medicInfo.add_time}}</view>
      <view class="medic_row">商家地址</view>
      <view class="medic_row_text">{{medicInfo.address}}</view>
      <button type="primary" class="comfirmMedic" @click="comfirmMedic">确定铺货</button>
    </view>
  </view>
</template>

<script>
  export default {

    data() {
      return {
        medicInfo:null
      };
    },
    onLoad(e) {
      this.fetchParentData(e);
    },
    methods: {
     fetchParentData(e){ //获取父级传递的参数
       if(!e.data) return;
       this.medicInfo = JSON.parse(e.data);
     },
     comfirmMedic(){ //确定铺货
       this.$Request.post(this.$api.medic.comfirmMedic,{store_id:this.medicInfo.id}).then(res => {
         if(res.code === 200){
           uni.showModal({
             title:'成功提示!',
             content:'恭喜您铺货成功',
             confirmText:'查看',
             cancelText:'返回',
             success:(result)=>{
               if(!result.confirm){
                 uni.navigateBack({
                   delta:2
                 })
               }else{
                 uni.redirectTo({
                   url:'/pages/store/medicOrders/medicOrders'
                 })
               }
             }
           })
         }else{
           uni.showToast({
             icon:'none',
             title:res.msg
           })
         }
       })
     }
    }
  }
</script>

<style lang="scss" scoped>
  .medicBox{
    padding:30rpx 30rpx 0;
   
  }
  .medic_title{
    font-size:36rpx;
    color:#158DC7;
    margin-bottom:20rpx;
  }
  .medic_row{
    font-size:32rpx;
    margin-bottom:20rpx;
  }
  .medic_row_text{
    font-size:30rpx;
    color:#A2A2A2;
    margin-bottom:20rpx;
  }
  
  .comfirmMedic{
    margin:40rpx 0;
    background:#FA5951;
    height:80rpx;
    line-height:80rpx;
  }
</style>
