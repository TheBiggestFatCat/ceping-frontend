<template>
	<view class="container">
		<input type="text" placeholder="请输入商品名称..." v-model="state.goodName" class="title">
		<view class="line">
			
		</view>
		<textarea placeholder="在这里描述你的物品..." class="txt" maxlength="1000" v-model="state.goodText"></textarea>
		<view class="picture-body">
			<view class="picture" v-for="(item, index) in state.goodPicture" :key="index">
				<view class="x" @click="cancelPic(index)">
					<uni-icons type="closeempty" size="12" color="#fff"></uni-icons>
				</view>
				<img class="pic" :src="item" alt="">
			</view>
			<view class="picture" id="empty-pic" @click="addPic" v-if="state.goodPicture.length < 9">
				<uni-icons type="plus-filled" size="20" color="#949494"></uni-icons>
				<view>在这里上</view>
				<view>传图片</view>
			</view>
		</view>
		<view class="price" style="margin-top: 40rpx;">
			<view>
				<img src="@/static/images/money.png" style="width: 40rpx; height: 40rpx; position: relative; top: 8rpx;" alt="">
				预售价格
			</view>
			<view style="position: relative; top: 2rpx; color: red; margin-right: 20rpx; display: flex; align-items: center; width: 100rpx; justify-content: space-between;">
				¥<input style="position: relative; bottom: 1px; left: 4rpx;" type="text" v-model="state.goodPrice">
				<!-- <uni-icons type="right" size="16" color="#949494"></uni-icons> -->
			</view>	
		</view>
		<button class="btn" @click="publish">发布</button>
	</view>
</template>

<script setup>
	// data
	import {
		getCurrentInstance,
	} from "vue";
	let {
		ctx: that,
		proxy
	} = getCurrentInstance()
	import { reactive } from 'vue'
	
	
	const time = new Date()
	
	const state = reactive({
		goodName: '',
		goodProducterId: getApp().globalData.userid,
		goodPicture: [],
		goodDate: time.toLocaleDateString(),
		goodPrice: 0,
		goodText: ''
	})
	


	// 发布
	const publish = () => {
		const goodPic = state.goodPicture.join(",")
		uni.request({
			url: 'http://127.0.0.1:3000/good/addgood',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				goodName: state.goodName,
				goodProducterId: state.goodProducterId,
				goodPicture: goodPic,
				goodDate: state.goodDate,
				goodPrice: state.goodPrice,
				goodText: state.goodText
			},
			success(res) {
				uni.showToast({
					title: '发布成功',
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/home3/home3'
					})
				}, 1500)
			}, 
			fail(err) {
				console.log(err);
			}
		})
	}

	// 上传图片
	const addPic = () => {
		const goodPic = state.goodPicture.join(",")
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
							state.goodPicture.push(res.fileID)
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
		state.goodPicture.splice(index, 1)
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
	
	.line {
		border-bottom: 1px solid #dcdcdc;
		margin-bottom: 20rpx;
	}

	.txt {
		width: 100%;
		height: 200rpx;
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
</style>
