import Vue from 'vue'
import App from './App'

import httpApi from './common/httpApi'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import util from './common/util'

Vue.config.productionTip = false


Vue.prototype.$api = httpApi
Vue.prototype.$Request = HttpRequest
Vue.prototype.$Sysconf = HttpRequest.config
Vue.prototype.$SysCache = HttpCache
Vue.prototype.$util = util

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
