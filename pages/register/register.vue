<template>
	<view class="container">
		<view class="title">
			注册
		</view>
		<uni-section title="用户名" type="line" padding>
			<uni-easyinput class="uni-mt-5" v-model="username" placeholder="请输入"></uni-easyinput>
		</uni-section>
		<uni-section title="密码" type="line" padding>
			<uni-easyinput class="uni-mt-5" v-model="password" placeholder="请输入"></uni-easyinput>
		</uni-section>
		<view class="uni-px-5 uni-pb-5" style="margin-top: 40rpx;">
			<uni-data-checkbox v-model="role" :localdata="range"></uni-data-checkbox>
		</view>
		<button @click="uploadAvatar">选择头像</button>
		<button @click="register">注册</button>
	</view>
</template>

<script setup>
	import { onShow, onHide, onLoad } from "@dcloudio/uni-app"
	
	// data
	
	// 角色选择
	let role = 3
	const range = [{"value": 3,"text": "测评人"	},{"value": 2,"text": "企业"}]
	
	// 用户名和密码
	let username = ''
	let password = ''
	let picture = ''
	
	// 注册逻辑
	const register = () => {
		uni.request({
			url: 'http://127.0.0.1:3000/user/adduser',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: "POST",
			data: {
				username,
				password,
				picture,
				role
			},
			success(res) {
				uni.showToast({
					title: '注册成功'
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}, 2000)
			}
		})
	}
	
	// 上传头像
	const uploadAvatar = () => {
		uni.chooseImage({
		  count: 1,
		  success(res) {
		    if (res.tempFilePaths.length > 0) {
		      let filePath = res.tempFilePaths[0]
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
							picture = res.fileID
						},
		        fail() {
							uni.showToast({
								title: '上传失败',
								icon: 'error'
							})
						}
		      });
		
		    }
		  }
		});

	}
</script>

<style lang="scss">
	page {
			background-color: #fff;
	}
	
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	
	.title {
		font-size: 80rpx;
		margin: 100rpx 0 100rpx 30rpx;
	}
	
	button {
		margin-top: 40rpx;
		background-color: $uni-primary;
		color: #fff;
	}
</style>
