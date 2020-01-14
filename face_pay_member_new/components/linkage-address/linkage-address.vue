<template>
	<view class="content" v-if="show">
		  <view class="maskContent  fadeInUp">
		    <view class="uni-inline-item maskHead">
		      <view class="cancelBtn" @tap="cancel">取消</view>
		      <view class="confirmBtn" @tap="confirm">确认</view>
		    </view>
		    <view class="regionBox uni-inline-item uni-flex-between">
		      <scroll-view scroll-y class="regionlist">
		          <view class="rgItem" :class="provinceId === item.value ? 'active': ''" v-for="(item,index) in provinces" :key="index" @tap="chanageProvice(item)">{{item.label}}</view>
		      </scroll-view>
		      <scroll-view scroll-y class="regionlist">
		        <view class="rgItem" :class="cityId === item.value ? 'active': ''" v-for="(item,index) in citys" :key="index" @tap="chanageCity(item)">{{item.label}}</view>
		      </scroll-view>
		      <scroll-view scroll-y class="regionlist">
		         <view class="rgItem" :class="districtsId === item.value ? 'active': ''" v-for="(item,index) in districts" :key="index" @tap="chanageDstrict(item)">{{item.label}}</view>
		      </scroll-view>
		    </view>
		  </view>
	</view>
</template>

<script>
  import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
         provinceInfo:'', //选择的省份
         cityInfo:'', //选择的城市市
         districtInfo:'', //选择的地区
         provinceId:'',
         cityId:'',
         districtsId:''
			};
		},
    props:{
      provinces:Array,
      citys:Array,
      districts:Array,
      show:Boolean
    },
    methods:{
      /*选择省份*/
      chanageProvice(obj){
        this.provinces.filter((res) => {
          
          if(res.value === obj.value){
            
              /*获取省份id*/
              this.provinceInfo = res;
              /*获取省份id*/
              
              /*切换省份,需要将城市-区县的高亮隐藏*/
              this.provinceId = res.value;
              this.cityId = -1;
              this.districtsId = -1;
              /*切换省份,需要将城市-区县的高亮隐藏*/
              
            if(res.child && res.child.length != 0){ //判断城市列表是否存在
              
               /*获取城市id*/
               this.cityInfo = res.child[0];
               /*获取城市id*/
               
               /*更新父节点的城市列表*/
               this.$emit('update:citys', res.child);
               /*更新父节点的城市列表*/
               
               if(res.child[0].child && res.child[0].child.length != 0 ){ //判断地区列表是否存在
               
                  /*获取地区id*/
                  this.districtInfo = res.child[0].child[0];
                  /*获取地区id*/
                  
                   /*更新父节点的地区列表*/
                  this.$emit('update:districts', res.child[0].child);
                  /*更新父节点的地区列表*/
                  
               }else{
                 this.$emit('update:districts',[]);
                 this.districtInfo = {};
               }
            }else{
               this.$emit('update:citys',[]);
               this.$emit('update:districts',[]);
               this.cityInfo = this.districtInfo = {};
            }
          }
        })
      },
      /*选择省份*/
      
      /*选择城市*/
      chanageCity(obj){
        this.citys.filter((res) => {
          if(res.value === obj.value){
            /*获取城市id*/
            this.cityInfo = res;
            /*获取城市id*/
            
            /*切换城市,需要将区县的高亮隐藏*/
            this.cityId = res.value;
            this.districtsId = -1;
            /*切换城市,需要将区县的高亮隐藏*/
            
            if(res.child && res.child.length != 0){ //判断地区列表是否存在
              /*获取地区id*/
              this.districtInfo = res.child[0];
              /*获取地区id*/
              this.$emit('update:districts', res.child);
            }else{
              this.$emit('update:districts', []);
               this.districtInfo = {};
            }
          }
        })
      },
      /*选择城市*/ 
      
      /*选择地区*/
      chanageDstrict(obj){
         this.districts.filter(res => {
            if(res.value === obj.value){
              this.districtInfo = res;
              this.districtsId = res.value;
            }
         })
      },
      /*选择地区*/
      
      /*取消按钮*/
      cancel(){
        this.$emit('update:show',false);
      },
      /*取消按钮*/
      
      /*确认按钮*/
      confirm(){
        this.$emit('update:show',false);
        let pvInfo = this.provinceInfo,ctInfo = this.cityInfo,dsInfo = this.districtInfo,concatText='';
        
        /*当用户选择后才返回选择的地址信息*/
        if(pvInfo){ 
           if(dsInfo.label){
             concatText = pvInfo.label + '-' + ctInfo.label + '-' + dsInfo.label;
           }else if(!dsInfo.label && ctInfo.label){
             concatText = pvInfo.label + '-' + ctInfo.label;
           }else if(!ctInfo.label && pvInfo.label){
              concatText = pvInfo.label;
           }
           
           let callbackInfo = {
             provinceId:pvInfo.value,
             cityId:ctInfo.value,
             districtId:dsInfo.value,
             text:concatText
           }
           this.$emit('confirmBtn',callbackInfo);
        }
        /*当用户选择后才返回选择的地址信息*/
      }
      /*确认按钮*/
    },
    components:{
      uniPopup
    }
	}
</script>

<style lang="scss" scoped>
  
  .content{
    	position: fixed;
    	top: 0;
    	top: 0;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	z-index: 99999;
    	overflow: hidden;
      background: rgba(0, 0, 0, .4);
  }
  
  /*三级联动框样式*/
  .maskContent{
    position: fixed;
    left:0;
    right:0;
    bottom:0;
    background:#FFFFFF;
    border-radius:16rpx 16rpx 0 0;
    animation-duration: .5s;
    animation-fill-mode:linear;
    .maskHead{
      padding:16rpx 20rpx 10rpx;
      border-bottom:1rpx solid #F4F4F4;
      justify-content:space-between;
    }
  }
  .confirmBtn{
    font-size:32rpx;
    color:#09BB07;
  }
  .cancelBtn{
    font-size:32rpx;
    color:#999999;
  }
  .regionlist{
    box-sizing:border-box;
    width:33%;
    height:500rpx;
    text-align:center;
    padding:20rpx 0;
    .rgItem{
     font-size:30rpx; 
     height:60rpx;
     line-height:60rpx;
     overflow:hidden;
    }
  }

  /*三级联动框样式*/
  .active{
    color:red;
  }
</style>
