<template>
	<view class="content">   
  
    <!--留言对话框-->
    <view class="dialogBox">
       <view class="dialogItem uni-flex">
         <view class="dialogMsg">
           请问，在哪里发布转铺信息呢?
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
       
       <view class="dialogItem uni-flex" :class="isService == 2 ?'flexReverse':''">
         <view class="dialogMsg">
          用户登录→免费发布信息→选择所需 发布的信息类型→按提示填写好所需 资料（注：带*符号为必 填项目）→ 立即发布 
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
       
       <view class="dialogItem uni-flex">
         <view class="dialogMsg">
           请问，在哪里发布转铺信息呢?
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
       
       <view class="dialogItem uni-flex">
         <view class="dialogMsg">
           进度框垃圾啊林肯反对党是健康减肥杀戮空间来得及李开复撒娇李开复四大皆空电视剧来看打赏风刀霜剑克劳福德几十块发多少领积分考虑到设计费水电费单身快乐发奖克鲁赛德
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
       
       <view class="dialogItem uni-flex" :class="isService == 2 ?'flexReverse':''">
         <view class="dialogMsg">
          待释放山东矿机付款了电视剧发的接口垃圾付款了电视剧离开的说法奖金放声大哭领积分克鲁赛德发绝地逢生刻录机付款了第三
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
       
       <view class="dialogItem uni-flex" :class="isService == 2 ?'flexReverse':''">
         <view class="dialogMsg">
          待释放山东矿机付款了电视剧发的接口垃圾付款了电视剧离开的说法奖金放声大哭领积分克鲁赛德发绝地逢生刻录机付款了第三
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
       
       <view class="dialogItem uni-flex" :class="isService == 2 ?'flexReverse':''">
         <view class="dialogMsg">
          待释放山东矿机付款了电视剧发的接口垃圾付款了电视剧离开的说法奖金放声大哭领积分克鲁赛德发绝地逢生刻录机付款了第三
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
       
       
       <view class="dialogItem uni-flex" :class="isService == 2 ?'flexReverse':''">
         <view class="dialogMsg">
          待释放山东矿机付款了电视剧发的接口垃圾付款了电视剧离开的说法奖金放声大哭领积分克鲁赛德发绝地逢生刻录机付款了第三
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
       
       <view class="dialogItem uni-flex" :class="isService == 2 ?'flexReverse':''">
         <view class="dialogMsg">
          天使侧边
         </view>
         <view class="portrait">
           <image src="/static/holder/2019cfsj_11.png" mode=""></image>
         </view>
       </view>
    </view>
    <!--留言对话框-->
		
    
    <!--信息输入框-->
    <view class="inputBox uni-inline-item">
      <view class="inputWord">
         <input @input="inputMethods" class="inputMsg" type="text" value="" placeholder="请输入你想咨询的问题......" />
      </view>
      <view class="sendBtn" :class="hasWord ?'activate':''">发送</view>
    </view>
    <!--信息输入框-->
	</view>
</template>

<script>
  import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
        isService:2,//是否为客服
				hasWord:false //是否输入文字
			};
		},
    methods:{
      /*监听输入框是否有文字*/
      inputMethods(e){
        e.detail.value.trim().length !== 0 ? this.hasWord = true : this.hasWord = false;
      }
      /*监听输入框是否有文字*/
    },
    components:{
      uniIcon
    }
	}
</script>

<style lang="scss" scoped>
  
  .content{
    width:100%;
    height:100%;
    position:relative;
  } 
  
  .dialogBox{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:100rpx;
    overflow-y:scroll;
  }
  
  /*角色兑换反转布局*/
  .flexReverse{
    flex-direction:row-reverse;
    .portrait{
      margin-left:0;
      margin-right:20rpx;
    }
  }
   /*角色兑换反转布局*/
  
  /*对话框样式*/
  .dialogItem{
    padding:20rpx;
    justify-content: flex-end;
    
    .dialogMsg{
        background:#4E91F9;
        max-width:70%;
        padding:10rpx 20rpx;
        border-radius: 20rpx;
        color:#FFFFFF;
      } 
      
      .portrait{
        width:80rpx;
        height:80rpx;
        border-radius:50%;
        overflow:hidden;
        background:#F0F0F0;
        margin-left:20rpx;
      }
  }
  

 /*信息输入框样式*/
  .inputBox{
    position:fixed;
    left:0;
    bottom:0;
    right:0;
    padding:20rpx 16rpx;
    box-shadow:0rpx -2rpx 0rpx 0rpx rgba(0, 0, 0, 0.1);
    background:#FFFFFF;
    .inputWord{
      margin:0 10rpx;
      flex:1;
      background:#F0F0F0;
      padding:10rpx 20rpx;
      border-radius:30rpx;
      box-sizing:border-box;
      overflow:hidden;
      .inputMsg{
        font-size:26rpx;
      }
    }
    .sendBtn{
      box-sizing:border-box;
      font-size:30rpx;
      padding:10rpx 0;
      background:#F0F0F0;
      width:120rpx;
      text-align:center;
      border-radius:30rpx;
      transition: all 1s linear;
    }
    .activate{
      background:#FC3D4E;
      color:#FFFFFF;
      transition: all 1s linear;
    }
  }
 /*信息输入框样式*/
</style>
