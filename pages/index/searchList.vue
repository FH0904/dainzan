<template>
	<view>
		<loading-plus v-if="isLoading"></loading-plus>
		<view class="c-item" v-for="(item, index) in pageData.data" :key="index" @click="toDetail(item.id)">
			<view class="item-l">
				<view class="l-img"><image :src="item.category.icon" mode=""></image></view>
			</view>
			<view class="item-c">
				<view class="c-title">{{ item.title }}</view>
				<view class="c-tag">
					<image src="/static/images/index/icon_huangguan.png" mode=""></image>
					<text>{{ item.level_info.name }}</text>
				</view>
				<view class="c-number">剩余数量： {{ item.remaining_quantity }}</view>
			</view>
			<view class="item-r">
				<text>{{ item.amount | formatPrice }}</text>
				<image src="/static/images/index/icon_big_xiala.png" mode=""></image>
			</view>
		</view>
		<uni-load-more :status="status" v-if="pageData.data.length > 10"></uni-load-more>
		<view style="text-align: center;" v-if="pageData.data.length === 0">
			<image src="/static/images/index/pic_zanwu.png" style="width: 450rpx;height: 230rpx;margin-top: 400rpx;"></image>
			<view style="color: #615f60;font-size: 28rpx;margin-top: 50rpx;">未找到您要搜索的内容</view>
		</view>
	</view>
</template>

<script>
import loadMore from '@/utils/mixin/loadMore.js';
import config from '@/service/config.js';
export default {
	mixins: [loadMore],
	data() {
		return {
			isLoading: true
		};
	},
	methods: {
		async getData() {
			console.log(this.tabIndex);
			let res = await this.$http.task({
				title: this.title,
				page: this.page
			});
			res.result.data.forEach(item => {
				item.category.icon = config.ossBaseUrl + item.category.icon;
			});
			console.log(res, 1111111);
			if (this.page === 1) {
				this.pageData = res.result;
			} else {
				this.pageData.data.push(...res.result.data);
			}
		},
		toDetail(id) {
			uni.navigateTo({
				url: '/pages/index/task-detail?id=' + id
			});
		}
	},
	onShow() {
		this.getData();
		setTimeout(() => {
			this.isLoading = false;
		}, 500);
	},
	onLoad(options) {
		this.title = options.keywords;
	}
};
</script>

<style lang="less">
page {
	padding-top: 50rpx;
}
.c-item {
	display: flex;
	width: 680rpx;
	height: 156rpx;
	background-color: #ffffff;
	box-shadow: 0px 6rpx 32rpx 0px rgba(0, 35, 68, 0.14);
	border-radius: 34rpx;
	margin: 0 auto 32rpx;
	.item-l {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 2;
		.l-img {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 105rpx;
			height: 105rpx;
			border-radius: 50%;
			background-color: #ebebf3;
			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	.item-c {
		padding-top: 10rpx;
		flex: 4;
		.c-title {
			color: #1a2564;
			line-height: 36rpx;
			font-size: 26rpx;

			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.c-tag {
			display: flex;
			align-items: flex-end;
			margin: 10rpx 0;
			image {
				width: 19rpx;
				height: 19rpx;
				margin-right: 12rpx;
			}
			text {
				color: #ffbd55;
				font-size: 18rpx;
			}
		}
		.c-number {
			color: #1a2564;
			font-size: 18rpx;
			margin-top: 20rpx;
		}
	}
	.item-r {
		flex: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		text {
			color: #fb5081;
			font-size: 24rpx;
		}
		image {
			width: 8rpx;
			height: 16rpx;
			margin-left: 20rpx;
		}
	}
}
</style>
