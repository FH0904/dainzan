import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import http from './service/methods.js'
import './utils/mixin/toast.js'

Vue.config.productionTip = false

App.mpType = 'app'

// http请求
Vue.prototype.$http = http

//vuex
Vue.prototype.$store = store;

// 引入全局加载动画
import loadingPlus from "@/utils/mixin/loading-plus.vue"
Vue.component('loading-plus', loadingPlus)



// 自定义指令（价格）
Vue.directive('formatPrice',{
	inserted(el) {
		el.innerHTML = "￥" + Number(el.innerHTML).toFixed(2)
	}
})



// 全局过滤器(价格)
Vue.filter('formatPrice', (val) => {
	return "￥" + Number(val).toFixed(2)
})

const app = new Vue({
	...App
})

app.$mount()
