<template>
  <view class="content">
    <view class="list">
      <view class="uni-inline-item rowItem">
        <view class="leftTitle">店铺名称</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="text" v-model="reConfig.store_name" placeholder="请输入店铺名称" placeholder-class="listHolder" />
        </view>
      </view>

      <view class="uni-inline-item rowItem">
        <view class="leftTitle">店铺简称</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="text" v-model="reConfig.short_name" placeholder="请输入店铺简称" placeholder-class="listHolder" />
        </view>
      </view>

      <view class="uni-inline-item rowItem">
        <view class="leftTitle">联系人</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="text" v-model="reConfig.tel_name" placeholder="请输入联系人姓名" placeholder-class="listHolder" />
        </view>
      </view>

      <view class="uni-inline-item rowItem">
        <view class="leftTitle">联系方式</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="number" v-model="reConfig.mobile" placeholder="请输入联系电话" placeholder-class="listHolder" />
        </view>
      </view>

      <view class="uni-inline-item rowItem">
        <view class="leftTitle">邮箱地址</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="text" v-model="reConfig.tel_email" placeholder="请输入邮箱地址" placeholder-class="listHolder" />
        </view>
      </view>

      <view class="uni-inline-item rowItem">
        <view class="leftTitle">支付宝账号</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="text" v-model="reConfig.alipay_account" placeholder="请输入支付宝账号" placeholder-class="listHolder" />
        </view>
      </view>

      <view class="uni-inline-item rowItem">
        <view class="leftTitle">地址</view>
        <view class="rightInput uni-flex-item uni-flex" @click="showMask = !showMask">
          <input type="text" placeholder-class="uni-ellipsis" :value="pickerText" placeholder="请点击选择省、市、区" placeholder-style="color:#BBBBBB" disabled />
        </view>
      </view>

      <view class="uni-inline-item rowItem">
        <view class="leftTitle">详细地址</view>
        <view class="rightInput uni-flex-item uni-flex">
          <input type="text" v-model="reConfig.address" placeholder="请输入街道/门牌号等" placeholder-class="listHolder" />
        </view>
      </view>

      <view class="">
        <view class="bgTitle">上传营业执照</view>
        <view class="bgBox">
          <image :src="reConfig.business_license || '/static/icon/2019slyw_20.png'"></image>
          <view class="bgMask" v-if="!reConfig.business_license"></view>
          <view class="photographBtn" :class="reConfig.business_license?'exist':''" @click="uploadLicense">
            <image src="/static/icon/2019slyw_18.png"></image>
          </view>
          <view v-if="!reConfig.business_license" class="photographTitle">请上传营业执照</view>
        </view>
      </view>

      <view class="">
        <view class="bgTitle">上传门头照</view>
        <view class="bgBox">
          <image :src="reConfig.head_picture || '/static/icon/2019slyw_19.jpg'"></image>
          <view class="bgMask" v-if="!reConfig.head_picture"></view>
          <view class="photographBtn" :class="reConfig.head_picture?'exist':''" @click="uploadStoreHead">
            <image src="/static/icon/2019slyw_18.png"></image>
          </view>
          <view v-if="!reConfig.head_picture" class="photographTitle">请上传门头照</view>
        </view>
      </view>

      <view class="">
        <view class="bgTitle">上传店铺LOGO</view>
        <view class="bgBox">
          <image :src="reConfig.logo || '/static/icon/storeLogo.png'"></image>
          <view class="bgMask" v-if="!reConfig.logo"></view>
          <view class="photographBtn" :class="reConfig.logo?'exist':''" @click="uploadStoreLogo">
            <image src="/static/icon/2019slyw_18.png"></image>
          </view>
          <view v-if="!reConfig.logo" class="photographTitle">上传店铺LOGO</view>
        </view>
      </view>

      <view class="bottomBox" @click="submitBtn">
        <button class="confirm" type="warn">提交申请</button>
      </view>
    </view>
    <linkage-dddress :show.sync="showMask" :provinces.sync="provinces" :citys.sync="citys" :districts.sync="districts"
      @confirmBtn="childConfirm"></linkage-dddress>
  </view>
</template>

