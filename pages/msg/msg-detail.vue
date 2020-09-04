<template>
	<view>
		<view class="c-title">
			<view class="title">{{msgDetail.title}}</view>
			<view class="time">最近更新: {{msgDetail.created_at}}</view>
		</view>
		<view class="c-content" style="overflow-x: hidden;">
			<rich-text :nodes="msgDetail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgDetail:''
			};
		},
		methods: {
			async getDetail(id) {
				let res = await this.$http.notifyDetail({id})
				this.msgDetail = res.result
			}
		},
		onLoad(options) {
			this.getDetail(options.id)
		}
	}
</script>

<style lang="less">
page {
	border-top: 4rpx solid #f5f7fd;
	padding: 0 38rpx;
}
.c-title {
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 176rpx;
	border-bottom: 1px solid #f0f0f0;
	margin-bottom: 50rpx;
	.title {
		color: #313131;
		font-size: 32rpx;
		margin-bottom: 28rpx;
	}
	.time {
		color: #b4b7be;
		font-size: 24rpx;
	}
}
.c-content {
	color: #787878;
	font-size: 26rpx;
	line-height: 45rpx;
}
</style>
