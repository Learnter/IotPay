<template>
  <view class="content">
    <view class="circleBg">
      <image src="/static/icon/2019slzf_4.png" mode="widthFix"></image>
    </view>
   <!-- <view class="gatherTitle">收款</view> -->
    <view class="gatherBox">
      <view class="shadowBox">
        <view class="title">请输入收款金额</view>
        <view class="inputBox uni-inline-item">
          <text style="font-weight:bold;">¥</text>
          <input type="number" v-model="pushConfig.price" placeholder="0.00" />
        </view>
        <view class="facePayBtn" @tap="facePayBtn">刷脸支付</view>
        <view class="uni-inline-item listTitle">
          <text>方式</text>
          <text>明细</text>
          <text>时间</text>
        </view>
        <view class="listBox">
          <view class="listItem uni-inline-item" v-for="(item,index) in list" :key="index">
            <text style="flex:1" v-if="item.pay_code === 1">支付宝</text>
            <text style="flex:1" v-if="item.pay_code === 2">微信</text>
            <text style="flex:1;text-align:center;">¥{{item.order_pv}}</text>
            <text class="itmeTime">{{item.pay_time}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="footerBox">
      <text class="">支持蜻蜓和青蛙</text>
      <text class="">需要收集转换连接刷脸设备</text>
    </view>
    <view class="emptybg" v-if="isEmpty">
      <image src="/static/holder/a024laner_105.png"></image>
      <view class="">空空如也</view>
    </view>
   <view class="maskBox" :class="showMask == true ? 'active':'hidden'">
      <scroll-view class="equipmentBox" scroll-y="true" show-scrollbar="false">
        <view class="equipmentItem" v-for="(item,index) in equipmentList" :key="index">
          <view class="equipmentName">名称：{{item.name}}</view>
          <view class="equipmentNum">设备号：{{item.sn}}</view>
          <button type="primary" class="equipmentConfirm" @click="pushFacePay(item.sn)">确认</button>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showMask:false,
        isEmpty: false, //空列表
        reConfig: {
          page: 0,
          page_num: 10,
          type: 0
        },
        detailData: null, //收银明细
        list: [], //明细列表
        equipmentList:[],//商家设备明细
        pushConfig: {
          sn: '', //设备sn号
          price: '' //收款金额
        }
      };
    },
    onLoad() {
      this.fetchDetail();
    },
    methods: {
      fetchDetail() { //获取收银员明细信息
        this.$Request.post(this.$api.me.collectDetail, this.reConfig).then(res => {
          setTimeout(() => {
            uni.stopPullDownRefresh();
          }, 1000)
          if (res.code === 200) {
            this.detailData = res.data;
            if (!res.data.list || res.data.list.length === 0) return this.isEmpty = true;
            this.list = res.data.list;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000
            })
          }
        })
      },
      facePayBtn() { //刷脸支付  
        let {price} = this.pushConfig;
        if(!price) return uni.showToast({
          icon:'none',
          title:'请输入收款金额'
        })
        this.$Request.post(this.$api.arouse.equipments).then(res => {
          if (res.code === 200) {
             this.equipmentList = res.data;
             this.showMask = true;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      pushFacePay(value){ //推送刷脸付
        this.pushConfig.sn = value;
        this.$Request.post(this.$api.arouse.push,this.pushConfig).then(res => {
          if(res.code === 200){
            this.websocket();
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
            this.pushConfig.price = '';
          }
          this.showMask = false;
        })
      },
      websocket(){ //监听长连接
       uni.connectSocket({ //与服务器建立长连接
          url: 'wss://facepayapi.zguan.cn/wss'
       });
       
       uni.onSocketOpen((res) => { //建立后打开链接通道
         let socketData = {sn:'app'+this.pushConfig.sn,type:2};
         uni.sendSocketMessage({ //发送消息给服务器端
           data:JSON.stringify(socketData)
         })
       });
       
       uni.onSocketMessage((res) => { //监听服务器端响应
         let result = JSON.parse(res.data);
         if(result.code == 1){
           uni.showModal({
             showCancel:false,
             title:'确认提示!',
             content:'已收款 '+result.price+' 元',
             success:(res)=>{
               this.pushConfig.price = '';
               this.fetchDetail();
               uni.closeSocket();//关闭长连接
             }
           })
         }else if(result.code == 3){
           uni.showToast({
             icon:'none',
             title:'用户取消支付!'
           })
          this.pushConfig.price = ''; 
          uni.closeSocket();//关闭长连接 
         }
       })
      }
    },
    onPullDownRefresh() { //监听下拉刷新
      this.isEmpty = false;
      this.fetchDetail();
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .circleBg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .gatherTitle {
    position: relative;
    text-align: center;
    z-index: 10;
    color: #FFFFFF;
    font-size: 36rpx;
    font-family: Helvetica-regular;
    padding: 60rpx 0 40rpx;
  }

  .gatherBox {
    flex: 1;
    align-self: stretch;
    box-sizing: border-box;
    width: 100%;
    padding: 0 30rpx;
    z-index: 10;
    overflow: hidden;

    .title {
      padding: 30rpx 30rpx 10rpx;
      font-size: 32rpx;
      font-family: PingFangSC-regular;
      color: #101010;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .inputBox {
      margin: 0 30rpx;
      padding: 20rpx 0;
      font-size: 40rpx;
      border-bottom: 1px solid #F4F4F4;

      input {
        font-size: 50rpx;
      }
    }

    .facePayBtn {
      font-size: 36rpx;
      margin: 40rpx 40rpx 30rpx;
      background: #FA5951;
      padding: 16rpx 0;
      text-align: center;
      color: #FFFFFF;
      border-radius: 60rpx;
    }

    .listTitle {
      justify-content: space-between;
      padding: 0 30rpx;
      font-family: PingFangSC-bold;
      font-size: 30rpx;
      font-weight: bold;
    }

    .listBox {
      padding: 10rpx 16rpx;
      box-sizing: border-box;
      // height:calc(100% - 415rpx);
    }

    .listItem {
      justify-content: space-between;
      padding: 16rpx 0 16rpx 16rpx;
      color: #888888;
      border-bottom: 1px solid #F4F4F4;

      .itmeTime {
        flex: 1;
        width: 100rpx;
        font-size: 24rpx;
        text-align: right;
      }
    }
  }

  .shadowBox {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 10rpx;
  }

  .footerBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16rpx 0 10rpx;
    text-align: center;
    color: #444444;
    font-size: 26rpx;
    letter-spacing: 1px;
  }

  .emptybg {
    position: fixed;
    left: 50%;
    top: 70%;
    z-index: 10;
    width: 400rpx;
    height: 400rpx;
    text-align: center;
    transform: translate(-50%, -50%);
    color: #999999;
  }
  
  
  .maskBox{
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index:10;
    background:rgba(0,0,0,0.5);
    display:none;
    
  }
  
  .equipmentBox{
   position:fixed;
   left:50%;
   top:50%;
   z-index:10;
   width:90%;
   height:600rpx;
   transform:translate(-50%,-50%);
   box-sizing:border-box;
   padding:20rpx;
   border-radius:20rpx;
   background:#FFFFFF;
   .equipmentItem{
     height:90rpx;
     position:relative;
     margin-bottom:10rpx;
     .equipmentName{
       font-size:30rpx;
     }
     .equipmentNum{
       font-size:26rpx;
       color:#888888;
     }
     .equipmentConfirm{
      position: absolute;
      top: 50%;
      right: 0;
      padding: 10rpx 20rpx;
      font-size: 28rpx;
      transform: translateY(-50%);
      line-height: 1;
      background: #FA5951;
     }
   }
 }  
  
  .active{
    display:block;
  }
  
  .hidden{
    display: none;
  }
</style>
