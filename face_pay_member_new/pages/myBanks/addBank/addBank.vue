<template>
	<view class="content">
    <view class="list">
      <view class="uni-inline-item rowItem">
        <view class="leftTitle">姓名</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="text" v-model="reConfig.bank_name"  placeholder="请输入持卡人姓名" placeholder-class="listHolder" />
        </view>
      </view>
      
      <view class="uni-inline-item rowItem">
        <view class="leftTitle">卡号</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="number" v-model="reConfig.bank_account" placeholder="请输入银行卡卡号" placeholder-class="listHolder"/>
        </view>
      </view>
      
      <view class="uni-inline-item rowItem">
        <view class="leftTitle">银行类型</view>
        <view class="rightInput uni-flex-item uni-flex">
         <xfl-select :list="bankList" :showItemNum="5"  :selectHideType="'hideAll'" :placeholder="'请选择银行卡类型'"
         :style_Container="'padding:0;height:100%;border:none'" style="flex:1" :clearable="false" @change="chooseType"></xfl-select>
        </view>
      </view>
      
      <view class="uni-inline-item rowItem">
        <view class="leftTitle">分行支行</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="text" v-model="reConfig.bank_address" placeholder="请填写银行分行支行" placeholder-class="listHolder"/>
        </view>
      </view>
      
      <view class="uni-inline-item rowItem">
        <view class="leftTitle">设置默认</view>
        <switch  @change="setDefault " checked="true" style="transform:scale(0.9)"/>
      </view>
      
      <view class="bottomBox" @click="submitBtn">
        <button class="confirm" type="warn">添加</button>
      </view>
    </view>
	</view>
</template>

<script>
  import xflSelect from '@/components/xfl-select/xfl-select.vue';
	export default {
		data() {
			return {
				reConfig:{
				  opening_id:'',//银行卡类型id
				  bank_name:'',//姓名
				  bank_account:'',//银行卡账号
				  bank_address:'',//分行支行
				  default:1//设置默认
				},
        bankList:[],//银行卡类别
			};
		}, 
    onLoad() {
      this.bankList = this.$SysCache.get('banks_type');
      console.log(this.bankList);
    },
    methods:{
      submitBtn(){ //提交银行卡信息
        let {bank_name,bank_account,opening_id,bank_address} = this.reConfig;
        if(!bank_name){
          return uni.showToast({
            icon:"none",
            title:'请输入持卡人姓名',
            duration:2000
          })
        }else if(!bank_account){
          return uni.showToast({
            icon:"none",
            title:'请输入银行卡账号',
            duration:2000
          })
        }else if(!opening_id){
            return uni.showToast({
              icon:'none',
              title:"请选择银行卡类型"
            })
        }else if(!bank_address){
            return uni.showToast({
              icon:'none',
              title:"请输入开卡地址"
            })
        }
        uni.showLoading({
          mask:true,
          title:'提交中...'
        })
        this.$Request.post(this.$api.me.addBank,this.reConfig).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if(res.code === 200) {
           setTimeout(()=>{
             uni.redirectTo({
               url:'/pages/myBanks/addBank/addBank'
             })();
           },1500)
          }else{
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      },
      chooseType(e){ //选择银行卡类型
       this.reConfig.opening_id = e.orignItem.opening_id;
      },
      setDefault(e){ //设置默认
       e.detail.value ? this.reConfig.default = 1 : this.reConfig.default = 2;
      }
    },
    components:{
      xflSelect
    }
	}
</script>

<style lang="scss" scoped>
  .content{
     box-sizing:border-box;
     width:100%;
     height:100%;
     padding:20rpx;
     overflow-y: scroll;
   }
   
  .list{
    height:100%;
    background:#FFFFFF;
    border-radius:20rpx;
    // box-shadow: 0 16rpx 16rpx rgba(10, 16, 20, .24), 0 0 16px rgba(10, 16, 20, .12);
  }
   
   .rowItem{
     height:80rpx;
     margin-bottom:20rpx;
     justify-content:space-between;
   }
   
   .leftTitle{
    font-size:32rpx;
    font-family:Adobe Heiti Std;
    color:#2B2B2B;
    min-width:160rpx;
    margin: 0 20rpx 0 10rpx;
    letter-spacing:4rpx;
   }
   
   .rightInput{
     align-self:stretch;
     align-items:flex-end;
     padding:10rpx 16rpx;
     border-bottom:2rpx solid #D9D9D9;
     input{
       flex:1;
       font-size:inherit;
     }
   }
   
   /deep/.listHolder{
     font-size:28rpx;
     color:#BBBBBB;
   }
   
   .bottomBox{
    padding:50rpx 10rpx;
    letter-spacing:10rpx;
   }
  
   .confirm{
     height:90rpx;
     line-height:90rpx;
     border-radius:40rpx;
     background:#FA5951;
     color:#FFFFFF;
     letter-spacing: 20rpx;
   }
</style>
