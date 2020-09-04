<template>
	<view style="overflow: hidden;">
		<view class="input">
			<image src="/static/images/login_Img/icon_avatar.png" style="width: 24rpx;height: 28rpx;"></image>
			<view class="line"></view>
			<input type="text" placeholder="输入账号" v-model="account" placeholder-style="font-size:30rpx;color:#a3a3a3" />
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_mima.png" style="width: 24rpx;height: 32rpx;"></image>
			<view class="line"></view>
			<input
				:type="pwdType"
				placeholder="输入密码"
				:value="inputValue"
				@input="changeValue"
				style="font-size: 22rpx;width: 200rpx;"
				placeholder-style="font-size:30rpx;color:#a3a3a3"
			/>
			<view class="eye" @click="changeType">
				<image src="/static/images/login_Img/icon_biyan.png" style="width: 30rpx;height: 15rpx;" v-if="isShoweye"></image>
				<image src="/static/images/login_Img/icon_eye.png" style="width: 30rpx;height: 20rpx;" v-else></image>
			</view>
		</view>
		<view class="other">
			<text @click="navTo('/pages/login/retrieve-password')">忘记密码</text>
			<text style="color: #1b2664;" @click="navTo('/pages/login/register')">立即注册</text>
		</view>
		<view class="login_btn" @click="login">登录</view>
		<view class="pwd_login" @click="navTo('/pages/login/tel-login')">验证码登录</view>
		<view class="protocol">
			<text class="protocol_text1">登录代表您同意</text>
			<view class="protocol_text2">
				<text @click="navTo('/pages/login/usage-agreement')">《抖音点赞使用协议》</text>
				<text>和</text>
				<text @click="navTo('/pages/login/privacy-policy')">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pwdType: 'password',
			isShoweye: true,
			account: '',
			inputValue: ''
		};
	},
	methods: {
		navTo(url) {
			if (url === 'pages/tabbar/index') {
				return uni.switchTab({
					url: '/pages/tabbar/index'
				});
			}
			uni.navigateTo({ url });
		},
		changeType() {
			this.isShoweye = !this.isShoweye;
			if (this.pwdType === 'password') return (this.pwdType = 'text');
			this.pwdType = 'password';
		},

		async login() {
			let res = await this.$http.login({
				account: this.account,
				password: this.inputValue
			});
			uni.setStorageSync('userToken', res.result.token);
			this.$t('登录成功！');
			setTimeout(() => {
				uni.hideToast();
				uni.switchTab({
					url: '/pages/tabbar/index'
				});
			}, 1500);
		},

		changeValue(e) {
			this.inputValue = e.target.value;
		}
	},
	onLoad() {
		let res = uni.getStorageSync('userToken')
		if(res) {
			uni.switchTab({
				url: '/pages/tabbar/index'
			});
		}
	}
};
</script>

<style lang="less">
.input {
	display: flex;
	align-items: center;
	background-color: #fafafa;
	border-radius: 40px;
	width: 540rpx;
	height: 80rpx;
	margin: 200rpx auto 0;
	image {
		width: 24rpx;
		height: 34rpx;
		margin-left: 26rpx;
		margin-right: 22rpx;
	}
	.line {
		width: 2rpx;
		height: 28rpx;
		background-color: #a9a9a9;
		margin-right: 33rpx;
	}
	uni-input {
		display: flex;
		align-items: center;
	}
	.eye {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 130rpx;
	}
}
.login_btn {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #080d5d;
	border-radius: 40px;
	width: 540rpx;
	height: 80rpx;
	margin: 90rpx auto 0;
	color: #fff;
	font-size: 30rpx;
}
.pwd_login {
	font-size: 28rpx;
	color: #a3a3a3;
	text-align: center;
	margin-top: 44rpx;
}
.protocol {
	position: absolute;
	bottom: 120rpx;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 26rpx;
	color: #ababab;
	.protocol_text2 {
		font-size: 26rpx;
		color: #080d5d;
		margin-top: 10rpx;
		text:nth-child(2) {
			color: #ababab;
			margin: 0 6rpx;
		}
	}
}
.other {
	display: flex;
	justify-content: space-between;
	width: 539rpx;
	margin: 34rpx auto 0;
	padding: 0 14rpx;
	text {
		font-size: 28rpx;
		color: #a3a3a3;
	}
}
</style>
