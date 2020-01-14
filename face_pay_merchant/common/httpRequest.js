import configdata from './config'
import cache from './cache'
import api from './httpApi'

module.exports = {
	config: function(name) {
		var info = null;
		if (name) {
			var name2 = name.split("."); //字符分割
			if (name2.length > 1) {
				info = configdata[name2[0]][name2[1]] || null;
			} else {
				info = configdata[name] || null;
			}
			if (info == null) {
				let web_config = cache.get("web_config");
				if (web_config) {
					if (name2.length > 1) {
						info = web_config[name2[0]][name2[1]] || null;
					} else {
						info = web_config[name] || null;
					}
				}
			}
		}
		return info;
	},
	post: function(url, data, header) {
		var token = cache.get("app_token");
		header = header || "application/json";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header,
					"token": token
				},
				success: function(result) {
					// token 验证失败 自动退出
					if (result.data.code == 1004 || result.data.code == 1104 || result.data.code == 1003 || result.data.code ==
						1006 || result.data.code == 1103) {
						cache.remove('app_user_info');
            cache.remove('app_token');
             uni.reLaunch({
               	url: '/pages/login/login'
             })
            uni.showToast({
            	icon: 'none',
            	title: '请先登陆'
            }); 
					}else{
            succ(result.data)
          }
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	},
	upload: function(url, filePath, name, formData) {
		var token = cache.get("app_token");
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.uploadFile({
				url: url,
				filePath: filePath,
				name: name,
				formData: formData,
				header: {
					"token": token
				},
				success: function(result) {
					// console.log(result);
					// token 验证失败 自动退出
					if (result.data.code == 1004 || result.data.code == 1104 || result.data.code == 1003 || result.data.code ==
						1006 || result.data.code == 1103) {
						cache.remove('app_user_info');
            cache.remove('app_token');
            uni.reLaunch({
                url: '/pages/login/login'
            })
            uni.showToast({
            	icon: 'none',
            	title: '请先登陆'
            }); 
          }else{
            succ(JSON.parse(result.data));
          } 
				},
				fail: function(e) {
					error(e)
				}
			})
		})
	},
	get: function(url, data, header) {
		var token = cache.get("app_token");
		header = header || "application/json";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header,
					"token": token
				},
				success: function(result) {
					// token 验证失败 自动退出
					if (result.data.code == 1004 || result.data.code == 1104 || result.data.code == 1003 || result.data.code ==
						1006 || result.data.code == 1103) {
           	cache.remove('app_user_info');
            cache.remove('app_token');
            uni.reLaunch({
             	url: '/pages/login/login'
            })
            uni.showToast({
            	icon: 'none',
            	title: '请先登陆'
            }); 
					}else{
            succ(result.data);
          }
				},
				fail: function(e) {
					error.call(self, e)
				}
			})
		})
	}
}
