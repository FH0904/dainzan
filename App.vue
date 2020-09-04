<script>
export default {
	onLaunch: function() {
		// #ifdef APP-PLUS
		setTimeout(() => {
			plus.navigator.closeSplashscreen();
		}, 2400);
		// #endif
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import '/static/css/animate.css';
/*每个页面公共css */
/* 设置全局样式 */
@font-face {
	font-family: PingFang;
	src: url('./static/font/PingFang Medium.ttf');
}
/* tabbar文字大小 */
.uni-tabbar__label {
	font-size: 12px !important;
}
/* tabbar边框 */
/* uni-tabbar .uni-tabbar-border {
		background-color: red !important;
	} */
page {
	height: 100%;
	font-family: 'PingFang' !important;
	font-size: 28rpx;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background: #ffffff;
	line-height: 1;
	box-sizing: border-box;
}
::-webkit-scrollbar {
	display: none;
}
button.button-hover {
	transform: translate(1rpx, 1rpx);
}
uni-button:after {
	border: 0;
}
button::after {
	border: 0;
}
view {
	box-sizing: border-box;
}
.btn {
	width: 662rpx;
	height: 90rpx;
	line-height: 90rpx;
	background-color: #080d5d;
	border-radius: 45rpx;
	color: #fff;
	font-size: 30rpx;
}
/* 防止图片闪一下 */
image {
	will-change: transform;
	width: 100%;
}
</style>
