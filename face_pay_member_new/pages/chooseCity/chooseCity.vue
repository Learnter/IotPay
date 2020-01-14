<template>
	<view>
		<view class="demo">
			<ss-select-city  :citys="citys" :currentCity="currentCity" :current="value" :hotCitys="hotCitys" @on-select="onSelect"></ss-select-city>
		</view>
	</view>
</template>

<script>
	import ssSelectCity from '@/components/ss-select-city/ss-select-city.vue';
  import amap from '@/common/amap-wx.js';
	export default {
		data() {
			return {
				hotCitys: [],//热门城市
				value: '北京市',
				citys: [],
				currentCity: ''
			}
		},
		components: {
			ssSelectCity
		},
		onLoad() {
      this.getCurrentCity();
			this.getCityData();
      this.hostCity();
		},
		methods: {
      /*获取热门城市*/
      hostCity(){
       this.$Request.post(this.$api.hostCity).then(res => {
         if(res.code === 200){
           this.hotCitys = res.data;
         }else{
           uni.showToast({
             icon:'none',
             title:res.msg,
             duration:2000
           })
         }
       })
      },
      /*获取热门城市*/
      
			// 获取当前地址
			getCurrentCity() { 
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						var amapPlugin = new amap.AMapWX({
							key: '4c90b941dca75e686d95a4f05aea48c2'
						}); 
						amapPlugin.getRegeo({
							success: (data) => {
								this.currentCity = data[0].regeocodeData.addressComponent.city;
							},
							error: (res) => {
								uni.showToast({
								  icon:'none',
                  title:'定位失败'
								})
							}
						});
					}
				})
			},
			// 获取地址信息
			getCityData() {
        uni.showLoading({
          mask:true,
          title:'加载中...'
        })
				this.$Request.post(this.$api.allCity).then(res => {
          uni.hideLoading();
					if (res.code == 200) {
						let chosenRegion = this.$SysCache.get('chosen_region');
						this.value = chosenRegion.label;
						let sortCity = res.data;
            
						let	arr = [];
						for (let item in sortCity) {
              let obj = {};
              obj.letter = item;
              obj.list = sortCity[item];
							arr.push(obj);
						}
						this.citys = arr;
					}
				});
			},
			onSelect(city) {
				this.value = city;
        this.$SysCache.put('choose_city',city);
         uni.showLoading({
          title: '正在切换'
         });
        setTimeout(()=>{
           uni.hideLoading();
           uni.navigateBack();
        },1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
  .demo{
    background:#FFFFFF;
    min-height:100vh;
  }
</style>