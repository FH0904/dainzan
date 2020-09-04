<template>
	<view class="invitation">
		<uni-status-bar />

		<view class="header">
			<view class="back" @click="navTo"><image src="/static/images/profile/back.png"></image></view>
			<text></text>
			<!-- <text>&nbsp;</text> -->
		</view>
		<tki-qrcode
			class="code_img"
			cid="qrcode1"
			ref="qrcode"
			:val="val"
			:size="size"
			:unit="unit"
			:background="background"
			:pdground="pdground"
			:icon="icon"
			:iconSize="iconsize"
			:lv="lv"
			:onval="onval"
			:loadMake="loadMake"
			:usingComponents="true"
			@result="qrR"
		/>
		<!-- <image src="/static/images/profile/pic_erweima.png" mode="" ></image> -->
		<view class="click" @click="capture"></view>
		<view class="code_text">注册邀请码: {{info.id}}</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
import config from '@/service/config.js';
export default {
	data() {
		return {
			val: '', // 要生成的二维码值
			size: 200, // 二维码大小
			unit: 'upx', // 单位
			background: '#fff', // 背景色
			pdground: '#000', // 角标色
			icon: '', // 二维码图标
			iconsize: 40, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '' // 二维码生成后的图片地址或base64
		};
	},
	methods: {
		navTo() {
			uni.navigateBack();
		},
		creatQrcode() {
			setTimeout(() => {
				this.$refs.qrcode._makeCode();
			}, 500);
		},
		// saveQrcode() {
		// 	this.$refs.qrcode._saveCode()
		// },
		qrR(res) {
			this.src = res;
		},
		capture() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			console.log('当前页' + pages.length - 1);
			var bitmap = null;
			var currentWebview = page.$getAppWebview();
			bitmap = new plus.nativeObj.Bitmap('amway_img');
			// 将webview内容绘制到Bitmap对象中
			currentWebview.draw(
				bitmap,
				function() {
					console.log('截屏绘制图片成功');
					bitmap.save(
						'_doc/a.jpg',
						{},
						function(i) {
							console.log('保存图片成功：' + JSON.stringify(i));
							uni.saveImageToPhotosAlbum({
								filePath: i.target,
								success: function() {
									bitmap.clear(); //销毁Bitmap图片
									uni.showToast({
										title: '保存图片成功',
										mask: false,
										duration: 1500
									});
								}
							});
						},
						function(e) {
							console.log('保存图片失败：' + JSON.stringify(e));
						}
					);
				},
				function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				}
			);
			//currentWebview.append(amway_bit);
		}
	},
	computed:{
		...mapState(['info'])
	},
	onLoad(options) {
		this.val = config.apiBaseUrl + 'view/register?invitation_code=' + options.id;
		// #ifdef APP-PLUS
		this.creatQrcode();
		// #endif
	}
};
</script>

<style lang="less">
.invitation {
	width: 100%;
	height: 100%;
	background: url(/static/images/profile/haibao.png) no-repeat;
	background-size: 100% 100%;
	.header {
		position: absolute;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		.back {
			position: absolute;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 150rpx;
			height: 100%;
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		text {
			text-align: center;
			font-size: 34rpx;
			color: #fff;
		}
	}
	.code_img {
		position: absolute;
		bottom: 200rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 200rpx;
		height: 200rpx;
	}
	.click{
		position: absolute;
		bottom: 120rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 300rpx;
		height: 80rpx;
	}
	.code_text {
		position: absolute;
		bottom: 70rpx;
		left: 0;
		right: 0;
		margin: auto;
		color: #fff;
		text-align: center;
		font-weight: bold;
	}
}
</style>
