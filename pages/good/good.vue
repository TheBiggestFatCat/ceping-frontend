<template>
	<view>
		<!-- 商品图片与标题 -->
		<view class="goodtop">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="true" :autoplay="false" :interval="4000" :duration="500">
					<swiper-item v-for="(item, index) in state.goodinfo.goodPicture" :key="index">
						<view class="swiper-item">
							<img class="swiper-img" :src="item"
								alt="">
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="goodtitle">
				<h3>{{state.goodinfo.goodName}}</h3>
			</view>
			<view class="topuser">
				<view class="topuser-left">
					<image :src="state.userinfo.picture" mode="" class="shopavatar"></image>
					<span class="shopname">{{state.userinfo.username}}</span>
				</view>
				<button class="topbtn">商家详情</button>
			</view>
		</view>
		
		<view class="detail">
			<h3 style="font-weight: 600; font-size: 16px;">商品详情</h3>
			<view class="grayline"></view>
			{{state.goodinfo.goodText}}
		</view>
		
		<view class="ceping">
			<h3 style="font-weight: 600; font-size: 16px;">已有测评</h3>
			<view class="grayline"></view>
			<view class="ceping-block" v-for="(item, index) in state.cepingInfo" :key="index">
				<view class="ceping-block-left"></view>
				<image :src="item.cepingPicture" mode=""></image>
			</view>
		</view>


	</view>
</template>

<script setup>
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app"
	import { reactive } from 'vue'
	
	const state = reactive({
		goodid: 0,
		goodinfo: {},
		userinfo: '',
		cepingInfo: []
	})


	
	onLoad((option) => {
		state.goodid = option.goodid
	})
	
	onShow(() => {
		uni.request({
			url: 'http://127.0.0.1:3000/good/getgoodbyid?goodId=' + state.goodid,
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
					}
				})
			}
		})
		uni.request({
			url: 'http://127.0.0.1:3000/ceping/getcepingbygoodid?cepingGoodId=' + state.goodid,
			success(res) {
				for (let i of res.data.data) {
					i.goodPicture = i.goodPicture.split(",")
				}
				state.cepingInfo = res.data.data
				for (let i in res.data.data) {
					uni.request({
						url: 'http://127.0.0.1:3000/user/selectuser?userId=' + res.data.data[i].cepingerId,
						success(res) {
							state.cepingInfo[i].username = res.data.data[0].username
						}
					})
				}
			}
		})
	})
</script>

<style lang="scss">
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
	
	.swiper {
		height: 500rpx;
	}
	
	.swiper-img {
		height: 500rpx;
		width: 100%;
	}
	
	.topuser {
		display: flex;
		padding: 40rpx;
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
	
	.shopavatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	
	.shopname {
		padding: 20rpx;
	}
	
	.topbtn {
		margin: 0; 
		font-size: 14px;
		color: #fff;
		background-color: $uni-primary;
	}
	
	.detail {
		margin-top: 40rpx;
		padding: 40rpx;
		border-radius: 10px;
		background-color: #fff;
	}
	
	.grayline {
		margin: 20rpx 0 20rpx 0;
		border-bottom: 1px solid #0018b6;
	}
	
	.ceping {
		margin-top: 40rpx;
		padding: 40rpx;
		border-radius: 10px;
		background-color: #fff;
	}
</style>
