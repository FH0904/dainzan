<template>
	<view>
		<view class="tip-text">可使用中文，英文，数字组合，限4-16个字符</view>
		<view class="wrap"><input type="text" v-model="name" placeholder="输入名称" placeholder-style="color: #bfbfc5;font-size:28rpx;" /></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: ''
		};
	},
	async onNavigationBarButtonTap() {
			await this.$http.accountNickname({
				nickname: this.name
			});
			this.$t('修改成功！');
			setTimeout(() => {
				uni.hideToast();
				uni.navigateBack();
			}, 1500);
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f5fd;
}
.wrap {
	display: flex;
	align-items: center;
	width: 750rpx;
	height: 112rpx;
	padding-left: 36rpx;
	background-color: #ffffff;
}
.tip-text {
	color: #afafaf;
	font-size: 28rpx;
	margin: 18rpx 0 16rpx 34rpx;
}
</style>
