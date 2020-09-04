<template>
	<view>
		<loading-plus v-if="beforeReady"></loading-plus>

		<view class="header">
			<view class="header-info">
				<image :src="avatar || '/static/images/login_Img/logo.png'" mode="" class="avatar"></image>
				<view class="info-right">
					<view class="r-title">{{ info.nickname }}</view>
					<view class="r-code">
						<view class="code-t1">邀请码：{{ info.id }}</view>
						<view class="code-t2">
							<image src="/static/images/profile/icon_vip.png" mode=""></image>
							<text>{{ info.level_name }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="detailed">
			<view class="detailed-item">
				<text class="number">{{ accountIndex.team_profit }}</text>
				<text class="text">团队收益</text>
			</view>
			<view class="detailed-item">
				<text class="number">{{ accountIndex.task_profit }}</text>
				<text class="text">任务收益</text>
			</view>
			<view class="detailed-item">
				<text class="number">{{ accountIndex.team_count }}</text>
				<text class="text">团队人数</text>
			</view>
			<view class="detailed-item">
				<text class="number">{{ accountIndex.receive_count }}</text>
				<text class="text">剩余次数</text>
			</view>
			<view class="detailed-item-active" @click="navTo('/pages/profile/withdrawal')" hover-class="hover-btn"><view class="item-btn">提现</view></view>
		</view>

		<!-- VIP -->
		<view class="bd-vip">
			<view class="vip-left">
				<image src="/static/images/profile/btn_vip1.png" mode=""></image>
				<text>尊享专属特权，躺着也有收益</text>
			</view>
			<view class="vip-right" @click="navTo('/pages/profile/open-member')">开通VIP</view>
		</view>

		<view class="task-status">
			<view class="task-item" style="margin-left: 50rpx;" @click="navTo('/pages/profile/task-record')">
				<image src="/static/images/profile/icon_jinxing.png" />
				<text>进行中</text>
			</view>
			<view class="task-item">
				<image src="/static/images/profile/icon_shenhe.png" @click="navTo('/pages/profile/success-task?type='+1)" />
				<text>审核中</text>
			</view>
			<view class="task-item" style="margin-right: 50rpx;" @click="navTo('/pages/profile/success-task?type='+2)">
				<image src="/static/images/profile/icon_fin.png" />
				<text>已审核</text>
			</view>
		</view>

		<view class="invitation">
			<image src="/static/images/profile/icon_gift.png" mode=""></image>
			<view class="center">
				<text class="title">邀请有奖</text>
				<text class="subtitle">邀请好友并且注册奖励红包</text>
			</view>
			<view class="right" @click="navTo('/pages/profile/invitation?id='+info.id)">立即领取</view>
		</view>
		<view class="list">
			<uni-list>
				<uni-list-item
					title="个人信用"
					:showArrow="true"
					:width="36"
					:height="42"
					thumb="/static/images/profile/icon_@2.png"
					@click="navTo('/pages/profile/my-credit')"
				></uni-list-item>
				<uni-list-item
					title="个人信息"
					:showArrow="true"
					:width="40"
					:height="40"
					thumb="/static/images/profile/icon_01_@2.png"
					@click="navTo('/pages/profile/personal-information')"
				></uni-list-item>
				<uni-list-item
					title="我的账单"
					:showArrow="true"
					:width="36"
					:height="40"
					thumb="/static/images/profile/icon_02_@2.png"
					@click="navTo('/pages/profile/my-bill')"
				></uni-list-item>
				<uni-list-item
					title="我的团队"
					:showArrow="true"
					:width="36"
					:height="38"
					thumb="/static/images/profile/icon_03_@2.png"
					@click="navTo('/pages/profile/my-team')"
				></uni-list-item>
				<uni-list-item
					title="修改密码"
					:showArrow="true"
					:width="40"
					:height="40"
					thumb="/static/images/profile/icon_04_@2.png"
					@click="navTo('/pages/profile/change-password')"
				></uni-list-item>
			</uni-list>
		</view>
		<view class="exit-login" @click="exit">退出登录</view>
	</view>
</template>

<script>
import config from '@/service/config.js'
import loading from '@/utils/mixin/loading.js';
export default {
	mixins: [loading],
	data() {
		return {
			info: {
				avatar: ''
			},
			accountIndex: {}
		};
	},
	methods: {
		navTo(url) {
			if(url === '/pages/profile/withdrawal') {
				if(!this.info.info.bank_name) {
					uni.showModal({
						title:'',
						content: '您还未绑定提现账户',
						confirmText:'去添加',
						success(res) {
							if(res.confirm) {
								uni.navigateTo({
									url: '/pages/profile/account'
								})
							}
						}
					})
					return
				}else {
					return uni.navigateTo({ url });
				}
			}
			
			uni.navigateTo({ url });
		},
		async getAccountInfo() {
			let res = await this.$http.accountInfo();
			this.info = res.result;
			this.$store.commit('changeInfo', res.result);
		},
		async getAccountIndex() {
			let res = await this.$http.accountIndex();
			this.accountIndex = res.result;
		},
		exit() {
			uni.showModal({
				title: '',
				content: '确定退出?',
				success(res) {
					if (res.confirm) {
						uni.removeStorageSync("userToken")
						uni.redirectTo({
							url:'/pages/login/pwd-login'
						})
					}
				}
			});
		}
	},
	computed: {
		avatar() {
			if (this.info.avatar === null) return;
			return this.info.avatar.search('http') === -1 ? config.ossBaseUrl + this.info.avatar : this.info.avatar;
		}
	},
	onShow() {
		this.getAccountInfo();
		this.getAccountIndex();
	},
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url:'/pages/profile/help-center'
		})
	}
};
</script>

