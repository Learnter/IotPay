<template>
  <view class="vue" v-cloak>
    <view class="bg_box">
     <image src="/static/icon/dingbg.png" mode="widthFix"></image>
    </view>
    <view class="ding_ul">
     <block v-if="membershipGrade === 1">
        <li class="ding_ul_li">
          <navigator :url="'/pages/agent/xieyi?type='+6" class="ding_ul_li_a">
            <view class="ding_ul_li_box">
              <view class="ding_ul_li_box_left">
                <img src="/static/icon/sheng.png" />
              </view>
              <view class="ding_ul_li_box_right">
                <p class="dinf_ptit">
                  申请省代
                </p>
                <p class="ding_ptext">
                  点击申请省代
                </p>
                <i class="iconfont icon-youicon right_loac_right"></i>
              </view>
            </view>
          </navigator>
        </li>
        <li class="ding_ul_li">
          <navigator :url="'/pages/agent/xieyi?type='+5" class="ding_ul_li_a">
            <view class="ding_ul_li_box">
              <view class="ding_ul_li_box_left">
                <img src="/static/icon/shi.png" />
              </view>
              <view class="ding_ul_li_box_right">
                <p class="dinf_ptit">
                  申请市代
                </p>
                <p class="ding_ptext">
                  点击申请市代
                </p>
                <i class="iconfont icon-youicon right_loac_right"></i>
              </view>
            </view>
          </navigator>
        </li>
        <li class="ding_ul_li">
          <navigator :url="'/pages/agent/xieyi?type='+4" class="ding_ul_li_a">
            <view class="ding_ul_li_box">
              <view class="ding_ul_li_box_left">
                <img src="/static/icon/qu.png" />
              </view>
              <view class="ding_ul_li_box_right">
                <p class="dinf_ptit">
                  申请区代
                </p>
                <p class="ding_ptext">
                  点击申请区代
                </p>
                <i class="iconfont icon-youicon right_loac_right"></i>
              </view>
            </view>
          </navigator>
        </li>
      </block>

      <block v-if="membershipGrade === 3">
        <li class="ding_ul_li">
          <navigator :url="'/pages/agent/xieyi?type='+6" class="ding_ul_li_a">
            <view class="ding_ul_li_box">
              <view class="ding_ul_li_box_left">
                <img src="/static/icon/sheng.png" />
              </view>
              <view class="ding_ul_li_box_right">
                <p class="dinf_ptit">
                  申请省代
                </p>
                <p class="ding_ptext">
                  点击申请省代
                </p>
                <i class="iconfont icon-youicon right_loac_right"></i>
              </view>
            </view>
          </navigator>
        </li>
      </block>

      <block v-if="membershipGrade === 4">
        <li class="ding_ul_li">
          <navigator :url="'/pages/agent/xieyi?type='+6" class="ding_ul_li_a">
            <view class="ding_ul_li_box">
              <view class="ding_ul_li_box_left">
                <img src="/static/icon/sheng.png" />
              </view>
              <view class="ding_ul_li_box_right">
                <p class="dinf_ptit">
                  申请省代
                </p>
                <p class="ding_ptext">
                  点击申请省代
                </p>
                <i class="iconfont icon-youicon right_loac_right"></i>
              </view>
            </view>
          </navigator>
        </li>
        <li class="ding_ul_li">
          <navigator :url="'/pages/agent/xieyi?type='+5" class="ding_ul_li_a">
            <view class="ding_ul_li_box">
              <view class="ding_ul_li_box_left">
                <img src="/static/icon/shi.png" />
              </view>
              <view class="ding_ul_li_box_right">
                <p class="dinf_ptit">
                  申请市代
                </p>
                <p class="ding_ptext">
                  点击申请市代
                </p>
                <i class="iconfont icon-youicon right_loac_right"></i>
              </view>
            </view>
          </navigator>
        </li>
      </block>

<!--      <li class="ding_ul_li">
        <navigator url="/pages/agent/xieyi" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/shangdai.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                申请商代
              </p>
              <p class="ding_ptext">
                点击申请商代
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li> -->
      <li class="ding_ul_li">
        <navigator url="/pages/orders/orders" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding1.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                推广订单
              </p>
              <p class="ding_ptext">
                点击查看推广订单
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
      <li class="ding_ul_li">
        <navigator url="/pages/store/medicOrders/medicOrders" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding2.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                申请订单
              </p>
              <p class="ding_ptext">
                点击查看推广订单
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
      <li class="ding_ul_li">
        <navigator url="/pages/store/medicOrders/medicOrders" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding3.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                铺货订单
              </p>
              <p class="ding_ptext">
                点击查看推广订单
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
      <li class="ding_ul_li">
        <navigator url="/pages/recruitment/recruitment" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding4.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                设备进件表
              </p>
              <p class="ding_ptext">
                点击查看设备进件表
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
      <li class="ding_ul_li">
        <navigator url="/pages/me/storeList/storeList" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding5.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                店铺管理
              </p>
              <p class="ding_ptext">
                点击查看店铺管理
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
      <li class="ding_ul_li">
        <navigator url="/pages/personalCenterNeiye/jiaoyi" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding6.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                交易明细
              </p>
              <p class="ding_ptext">
                点击查看交易明细
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
      <li class="ding_ul_li">
        <navigator href="qian.html" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding7.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                店铺签约管理
              </p>
              <p class="ding_ptext">
                点击查看店铺签约管理
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
      <li class="ding_ul_li">
        <navigator :url="'/pages/agent/contract_xieyi/contract_xieyi?type='+7" hover-class="none" class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding8.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                注册合约
              </p>
              <p class="ding_ptext">
                点击查看注册合约
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
      <li class="ding_ul_li">
        <navigator :url="'/pages/agent/contract_xieyi/contract_xieyi?type='+3"  hover-class="none"  class="ding_ul_li_a">
          <view class="ding_ul_li_box">
            <view class="ding_ul_li_box_left">
              <img src="/static/icon/ding9.png" />
            </view>
            <view class="ding_ul_li_box_right">
              <p class="dinf_ptit">
                铺货合约
              </p>
              <p class="ding_ptext">
                点击查看铺货合约
              </p>
              <i class="iconfont icon-youicon right_loac_right"></i>
            </view>
          </view>
        </navigator>
      </li>
    </view>
  </view>

</template>

<script>
  export default {
    data() {
      return {
        membershipGrade: '', //会员级别
      }
    },
    onLoad() {
      let {identity} = this.$SysCache.get('app_user_info');
      this.membershipGrade = identity;
    }
  }
</script>
<style lang="scss" scoped>
  .body {
    background: rgb(249, 249, 252)
  }

  .bg_box {
    width: 100%;
  }

  .ding_ul {
    width: 90%;
    margin: 0 auto 20rpx;
  }

  .ding_ul li {
    width: 100%;
    height: 4rem;
    border-radius: .2rem;
    box-shadow: 2px 2px 10px #ccc;
    background: #fff;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .ding_ul_li_box {
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }




  .ding_ul_li_box_left {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .ding_ul_li_box_right {
    width: 72%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }

  .ding_ul_li_box_left img {
    width: 5rem;
  }

  .dinf_ptit {
    font-weight: bold;
    color: #333;
    font-size: 14px;
    width: 100%;
    margin: 0;
  }

  .ding_ptext {
    width: 100%;
    margin: 0;
    font-size: 12px;
  }

  .right_loac_right {
    top: .25rem;
    right: -.2rem;
  }

  .ding_ul_li_a {
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
