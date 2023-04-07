<template>
	<view>
		<view class="tabbar">
			<view :class="(state.selected == 1) ? 'selected-tabbar-box tabbar-box' : 'tabbar-box'" @click="state.selected = 1">
				<uni-icons :color="(state.selected == 1) ? 'blue' : ''" type="more-filled" size="24"></uni-icons>
				<p :class="(state.selected == 1) ? 'blue' : ''" >待审核</p>
			</view>
			<view :class="(state.selected == 2) ? 'selected-tabbar-box tabbar-box' : 'tabbar-box'" @click="state.selected = 2">
				<uni-icons :color="(state.selected == 2) ? 'blue' : ''" type="checkmarkempty" size="24"></uni-icons>
				<p :class="(state.selected == 2) ? 'blue' : ''" >已通过</p>
			</view>
			<view :class="(state.selected == 3) ? 'selected-tabbar-box tabbar-box' : 'tabbar-box'" @click="state.selected = 3">
				<uni-icons :color="(state.selected == 3) ? 'blue' : ''" type="closeempty" size="24"></uni-icons>
				<p :class="(state.selected == 3) ? 'blue' : ''" >未通过</p>
			</view>
		</view>
		<view :class="(state.selected == 1) ? 'linetype1' : (state.selected == 2) ? 'linetype2' : 'linetype3'"></view>
	</view>

	<view class="line2" v-if="state.role == 2">
		<h3 style="font-weight: 600; font-size: 16px;">申请列表</h3>
		<view class="grayline"></view>
		<view class="apply" v-for="(item, index) in state.apply" v-show="state.selected == item.shenqingStatus" :key="index">
			<view class="apply-left">
				<p style="padding: 10rpx;">申请人：{{item.username}}</p>
				<p style="padding: 10rpx;">商品：{{item.goodName}}</p>
				<p style="padding: 10rpx;">{{item.date}}</p>
				<button style="margin-top: 10rpx; background-color: #2979ff; color: #fff;" size="mini" v-if="item.shenqingStatus == 1" @click="alterStatus(item.shenqingId, 2)">同意</button>
				<button style="margin-top: 10rpx; margin-left: 20rpx;" size="mini" v-if="item.shenqingStatus == 1" @click="alterStatus(item.shenqingId, 3)">拒绝</button>
			</view>
			<image style="width: 200rpx; height: 200rpx; border-radius: 10px;" :src="item.picture" mode="" :key="index"></image>
		</view>
	</view>
	
	<view class="line2" v-if="state.role == 3">
		<h3 style="font-weight: 600; font-size: 16px;">申请列表</h3>
		<view class="grayline"></view>
		<view class="apply" v-for="(item, index) in state.apply" v-show="state.selected == item.shenqingStatus" :key="index">
			<view class="apply-left">
				<p style="padding: 10rpx;">商品：{{item.goodName}}</p>
				<p style="padding: 10rpx;">{{item.date}}</p>
				<button style="margin-top: 10rpx; background-color: #2979ff; color: #fff;" size="mini" v-if="item.shenqingStatus == 2" @click="goCeping(item.shenqingGoodId, item.shenqingId)">去测评<uni-icons type="right" size="12" color="#fff"></uni-icons> </button>
			</view>
			<image style="width: 200rpx; height: 200rpx; border-radius: 10px;" :src="item.picture" mode="" :key="index"></image>
		</view>
	</view>
</template>

<script setup>
	import { onShow } from "@dcloudio/uni-app"
	import { reactive } from 'vue'
	
	const state = reactive({
		apply: [],
		selected: 1,
		role: getApp().globalData.role
	})
	
	const alterStatus = (id, status) => {
		uni.request({
			url: 'http://127.0.0.1:3000/shenqing/xiugaistatus?shenqingId=' + id + '&shenqingStatus=' + status,
			success(res) {
				getData()
			}
		})
	}
	
	// 厂商的初始数据
	const getData = () => {
		// 查询自己店铺的商品的申请
		uni.request({
			url: 'http://127.0.0.1:3000/shenqing/oneshenqinggood?goodProducterId=' + getApp().globalData.userid,
			success(res) {
				state.apply = res.data.data
				for (let i of state.apply) {
					// 查询申请的测评者名字
					uni.request({
						url: 'http://127.0.0.1:3000/user/selectuser?userId=' + i.shenqingUserId,
						success(res) {
							i.username = res.data.data[0].username
							console.log(i.shenqingStatus);
						}
					})
					// 查询申请的商品名字
					uni.request({
						url: 'http://127.0.0.1:3000/good/getgoodbyid?goodId=' + i.shenqingGoodId,
						success(res) {
							i.goodName = res.data.data[0].goodName
							// 图片的第一张
							i.picture = res.data.data[0].goodPicture.split(',')[0]
						}
					})
				}
			}
		})
	}
	
	// 用户的初始数据
	const getData2 = () => {
		// 默认显示已通过
		state.selected = 2
		// 查询自己的申请
		uni.request({
			url: 'http://127.0.0.1:3000/shenqing/getshenqingbyuser?shenqingUserId=' + getApp().globalData.userid,
			success(res) {
				console.log(res);
				state.apply = res.data.data
				for (let i of state.apply) {
					// 查询申请的商品名字
					uni.request({
						url: 'http://127.0.0.1:3000/good/getgoodbyid?goodId=' + i.shenqingGoodId,
						success(res) {
							i.goodName = res.data.data[0].goodName
							// 图片的第一张
							i.picture = res.data.data[0].goodPicture.split(',')[0]
						}
					})
				}
			}
		})
	}
	
	const goCeping = (shenqingGoodId, shenqingId) => {
		uni.navigateTo({
			url: '/pages/ceping/ceping?shenqingGoodId=' + shenqingGoodId + '&shenqingId=' + shenqingId,
		})
	}
	
	onShow(() => {
		if (getApp().globalData.role == 2) {
			getData()
		}
		if (getApp().globalData.role == 3) {
			getData2()
		}
	})
</script>

<style>
	page {
		font-size: 14px;
		padding: 40rpx;
		box-sizing: border-box;
	}
	
	.tabbar {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		background-color: #fff;
		padding: 42rpx;
		position: relative;
		border-radius: 10px;
	}	
	
	.line2 {
		margin-top: 40rpx;
		background-color: #fff;
		padding: 40rpx;
		position: relative;
		border-radius: 10px;
	}
	
	.tabbar-box {
		width: 33.3%;
		text-align: center;
	}
	
	.grayline {
		margin: 20rpx 0 20rpx 0;
		border-bottom: 1px solid #0018b6;
	}
	
	.linetype1 {
		position: relative;
		bottom: 10px;
		width: 20px;
		left: calc(42rpx + (100% - 84rpx) / 6 - 10px);
		border-bottom: 2px solid #0018b6;
		transition: all .6s;
	}
	
	.linetype2 {
		position: relative;
		bottom: 10px;
		width: 20px;
		left: calc(50% - 10px);
		border-bottom: 2px solid #0018b6;
		transition: all .6s;
	}
	
	.linetype3 {
		position: relative;
		bottom: 10px;
		width: 20px;
		left: calc(42rpx + (100% - 84rpx) * 5 / 6 - 10px);
		border-bottom: 2px solid #0018b6;
		transition: all .4s;
	}
	
	.blue {
		color: #0018b6;
	}
	
	.apply {
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
	}
</style>
