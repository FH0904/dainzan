<template>
	<view class="wrapper">
		<loading-plus v-if="beforeReady"></loading-plus>

		<!-- <my-swiper :bannerData = "bannerData"></my-swiper> -->
		<view class="top-bgd"></view>
		<view class="swiper" @click="navTo('/pages/profile/help-center')"></view>
		<view class="vip-classify">
			<view class="classify-item" v-for="(item, index) in memberInfo" :key="index" @click="navTo('/pages/index/member-hall?level=' + item.level)">
				<image :src=" 'https://douyin-like.oss-cn-hongkong.aliyuncs.com/' + item.icon" mode=""></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<view class="team-income">
			<view class="item" @click="navTo('/pages/profile/my-team')">
				<view class="item-text1">我的团队</view>
				<view class="item-text2">查看人数</view>
				<image src="/static/images/index/icon_team.png" class="l-img"></image>
			</view>
			<view class="item">
				<view class="item-text1">今日收益</view>
				<view class="item-text2">{{ TodayProfit | formatPrice}}</view>
				<image src="/static/images/index/icon_shouyi.png" class="r-img"></image>
			</view>
		</view>
		<view class="recommend">
			<view class="recommend-t">
				<view class="t-left">推荐任务</view>
				<view class="t-right" @click="navTo('/pages/index/member-hall')">
					<text>更多</text>
					<image src="/static/images/index/icon_xiala.png" mode=""></image>
				</view>
			</view>
			<view class="c-item" v-for="(item, index) in pageData.data" :key="index" @click="toDetail(item.id)">
				<view class="item-l">
					<view class="l-img"><image src="/static/images/index/icon_douyin.png" mode=""></image></view>
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
		</view>
		<uni-load-more :status="status" v-if="pageData.data.length >= 10"></uni-load-more>
		<view style="text-align: center;margin-bottom: 150rpx;" v-if="pageData.data.length === 0">
			<image src="/static/images/index/pic_zanwu.png" style="width: 450rpx;height: 230rpx;margin-top: 100rpx;"></image>
			<view style="color: #615f60;font-size: 28rpx;margin-top: 50rpx;">暂无数据</view>
		</view>
	</view>
</template>

<script>
import loading from '@/utils/mixin/loading.js';
import loadMore from '@/utils/mixin/loadMore.js';
export default {
	mixins: [loading,loadMore],
	data() {
		return {
			bannerData: [],
			TodayProfit: 0,
			memberInfo: []
		};
	},
	methods: {
		navTo(url) {
			uni.navigateTo({ url });
		},
		async getTodayProfit() {
			let res = await this.$http.getTodayProfit({
				page: this.page
			});
			console.log(res);
			this.TodayProfit = res.result;
		},
		async getUserLevel() {
			let res = await this.$http.userLevel();
			console.log(res);
			this.memberInfo = res.result.splice(0, 3);
		},
		async getData() {
			let res = await this.$http.task();
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
		this.getTodayProfit();
		this.getUserLevel();
		this.getData();
	},
	onPullDownRefresh() {
		this.getTodayProfit();
		this.getUserLevel();
		this.getData();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
		setTimeout(()=>{
			this.$t('刷新成功')
		},1500)
	},
	onNavigationBarSearchInputConfirmed(e) {
		console.log(e);
		uni.navigateTo({
			url:'/pages/index/searchList?keywords='+e.text
		})
	},
	async onNavigationBarButtonTap() {
		let res = await this.$http.customerUrl()
		plus.runtime.openURL(res.result)
	}
};
</script>

<style lang="less">
.wrapper {
	margin-bottom: 30rpx;
}
.top-bgd {
	width: 100%;
	height: 148rpx;
	background: url(/static/images/index/pic_beijing.png) no-repeat;
	background-size: 100% 100%;
	background-position: 0 0;
}
.swiper {
	width: 654rpx;
	height: 264rpx;
	margin: -136rpx auto 0;
	background-color: #1a1f56;
	border-radius: 20rpx;
	background: url(/static/images/index/pic_xinshouzhinan.png) no-repeat;
	background-size: 100% 100%;
	box-shadow: 0px 9px 12px 1px rgba(27, 28, 81, 0.26);
}
.vip-classify {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 140rpx;
	margin: 50rpx 0 55rpx 0;
	padding: 0 62rpx;
	.classify-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100rpx;
		height: 140rpx;
		image {
			width: 90rpx;
			height: 90rpx;
		}
		text {
			color: #1b2664;
			font-size: 26rpx;
		}
	}
}
.team-income {
	width: 100%;
	height: 172rpx;
	display: flex;
	justify-content: space-between;
	padding: 0 44rpx;
	margin-bottom: 57rpx;
	.item {
		position: relative;
		width: 310rpx;
		height: 172rpx;
		background-color: #1b2664;
		border-radius: 40rpx;
		padding: 44rpx 0 0 34rpx;
		color: #fff;
		.item-text1 {
			font-size: 34rpx;
			font-weight: bold;
		}
		.item-text2 {
			margin-top: 26rpx;
			font-size: 20rpx;
		}
		.l-img {
			position: absolute;
			bottom: 30rpx;
			right: 18rpx;
			width: 98rpx;
			height: 50rpx;
		}
		.r-img {
			position: absolute;
			bottom: 30rpx;
			right: 26rpx;
			width: 78rpx;
			height: 58rpx;
		}
	}
}
.recommend {
	width: 100%;
	padding: 0 44rpx;
	.recommend-t {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 28rpx;
		.t-left {
			color: #1a2564;
			font-size: 32rpx;
		}
		.t-right {
			display: flex;
			align-items: center;
			text {
				color: #1a2564;
				font-size: 26rpx;
			}
			image {
				width: 8rpx;
				height: 12rpx;
				margin-left: 18rpx;
			}
		}
	}
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
				width: 40rpx;
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
.empty {
	text-align: center;
	margin-top: 450rpx;
	color: rgb(119, 119, 119);
	font-size: 30rpx;
}
</style>
