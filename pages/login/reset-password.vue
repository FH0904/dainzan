<template>
	<view style="overflow: hidden;">
		<view class="title">设置新密码</view>
		<view class="subtitle">
			<text style="color: #fe5e5e;margin-right: 6rpx;">*</text>
			<text>密码由6-12位数字/英文(英文区分大小写）组成</text>
		</view>
		<input type="password" style="font-size: 22rpx;" placeholder="请输入密码"/>
		<input type="password" style="font-size: 22rpx;" placeholder="请再次输入密码" />
		<view class="complete_btn">完成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	page{
		padding-left: 42rpx;
		box-sizing: border-box;
		overflow: hidden;
	}
.title{
	font-size: 34rpx;
	color: #000;
	margin-top: 50rpx;
}
.subtitle{
	font-size: 28rpx;
	display: flex;
	align-items: center;
	color: #8e8e8e;
	margin-top: 37rpx;
}
input{
	width: 676rpx;
	height: 70rpx;
	display: flex;
	align-items: center;
	background-color: #f7f9fc; 
	border-radius: 6rpx;
	margin-top: 40rpx;
	font-size: 24rpx;
	text-indent: 1em;
}
	.complete_btn{
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #080d5d;
		border-radius: 18rpx;
		width: 657rpx;
		height: 80rpx;
		margin: 258rpx 6rpx 0;
		color: #fff;
		font-size: 30rpx;
	}
</style>
