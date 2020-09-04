<template>
	<view>
		<view class="account">
			<image src="/static/images/profile/icon_zhifubao_pay.png" class="account-left"></image>
			<view class="account-center">
				<view class="c-text1">{{ info.info.bank_name }}</view>
				<view class="c-text2" v-if="info.info.bank_name !== '支付宝'">开户人:{{ info.info.name }} &nbsp;&nbsp;&nbsp;&nbsp;尾号:{{ info.info.account | formatCard }}</view>
				<view class="c-text2" v-else>支付宝账号:{{ info.info.account }}</view>
			</view>
			<image src="/static/images/profile/btn_01_right.png" class="account-right"></image>
		</view>
		<view class="money">
			<view class="money-title">提现金额</view>
			<view class="money-con">
				<text class="rmb">￥</text>
				<input type="number" placeholder="请输入提现金额" v-model="amount"/>
			</view>
		</view>
		<view class="tip1">
			<text class="t-text1">当前余额:</text>
			<text class="t-text2">{{ info.balance | formatPrice }}</text>
			<text class="t-text1">元</text>
		</view>
		<view class="tip2">
			<image src="/static/images/profile/icon_tishi.png" mode=""></image>
			<text class="t-text1">每天单笔提现金额不可超过{{limit.high_limit}}元，每天单笔提现金额不可低于{{limit.low_limit}}元，每天可提现{{limit.day_count}}次，</text>
		</view>
		<button class="btn" @click="getUserWithdrawal">确认提现</button>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			limit:{},
			amount:''
		};
	},
	computed: {
		...mapState(['info'])
	},
	filters: {
		formatCard(val) {
			return val.slice(-4)
		}
	},
	methods: {
		async getWithdrawalLimit() {
			let res = await this.$http.withdrawalLimit()
			console.log(res);
			this.limit = res.result
		},
		async getUserWithdrawal() {
			let res = await this.$http.userWithdrawal({
				amount:this.amount
			})
			this.$t("提现申请已提交")
			setTimeout(()=>{
				uni.navigateBack()
			},1500)
		}
	},
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url:'/pages/profile/withdraw-record'
		})
	},
	onShow() {
		this.getWithdrawalLimit()
	}
};
</script>

<style lang="less">
page {
	border-top: 4rpx solid #f7f9fc;
}
.account {
	display: flex;
	align-items: center;
	width: 100%;
	height: 94rpx;
	margin-top: 88rpx;
	.account-left {
		width: 70rpx;
		height: 70rpx;
		margin: 0 26rpx 0 46rpx;
	}
	.account-center {
		height: 94rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.c-text1 {
			color: #262626;
			font-size: 32rpx;
		}
		.c-text2 {
			color: #808080;
			font-size: 28rpx;
			margin-top: 26rpx;
		}
	}
	.account-right {
		width: 12rpx;
		height: 22rpx;
		margin-right: 50rpx;
	}
}
.money {
	width: 100%;
	height: 146rpx;
	padding: 0 58rpx;
	margin-top: 76rpx;
	.money-title {
		color: #333333;
		font-size: 28rpx;
		margin-bottom: 26rpx;
	}
	.money-con {
		display: flex;
		height: 88rpx;
		align-items: center;
		border-bottom: 1px solid #ececec;
		.rmb {
			font-size: 66rpx;
			color: #333;
		}
		input {
			font-size: 50rpx;
			color: #333;
		}
	}
}
.tip1 {
	display: flex;
	align-items: center;
	width: 100%;
	height: 36rpx;
	padding-left: 58rpx;
	margin-top: 66rpx;
	.t-text1 {
		color: #333333;
		font-size: 26rpx;
	}
	.t-text2 {
		color: #f9103c;
		font-size: 34rpx;
	}
}
.tip2 {
	display: flex;
	width: 100%;
	height: 36rpx;
	margin-top: 30rpx;
	padding: 0 30rpx 0 58rpx;
	image {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		margin-right: 12rpx;
	}
	.t-text1 {
		flex: 1;
		color: #b3b3b3;
		font-size: 24rpx;
	}
}
.btn {
	margin-top: 400rpx;
}
</style>
