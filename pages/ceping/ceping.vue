<template>
	<view class="container">
		<view class="goodinfo">
			<image class="goodimage" :src="state.goodInfo.goodPicture[0]" mode=""></image>
			<view class="goodinfo-right">
				<p class="goodname">{{state.goodInfo.goodName}}</p>
				<p class="goodprice">预售价格：<span style="color: #dd0e12;">¥{{state.goodInfo.goodPrice}}</span></p>
			</view>
		</view>
		<textarea placeholder="在这里写下你的测评..." class="txt" maxlength="1000" v-model="state.cepingText"></textarea>
		<view class="picture-body">
			<view class="picture" v-for="(item, index) in state.cepingPicture" :key="index">
				<view class="x" @click="cancelPic(index)">
					<uni-icons type="closeempty" size="12" color="#fff"></uni-icons>
				</view>
				<img class="pic" :src="item" alt="">
			</view>
			<view class="picture" id="empty-pic" @click="addPic" v-if="state.cepingPicture.length < 9">
				<uni-icons type="plus-filled" size="20" color="#949494"></uni-icons>
				<view>在这里上</view>
				<view>传图片</view>
			</view>
		</view>
		<button class="btn" @click="publish">发布</button>
	</view>
</template>

<script setup>
	import { reactive } from 'vue'
	import { onLoad, onShow } from "@dcloudio/uni-app"
	
	const time = new Date()
	
	const state = reactive({
		goodInfo: {},
		cepingerId: getApp().globalData.userid,
		cepingPicture: [],
		cepingDate: time.toLocaleDateString(),
		cepingText: '',
		shenqingId: 0,
		cepingGoodId: 0,
		goodInfo: {
			goodPicture: []
		}
	})
	
	onLoad((option) => {
		state.cepingGoodId = option.shenqingGoodId
		state.shenqingId = option.shenqingId
	})
	
	onShow(() => {
		getData()
		console.log(state);
	})
	
	// 获取初始数据
	const getData = () => {
		uni.request({
			url: 'http://127.0.0.1:3000/good/getgoodbyid?goodId=' + state.cepingGoodId,
			success(res) {
				for (let i of res.data.data) {
					i.goodPicture = i.goodPicture.split(",")
				}
				state.goodInfo = res.data.data[0]
			}
		})
	}

	// 发布
	const publish = () => {
		const goodPic = state.cepingPicture.join(",")
		uni.request({
			url: 'http://127.0.0.1:3000/ceping/addceping',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				cepingGoodId: state.cepingGoodId,
				cepingerId: state.cepingerId,
				cepingPicture: goodPic,
				cepingDate: state.cepingDate,
				cepingText: state.cepingText
			},
			success(res) {
				if (res.data.status == 0) {
					uni.showToast({
						title: '发布成功',
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/home3/home3'
						})
					}, 1500)
				} else {
					console.log(res);
				}
			}, 
			fail(err) {
				console.log(err);
			}
		})
	}

	// 上传图片
	const addPic = () => {
		uni.chooseImage({
			count: 1,
			success(res) {
				if (res.tempFilePaths.length > 0) {
					let filePath = res.tempFilePaths[0]
					uni.showLoading({
						title: '上传中..',
						mask: true
					})
					//进行上传操作
					// callback方式，与promise方式二选一即可
					uniCloud.uploadFile({
						filePath: filePath,
						cloudPath: 'a.png',
						onUploadProgress: function(progressEvent) {
							console.log(progressEvent);
							var percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						},
						success(res) {
							state.cepingPicture.push(res.fileID)
						},
						fail() {
							uni.showToast({
								title: '上传失败',
								icon: 'error'
							})
							uni.hideLoading()
						},
						complete() {
							uni.hideLoading()
						}
					});

				}
			}
		});

	}

	// 删除图片
	const cancelPic = (index) => {
		state.cepingPicture.splice(index, 1)
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	
	.title {
		margin-bottom: 20rpx;
	}
	
	.goodinfo {
		display: flex;
	}
	
	.goodimage {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10px;
		margin-right: 40rpx;
		align-items: center;
	}
	
	.line {
		border-bottom: 1px solid #dcdcdc;
		margin-bottom: 20rpx;
	}

	.txt {
		width: 100%;
		height: 200rpx;
		margin-top: 40rpx;
	}

	.picture-body {
		display: flex;
		flex-flow: row wrap;
		justify-content: left;
	}

	.picture {
		position: relative;
		margin-right: 10rpx;
		border-radius: 10rpx;
		width: calc(33.33% - 10rpx);
		height: 210rpx;
		margin-top: 10rpx;
		display: inline-block;
		overflow: hidden;
	}

	.pic {
		width: 100%;
		height: 100%;
	}

	.x {
		position: absolute;
		right: 0;
		top: 0;
		width: 40rpx;
		height: 40rpx;
		background-color: rgba(72, 72, 72, 0.3);
		font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#empty-pic {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		background-color: #e6e6e6;
		font-size: 14px;
		font-weight: 600;
		line-height: 130%;
		color: #949494;
	}
	
	.btn {
		background-color: $uni-primary;
		color: #fff;
		margin-top: 100rpx;
		width: 600rpx;
		font-size: 16px;
	}
	
	.price {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.goodname {
		font-size: 16px;
		font-weight: 600;
	}
</style>
