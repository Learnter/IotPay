<template>
  <view>
    <view class="headerBox">
      <view class="uni-inline-item positionBox">
        <navigator hover-class="none" url="/pages/chooseCity/chooseCity" class="uni-inline-item  leftBox" >
          <view class="city_name">{{currentCity}}</view>
          <view class="iconfont iconyiliaohangyedeICON-"></view>
        </navigator>
        <view class="uni-inline-item uni-flex-item">
          <text class="iconfont iconsearch"></text>
          <input class="input-row" type="text"  v-model="reConfig.keywords"  placeholder="请输入关键字快速查找" placeholder-class="placeHold" @confirm="searchKeyWord" />
        </view>
      </view>
      <view class="selectBox uni-inline-item">
        <view class="selectItem uni-inline-item" @click="showMask(1)">
          <view class="selectText">{{typeText}}</view>
          <view class="iconfont iconxialacaidanjiantou"></view>
        </view>
        <view class="selectItem uni-inline-item"  @click="showMask(2)">
          <view class="selectText">{{sortText}}</view>
          <view class="iconfont iconxialacaidanjiantou"></view>
        </view>
      </view>
    </view>
   <view class="splitBox"></view>
   <view class="listBox">
      <view class="listItem" v-for="(item,index) in nearbyList" :key="index" @click="navNearby(item)">
        <view class="item_name">{{item.name}}</view>
        <block>
          <view v-if="item.biz_ext.rating == false" class="item_row">暂无评分</view>
          <view v-else class="item_row">评分：{{item.biz_ext.rating}}</view>
        </block>
        <view class="item_row uni-ellipsis">类型：{{item.type}}</view>
        <view class="uni-inline-item uni-flex-between">
          <block>
            <view v-if="item.biz_ext.cost == false" class="item_row">自费</view>
            <view v-else class="item_row">人均：¥ {{item.biz_ext.cost}}</view>
          </block>
          <view class="uni-inline-item">
            <view class="iconfont icondingwei1"></view>
            <view class="item_row">{{item.distance}}m</view>
          </view>
        </view>
      </view>
    </view>
    <uni-load-more v-if="!isEmpty && nearbyList.length > 0" :status="status" :content-text="contentText" />
    <view class="emptyBox" v-if="isEmpty">
      <image src="/static/icon/2019slzf_23.png"></image>
      <text>空空如也</text>
    </view>
    <view class="maskBox" @touchmove.stop.prevent="preventSroll" v-if="mask=== 1 || mask === 2">
      <view class="typesBox" v-if="mask === 1">
          <view class="typeItem"   v-for="(item,index) in typelist" :key="index" @click="chooseType(item)">
            <view class="type_item_but" :class="reConfig.types == item.type ?'activeBtn':''">
               {{item.name}}
            </view>
          </view>
        </view>
        <view class="sortBox" v-if="mask === 2">
           <view class="sortItem"  v-for="(item,index) in sortList" :key="index" @click="chooseSort(item)">
             <view class="sort_item_but" :class="reConfig.sortrule == item.type ?'activeBtn':''">
                {{item.name}}
             </view>
           </view>
         </view>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
  export default {
    components: {
      uniLoadMore
    },
    data() {
      return {
        currentCity:'',//当前城市
        typeText:'餐厅',
        sortText:'综合排序',
        mask:false,
        isEmpty: false,
        isLoadEnd: false,
        status: 'more',
        contentText: {
          contentdown: '查看更多',
          contentrefresh: '加载中...',
          contentnomore: '没有更多数据了'
        },
        reConfig: {
          key: '3f435a2829c9186720862e6535b7d890', //高德web服务 key值
          location: '', //经纬度
          sortrule: 'weight', //排序方式
          keywords: '', //关键字
          types: '050000',
          city: '', //城市
          offset: 10, //每次获取的数量
          page: 1 //第几页
        },
        typelist: [{ //类型列表
          name: '餐厅',
          type: '050000'
        }, {
          name: '酒店',
          type: '100000'
        }, {
          name: '景点',
          type: '110000'
        }, {
          name: '医院',
          type: '090000'
        }, {
          name: '超市',
          type: '060000'
        }, {
          name: '其它',
          type: ''
        }, ],
        sortList: [{ //排序列表
          name: "综合排序",
          type: 'weight'
        }, {
          name: "距离排序",
          type: 'distance'
        }], 
        nearbyList: [] //附近商家
      };
    },
    onLoad(e) {
      if (!e.data) return false;
      this.fetchParentData(e);
    },
    onShow() { //每次进入此页面
     this.fetchChildCity();
    },
    methods: {
      fetchParentData(e) { //获取父级页面传递的参数
        let {lon_lat,cityName} = JSON.parse(e.data);
        this.currentCity = cityName;
        this.reConfig.location = lon_lat;
        this.fetchNearbyInfo();
      },
      fetchChildCity(){ //获取子页面选择的城市信息
        let chooseCityName = this.$SysCache.get('choose_city');
        if(!chooseCityName) return false;
        this.currentCity = chooseCityName;
        this.initialData();
        this.reConfig.city = chooseCityName;
        this.fetchNearbyInfo();
      },
      fetchNearbyInfo() { //获取周边信息
        uni.showLoading({
          mask: true,
          title: '加载中...'
        })
        this.$Request.customGet(this.reConfig).then(res => {
          setTimeout(function() {
            uni.hideLoading();
          }, 500);
          let {pois} = res;
          if (!pois || pois.length === 0) return this.isEmpty = true;
          if (this.reConfig.offset > pois.length) {
            this.isLoadEnd = true;
            this.status = "noMore";
          }
          this.nearbyList = pois;
        })
      },
      navNearby(obj){ //导航到相关地址
        let {location,name,address} = obj;
        let array = location.split(",");
         uni.openLocation({
            latitude:parseFloat(array[1]),
            longitude:parseFloat(array[0]),
            name:name,
            address:address
        });
      },
      searchKeyWord(){ //关键字搜索
         this.initialData();
         this.fetchNearbyInfo();
      },
      chooseType(obj){ //选择类型
       if(this.reConfig.types == obj.type)return false;
        this.reConfig.types = obj.type;
        this.typeText = obj.name;
        this.initialData();
        this.fetchNearbyInfo();
      },
      chooseSort(obj){ //选择排序方式
        if(this.reConfig.sortrule == obj.type)return false;
        this.reConfig.sortrule = obj.type;
        this.sortText = obj.name;
        this.initialData();
        this.fetchNearbyInfo();
      },
      initialData(){ //初始化请求配置公共方法
        this.mask = false;
        this.isEmpty = false;
        this.isLoadEnd = false;
        this.status = "loading";
        this.reConfig.page = 1;
      },
      preventSroll(){ //阻止蒙层下面页面滚动
        return false;
      },
      showMask(val){ //显示、关闭蒙层
        this.mask === val ? this.mask = false : this.mask = val;
      }
    },
    onReachBottom() { //页面触底事件
      if (this.isLoadEnd) return;
      this.status = 'loading';
      this.reConfig.page++;
      this.$Request.customGet(this.reConfig).then(res => {
        let {pois} = res;
        this.nearbyList = this.nearbyList.concat(pois);
        if (this.reConfig.offset > pois.length) {
          this.isLoadEnd = true;
          this.status = 'noMore';
        } else {
          this.status = 'more';
        }
      })
    },
    onUnload() { //页面销毁时移除选择城市缓存
      this.$SysCache.remove('choose_city');
    }
  }
