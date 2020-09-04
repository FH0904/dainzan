<template>
	<view>
		
		<loading-plus v-if="isShow"></loading-plus>
		
		<view class="avatar" @click="changeAvatar">
			<text>{{info.nickname}}</text>
			<image :src="avatar||'/static/images/login_Img/logo.png'" ></image>
		</view>
		<uni-list>
			<uni-list-item title="用户名" :showArrow="true" :isBorder="true" :rightText="info.nickname" @click="navTo('/pages/profile/modify-name')"></uni-list-item>
			<uni-list-item title="性别" :showArrow="true" :isBorder="true" :rightText="array[index]"  style="position: relative;">
				<picker @change="bindPickerChange" :value="index" :range="array" style="position: absolute;width: 100%;height: 100%;">
				</picker>
			</uni-list-item>
			<uni-list-item title="手机号" :showArrow="true" :isBorder="true" :rightText="info.phone" @click="navTo('/pages/profile/modify-number')"></uni-list-item>
			<uni-list-item title="提现账户" :showArrow="true" :isBorder="true" :rightText="info.info.account||'未添加'" @click="navTo('/pages/profile/account')"></uni-list-item>
		</uni-list>
		<view class="border"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			index:0,
			array:['保密','男','女'],
			info:{
				avatar:'',
				info:{}
			},
			isShow:true
		};
	},
	methods: {
		navTo(url) {
			uni.navigateTo({ url });
		},
		async bindPickerChange(e){
			this.index = e.target.value;
			let res = await this.$http.accountGender({
				gender: e.target.value
			})
		},
		async getAccountInfo() {
			let res = await this.$http.accountInfo()
			this.info = res.result
			this.index = res.result.gender
		},
		async changeAvatar() {
			uni.chooseImage({
				success:async chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					let result = await this.$http.uploadFile(tempFilePaths[0],{})
					this.info.avatar = result.result.uri
					await this.$http.accountAvatar({
						avatar:this.info.avatar
					})
				}
			})
			
		}
	},
	computed:{
		avatar() {
			if ( null === this.info.avatar) return
			return this.info.avatar.search('http') == -1 ? "https://douyin-like.oss-cn-hongkong.aliyuncs.com/"+this.info.avatar : this.info.avatar
		}
	},
	onShow() {
		this.getAccountInfo()
		setTimeout(()=>{
			this.isShow = false
		},500)
	}
};
</script>

<style lang="less">
	.avatar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 180rpx;
		text {
			margin-left: 44rpx;
			color: #080d5d;
			font-size: 56rpx;
			width: 400rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		image {
			width: 129rpx;
			height: 129rpx;
			border-radius: 50%;
			margin-right: 43rpx;
		}
	}
.border {
	width: 750rpx;
	height: 22rpx;
	background-color: #f7f9fc;
}
</style>
