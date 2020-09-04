<template>
	<view class="account">
		<view class="account-item">
			<view class="item-title">提现类型</view>
			<view class="item-con">
				<picker @change="bindPickerChange" :value="index" :range="array" style="position: absolute;width: 100%;height: 70rpx;">
				</picker>
				<view>
					{{array[index]}}
				</view>
				<image src="/static/images/profile/btn_01_right.png" style="width: 18rpx;height: 30rpx;position: absolute;top: 0;bottom: 0;right: 20rpx;margin: auto;"></image>
			</view>
		</view>
		<view class="account-item">
			<view class="item-title">姓名</view>
			<view class="item-con">
				<input type="text" placeholder="姓名" v-model="name" placeholder-style="color: #444444;font-size:30rpx;"/>
			</view>
		</view>
		<view class="account-item">
			<view class="item-title">账号或银行卡号</view>
			<view class="item-con">
				<input type="text" placeholder="账号" v-model="account" placeholder-style="color: #444444;font-size:30rpx;"/>
			</view>
		</view>
		<button class="btn" @click="confirm"> 确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				array:[],
				index:0,
				name:'',
				account:''
			};
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value;
			},
			async confirm() {
				await this.$http.accountBank({
					bank_name:this.array[this.index],
					name: this.name,
					account:this.account
				})
				this.$t('添加成功！');
				setTimeout(() => {
					uni.hideToast();
					uni.navigateBack()
				}, 1500);
			},
			async getBankList() {
				let res = await this.$http.bankList()
				console.log(res);
				this.array = res.result
			}
		},
		onShow() {
			this.getBankList()
		}
	}
</script>

<style lang="less">
	page {
		border-top: 4rpx solid #f5f7fd;
	}
.account-item {
	width: 100%;
	padding:0 30rpx;
	.item-title {
		width: 100%;
		color: #0e1c3c;
		font-size: 30rpx;
		margin: 62rpx 0 16rpx 0;
	}
	.item-con {
		position: relative;
		display: flex;
		align-items: center;
		width: 684rpx;
		height: 70rpx;
		background-color: #ffffff;
		border-radius: 6rpx;
		border: solid 2rpx #e8e8e8;
		padding-left: 14rpx;
	}
}
.btn {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 250rpx;
	margin: auto;
}
</style>
