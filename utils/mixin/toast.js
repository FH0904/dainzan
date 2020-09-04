import Vue from 'vue'
Vue.mixin({
	methods: {
		$t(title, icon = "none", duration = 1500) {
			return uni.showToast({
				title,
				icon,
				duration
			})
		}
	}
})
