<template>
	<view class="content">
		<view class="listItem uni-inline-item" v-for="(item,index) in borkerageList" :key="index">
		  <text style="flex:1" v-if="item.from_type === 1">支付宝</text>
		  <text style="flex:1" v-else-if="item.from_type === 2">微信</text>
		  <text style="flex:1;text-align:center;">¥ {{item.money}}</text>
		  <text class="itmeTime">{{item.add_time}}</text>
		</view>
    <uni-load-more v-if="!isEmpty && borkerageList.length > 0" :status="status" :content-text="contentText" />
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
      <text>无佣金记录</text>
    </view>
	</view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
        isLoadEnd:false,
        isEmpty:false,
        status: 'more',
        contentText: {
          contentdown: '查看更多',
          contentrefresh: '加载中...',
          contentnomore: '没有更多数据了'
        },
				reConfig:{
				  page:0,
				  page_num:10
				},
				borkerageList:[] //佣金
			};
		},
    onLoad() {
      this.fetchBrokerageDetail();
    },
    methods:{
      fetchBrokerageDetail(){
        uni.showLoading({mask:true,title:'加载中...'});
        this.$Request.post(this.$api.me.brokerage,this.reConfig).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if(res.code === 200){
            let {list} =  res.data;
            if(!list || list.length === 0) return this.isEmpty = true; //非空判断
            if(list.length < this.reConfig.page_num){
              this.isLoadEnd = true;
              this.status = 'noMore';
            }else{
              this.status = 'more';
            }
            this.borkerageList = list;
          }else{
            uni.showToast({
              title:res.msg,
              duration:2000,
              icon:'none'
            })
          }
        })
      }
    },
    onReachBottom() {
      if(this.isLoadEnd) return;
      this.status = 'loading';
      this.reConfig.page++;
      this.$Request.post(this.$api.me.brokerage,this.reConfig).then(res => {
        if (res.code === 200) { 
           let {list} =  res.data;
           this.borkerageList = this.borkerageList.concat(list);
           if(this.reConfig.page_num > list.length){
             this.isLoadEnd = true;
             this.status = "noMore";
           }else{
             this.status = "more";
           }
        } else {
          uni.showToast({
            title: res.msg,
            duration: 2000,
            icon:'none'
          })
        }
      })
    },
    components:{
      uniLoadMore
    }
	}
</script>

<style lang="scss" scoped>
  .content{
    box-sizing:border-box;
    padding:20rpx 30rpx 0;
  }
  
  .listItem{
    justify-content:space-between;
    padding:20rpx 0 20rpx 20rpx;
    color:#888888;
    border-bottom:1px solid #F4F4F4;
    font-size:32rpx;
    .itmeTime{
      flex:1;
      width:100rpx;
      font-size:30rpx;
      text-align:right;
    }
  }

  .emptyBox{
    position:fixed;
    left:50%;
    top:50%;
    width:400rpx;
    height:400rpx;
    transform:translate(-50%,-50%);
    text-align:center;
    font-size:32rpx;
    color:#999999;
  }
  
</style>
