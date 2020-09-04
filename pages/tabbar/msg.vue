<template>
	<view style="height: 100vh;display: flex;flex-direction: column;">
		<loading-plus v-if="beforeReady"></loading-plus>
		
		
		
		<fh-tab-control :tabItem="tabItem" :isFixed="false" :tabIndex="tabIndex" :sliderWidth="50" :bottom="0" @itemClick="itemClick"></fh-tab-control>
		
		
		<view class="bgd" style="flex: 1;background-color: #f5f7fd;display: flex;align-items: center;justify-content: center;" v-if="isShow">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		
		
		<swiper :current="swiperIndex"  :duration="150" style="flex: 1;" @change="onChangeTab" v-if="!isShow">
			<swiper-item style="display: flex;" v-for="(ite,index) in 2" :key="index">
				<scroll-view style="flex: 1;" scroll-y="true" @scrolltolower="loadmore()">
					<view class="notice-list" v-if="pageData.data.length !== 0">
						<view class="notice-item" @click="navTo('/pages/msg/msg-detail?id=' + item.id)" v-for="(item, index) in pageData.data" :key="index">
							<view class="img">
								<image src="/static/images/profile/btn_xiaoxi.png" mode="" v-if="type === 1"></image>
								<image src="/static/images/profile/news.png" mode="" v-if="type === 2"></image>
								<view class="dot" v-if="!item.is_read"></view>
							</view>
							<view class="list-right">
								<text class="r-list1">{{ item.title }}</text>
								<text class="r-list2" v-if="type === 1">{{ item.content }}</text>
								<text class="r-list3">{{ item.created_at }}</text>
							</view>
						</view>
						<uni-load-more :status="status" v-if="pageData.data.length > 10"></uni-load-more>
						
					</view>
					<view style="text-align: center;" v-else>
						<image src="/static/images/index/pic_zanwu.png" style="width: 450rpx;height: 230rpx;margin-top: 400rpx;"></image>
						<view style="color: #615f60;font-size: 28rpx;margin-top: 50rpx;">暂无数据</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import loading from '@/utils/mixin/loading.js';
export default {
	mixins: [loading],
	data() {
		return {
			tabItem: ['系统消息', '新闻资讯'],
			type: 1,
			tabIndex: 0,
			swiperIndex:0,
			page: 1,
			pageData: {
				data: []
			},
			status: 'more',
			isShow:false
		};
	},
	methods: {
		navTo(url) {
			uni.navigateTo({ url });
		},
		async getData() {
			let res = await this.$http.userNotify({
				type: this.type,
				page: this.page
			});
			if (this.page === 1) {
				this.pageData = res.result;
			} else {
				this.pageData.data.push(...res.result.data);
			}
		},
		itemClick(index) {
			this.isShow = true
			setTimeout(()=>{
				this.isShow = false
			},1000)
			this.tabIndex = index
			this.swiperIndex = index
			this.page = 1;
			this.type = index + 1;
			this.getData();
		},
		onChangeTab(e) {
			this.itemClick(e.detail.current)
		},
		loadmore() {
			if (this.pageData.last_page === 1) return;
			setTimeout(() => {
				this.status = 'loading';
				if (this.page >= this.pageData.last_page) {
					return (this.status = 'noMore');
				}
				this.page++;
				this.getData();
			},500)
		}
	},
	onShow() {
		this.getData();
	}
};
</script>

<style lang="less">
page {
	border-top: 4rpx solid #f5f7fd;
	background-color: #f5f7fd;
	overflow: hidden;
}
.notice-list {
	padding-top: 40rpx;
	padding-bottom: 200rpx;
	.notice-item {
		display: flex;
		align-items: center;
		width: 100%;
		height: 172rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		.img {
			position: relative;
			width: 80rpx;
			height: 80rpx;
			margin: 0 26rpx;
			image {
				width: 100%;
				height: 100%;
			}
			.dot {
				position: absolute;
				top: -10rpx;
				right: -10rpx;
				width: 24rpx;
				height: 24rpx;
				border-radius: 50%;
				background-color: #dd524d;
			}
		}
		.list-right {
			flex: 1;
			display: flex;
			justify-content: center;
			flex-direction: column;
			.r-list1 {
				color: #313131;
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
			.r-list2 {
				width: 500rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 20rpx;
				color: #787878;
				font-size: 26rpx;
			}
			.r-list3 {
				color: #b4b7be;
				font-size: 24rpx;
			}
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
