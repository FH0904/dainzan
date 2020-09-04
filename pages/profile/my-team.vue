<template>
	<view>
		<fh-tab-control :tabItem="tabItem" :tabIndex="tabIndex" style="border-bottom: 10rpx solid #f5f7fd;" @itemClick="itemClick"></fh-tab-control>
		<loading-plus v-if="isLoading"></loading-plus>
		<view class="card">
			<view class="card-item">
				<view class="list1">{{ result.total_recharge_sum | formatPrice }}</view>
				<view class="list2">
					<image src="/static/images/profile/icon_chongzhi.png" mode=""></image>
					<text>总充值</text>
				</view>
				<view class="list3">当前查看团队总人数：{{ total }}人</view>
			</view>
		</view>
		<uni-list style="margin-top: 108rpx;" v-if="result.team.length > 0">
			<uni-list-item
				:title="item.user.nickname"
				:thumb="item.user.avatar"
				:isBorder="true"
				:rightText="'加入时间:' + item.created_at"
				:width="66"
				:height="66"
				:showArrow="false"
				v-for="(item, index) in result.team"
				:key="index"
			>
				<template v-slot:left="">
					<view class="tip">
						<image src="/static/images/profile/icon_01.png" mode="widthFix"></image>
						<text>{{ item.user.user_level.name }}</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view v-else style="margin-top: 400rpx; text-align: center; color: #666; ">该级人数为0</view>
	</view>
</template>

<script>
import config from '@/service/config.js';
export default {
	data() {
		return {
			result: {
				team: []
			},
			total: '',
			tabIndex: 0,
			isLoading: true,
			tabItem: ['一级', '二级', '三级']
		};
	},
	methods: {
		async getTeamList(level) {
			let res = await this.$http.teamList({ level });
			this.result = res.result;
			console.log(this.result);
			switch (level) {
				case 1:
					this.total = res.result.level_one_count;
					break;
				case 2:
					this.total = res.result.level_two_count;
					break;
				case 3:
					this.total = res.result.level_three_count;
					break;
			}
			this.result.team.forEach(item => {
				return (item.user.avatar = item.user.avatar === null ? '/static/images/profile/btn_touxiang.png' : config.ossBaseUrl + item.user.avatar);
			});
		},
		itemClick(index) {
			this.tabIndex = index;
			this.getTeamList(index + 1);
		}
	},
	onShow() {
		this.getTeamList(1);
		setTimeout(() => {
			this.isLoading = false;
		}, 1100);
	}
};
</script>

<style lang="less">
/deep/ .uni-list-item__icon-img {
	border-radius: 50%;
}
.card {
	position: relative;
	top: 102rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 426rpx;
	border-bottom: 10rpx solid #f5f7fd;
	box-sizing: content-box;
	.card-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 690rpx;
		height: 360rpx;
		background-image: linear-gradient(151deg, #5b6498 0%, #1b2664 100%);
		border-radius: 20rpx;
		color: #ffffff;
		.list1 {
			font-size: 66rpx;
			margin-top: 110rpx;
		}
		.list2 {
			display: flex;
			align-items: flex-end;
			font-size: 32rpx;
			margin-top: 30rpx;
			image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 14rpx;
			}
		}
		.list3 {
			margin-top: 55rpx;
			font-size: 30rpx;
		}
	}
}
.tip {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 108rpx;
	height: 34rpx;
	background-image: linear-gradient(145deg, #f2d9a5 0%, #cfb385 100%);
	border-radius: 17rpx;
	margin-left: 22rpx;
	image {
		width: 12rpx;
		height: 14rpx;
	}
	text {
		font-size: 16rpx;
		color: #393026;
		margin-left: 6rpx;
	}
}
</style>
