<template>
  <view>
    <view class="searchBox">
      <view class="uni-inline-item searchContent">
        <text class="iconfont iconsearch"></text>
        <input class="uni-flex-item" type="text" v-model="reConfig.keyword" placeholder="请输入关键字名称搜索" placeholder-class="placeHolder"  @confirm="searchWord"/>
      </view>
    </view>
    <view class="clickBox uni-inline-item">
      <view class="clickItem">
        <view class="clickImg" @click="navNearby">
          <image src="/static/icon/2019slyw_35.png"></image>
        </view>
        <text>附近门店</text>
      </view>
      <navigator class="clickItem" hover-class="none" url="/pages/store/salesman/salesman" >
        <view class="clickImg">
          <image src="/static/icon/2019slyw_36.png"></image>
        </view>
        <text>业务员推荐</text>
      </navigator>
    </view>
    <view class="splitBox"></view>
    <view class="listBox">
      <view class="listItem" v-for="(item,index) in medicList" :key="index">
        <view class="listInfo">
          <view class="uni-inline-item list_head">
            <view class="itemLogo">
              <image :src="item.logo"></image>
            </view>
            <text class="listName uni-ellipsis">{{item.store_name}}</text>
          </view>
          <!-- <view class="auditorTitle uni-ellipsis">该商家已通过支付宝官方审核</view> -->
          <view class="uni-inline-item list_row">
            <view class="iconfont iconshijian1"></view>
            <text class="uni-ellipsis">{{item.add_time}}</text>
          </view>
          <view class="uni-inline-item list_row">
            <view class="iconfont iconyiliaohangyedeICON-"></view>
            <text class="uni-flex-item uni-ellipsis">{{item.address}}</text>
          </view>
        </view>
        <view class="listButton">
          <button type="primary"  class="medicBtn" @click="navMedic(item)">我要铺货</button>
        </view>
      </view>
      <uni-load-more v-if="!isEmpty && medicList.length > 0" :status="status" :content-text="contentText" />
    </view>
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
      <text>空空如也</text>
    </view>
  </view>
</template>

<script>
  import amap from '@/common/amap-wx.js';
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      uniLoadMore
    },
    data() {
      return {
        isEmpty:false,
        isLoadEnd:false,
        status: 'more',
        contentText: {
          contentdown: '查看更多',
          contentrefresh: '加载中...',
          contentnomore: '没有更多数据了'
        },
         reConfig:{ //请求配置
           page:0,
           page_num:10,
           keyword:''
         },
         nearbyData:{
           lon_lat:'',//经纬度
           cityName:''//城市名称
         },
         medicList:[] //铺货列表
      };
    },
    onLoad() {
      this.setNavButton();
      this.fetchlist();
    },
    methods: {
      setNavButton() { //动态设置导航栏button
        // #ifdef APP-PLUS
        let amapPlugin = new amap.AMapWX({
          key: '4c90b941dca75e686d95a4f05aea48c2'
        });
        amapPlugin.getRegeo({
          success: (data) => {
            let {longitude,latitude,regeocodeData} = data[0]; //获取经纬度、当前地址信息
            let {city} = regeocodeData.addressComponent; //获取当前地址的城市
            this.nearbyData = {
              "lon_lat":longitude+','+latitude,
               cityName:city
            }
            var webView = this.$mp.page.$getAppWebview();
            webView.setTitleNViewButtonStyle(1, { //动态改变导航栏button
              text: city,
            });
          }
        });
        // #endif
      },
      fetchlist(){ //获取铺货列表
        uni.showLoading({
          mask:true,
          title:'加载中...'
        })
        this.$Request.post(this.$api.medic.list,this.reConfig).then(res => {
          setTimeout(()=>{
            uni.hideLoading();
          },500)
          if(res.code === 200){
            if(!res.data || res.data.length === 0) return this.isEmpty = true;
            if(this.reConfig.page_num > res.data.length){
              this.isLoad = true;
              this.status = "noMore";
            }
            this.medicList = res.data;
          }else{
            uni.showToast({
              icon:'none',
              title:res.msg
            })
          }
        })
      },
      searchWord(){ //关键字搜索
        /*初始化值*/
        this.reConfig.page = 0;
        this.isEmpty = false;
        this.isLoad = false;
        this.status = 'more';
        /*初始化值*/
       this.$Request.post(this.$api.medic.list,this.reConfig).then(res => {
         setTimeout(()=>{
           uni.stopPullDownRefresh();
         },500)
         if(res.code === 200){
           if(!res.data || res.data.length === 0) return this.isEmpty = true;
           if(this.reConfig.page_num > res.data.length){
             this.isLoad = true;
             this.status = "noMore";
           }
           this.medicList = res.data;
         }else{
           uni.showToast({
             icon:'none',
             title:res.msg
           })
         }
       })
      },
      navNearby(){ //导航附近门店
        uni.navigateTo({
          url:'/pages/store/nearbyStore/nearbyStore?data='+JSON.stringify(this.nearbyData)
        })
      },
      navMedic(obj){ //我要铺货
        uni.navigateTo({
          url:'/pages/store/protocol/protocol?data='+JSON.stringify(obj)
        })
      }
    },
    onReachBottom() { //页面触底事件
      if (this.isLoadEnd) return;
      this.status = 'loading';
      this.reConfig.page++;
      this.$Request.post(this.$api.medic.list,this.reConfig).then(res => {
        if (res.code === 200) {
          this.medicList = this.medicList.concat(res.data);
          if (this.reConfig.page_num > res.data.length) {
            this.isLoadEnd = true;
            this.status = 'noMore';
          } else {
            this.status = 'more';
          }
        } else {
          uni.showToast({
            title: res.msg,
            duration: 2000,
            icon: 'none'
          })
        }
      })
    },
    onPullDownRefresh() {
      this.searchWord();
    }
  }
