<template>
	<view>
		
		<loading-plus v-if="isShow"></loading-plus>
		
			<scroll-view scroll-x  class="member-list">
				<view
					class="member-item"
					v-for="(item, index) in memberList"
					:key="index"
					:style="{ background: index === currentIndex ? 'url(/static/images/profile/pic_02.png)' : '', 'background-size': index === currentIndex ? '100% 100%' : '' }"
					@click="itemClick(index,item.level,item.status)"
				>
					
					<view v-if="item.status">
						<image :src="index === currentIndex ? '/static/images/profile/btn_vip.png' : '/static/images/profile/VIP.png'" mode=""></image>
						<view :style="{ color: index === currentIndex ? '' : '#1b2664' }">{{ item.name }}</view>
						<view :style="{ color: index === currentIndex ? '' : '#1b2664' }">￥{{ item.price }}</view>
					</view>
					<view v-else >
						<image src="/static/images/profile/VIP.png" mode="" class="gray"></image>
						<view style="color: #999;">{{ item.name }}</view>
						<view style="color: #999;">￥{{ item.price | formatPrice }}</view>
					</view>
				</view>
			</scroll-view>
			
		<view class="pay-mode">
			<view class="title">支付方式</view>
			<!-- <view class="mode" style="border-bottom: 1px solid #eaeaea;">
				<view class="mode-left">
					<image src="/static/images/profile/btn_card.png" mode=""></image>
					<text>银行卡支付</text>
				</view>
				<radio value="" color="#1b2664" style="transform: scale(.8);margin-right: 40rpx;" :checked="checked1" @click="radioClick(1)" />
			</view>
			<view class="mode" style="border-bottom: 1px solid #eaeaea;">
				<view class="mode-left">
					<image src="/static/images/profile/btn_zhifubao.png" mode="" style="width: 36rpx;height: 36rpx;"></image>
					<text>支付宝支付</text>
				</view>
				<radio value="" color="#1b2664" style="transform: scale(.8);margin-right: 40rpx;" :checked="checked2" @click="radioClick(2)" />
			</view> -->
			<view class="mode">
				<view class="mode-left">
					<image src="/static/images/profile/code.png" mode="" style="width: 36rpx;height: 36rpx;"></image>
					<text>扫码支付</text>
				</view>
				<image src="/static/images/profile/btn_01_right.png" mode="" style="width: 18rpx;height: 30rpx;margin-right: 66rpx;"></image>
			</view>
		</view>
		<button class="btn" @click="navTo('/pages/profile/scancode-pay')">去开通</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			memberList: [],
			currentIndex: -1,
			checked1: false,
			checked2: false,
			scrollLeft:'200rpx',
			isShow:true
		};
	},
	methods: {
		itemClick(index,level,status) {
			if(!status) return this.$t("无法充值该类型")
			this.currentIndex = index;
			this.$store.commit('getLevel',level)
		},
		radioClick(index) {
			if(index === 1) {
				this.checked1 = !this.checked1
				this.checked2 = false
				
			}else {
				this.checked2  = !this.checked2
				this.checked1 = false
			}
		},
		navTo(url) {
			if(url === '/pages/profile/scancode-pay' && this.currentIndex === -1) {
				return this.$t('请选择充值类型')
			}
			uni.navigateTo({url})
		},
		async userLevelRecharge() {
			let res = await this.$http.userLevelRecharge()
			console.log(res);
			this.memberList = res.result
		}
	},
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: '/pages/profile/pay-record'
		});
	},
	onShow() {
		this.userLevelRecharge()
		setTimeout(()=>{
			this.isShow = false
		},500)
	}
};
</script>

<style lang="less">
.gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    
    filter: grayscale(100%);
	
    filter: gray;
}
.member-list {
	width: 100%;
	height: 300rpx;
	white-space: nowrap;
	background-color: #fff;
	.member-item {
		display: inline-block;
		width: 230rpx;
		height: 127rpx;
		border-radius: 15rpx;
		box-shadow: 0px 6px 32px 0px rgba(0, 35, 68, 0.14);
		margin-left: 40rpx;
		margin-right: 20rpx;
		margin-top: 100rpx;
		text-align: center;
		image {
			width: 32rpx;
			height: 28rpx;
			margin-top: 14rpx;
		}
		view {
			color: #ffffff;
			font-size: 22rpx;
		}
		view:nth-child(2) {
			margin: 10rpx 0;
		}
	}
}
.pay-mode {
	width: 100%;
	padding: 0 48rpx;
	margin-top: 60rpx;
	.title {
		color: #818181;
		font-size: 30rpx;
		margin-bottom: 44rpx;
	}
	.mode {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 88rpx;
		.mode-left {
			display: flex;
			align-items: center;
			image {
				width: 44rpx;
				height: 28rpx;
				margin-right: 20rpx;
			}
			text {
				color: #3b3b3b;
				font-size: 28rpx;
			}
		}
	}
}
.btn {
	margin-top: 400rpx;
}
</style>
