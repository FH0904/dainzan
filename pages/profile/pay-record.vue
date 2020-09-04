<template>
	<view class="bill" style="height: 100vh;display: flex;flex-direction: column;">
		<fh-tab-control :tabItem="tabItem" :tabIndex="tabIndex" :sliderWidth="42" :bottom="0" :isBorder="true" @itemClick="itemClick"></fh-tab-control>
		
		<view class="bgd" style="flex: 1;background-color: #f5f7fd;display: flex;align-items: center;justify-content: center;" v-if="isShow">
			<uni-load-more status="loading"></uni-load-more>
		</view>

		<view class="bill-list" v-else>
			<view class="record-item" v-for="(item, index) in pageData.data" :key="index">
				<view class="item-left" v-if="type === 1">
						<text class="type" v-if="item.payment.status === 0">待支付</text>
						<text class="type" v-else-if="item.payment.status === 1">处理中</text>
						<text class="type" v-else-if="item.payment.status === 2">充值成功</text>
						<text class="type" v-else-if="item.payment.status === 3">充值失败</text>
						<text class="type" v-else-if="item.payment.status === 4">已退款</text>
						<text class="date" v-if="item.channel === 1">在线充值({{item.user_level.name}})</text>
						<text class="date" v-else-if="item.channel === 2">后台充值({{item.user_level.name}})</text>
						<text class="date" v-else-if="item.channel === 3">扫码充值({{item.user_level.name}})</text>
						<text class="date">{{ item.updated_at }}</text>
				</view>
				<view class="item-left" v-if="type === 2">
					<text class="type" v-if="item.status === 0">待审核</text>
					<text class="type" v-else-if="item.status === 1">已通过</text>
					<text class="type" v-else-if="item.status === 2">已拒绝</text>
					<text class="date">扫码充值({{item.user_level.name}})</text>
					<text class="date">{{ item.updated_at }}</text>
				</view>
				<view class="item-right" v-if="item.balance > 0">{{ item.balance | formatPrice }}</view>
				<view class="item-right-active" v-else-if="item.balance < 0">{{ item.balance | formatPrice }}</view>
				<view class="item-right-text" v-else>{{item.remark}}</view>
			</view>
			<uni-load-more :status="status" v-if="pageData.data.length>=10"></uni-load-more>
			<view style="text-align: center;" v-if="pageData.data.length === 0">
				<image src="/static/images/index/pic_zanwu.png" style="width: 450rpx;height: 230rpx;margin-top: 400rpx;"></image>
				<view style="color: #615f60;font-size: 28rpx;margin-top: 50rpx;">暂无充值记录</view>
			</view>
		</view>
		
	</view>
</template>
<script>
import loadMore from '@/utils/mixin/loadMore.js';
export default {
	mixins: [loadMore],
	data() {
		return {
			tabItem: ["全部充值","扫码充值"],
			type:1,
			tabIndex:0,
			isShow:false
		};
	},
	methods: {
		async getData() {
			let res = await this.$http.PayList({
				type:this.type,
				page:this.page
			});
			if(this.page === 1) {
				this.pageData = res.result
				console.log(this.pageData);
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
			this.page = 1;
			this.type = index + 1
			this.getData();
		}
	},
	onShow() {
		this.getData();
	}
};
</script>

<style lang="less">
page {
	padding-top: 81rpx;
}
.empty {
	text-align: center;
	margin-top: 450rpx;
	color: rgb(119, 119, 119);
	font-size: 30rpx;
}
.bill-list {
	padding: 0 30rpx;
}
.record-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 170rpx;
	border-bottom: 1px solid #eaeaea;

	.item-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		.type {
			color: #333333;
			font-size: 28rpx;
		}
		.date {
			color: #bebebe;
			font-size: 22rpx;
			margin-top: 18rpx;
		}
	}
	.item-right {
		color: #f9103c;
		font-size: 40rpx;
	}
	.item-right-active {
		color: #2a2a2a;
		font-size: 40rpx;
	}
	.item-right-text {
		color: #f9103c;
		font-size: 30rpx;
	}
}
.record-item:last-child {
	border: none;
}
</style>
