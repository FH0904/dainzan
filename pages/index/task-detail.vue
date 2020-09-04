<template>
	<view>
		<loading-plus v-if="isLoading"></loading-plus>
		<view class="banner" :style="{'background-image':'url('+banner+')',}">
			<uni-status-bar />
			<view class="header">
				<view class="back" @click="navTo(1)">
					<image src="/static/images/profile/back.png" ></image>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="c-title">{{task_detail.title}}</view>
			<view class="c-content">
				<view class="c-left">
					<view class="list1">{{task_detail.user_complete_count}}人已赚到</view>
					<view class="list2">
						<text>剩余{{task_detail.num}}个名额</text>
						<text>48小时内审核</text>
					</view>
				</view>
				<view class="c-right">+{{task_detail.amount}}元</view>
			</view>
			<view class="c-tip" @click="navTo('/pages/profile/help-center')">
				<view class="tip-l">新手指南，全方位了解操作流程</view>
				<view class="tip-r">
					<view class="r-text">立即进入</view>
					<image src="/static/images/index/icon_fanhui.png" mode=""></image>
				</view>
			</view>
			<view class="c-select">
				<view class="select-item">
					<image src="/static/images/index/icon_gouxuan.png" mode=""></image>
					<text>有头像</text>
				</view>
				<view class="select-item">
					<image src="/static/images/index/icon_gouxuan.png" mode=""></image>
					<text>有作品</text>
				</view>
				<view class="select-item">
					<image src="/static/images/index/icon_gouxuan.png" mode=""></image>
					<text>案例标准</text>
				</view>
			</view>
		</view>
		<view class="shop-info">
			<view class="list2-name">{{task_detail.url}}</view>
			<view class="list2-btn">
				<view class="btn2" @click="toNext">点击打开</view>
			</view>
		</view>
		<view class="show-img">
			<!-- <view class="title">
				<view class="title-text">任务步骤</view>
				<view class="title-text">审核样例</view>
			</view> -->
			<image src="../../static/images/index/bgd.png" mode="widthFix"></image>
		</view>
		<view class="receive-btn" @click="receive">领取任务</view>
	</view>
</template>

<script>
import config from '@/service/config.js'
export default {
	data() {
		return {
			id:'',
			task_detail:{
				category:{
					banner:''
				}
			},
			isLoading: true
		};
	},
	methods: {
		navTo(url) {
			if(url === 1) {
				return uni.navigateBack()
			}
			uni.navigateTo({ url });
		},
		async getDetail() {
			let res = await this.$http.taskDetail(this.id)
			console.log(res);
			this.task_detail = res.result
		},
		toNext() {
			plus.runtime.openWeb(this.task_detail.url);
		},
		async receive() {
			let res = await this.$http.taskReceive({
				id : this.task_detail.id
			})
			this.$t("领取成功！")
		}
	},
	computed:{
		banner() {
			return this.task_detail.category.banner === '' ? "" : config.ossBaseUrl+this.task_detail.category.banner
		}
	},
	onShow() {
		this.getDetail()
		setTimeout(()=>{
			this.isLoading = false
		},1000)
	},
	onLoad(options) {
		this.id = options.id
	}
};
</script>

<style lang="less">
.banner {
	width: 100%;
	height: 418rpx;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	.header {
		position: absolute;
		width: 100%;
		height: 128rpx;
		.back {
			position: absolute;
			left: 0;
			display: flex;
			align-items: center;
			width: 150rpx;
			height: 100%;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 40rpx;
			}
		}
	}
}
.content {
	width: 100%;
	height: 370rpx;
	border-bottom: 10rpx solid #f5f7fd;
	padding: 30rpx 0 0 40rpx;
	.c-title {
		width: 500rpx;
		font-size: 34rpx;
		color: #000;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.c-content {
		display: flex;
		width: 100%;
		height: 88rpx;
		margin-top: 26rpx;
		.c-left {
			flex: 1;
			display: flex;
			justify-content: center;
			flex-direction: column;
			border-right: 1px solid #d5d7d8;
			color: #898989;
			font-size: 24rpx;
			.list2 {
				margin-top: 24rpx;
			}
		}
		.c-right {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 204rpx;
			height: 100%;
			color: #ffa006;
			font-size: 36rpx;
		}
	}
	.c-tip {
		display: flex;
		width: 672rpx;
		height: 72rpx;
		border-radius: 14rpx;
		overflow: hidden;
		margin-top: 42rpx;
		.tip-l {
			flex: 1;
			background-color: #ebe2d1;
			color: #000201;
			font-size: 24rpx;
			line-height: 72rpx;
			padding-left: 22rpx;
		}
		.tip-r {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 97rpx;
			height: 72rpx;
			background-color: #3d3938;
			.r-text {
				width: 60rpx;
				font-size: 24rpx;
				color: #b59b6f;
			}
			image {
				width: 10rpx;
				height: 18rpx;
			}
		}
	}
	.c-select {
		display: flex;
		margin-top: 30rpx;
		.select-item {
			display: flex;
			align-items: center;
			margin-right: 130rpx;
			image {
				width: 22rpx;
				height: 22rpx;
				margin-right: 6rpx;
			}
			text {
				font-size: 22rpx;
				color: #8f8f8f;
			}
		}
	}
}
.shop-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 216rpx;
	border-bottom: 10rpx solid #f5f7fd;

	.list2-name {
		width: 370rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: #f5f7fd;
		border-radius: 20rpx;
		margin-left: 40rpx;
		color: #8a8a8a;
		font-size: 22rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list2-btn {
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		margin-right: 40rpx;
		.btn2 {
			width: 197rpx;
			height: 62rpx;
			border-radius: 31rpx;
			line-height: 62rpx;
			text-align: center;
			background-color: #1b2664;
			color: #fff;
		}
	}
}
.show-img {
	border-top: 40rpx solid #fff;
	border-bottom: 120rpx solid #fff;
}
.receive-btn {
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 96rpx;
	background-color: #1b2664;
	color: #fff;
	font-size: 32rpx;
}
</style>
