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
			<input type="password" placeholder="输入密码" v-model="password" style="font-size: 22rpx;" placeholder-style="font-size:30rpx;color:#a3a3a3" />
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_mima.png" style="width: 24rpx;height: 32rpx;"></image>
			<view class="line"></view>
			<input type="password" placeholder="再次输入密码" v-model="password_confirmation" style="font-size: 22rpx;" placeholder-style="font-size:30rpx;color:#a3a3a3" />
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_iphone.png"></image>
			<view class="line"></view>
			<input type="number" placeholder="输入手机号" v-model="phone" placeholder-style="font-size:30rpx;color:#a3a3a3" />
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_shuru.png" style="width: 29rpx;height: 36rpx;"></image>
			<view class="line"></view>
			<input type="text" placeholder="输入验证码" v-model="code" placeholder-style="font-size:30rpx;color:#a3a3a3" style="width: 150rpx;" />
			<view  :class="isClick?'getCode':'getCoder'" @click="getVerCode">{{verCodeText}}</view>
		</view>
		<view class="input" style="margin: 35rpx auto 0;">
			<image src="/static/images/login_Img/icon_shuru.png" style="width: 29rpx;height: 36rpx;"></image>
			<view class="line"></view>
			<input type="number" placeholder="输入邀请码" v-model="invitation_code" placeholder-style="font-size:30rpx;color:#a3a3a3" />
		</view>
		<view class="login_btn" @click="confirm">确定</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			account:'',
			password:'',
			password_confirmation:'',
			phone:'',
			code:'',
			invitation_code:'',
			verCodeText:'获取验证码',
			isClick:true,
			isClickNum:0
		};
	},
	methods:{
		navTo(url){
			uni.navigateTo({url})
		},
		async confirm() {
			let res = await this.$http.authRegister({
				account:this.account,
				password:this.password,
				password_confirmation:this.password_confirmation,
				phone:this.phone,
				code:this.code,
				invitation_code:this.invitation_code
			})
			uni.setStorageSync('userToken',res.result.token)
			this.$t('注册成功！')
			setTimeout(()=>{
				uni.hideToast()
				uni.switchTab({
					url:"/pages/tabbar/index"
				})
			},1500)
		},
		async getVerCode () {
			if(!this.phone) {
				return this.$t('请输入手机号')
			}
			this.isClick = false
			this.isClickNum ++
			if(this.isClickNum > 1) return
			console.log(this.phone);
			let intervalTime = 60;
			let res = await this.$http.getCode(this.phone,{type:3})
			if(res.code === 4000) {
				this.isClick = true 
				this.$t(`${res.message}`)
				this.isClickNum = 0
				return 
			}
			console.log(res);
			this.$t('验证码已发送至手机')
			let timer = setInterval(()=>{
				this.verCodeText = `${intervalTime}s`
				intervalTime --
				if(intervalTime < 0) {
					this.verCodeText = "获取验证码"
					this.isClick = true
					this.isClickNum = 0
					clearInterval(timer)
				}
			},1000)
		}
	}
}
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
	.getCode {
		width: 170rpx;
		height: 62rpx;
		background-color: #080d5d;
		border-radius: 31rpx;
		color: #fff;
		font-size: 26rpx;
		line-height: 62rpx;
		text-align: center;
		margin-left: 107rpx;
	}
	.getCoder {
		width: 170rpx;
		height: 62rpx;
		background-color: #ccc;
		border-radius: 31rpx;
		color: #fff;
		font-size: 26rpx;
		line-height: 62rpx;
		text-align: center;
		margin-left: 107rpx;
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
	margin: 80rpx auto 43rpx;
	color: #fff;
	font-size: 30rpx;
}
</style>