</script>

<style lang="scss" scoped>
  .iconshijian1,.iconyiliaohangyedeICON-{
    font-size:40rpx;
    line-height: 40rpx;
  }
  .searchBox {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index:5;
    box-sizing: border-box;
    height: 100rpx;
    padding: 15rpx 20rpx;
    background: #EFEFEF;
    .searchContent {
      height: 100%;
      padding: 0 30rpx;
      background: #D6D8D7;
      border-radius: 30rpx;
    }
  }

  .clickBox {
    position: fixed;
    left: 0;
    right: 0;
    top: 100rpx;
    z-index:5;
    height:180rpx;
    background: #FFFFFF;
    justify-content: space-around;
    .clickItem{
     align-self:stretch;
     display:flex;
     flex-direction:column;
     align-items:center;
     justify-content:center;
     .clickImg{
       width:90rpx;
       height:90rpx;
     }
     text{
       font-size:30rpx;
       padding-top:10rpx;
     }
    }
  }
  .splitBox{
    width:100%;
    height:280rpx;
  }
  
  .listBox{
    box-sizing:border-box;
    padding:30rpx 30rpx 0;
    .listInfo{
      box-sizing:border-box;
      padding:20rpx 30rpx;
    }
    .list_head{
      margin-bottom:16rpx;
    }
    .listItem{
      background:#FFFFFF;
      border-radius:20rpx;
      margin-bottom:20rpx;
      .itemLogo{
        width:110rpx;
        height:110rpx;
        border-radius:50%;
        overflow:hidden;
        image{
          border-radius:50%;
        }
      }
      .auditorTitle{
        display:inline-block;
        margin:20rpx 0;
        padding: 10rpx 20rpx;
        background:#DEE8F2;
        color:#80C2EA;
        font-size:30rpx;
        border-radius:10rpx;
      }
      
      .listName{
        flex:1;
        font-size:32rpx;
       }
       
      .list_row{
       margin-bottom:16rpx;
       font-size:30rpx;
       color:#999999;
      } 
      
      .listButton{
        padding:20rpx 30rpx;
        border-top:1px solid #F1F1F1;
      }
    }
  }
  
  .emptyBox {
    position:fixed;
    left:50%;
    top:50%;
    width: 400rpx;
    height: 400rpx;
    transform: translate(-50%,-50%);
    text-align: center;
    font-size: 32rpx;
    color: #FA5951;
  }

  /*#ifdef H5 */
  .searchBox {
    position: fixed;
    left: 0;
    top: 0;
    top: 88rpx;
    right: 0;
    box-sizing: border-box;
    height: 100rpx;
    padding: 20rpx;
    background: #EFEFEF;

    .searchContent {
      height: 100%;
      padding: 0 20rpx;
      background: #D6D8D7;
      border-radius: 30rpx;
    }
  }
  .clickBox {
    position: fixed;
    left: 0;
    right: 0;
    top: 188rpx;
    background: #FFFFFF;
    justify-content: space-around;
    height:180rpx;
  }
  /*#endif*/
  
  /deep/.placeHolder{
    font-size:32rpx;
  }
  .iconsearch{
    font-size:40rpx; 
  }
  
  .medicBtn{
    height:80rpx;
    line-height:80rpx;
    background:#DF5000;
  }
</style>
