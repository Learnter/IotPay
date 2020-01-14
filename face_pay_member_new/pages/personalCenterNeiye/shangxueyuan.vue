<template>
  <view style="font-size:26.25rpx">
    <view class="oj"  @click="navigateTo(noticeInfo.id)">
      <view class="oj_t">
        <text style="color: rgb(51, 51, 51);">{{noticeInfo.title}}</text>
      </view>
      <view class="oj_bt">{{noticeInfo.description}}</view>
      <view>
        <img :src="noticeInfo.thumb" class="j_img" />
      </view>
    </view>
    <view class="nav">
      <text @click="clickNav(item.id,index)" :class="active == index ?'active':''" v-for="(item,index) in categoryList"
        :key="index">{{item.cate_name}}</text>
    </view>
    <view class="content">
      <view class="li" @click="navigateTo(item.id)" v-for="(item,index) in newsList" :key="index">
        <view class="cen_index_ul_li_a">
          <view class="cen_index_ul_li_left">
            <img :src="item.thumb" />
          </view>
          <view class="cen_index_ul_li_right">
            <p class="cen_ul_tit">
              {{item.title}}
            </p>
            <p class="cen_ul_text">
              {{item.description}}
            </p>
            <p class="cen_ul_text cen_ul_text_sm">
              {{item.create_time}}
            </p>
          </view>
        </view>
      </view>
    </view>
    <uni-load-more v-if="!isEmpty && newsList.length > 0" :status="status" :content-text="contentText" />
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
        active: 0,
        isloadEnd: false,
        isEmpty: false,
        status: 'more',
        contentText: {
          contentdown: '查看更多',
          contentrefresh: '加载中...',
          contentnomore: '没有更多数据了'
        },
        noticeInfo: null, //公告信息
        categoryList: [], //公告分类
        reConfig: {
          page: 0,
          page_num: 5,
          id: ''
        },
        newsList: [] //公告列表
      }
    },
    onLoad() {
      this.fetchNewCategory();
    },
    methods: {
      fetchNewCategory() { //公告分类
        new Promise((resolve, reject) => {
          this.$Request.post(this.$api.business.newCategory).then(res => {
            if (res.code === 200) {
              this.categoryList = res.data.slice(1);
              resolve(res.data[0]);
              this.reConfig.id = res.data[1].id;
            } else {
              uni.showToast({
                icon: 'none',
                title: res.msg
              })
            }
          })
        }).then(succ => {
          uni.showLoading({
            mask: true,
            title: '加载中...'
          })
          let requestNotice = {
            page: 0,
            page_num: 1,
            id: succ.id
          }
          this.$Request.post(this.$api.business.cateIdNews, requestNotice).then(res => {
            uni.hideLoading();
            if (res.code === 200) {
              this.noticeInfo = res.data[0];
            } else {
              uni.showToast({
                icon: 'none',
                title: res.msg
              })
            }
          })
          this.fetchNewsList();
        })
      },
      fetchNewsList() { //分类列表
        this.$Request.post(this.$api.business.cateIdNews, this.reConfig).then(res => {
          if (res.code === 200) {
            if (!res.data || res.data.length === 0) {
              this.isEmpty = true;
              this.newsList = [];
              return false;
            }
            if (res.data.length < this.reConfig.page_num) {
              this.isloadEnd = true;
              this.status = 'noMore';
            }
            this.newsList = res.data;
          } else {
            uni.showToast({
              icon: 'none',
              title: res.msg
            })
          }
        })
      },
      navigateTo(value) { //查看详情
        uni.navigateTo({
          url: "/pages/personalCenterNeiye/xiangqing?id="+value
        })
      },
      clickNav(id, index) { //点击切换
        this.reConfig.id = id;
        this.active = index;
        this.isloadEnd = false;
        this.isEmpty = false;
        this.status = "more";
        this.fetchNewsList();
      }
    },
    onReachBottom() { //上拉加载
      if(this.isloadEnd) return false;
      this.reConfig.page++;
      this.status = "loading";
      this.$Request.post(this.$api.business.cateIdNews, this.reConfig).then(res => {
        if (res.code === 200) {
          if(res.data.length < this.reConfig.page_num){
            this.isloadEnd = true;
            this.status = 'noMore';
          }else{
            this.status = 'more';
          }
           this.newsList = this.newsList.concat(res.data);
        } else {
          uni.showToast({
            icon: 'none',
            title: res.msg
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .active {
    color: rgb(233, 122, 14) !important;
  }

  .cen_ul_text {
    width: 90% !important;
    color: #ccc
  }

  .cen_ul_tit {
    color: #333;
    font-weight: 500;
    font-size: 33.75rpx;
  }

  .cen_index_ul_li_right p {
    margin: 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cen_index_ul_li_right {
    width: 69%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    padding-bottom: .15rem;
  }

  .cen_index_ul_li_left img {
    width: 160rpx;
    height: 160rpx;
    border-radius: 15rpx;
  }

  .cen_index_ul_li_left {
    width: 27%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background: #eaeaea; */
    border-radius: 15rpx;
  }

  .cen_index_ul_li_a {
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .li {
    width: 98%;
    height: 180rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 22.5rpx 0 11.25rpx 15rpx;
  }

  .content {
    width: 100%;
    background: #fff;
  }

  .nav {
    width: 100%;
    background: white;
    color: #7d7e80;
    font-size: 33.75rpx;
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
  }

  .nav text {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 97.5rpx;
  }

  .j_img {
    width: 100%;
    height: 262.5rpx;
    object-fit: cover;
    margin: 22.5rpx 0;
  }

  .oj_bt {
    font-size: 26.25rpx;
    margin-top: 7.5rpx;
    color: rgb(146, 147, 158)
  }

  .oj_t {
    font-size: 33.75rpx;
    color: #333;
    font-weight: 700;
  }

  .oj {
    width: 88%;
    margin: 30rpx auto;
    background: #fff;
    padding: 15rpx;
    padding-bottom: 22.5rpx;
  }
</style>
