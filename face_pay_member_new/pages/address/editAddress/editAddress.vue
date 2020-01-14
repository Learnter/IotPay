<template>
  <view>
    <view class="redacBox">
      <view class="redacTl">姓名：</view>
      <view class="redacInput"><input type="text" placeholder-class="uni-ellipsis" v-model="arsConfig.username"
          placeholder="请输入联系人姓名" /></view>
    </view>
    <view class="redacBox">
      <view class="redacTl">号码：</view>
      <view class="redacInput"><input type="number" placeholder-class="uni-ellipsis" v-model="arsConfig.mobile"
          placeholder="请输入联系方式" /></view>
    </view>
    <view class="mpvue-picker redacBox">
      <view class="redacTl">地址：</view>
      <view class="redacInput" @click="showMask = true">
        <input type="text" placeholder-class="uni-ellipsis" :value="pickerText" disabled />
      </view>
    </view>
    <view class="redacBox">
      <view class="redacTl">详细地址：</view>
      <view class="redacInput"><input type="text" placeholder-class="uni-ellipsis" v-model="arsConfig.address"
          placeholder="请输入街道/门牌号等" /></view>
    </view>
    <view class="redacBox">
      <view class="redacTl">设置默认：</view>
      <switch :checked="arsConfig.default == 1 ? true : false" @change="setDefault" style="transform:scale(0.8)" />
    </view>
    <view class="redbbutton">
      <button type="primary" class="confirBtn" @click="insertAddress">提交修改</button>
    </view>
    <linkage-address :show.sync="showMask" :provinces.sync="provinces" :citys.sync="citys" :districts.sync="districts"
      @confirmBtn="childConfirm"></linkage-address>
  </view>

</template>

<script>
  import linkageAddress from '@/components/linkage-address/linkage-address.vue';
  export default {
    components: {
      linkageAddress
    },
    data() {
      return {
        showMask: false, //显示地址选择框
        pickerText: '请选择省/市/区', //省市区显示地址信息
        arsConfig: { //地址配置
          address_id: '', //修改的地址id
          province: '', //省
          city: '', //市
          district: '', //区
          address: '', //详细地址
          mobile: '', //电话
          username: '', //收货人姓名
          default: 2
        },
        provinces: [], //省列表
        citys: [], //市列表
        districts: [] //区列表
      };
    },
    onLoad(e) {
      let {
        parentId
      } = e;
      if (parentId) {
        this.fetchAddressInfo(parentId);
        this.fetchAllRegion();
      }
    },
    methods: {
      /*获取地区列表*/
      fetchAllRegion() {
        let allRegion = this.$SysCache.get('all_region');
        this.provinces = allRegion;
        this.citys = allRegion[0].child;
        this.districts = allRegion[0].child[0].child;
      },
      /*获取地区列表*/
      fetchAddressInfo(value) { //获取修改的地址信息
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.post(this.$api.address.info, {
          address_id: value
        }).then(res => {
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
          if (res.code === 200) {
            let {
              address,
              address_id,
              provinceName,
              cityName,
              districtName,
              mobile,
              username,
              province,
              city,
              district
            } = res.data;
            this.arsConfig.address_id = address_id;
            this.arsConfig.username = username;
            this.arsConfig.mobile = mobile;
            this.arsConfig.address = address;
            this.arsConfig.province = province;
            this.arsConfig.city = city;
            this.arsConfig.district = district;
            this.arsConfig.default = res.data.default;
            if (districtName) {
              this.pickerText = provinceName + '-' + cityName + '-' + districtName;
            } else if (cityName) {
              this.pickerText = provinceName + '-' + cityName;
            } else if (provinceName) {
              this.pickerText = provinceName;
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },

      insertAddress() { //增加地址
        let {
          username,
          mobile,
          province,
          address
        } = this.arsConfig;
        if (!username) {
          uni.showToast({
            icon: 'none',
            title: '请输入收货人姓名',
            position: 'top'
          })
          return false;
        } else if (!mobile) {
          uni.showToast({
            icon: 'none',
            title: '请输入收货人手机号',
            position: 'top'
          })
          return false;
        } else if (!province) {
          uni.showToast({
            icon: 'none',
            title: '请选择收货地址',
            position: 'top'
          })
          return false;
        } else if (!address) {
          uni.showToast({
            icon: 'none',
            title: '请输入收货详细地址',
            position: 'top'
          })
          return false;
        }
        uni.showLoading({
          mask: true,
          title: '提交中...'
        })
        this.$Request.post(this.$api.address.edit, this.arsConfig).then(res => {
          uni.hideLoading();
          if(res.code === 200) {
            uni.navigateBack();
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg,
              position: 'top'
            })
          }
        })
      },
      childConfirm(e) { /*获取省/市/区的id值*/
        this.arsConfig.province = e.provinceId;
        this.arsConfig.city = e.cityId;
        this.arsConfig.district = e.districtId;
        this.pickerText = e.text;
      },
      setDefault(e) { //设置是否为默认地址
        let {
          value
        } = e.detail;
        value ? this.arsConfig.default = 1 : this.arsConfig.default = 2;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .redacBox {
    display: flex;
    padding: 20rpx;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
  }

  .redacTl {
    min-width: 140rpx;
    line-height: 50rpx;
    color: #666666;
  }

  .redacInput {
    line-height: 50rpx;
    flex: 1;
  }

  .redacInput input {
    line-height: 50rpx;
    padding: 0rpx 20rpx 0rpx 10rpx;
    color: #666666;
    width: 100%;
    font-size: 28rpx;
  }

  .redbianqBox {
    display: flex;
    padding: 20rpx;
  }

  .redacText {
    display: inline-block;
    border: 1px solid #bbbbbb;
    color: #666666;
    padding: 0rpx 15rpx;
    border-radius: 6rpx;
    margin: 0rpx 20rpx 10rpx 0rpx;
    line-height: 40rpx;
    font-size: 22rpx;
  }

  .redacTextActive {
    color: #158DFF;
    border: 1px solid #158DFF;
  }

  .redbbutton {
    width: 90%;
    margin: 60rpx auto;
  }

  .confirBtn {
    height: 80rpx;
    line-height: 80rpx;
    font-size: 34rpx;
    background:#FA5951;
  }
</style>
