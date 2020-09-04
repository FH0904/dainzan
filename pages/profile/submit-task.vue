<template>
	<view>
		<view class="input-list">
			<view class="list-item">
				<text class="name">任务名称</text>
				<view class="value">{{result.name}}</view>
			</view>
			<view class="list-item">
				<text class="name">任务金额</text>
				<text class="value">{{result.amount | formatPrice}}</text>
			</view>
			<view class="list-item">
				<text class="name">完成状态</text>
				<text class="value">未完成</text>
			</view>
		</view>
		<view class="upload">
			<view class="upload-title">上传截图凭证</view>
			<view class="pic">
				<view class="pic1" @click="uploadImg" v-if="!img2">
					<image src="/static/images/profile/icon_camera.png" ></image>
					<text>上传截图</text>
				</view>
				<view class="pic2" v-else>
					<image :src="img2" ></image>
					<image src="/static/images/profile/icon_guanbi.png"  class="del" @click="delImg"></image>
				</view>
			</view>
		</view>
		<button class="btn" @click="submitTask">提交任务</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result:'',
				img1:'',
				img2:''
			};
		},
		methods:{
			async submitTask() {
				let res = await this.$http.taskSubmit({
					id:this.result.id,
					image:this.img1
				})
				this.$t("提交成功！")
				setTimeout(()=>{
					uni.navigateBack({
						delta:2
					})
				},1500)
			},
			uploadImg() {
				uni.chooseImage({
					success:async chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						let result = await this.$http.uploadFile(tempFilePaths[0],{})
						this.img1 = result.result.uri
						this.img2 = result.result.full_uri
					}
				})
			},
			delImg() {
				this.img2 = ""
				this.img1 = ""
			}
		},
		onLoad(options) {
			this.result = options
		}
	}
</script>

<style lang="less">
.input-list {
	width: 100%;
	padding: 0 30rpx;
	border-top: 10rpx solid #f5f7fd;
	.list-item {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid #e6e6e6;
		.name {
			color: #333333;
			font-size: 30rpx;
		}
		.value {
			width: 400rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: #b3b3b3;
			font-size: 28rpx;
			margin-left: 36rpx;
		}
		&:last-child {
			border-bottom-color: #FFFFFF;
		}
	}
}
.upload {
	border-top: 10rpx solid #f5f7fd;
	padding: 30rpx;
	color:#333;
	font-size: 30rpx;
	.pic {
		width: 600rpx;
		height: 338rpx;
		background-color: #ffffff;
		border: dashed 1px #cccccc;
		margin: 30rpx auto 0;
		.pic1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 600rpx;
			height: 338rpx;
			image {
				width: 86rpx;
				height: 70rpx;
			}
			text {
				color: #debc7d;
				font-size: 30rpx;
				margin-top: 32rpx;
			}
		}
		.pic2 {
			position: relative;
			width: 600rpx;
			height: 338rpx;
			image{
				width: 596rpx;
				height: 334rpx;
			}
			.del {
				position: absolute;
				top: -14rpx;
				right: -14rpx;
				width: 30rpx;
				height: 30rpx;
				z-index: 10;
				background-color: #fff;
				border-radius: 50%;
			}
		}
	}
}
.btn {
	margin-top: 300rpx;
}
</style>