</script>

<style lang="scss" scoped>
  .iconxialacaidanjiantou{
    font-size: 46rpx;
    margin-left:10rpx;
  }
  
  .iconyiliaohangyedeICON-{
    font-size:44rpx;
    color:green;
    margin-left:10rpx;
  }
  
  .icondingwei1{
    font-size:40rpx;
    margin-right:10rpx;
  }
  
  .selectText{
    font-size:32rpx;
  }

  .headerBox{
    position:fixed;
    left:0;
    top:0;
    right:0;
    z-index:10;
    height:240rpx;
    background:#FAFAFA;
  }

  .positionBox {
    height:100rpx;
    padding:0 30rpx;
    background: #FFFFFF;
    margin-bottom: 20rpx;
    .leftBox {
      margin-right: 30rpx;
    }
    .city_name{
      font-size:32rpx;
    }
    .input-row {
      flex: 1;
      padding: 6rpx 0;
      border-bottom: 1px solid #E0E0E0;
    }
  }

  .selectBox {
    height: 120rpx;
    background: #FFFFFF;
    justify-content: space-around;
  }

  .listBox {
    padding: 0 30rpx;
    .listItem {
      padding: 30rpx 20rpx 10rpx 0;
      border-bottom: 1px solid #D3D3D3;
      .item_name {
        font-size: 34rpx;
      }
      .item_row {
        font-size: 30rpx;
        color: #999999;
      }
    }
  }
  .typesBox{
    position: fixed;
    left:0;
    top:240rpx;
    right:0;
    z-index:10;
    background:#FFFFFF;
    padding:20rpx 20rpx 0;
    display:flex;
    flex-wrap:wrap;
    .typeItem{
      width:33.33%;
      margin-bottom:20rpx;
      .type_item_but{
        margin:0 auto;
        width:120rpx;
        height:50rpx;
        line-height:50rpx;
        border:1px solid #000000;
        border-radius:16rpx;
        text-align:center;
      }
    }
  }
  
  .sortBox{
    position: fixed;
    left:0;
    top:240rpx;
    right:0;
    z-index:10;
    background:#FFFFFF;
    padding:30rpx;
    display:flex;
    .sortItem{
      width:50%;
      .sort_item_but{
        margin:0 auto;
        width:160rpx;
        height:50rpx;
        line-height:50rpx;
        border:1px solid #000000;
        border-radius:16rpx;
        text-align:center;
      }
    }
  }
  .splitBox{
    width:100%;
    height:240rpx;
  }
  
  .maskBox{
    position: fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index:5;
    background:rgba(0,0,0,0.5);
  }
  
  .activeBtn{
    color:#FA5951;
    border:1px solid #F0AD4E !important;
  }
  
  /deep/.placeHold{
    font-size:32rpx;
  }
  
  .iconsearch{
    font-size:40rpx;
    color:#888888;
  }
</style>
