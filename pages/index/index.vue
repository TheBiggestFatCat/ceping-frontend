<template>
	<view class="container">
		<view class="title">
			大众测评
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
		<button @click="login">登录</button>
		<button @click="toRegister">注册</button>
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
	
	// 登录逻辑
	const login = () => {
		uni.request({
			url: 'http://127.0.0.1:3000/user/yanzhen',
			method: 'POST',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			data: {
				username,
				password,
				role
			},
			success(res) {
				if (res.data.status == 0) {
					getApp().globalData.role = role
					getApp().globalData.userid = res.data.data
					uni.switchTab({
						url: '/pages/home3/home3'
					})
				} else {
					console.log(res);
				}
			}
		})
	}
	
	// 跳转注册
	const toRegister = () => {
		uni.navigateTo({
			url: '/pages/register/register'
		})
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
