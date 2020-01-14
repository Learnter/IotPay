<template>
  <view class="content">
    <view v-html="content"></view>
    <view class="fixedBox uni-inline-item">
      <view class="checkBox uni-inline-item">
        <checkbox-group @change="switchCheckbox">
          <label>
            <checkbox value="'true'" checked="true" />我同意
          </label>
        </checkbox-group>
      </view>
      <view class="comfirmBtn uni-flex-item" :style="isAgree ? 'background:#DF5000' : 'background:#DF5000'" @click="medicBtn">立即铺货</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
          isAgree:true,//是否同意协议
          parentData:null,
          content:''
      };
    },
    onLoad(e){
      this.parentData = JSON.parse(e.data);
      this.fetchProtocol();
    },
    methods: {
      fetchProtocol(){ //获取协议内容
        this.$Request.post(this.$api.setUp.issue,{type:3}).then(res => {
          if(res.code === 200){
            this.content = res.data.content_cn.replace(/\<img/gi,"<img style='max-width:100%;height:auto'");
          }else{
            uni.showToast({
              title:res.msg,
              icon:'none'
            })
          }
        })
      },
      switchCheckbox(e) { //切换多选框
       this.isAgree = e.detail.value[0];
      },
      medicBtn(){ //确认铺货
        if(!this.isAgree == true) return false;
        uni.redirectTo({
          url:'/pages/store/distribution/distribution?data='+JSON.stringify(this.parentData)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    box-sizing: border-box;
    padding: 30rpx 30rpx 120rpx;
  }

  .fixedBox {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    height: 120rpx;
    background: #DBEBFF;
  }

  .checkBox {
    padding: 0 30rpx;
    font-size: 32rpx;
    color: #0FC4EB;
  }

  .comfirmBtn {
    align-self: stretch;
    background: #DF5000;
    text-align: center;
    line-height: 120rpx;
    font-size: 36rpx;
    color: #FFFFFF;
    border-radius: 10rpx;
  }
</style>
