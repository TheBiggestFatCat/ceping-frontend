<template>
	<!-- 商品图片与标题 -->
	<view class="goodtop">
		<view class="topuser">
			<view class="topuser-left">
				<image :src="state.user.picture" mode="" class="shopavatar"></image>
				<span class="shopname">{{state.user.username}}</span>
			</view>
		</view>
		<view class="topgood">
			<view class="topuser-left">
				<image :src="state.goodinfo.goodPicture" mode="" class="goodavatar"></image>
				<view class="">
					<p class="goodname">{{state.goodinfo.goodName}}</p>
					<p class="goodprice">预售价格：<span style="color: #ce1114;">¥{{state.goodinfo.goodPrice}}</span></p>
				</view>
			</view>
		</view>
		<view class="ceping">
			{{state.cepingInfo.cepingText}}
		</view>
		<view class="cepingdate">
			{{state.cepingInfo.cepingDate}}
		</view>
	</view>
</template>

<script setup>
	import { onShow, onLoad } from "@dcloudio/uni-app"
	import { reactive } from 'vue'
	
	const state = reactive({
		cepingInfo: {},
		user: {},
		goodinfo: {}
	})
	
	onLoad((options) => {
		state.cepingInfo.cepingId = options.cepingId
	})
	
	onShow(() => {
		getData()
	})
	
	function getData() {
		// 获取用户信息
		uni.request({
			url: 'http://127.0.0.1:3000/user/selectuser?userId=' + getApp().globalData.userid,
			success(res) {
				state.user = res.data.data[0]
				console.log(state);
			}
		})
		
		// 获取测评详情
		uni.request({
			url: 'http://127.0.0.1:3000/ceping/getcepingbycepingid?cepingId=' + state.cepingInfo.cepingId,
			success(res) {
				state.cepingInfo = res.data.data[0]
				state.cepingInfo.cepingPicture = state.cepingInfo.cepingPicture.split(",")
				state.cepingInfo.cepingDate = state.cepingInfo.cepingDate.slice(0, 10)
				
				// 获取测评的商品详情
				uni.request({
					url: 'http://127.0.0.1:3000/good/getgoodbyid?goodId=' + state.cepingInfo.cepingGoodId,
					success(res) {
						state.goodinfo = res.data.data[0]
						if (state.goodinfo.goodPicture == null) {
							state.goodinfo.goodPicture = ''
						}
						state.goodinfo.goodPicture = state.goodinfo.goodPicture.split(',')
						uni.request({
							url: 'http://127.0.0.1:3000/user/selectuser?userId=' + state.goodinfo.goodProducterId,
							success(res) {
								state.userinfo = res.data.data[0]
								console.log(state);
							}
						})
					}
				})
			}
		})
		
		
	}
</script>

<style>
	page {
		font-size: 14px;
		padding: 40rpx;
		box-sizing: border-box;
	}
	
	.goodtop {
		border-radius: 10px;
		overflow: hidden;
		background-color: #fff;
	}
	
	.shopavatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
		
	.goodavatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 10px;
	}
	
	.topuser {
		display: flex;
		padding: 40rpx;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
	}
	
	.topgood {
		display: flex;
		padding: 0 40rpx 0 40rpx;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
	}
	
	.topuser-left {
		display: flex;
		align-items: center;
	}
	
	.goodtitle {
		padding: 40rpx 40rpx 0 40rpx;
		font-weight: 600;
	}
	.shopname {
		padding: 20rpx;
	}
	.goodname {
		padding: 10rpx 0 0 20rpx;
	}
	.goodprice {
		padding: 10rpx 0 0 20rpx;
	}
	.ceping {
		padding: 40rpx;
	}
	.cepingdate {
		float: right;
		padding: 0 40rpx 40rpx 0;
		color: #5e5e5e;
	}
</style>