<style lang="less">
page {
	background-color: #f5f7fd;
}
.hover-btn {
	transform: translate(1rpx, 1rpx);
}
.header {
	width: 100%;
	height: 334rpx;
	background: url(/static/images/profile/pic.png) no-repeat;
	background-position: 0 0;
	background-size: 100% 100%;
	.header-info {
		display: flex;
		align-items: center;
		margin-left: 50rpx;
		padding-top: 58rpx;
		.avatar {
			width: 125rpx;
			height: 125rpx;
			border-radius: 50%;
		}
		.info-right {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-left: 20rpx;
			.r-title {
				font-size: 28rpx;
				color: #fff;
			}
			.r-code {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				color: #fff;
				margin-top: 20rpx;
				.code-t2 {
					display: flex;
					align-items: flex-end;
					image {
						width: 30rpx;
						height: 30rpx;
						margin: 0 10rpx 0 40rpx;
					}
				}
			}
		}
	}
}
.detailed {
	display: flex;
	align-items: center;
	width: 680rpx;
	height: 170rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	margin: -54rpx auto 0;
	.detailed-item {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #999;
		.number {
			font-size: 28rpx;
		}
		.text {
			font-size: 22rpx;
			margin-top: 18rpx;
		}
	}
	.detailed-item:nth-child(-n + 3)::after {
		content: '';
		position: absolute;
		right: 0;
		width: 2rpx;
		height: 22rpx;
		background-color: #999;
	}
	.detailed-item-active {
		flex: 1.3;
		display: flex;
		flex-direction: column;
		align-items: center;
		.item-btn {
			width: 140rpx;
			height: 58rpx;
			line-height: 58rpx;
			text-align: center;
			font-size: 26rpx;
			color: #fff;
			background-color: #1b2664;
			border-radius: 29rpx;
		}
	}
}

.bd-vip {
	width: 700rpx;
	height: 128rpx;
	border-radius: 15rpx 15rpx 0px 0px;
	opacity: 0.95;
	background: url(../../static/images/profile/pic_vip.png) no-repeat;
	background-size: 100% 100%;
	margin: 8rpx auto 0;
	padding: 0 32rpx;
	display: flex;
	justify-content: space-between;
	.vip-left {
		display: flex;
		flex-direction: column;
		image {
			width: 180rpx;
			height: 40rpx;
			margin-top: 24rpx;
		}
		text {
			margin-top: 18rpx;
			color: #b0b1b9;
			font-size: 20rpx;
		}
	}
	.vip-right {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 150rpx;
		height: 58rpx;
		background-color: #ecd8ae;
		border-radius: 15rpx;
		color: #2f3133;
		font-size: 24rpx;
		margin-top: 28rpx;
	}
}

.task-status {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 678rpx;
	height: 150rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	margin: 10rpx auto 12rpx;
	.task-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		image {
			width: 81rpx;
			height: 81rpx;
		}
		text {
			font-size: 26rpx;
			color: #333333;
		}
	}
}

.invitation {
	display: flex;
	align-items: center;
	width: 750rpx;
	height: 142rpx;
	background-color: #ffffff;
	margin-top: 12rpx;
	image {
		width: 94rpx;
		height: 88rpx;
		margin-left: 43rpx;
	}
	.center {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: 24rpx;
		.title {
			color: #333333;
			font-size: 34rpx;
		}
		.subtitle {
			font-size: 26rpx;
			color: #999;
			margin-top: 14rpx;
		}
	}
	.right {
		color: #47b9eb;
		font-size: 26rpx;
		margin-right: 54rpx;
	}
}

.list {
	margin-top: 14rpx;
}
.exit-login {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 92rpx;
	color: #f98166;
	font-size: 30rpx;
	margin-top: 20rpx;
	background-color: #ffffff;
	margin: 20rpx 0 110rpx;
}
</style>
