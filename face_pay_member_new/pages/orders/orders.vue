<template>
  <view>
    <view class="tabBox">
      <uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
        @clickItem="onClickItem" />
    </view>
    <view class="splitBox"></view>
    <view>
      <view class="uni-inline-item orderItem" v-for="(item,index) in orderList" :key="index" @click="watchDetail(item.order_id)">
        <view class="leftImg">
          <image :src="item.img" mode="widthFix"></image>
        </view>
        <view class="rightInfo">
          <view class="uni-ellipsis">{{item.goods_name}}</view>
          <view class="">数量：{{item.goods_num}}</view>
          <view class="">金额：{{item.order_pv}}</view>
        </view>
      </view>
    </view>  
    <uni-load-more v-if="!isEmpty && orderList.length > 0" :status="status" :content-text="contentText" />
      <view class="emptyBox" v-if="isEmpty">
        <image src="/static/icon/a024laner_116.png" mode="widthFix"></image>
        <text>空空如也</text>
    </view>
  </view>
</template>

<script>
  import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    components: {
      uniSegmentedControl,
      uniLoadMore
    },
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
        items: ['待支付', '已支付'],
        styles: [{
            value: 'button',
            text: '按钮',
            checked: true
          },
          {
            value: 'text',
            text: '文字'
          }
        ],
        current: 0,
        activeColor: '#dd524d',
        styleType: 'button',
        height: 0,
        reConfig: {
          page: 0,
          page_num: 10,
          status: 1
        },
        orderList:[] //订单列表
      };
    },
    onLoad() {
      this.fetchList();
    },
    methods: {
      fetchList() { //获取订单列表
        uni.showLoading({
          mask:true,
          title:'加载中...'
        })
        this.$Request.post(this.$api.order.list, this.reConfig).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if (res.code === 200) {
            if(!res.data || res.data.length === 0){
              this.isEmpty = true;
              this.orderList = [];
              return false;
            }
            if(res.data.length < this.reConfig.page_num){
              this.isloadEnd = true;
              this.status = 'noMore';
            }
             this.orderList = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      onClickItem(index){ //点击切换导航
        if (this.current !== index) {
        	this.current = index;
          this.reConfig.page = 0;
          this.status = 'more';
          this.isloadEnd = false;
          this.isEmpty = false;
          uni.pageScrollTo({
            scrollTop:0,
            duration:500
          })
          switch (index){
            case 0:
              this.reConfig.status = 1;
              this.fetchList();
              break;
            case 1:
              this.reConfig.status = 9;
              this.fetchList();
              break;  
          }
        }
      },
      loadMore(){ //加载更多
        if(this.isloadEnd) return false;
        this.reConfig.page++;
        this.status = "loading";
        this.$Request.post(this.$api.order.list, this.reConfig).then(res => {
          if (res.code === 200) {
            if(res.data.length < this.reConfig.page_num){
              this.isloadEnd = true;
              this.status = 'noMore';
            }else{
              this.status = 'more';
            }
             this.orderList = this.orderList.concat(res.data);
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      watchDetail(val){ //查看详情
        uni.navigateTo({
          url:'/pages/orders/orderDetails/orderDetails?orderId='+val
        })
      }
    },
    onReachBottom() {
      this.loadMore();
    }
  }
</script>

<style lang="scss" scoped>
 .tabBox{
    position: fixed;
    left:0;
    top:0;
    right:0;
    box-sizing:border-box;
    height:100rpx;
    padding:10rpx 20rpx;
    background: #FFFFFF;
  } 

  /deep/ .segmented-control{
    box-sizing:border-box;
    width:100% ;
  }
  
  .splitBox{
    height:100rpx;
  }
  
  .orderItem{
    box-sizing:border-box;
    height:180rpx;
    padding:10rpx 20rpx;
    border-bottom:1px solid #F3F3F3;
  }
  
  .leftImg{
    width:160rpx;
    height:100%;
    margin-right:20rpx;
    overflow:hidden;
  }
  
  .rightInfo{
    flex:1;
    align-self:stretch;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  
  .emptyBox{
    position:fixed;
    left:50%;
    top:50%;
    width:90%;
    height:auto;
    transform:translate(-50%,-50%);
    text-align:center;
    font-size:32rpx;
    color:#999999;
  }
  
  
  /deep/.segmented-control-item{
    line-height:76rpx;
  }
  
</style>
