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
      <switch @change="setDefault" style="transform:scale(0.8)" />
    </view>
    <view class="redbbutton">
      <button type="primary" class="confirBtn" @click="insertAddress">确认添加</button>
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
      /*获取地区列表*/

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
        this.$Request.post(this.$api.address.add, this.arsConfig).then(res => {
          setTimeout(() => {
            uni.hideLoading();
          }, 500)
          if (res.code === 200) {
              // uni.showToast({
              //   title: '添加成功',
              //   success: () => {
               uni.navigateBack();
              //   }
              // })
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
        let {value} = e.detail;
        value ? this.arsConfig.default = 1 : this.arsConfig.default = 2;
      }
    }
  };
</script>

<style>
  @import url("addaddress.css");
</style>
