<template>
  <view>
    <block>
      <view class="emptyAdress uni-inline-item" v-if="!defAddress">
        <image src="/static/icon/increment.png" class="incrementImg" @click="address"></image>
        请先添加地址
      </view>
      <view class="addressBox" v-else>
        <view class="uni-inline-item uni-flex-between adrSize">
          <text>收货人:{{defAddress.username}}</text>
          <text>{{defAddress.mobile}}</text>
        </view>
        <view class="uni-inline-item uni-flex-between adrSize">
          <text class="uni-flex uni-ellipsis">收货地址:{{defAddress.address}}</text>
          <text class="iconfont iconxiangyou1" @click="switchAddress"></text>
        </view>
        <view class="addressNote">(请仔细检查你的收货地址)</view>
      </view>
    </block>

    <view class="productBox uni-inline-item" v-if="productInfo">
      <view class="leftImg">
        <image :src="productInfo.picture"></image>
      </view>
      <view class="rightInfo">
        <view class="infoTitle uni-ellipsis">{{productInfo.title}}</view>
        <view class="infoPrice">¥{{productInfo.price}}</view>
        <view class="infoDesc">{{productInfo.desc}}</view>
      </view>
    </view>
    <view class="numBox">
      <view class="numTitle">自行选择采购数量</view>
      <view class="example-body">
        <uni-number-box :min="1" :value="reConfig.goods_num" @change="numChange" />
      </view>
    </view>
    <view class="messageBox">
      <view class="numTitle">订单备注留言</view>
      <input type="text" value="" />
    </view>
    <button type="primary" class="payButton" v-if="productInfo" @click="createOrder">需支付¥{{reConfig.goods_num*productInfo.price}}</button>
  </view>
</template>

<script>
  import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
  export default {
    data() {
      return {
        productInfo: null, //产品信息
        defAddress: null, //默认地址信息
        reConfig: {
          goods_id: '',
          address_id: '',
          goods_num: 1
        }
      };
    },
    onLoad(e) {
      this.fetchProductInfo(e);
    },
    onShow() {
      this.fetchDefAddress();
    },
    methods: {
      fetchProductInfo(e) { //获取上级页面传递的产品信息
        if (!e.data) return false;
        let data = JSON.parse(e.data);
        this.productInfo = data;
        this.reConfig.goods_id = data.goodId;
      },
      fetchDefAddress() { //获取默认地址
        let address = this.$SysCache.get('defAddress');
        if (!address) return false;
        this.defAddress = address;
        this.reConfig.address_id = address.address_id;
      },
      address() { //增加地址
        uni.navigateTo({
          // url: '/pages/address/address',
          url: '/pages/address/addresslist/addresslist'
        })
      },
      switchAddress() { //切换地址
        uni.navigateTo({
          url: '/pages/address/addresslist/addresslist'
        })
      },
      numChange(e) { //增减数量
        this.reConfig.goods_num = e;
      },
      createOrder() { //创建订单
        uni.showLoading({
          mask: true,
          title: '创建订单...'
        })
        this.$Request.post(this.$api.order.commit, this.reConfig).then(res => {
          setTimeout(function() {
            uni.hideLoading()
          }, 500);
          if (res.code === 200) {
            setTimeout(() => {
              uni.navigateTo({
                url: '/pages/products/orderPay/orderPay?data=' + JSON.stringify(res.data)
              })
            }, 1500);
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      }
    },
    components: {
      uniNumberBox
    }
  }
</script>

<style lang="scss" scoped>
  .emptyAdress {
    height: 140rpx;
    line-height: 140rpx;
    text-align: center;
    justify-content: center;
  }

  .incrementImg {
    width: 100rpx;
    height: 100rpx;
    margin-right: 40rpx;
  }

  .iconxiangyou1 {
    font-size: 30rpx;
    color: #999999;
  }

  .adrSize {
    font-size: 30rpx;
  }

  .addressBox {
    box-sizing: border-box;
    height: 180rpx;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .addressNote {
    font-size: 28rpx;
    color: #D2D2D2;
  }

  .productBox {
    box-sizing: border-box;
    height: 180rpx;
    padding: 20rpx;
    background: #F1F1F1;
  }

  .leftImg {
    width: 140rpx;
    height: 140rpx;
    margin-right: 20rpx;
  }

  .leftImg image {
    width: 100%;
    height: 100%;
  }

  .rightInfo {
    position: relative;
    flex: 1;
    align-self: stretch;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .infoTitle {
    font-size: 34rpx;
  }

  .infoPrice {
    position: absolute;
    right: 0rpx;
    top: 50%;
    text-align: right;
    color: #FEBB3C;
    font-size: 32rpx;
  }

  .infoDesc {
    color: rgba(16, 16, 16, 0.5);
    font-size: 28rpx;
  }

  .numBox {
    background: #FFFFFF;
    padding: 20rpx 30rpx;
    margin-bottom: 30rpx;
  }

  .numTitle {
    padding-bottom: 20rpx;
  }

  .messageBox {
    background: #FFFFFF;
    padding: 20rpx 30rpx;
  }

  .payButton {
    margin: 60rpx 30rpx;
    border-radius: 40rpx;
    height: 80rpx;
    line-height: 80rpx;
    background-color: #FA5951;
  }
</style>
