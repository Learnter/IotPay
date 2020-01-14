<template>
	<view class="content" v-html="content">
		<!-- <uni-collapse ref="add" class="warp" @change="change">
			<uni-collapse-item v-for="(sub, key) in list" :key="key"  :title="sub.subName">
				<template>
					<view class="content"></view>
				</template>
			</uni-collapse-item>
		</uni-collapse> -->
	</view>
</template>

<script>
  import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
  import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		data() {
			return {
        content:''
			};
		},
    onLoad() {
      this.fetchIssue();
    },
    methods:{
      fetchIssue(){
        this.$Request.post(this.$api.setUp.issue,{type:2}).then(res => {
          if(res.code === 200){
            this.content =  res.data.content_cn.replace(/\<img/gi,"<img style='max-width:100%;height:auto'");
          }else{
            uni.showToast({
              title:res.msg,
              icon:'none'
            })
          }
        });
      },
      change(){
        
      }
    },
    components:{
      uniCollapse,
      uniCollapseItem
    }
	}
</script>

<style lang="scss" scoped>
  .content {
  	padding: 30rpx;
    height:100%;
  	background: #f9f9f9;
  	color: #666;
  }

</style>
