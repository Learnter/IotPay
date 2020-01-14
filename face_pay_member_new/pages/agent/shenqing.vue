<template>
  <view>
    <!-- <form> -->
    <!--  <view class="top_tit" style="background:none;padding:.15rem 0;">
        请完善申请资料
      </view> -->
      <view class="ouse" >
        <view class="ouse_left">姓名</view>
        <view class="ouse_right">
          <input type="text" class="uni-flex-item uni-ellipsis" placeholder='请填入您的真实姓名' v-model="reConfig.name"  />
        </view>
      </view>
      
      <view class="ouse" >
        <view class="ouse_left">地址</view>
        <view class="ouse_right"  @tap="showMask = true">
          <input class="uni-flex-item uni-ellipsis" type="text" placeholder-class="uni-ellipsis" :value="pickerText"  style="color:#888888" disabled />
        </view>
      </view>

      <view class="ouse" >
        <view class="ouse_left">详细地址</view>
        <view class="ouse_right">
          <input class="uni-flex-item uni-ellipsis" type="text" placeholder='请输入详细地址 例:xxx街道,xxx门牌号'  v-model="reConfig.address"/>
        </view>
      </view>

      <view class="ouse">
        <view class="ouse_left">证件号码</view>
        <view class="ouse_right">
          <input class="uni-flex-item uni-ellipsis" type="number" placeholder='请填入证件号码'  v-model="reConfig.card_number" />
        </view>
      </view>

      <view class="ouse">
        <view class="ouse_left">手机号码</view>
        <view class="ouse_right">
          <input class="uni-flex-item uni-ellipsis" type="number" placeholder='请填入手机号码'  v-model="reConfig.mobile" />
        </view>
      </view>

      <!-- <view type="button" value="提交" class="" /> -->
      <button type="primary" class="last_btn" @tap="submitConfirm">提交</button>
    <!-- </form> -->
    <linkage-address :show.sync="showMask" :provinces.sync="provinces" :citys.sync="citys" :districts.sync="districts" @confirmBtn="childConfirm"></linkage-address>
  </view>
</template>

<script>
  import linkageAddress from '@/components/linkage-address/linkage-address.vue';
  export default {
    components:{
      linkageAddress
    },
    data() {
      return {
        showMask: false, //显示地址选择框
        pickerText: '请选择省/市/区', //省市区显示地址信息
        provinces: [], //省列表
        citys: [], //市列表
        districts: [] ,//区列表
        reConfig:{ //请求配置
          name:'',
          province:'',
          city:'',
          district:'',
          address:'',
          type:'',
          mobile:'',
          card_number:''
        }
      }
    },
    onLoad(e) {
      this.reConfig.type = e.type;
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
      /*获取省/市/区的id值*/
      childConfirm(e) { 
        this.reConfig.province = e.provinceId;
        this.reConfig.city = e.cityId;
        this.reConfig.district = e.districtId;
        this.pickerText = e.text;
      },
      /*获取省/市/区的id值*/
      /*确认提交*/
      submitConfirm(){
        let {name,province,address,mobile,card_number} = this.reConfig;
        if(!name || name.trim().length == 0){
          return  uni.showToast({
            icon:'none',
            title:'请输入您的名字'
          })
        }else if(!province){
         return uni.showToast({
            icon:'none',
            title:'请选择地址'
          })
        }else if(!address || address.trim().length == 0){
         return uni.showToast({
            icon:'none',
            title:'请输入详细地址'
          })
        }else if(!mobile || mobile.trim().length == 0){
         return uni.showToast({
            icon:'none',
            title:'请输入您的电话号码'
          })
        }else if(!card_number || card_number.trim().length == 0){
         return uni.showToast({
            icon:'none',
            title:'请输入您的证件号'
          })
        }
        uni.showToast({
          icon:"none",
          title:'正在提交...'
        })
        this.$Request.post(this.$api.agency.apply,this.reConfig).then(res => {
          uni.hideLoading();
          if(res.code === 200){
            uni.navigateBack({delta:2})
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      }
      /*确认提交*/
    }
  }
</script>

<style lang="scss" scoped>
  .top_tit {
    color: #7d7e80;
    height: 2rem;
    text-align: center;
    margin: 1rem;
    font-size: 1rem;
  }

  .ouse {
    width: 100%;
    height: 3rem;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom:1px solid #ccc;
  }

  .ouse_left {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    text-indent: .5rem;
    color: #333;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .ouse_right {
    width: 70%;
    box-sizing:border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right:20rpx;
  }

  .ouse_right input {
    font-size: 0.8rem;
    font-weight: 500;
    border: none;
    width: 85%;
  }

  .last_btn {
    width: 70%;
    margin: 1rem auto;
    font-size: 1rem;
    background: rgb(247, 132, 21);
    height:80rpx;
    line-height:80rpx;
  }
</style>
