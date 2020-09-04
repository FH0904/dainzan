<template>
	<view class="tel-login animated fadeIn faster">
		<view class="input-tel">
			<text class="tel-text">＋86</text>
			<image src="/static/images/login/down01.png" class="down"></image>
			<text class="line"></text>
			<input type="number" placeholder="请输入新手机号" placeholder-style="color:#b8b8b8;font-size:30rpx" v-model="phoneText" />
		</view>
		<view class="input-code">
			<input type="text" placeholder="请输入验证码" placeholder-style="color:#b8b8b8;font-size:30rpx" v-model="verCode" />
			<text class="code-text" @click="getVerCode">{{ verCodeText }}</text>
		</view>
		<button class="btn" @click="login" :style="{ 'background-color': phoneText && verCode ? '#080d5d' : '#d2d2d2' }">确认修改</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phoneText: '',
			verCode: '',
			verCodeText: '获取验证码'
		};
	},
	methods: {
		// 获取验证码
		async getVerCode() {
			let intervalTime = 60;
			let res = await this.$http.getCode(this.phoneText,{type:2});
			console.log(res);
			this.$t('验证已经发送至手机');
			let timer = setInterval(() => {
				this.verCodeText = `${intervalTime}s`;
				intervalTime--;
				if (intervalTime <= 1) {
					this.verCodeText = '获取验证码';
					clearInterval(timer);
				}
			}, 1000);
		},
		async login() {
			let res = await this.$http.accountPhone({ code: this.verCode ,phone:this.phoneText});
			console.log(res);
			this.$t('修改成功');
			setTimeout(() => {
				uni.hideToast();
				uni.navigateBack()
			}, 1500);
		}
	}
};
</script>

<style lang="less">
.tel-login {
	display: flex;
	flex-direction: column;
	align-items: center;
	.logo-img {
		width: 146rpx;
		height: 146rpx;
		margin: 174rpx 0 20rpx 0;
		border-radius: 50%;
	}
	.input-tel {
		display: flex;
		align-items: center;
		width: 635rpx;
		height: 106rpx;
		border-bottom: 1px solid #e8e8e8;
		.tel-text {
			display: flex;
			align-items: center;
			color: #000;
			font-size: 30rpx;
		}
		.down {
			width: 32rpx;
			height: 32rpx;
			margin: 0 32rpx 0 18rpx;
		}
		.line {
			width: 1px;
			height: 40rpx;
			margin-right: 20rpx;
			background-color: #b8b8b8;
		}
		input {
			flex: 1;
			font-size: 30rpx;
		}
	}
	.input-code {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 635rpx;
		height: 106rpx;
		border-bottom: 1px solid #e8e8e8;
		input {
			width: 220rpx;
			font-size: 30rpx;
		}
		.code-text {
			color: #080d5d;
			font-size: 26rpx;
		}
	}
	.btn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 250rpx;
		margin: auto;
	}
	.tip-text1 {
		display: flex;
		margin-top: 55rpx;
		font-size: 20rpx;
		color: #969696;
		.text1-active {
			color: #080d5d;
		}
	}
	.tip-text2 {
		font-size: 20rpx;
		color: #080d5d;
		margin-top: 30rpx;
	}
}
</style>
