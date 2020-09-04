<template>
	<view>
		<view class="input-list">
			<input type="password" v-model="old_password" placeholder="请输入原密码" placeholder-style="color:#c5c5c5;font-size:28rpx"/>
		</view>
		<view class="input-list">
			<input type="password" v-model="password" placeholder="请输入新密码" placeholder-style="color:#c5c5c5;font-size:28rpx"/>
		</view>
		<view class="input-list">
			<input type="password" v-model="password_confirmation" placeholder="请再次输入新密码" placeholder-style="color:#c5c5c5;font-size:28rpx"/>
		</view>
		<button class="btn" @click="comfirm">确认修改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_password:'',
				password:'',
				password_confirmation:''
			};
		},
		methods: {
			async comfirm() {
				await this.$http.accountPassword({
					old_password:this.old_password,
					password:this.password,
					password_confirmation:this.password_confirmation
				})
				this.$t('修改成功！');
				setTimeout(() => {
					uni.hideToast();
					uni.navigateBack()
				}, 1500);
			}
		}
	}
</script>

<style lang="less">
page {
	background-color: #f5f7fd;
	padding-top: 16rpx;
}
.input-list{
	display: flex;
	align-items: center;
	width: 750rpx;
	height: 90rpx;
	background-color: #ffffff;
	padding-left: 42rpx;
	margin-bottom: 2rpx;
	input {
		font-size: 22rpx;
	}
}
.btn {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 250rpx;
	margin: auto;
}
</style>
