<template>
  <view class="content">
    <view class="listItem uni-inline-item" v-for="(item,index) in cashierList " :key="index">
      <view class="">
        <view class="itemText">姓名：{{item.store_name}}</view>
        <view class="itemText" style="color:#999999">账号：{{item.account}}</view>
      </view>
    </view>
    <uni-load-more v-if="!isEmpty && cashierList.length > 0" :status="status" :content-text="contentText" />
    <view class="emptybg" v-if="isEmpty">
      <image src="/static/holder/a024laner_105.png"></image>
      <view class="">暂无收银员</view>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    data() {
      return {
        isloadEnd: false,
        isEmpty: false,
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
        cashierList:[]//收银员列表
      };
    },
    onLoad() {
       this.fetchCashiers();
    },
    methods: {
      fetchCashiers() {
        uni.showLoading({mask:true,title:'加载中...'})
        this.$Request.post(this.$api.me.cashierList, this.reConfig).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if (res.code === 200) {
            if(!res.data || res.data.length === 0) return this.isEmpty = true;
            if (this.reConfig.page_num > res.data.length) {
              this.isLoadEnd = true;
              this.status = 'noMore';
            }
            this.cashierList = res.data;
          } else {
            uni.showToast({
              title: res.msg,
              duration: 2000,
              icon:'none'
            })
          }
        })
      }
    },
    onReachBottom() { //页面触底事件
      if(this.isLoadEnd) return;
      this.reConfig.page++;
      this.status = 'loading'
      this.$Request.post(this.$api.me.cashierList, this.reConfig).then(res => {
           if(res.code === 200){
             if(this.reConfig.page_num > res.data.length){
               this.isLoadEnd = true;
               this.status = 'noMore';
             }else{
               this.status = 'more';
             }
             this.cashierList = this.cashierList.concat(res.data);
           }else{
             uni.showToast({
               title:res.msg,
               duration:2000,
               icon:'none'
             })
           }
         })
      },
    onNavigationBarButtonTap(e) { //监听导航栏按钮
      uni.redirectTo({
        url: "/pages/me/addCashier/addCashier"
      })
    },
    components: {
      uniLoadMore
    }
  }
</script>

<style lang="scss" scoped>
  .content{
    width:100%;
    min-height:100%;
  }
  .listItem {
    padding: 30rpx;
    justify-content: space-between;
    border-bottom: 1px solid #F4F4F4;
  }

  .itemPwd {
    background: #FA5951;
    padding: 20rpx;
    border-radius: 10rpx;
    color: #FFFFFF;
  }

  .itemText {
    font-size: 30rpx;
  }

  .emptybg {
    position:fixed;
    left:50%;
    top:50%;
    width: 400rpx;
    height: 400rpx;
    text-align: center;
    transform: translate(-50%,-50%);
    color: #999999;
  }
</style>
