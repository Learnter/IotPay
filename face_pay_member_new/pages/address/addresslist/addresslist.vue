<template>
	<view class="confimTopContHe">
		<view >
			<radio-group name="radio" @change="radioChange">
				<view class="confimTopCont uni-inline-item" v-for="(aItem,aIndex) in addressList" :key="aIndex">
					<view class="shopxze">
						   <radio :value="aItem.address_id.toString()" :checked="aItem.default === 1 ? true : false"/>
					</view>
					<view class="toponameanddhBox">
						<view class="toponameanddh">
							<view class="toponame">{{aItem.username}}</view>
							<view class="topodh">{{aItem.mobile}}</view>
						</view>
						<view class="topoweizhBox uni-ellipsis">{{aItem.address}}</view>
					</view>
					<view class="locatiright">
						<view @click="delAddress(aItem,aIndex)"><uni-icon class="i" type="trash" color="#666666" size="20"></uni-icon></view>
						<navigator class="locationaa" :url="'/pages/address/editAddress/editAddress?parentId='+aItem.address_id">编辑</navigator>
					</view>
				</view>
			</radio-group>
      <view class="stayBox" v-if="isEmpty">
      	<image src="/static/icon/2019slzf_23.png"></image>
      	<view>暂无地址</view>
      </view>
		</view>
		<view class="tjialocatAn" @click="tjialocatAn">新增地址</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	export default {
		components: {
			uniIcon
		},
    data(){
      return{
        isEmpty:false,
        stopPull:false,
        addressList:[]
      }
    },
    onShow(){
      this.fetchAdrList();
    },
		methods: {
      fetchAdrList(){ //获取地址列表
        uni.showLoading({
          mask:true,
          title:'加载中...'
        })
        this.$Request.post(this.$api.address.list).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if(res.code === 200){
            if(!res.data || res.data.length === 0) return this.isEmpty = true;
            this.addressList =  res.data;
            res.data.forEach((item)=>{
              if(item.default == 1){
                this.$SysCache.put('defAddress',item);
              }
            })
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      radioChange(e){ //更改默认地址
        let {value} = e.detail;
        this.$Request.post(this.$api.address.setDefault,{address_id:value}).then(res => {
          if(res.code === 200){
            uni.showToast({
              icon:'success',
              title:'设置默认地址',
            })
          this.addressList.forEach((item)=>{
             if(item.address_id == value){
               this.$SysCache.put('defAddress',item);
             }
           })
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      delAddress(obj,index){ //删除地址
        uni.showModal({
          title:'温馨提示',
          content:'您确定要删除此地址吗?',
          confirmText:'确定',
          cancelText:'取消',
          success:(res)=>{
            if(res.confirm){
                this.$Request.post(this.$api.address.remove,{address_id:obj.address_id}).then(res => {
                 if(res.code === 200){
                   uni.showToast({
                     icon:'success',
                     title:'删除成功'
                   })
                   this.addressList.splice(index,1);
                 }else{
                   uni.showToast({
                     icon:'none',
                     title:res.msg
                   })
                 }
               })
            }
          }
        })  
      },
			tjialocatAn(){ //添加地址
				uni.redirectTo({
					url:'/pages/address/address'
				})
			}
		}
	}
	
</script>

<style lang="scss" scoped>
  .confimTopContHe {
    box-sizing:border-box;
    width:100%;
    height:100%;
  	padding-bottom:100rpx;
  }
  .tjialocatAn {
  	position: fixed;
  	left:0rpx;
  	bottom:0rpx;
  	width: 100%;
  	height:92rpx;
  	line-height: 92rpx;
  	text-align: center;
  	background:#FA5951;
  	color:#ffffff;
  	z-index: 100;
    font-size:32rpx;
  }
  .confimTopCont {
    box-sizing:border-box;
    height:160rpx;
  	padding:20rpx;
  	display: flex;
    align-items:center;
  	border-bottom:1px solid #eeeeee;
  }
  .toponameanddhBox {
  	flex: 1;
    overflow:hidden;
  }
  .toponameanddh {
  	margin-bottom:5rpx;
  	display: flex;
  }
  .toponame {
  	color:#333333;
  	font-weight: 500;
  	font-size:32rpx;
  	padding-right:20rpx;
  }
  .topodh {
  	color:#333333;
  	font-weight: 500;
  	font-size:32rpx;
  }
  .topoweizhBox {
  	color:#666666;
  }
  .topoweizhBox .text_1 {
  	display: inline-block;
  	height:42rpx;
  	line-height: 42rpx;
  	color:#158DFF;
  	border:1px solid #158DFF;
  	border-radius: 6rpx;
  	font-size:24rpx;
  	padding:0rpx 10rpx;
  	margin-right:10rpx;
  }
  .locatiright {
  	text-align: right;
  }
  .locationaa {
  	margin-left:20rpx;
  	padding-top:10rpx;
  	color:#158DFF;
  }
  .shopxze {
  	margin-right:20rpx;
  }
  
  .stayBox{
    position:fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    width:400rpx;
    height:400rpx;
    text-align:center;
    color:#999999;
    font-size:32rpx;
  }

</style>