<script>
  import linkageDddress from '@/components/linkage-address/linkage-address.vue';
  export default {
    data() {
      return {
        showMask: false, //显示地址选择框
        pickerText: '', //省市区显示地址信息
        provinces: [], //省列表
        citys: [], //市列表
        districts: [], //区列表
        reConfig: {
          store_name: '', //店铺名称
          short_name: '', //店铺小名
          tel_name: '', //联系人
          mobile: '', //联系人电话
          tel_email: '', //联系人邮箱
          alipay_account: '', //联系人支付宝账号
          province: '', //省份
          city: '', //市
          district: '', //区
          address: '', //详细地址
          business_license: '', //店铺营业执照
          head_picture: '', //店铺门头照
          logo: '' //店铺LOGO
        }
      };
    },
    onLoad() {
      this.fetchAllRegion();
    },
    methods: {
      /*获取地区列表*/
      fetchAllRegion() {
        let allRegion = this.$SysCache.get('all_region');
        this.provinces = allRegion;
        this.citys = allRegion[0].child;
        this.districts = allRegion[0].child[0].child;
      },
      uploadLicense() { //上传店铺营业执照
        uni.chooseImage({
          count: 1,
          success: (res) => {
            this.$Request.upload(this.$api.uploadFile, res.tempFilePaths[0], 'pic', {
              'field': 'pic'
            }).then(res => {
              if (res.code === 200) {
                this.reConfig.business_license = res.data.src;
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
      },
      uploadStoreHead() { //上传店铺门头照
        uni.chooseImage({
          count: 1,
          success: (res) => {
            this.$Request.upload(this.$api.uploadFile, res.tempFilePaths[0], 'pic', {
              'field': 'pic'
            }).then(res => {
              if (res.code === 200) {
                this.reConfig.head_picture = res.data.src;
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
      },
      uploadStoreLogo() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            this.$Request.upload(this.$api.uploadFile, res.tempFilePaths[0], 'pic', {
              'field': 'pic'
            }).then(res => {
              if (res.code === 200) {
                this.reConfig.logo = res.data.src;
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
      },
      /*获取省/市/区的id值*/
      childConfirm(e) {
        this.reConfig.province = e.provinceId;
        this.reConfig.city = e.cityId;
        this.reConfig.district = e.districtId;
        this.pickerText = e.text;
      },
      submitBtn() { //提交申请
        let {
          store_name,
          short_name,
          tel_name,
          mobile,
          tel_email,
          alipay_account,
          province,
          city,
          district,
          address,
          business_license,
          head_picture,
          logo
        } = this.reConfig;
        if (!store_name) {
          return uni.showToast({
            icon: 'none',
            title: '请输入店铺名称'
          })
        } else if (!short_name) {
          return uni.showToast({
            icon: 'none',
            title: '请输入店铺简称'
          })
        } else if (!tel_name) {
          return uni.showToast({
            icon: 'none',
            title: '请输入联系人姓名'
          })
        } else if (!mobile) {
          return uni.showToast({
            icon: 'none',
            title: '请输入联系人电话'
          })
        } else if (!tel_email) {
          return uni.showToast({
            icon: 'none',
            title: '请输入邮箱地址'
          })
        } else if (!province) {
          return uni.showToast({
            icon: 'none',
            title: '请选择省份'
          })
        } else if (!address) {
          return uni.showToast({
            icon: 'none',
            title: '请输入详细地址'
          })
        } else if (!business_license) {
          return uni.showToast({
            icon: 'none',
            title: '请上传店铺营业执照'
          })
        } else if (!head_picture) {
          return uni.showToast({
            icon: 'none',
            title: '请上传店铺门头照'
          })
        } else if (!logo) {
          return uni.showToast({
            icon: 'none',
            title: '请上传店铺LOGO'
          })
        }
        uni.showLoading({
          mask:true,
          title:'提交中...'
        })
        this.$Request.post(this.$api.me.recuitment,this.reConfig).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if (res.code === 200) {
            setTimeout(()=>{
              uni.navigateBack();
            },1000)
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg,
              duration: 2000
            })
          }
        })
      }
    },
    components: {
      linkageDddress
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20rpx 20rpx 0;
    overflow-y: scroll;
  }

  .rowItem {
    height: 80rpx;
    margin-bottom: 20rpx;
    justify-content: space-between;
    border-bottom: 1px solid #D9D9D9;
  }

  .leftTitle {
    font-size: 32rpx;
    font-family: Adobe Heiti Std;
    color: #2B2B2B;
    min-width: 160rpx;
    margin: 0 20rpx 0 10rpx;
    letter-spacing: 4rpx;
  }

  .rightInput {
    align-self: stretch;
    align-items: center;
    padding: 10rpx 16rpx;

    input {
      flex: 1;
      font-size: inherit;
    }
  }

  /deep/.listHolder {
    font-size: 28rpx;
    color: #BBBBBB;
  }

  .bottomBox {
    padding: 20rpx 10rpx 50rpx;
    letter-spacing: 10rpx;
  }

  .confirm {
    height: 90rpx;
    line-height: 90rpx;
    border-radius: 40rpx;
    background: #FA5951;
    color: #FFFFFF;
    letter-spacing: 4rpx;
  }

  .bgTitle {
    font-size: 32rpx;
    font-family: Adobe Heiti Std;
    color: #2B2B2B;
  }

  .bgBox {
    margin: 30rpx 0;
    height: 400rpx;
    border-radius: 10rpx;
    border: 1px solid #F4F4F4;
    overflow: hidden;
    position: relative;

    .bgMask {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background: rgba(0, 0, 0, 0.4);
    }

    .photographBtn {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      z-index: 2;
      width: 100rpx;
      height: 100rpx;
    }

    .exist {
      top: 20%;
      left: 90%;
    }

    .photographTitle {
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translateX(-50%);
      z-index: 2;
      color: #FFFFFF;
      font-size: 30rpx;
    }
  }
</style>
