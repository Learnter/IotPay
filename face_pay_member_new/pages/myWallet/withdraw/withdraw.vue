<template>
  <view>
    <view class="listItem uni-inline-item">
      <view>提现金额</view>
     <!-- <view class="rightItem uni-inline-item"> -->
      <input class="withdrawInput" type="number" v-model="reConfig.money" :placeholder="'您当前可提现 '+`${canWithdrawAmount}`+' (元)'" />
    <!--  </view> -->
      <view @click="allWithdraw">全部提现</view>
    </view>
    <view class="listItem uni-inline-item">
      <text>提现至</text>
      <view class="rightItem uni-inline-item">
        <xfl-select :list="bankList" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="false" :placeholder="'请选择提现银行卡'"
          :style_Container="'font-size:30rpx;'" style="flex:1" :selectHideType="'hideAll'" @change="changeBank">
        </xfl-select>
      </view>
    </view>
    <button class="submitBox" type="primary" @click="confirmBtn">提交</button>
  </view>
</template>

<script>
  import xflSelect from '@/components/xfl-select/xfl-select.vue';
  export default {
    data() {
      return {
        isAllWithdraw:false,
        canWithdrawAmount:0,//可提现金额
        bankList: [], //银行列表
        reConfig: {
          money: '', //提现金额
          card_id: '' //提现银行卡
        }
      };
    },
    onLoad() {
      this.fetchInfo();
      this.fetchBanks();
    },
    methods: {
        fetchInfo() {
          this.$Request.post(this.$api.me.myData).then(res => {
            if (res.code === 200) {
             let {balance} = res.data.user;
             this.canWithdrawAmount = balance;
            } else {
              uni.showToast({
                title: res.msg,
                duration: 2000,
                icon: 'none'
              })
            }
          })
        },
      fetchBanks() { //获取银行卡列表
        uni.showLoading({
          mask:true,
          title:'加载中...'
        })
        this.$Request.post(this.$api.me.bankList).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if (res.code === 200) {
            this.bankList = res.data;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      },
      changeBank(e) { //选择银行卡
        this.reConfig.card_id = e.orignItem.id;
      },
      confirmBtn() { //提现
        let {money,card_id} = this.reConfig;
        if(!money){
          return uni.showToast({
            title:'请输入提现金额',
            icon:'none'
          })
        }else if(!card_id){
          return uni.showToast({
            title:'请选择提现银行卡',
            icon:'none'
          })
        }
        uni.showLoading({
          mask:true,
          title:'申请中...'
        })
        this.$Request.post(this.$api.me.withdraw,this.reConfig).then(res => {
          setTimeout(function() {
            uni.hideLoading();
          }, 500);
          if (res.code === 200) {
           uni.navigateBack({
             delta:2
           })
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon: 'none'
            })
          }
        })
      },
      allWithdraw(){ //全部提现
        this.isAllWithdraw = !this.isAllWithdraw;
        if(this.isAllWithdraw){
           this.reConfig.money = this.canWithdrawAmount;
        }else{
           this.reConfig.money = '';
        }
      }
    },
      components: {
        xflSelect
      }
    }
</script>

<style lang="scss" scoped>
  .listItem {
    box-sizing: border-box;
    padding:30rpx;
    border-bottom: 1px solid #F3F3F3;
    justify-content: space-between;
    font-family: PingFangSC-regular;

    text {
      color: #101010;
      font-size: 32rpx;
    }
  }

  .submitBox {
    margin: 60rpx auto;
    background: #FA5951;
    width: 80%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
  }
  
  .withdrawInput{
    flex:1;
    margin: 0 20rpx;
    padding:10rpx 0;
    border-bottom:1px solid #F3F3F3;
    font-size:32rpx;
  }

  .rightItem {
    width: 70%;
    align-self: stretch;
    input {
      flex: 1;
    }
  }
</style>
