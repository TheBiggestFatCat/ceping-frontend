<template>
	<view class="container">
		<view class="top">
			<img :src="state.user.picture" class="avatar" alt="">
			<view class="right">
				<!-- <p id="name">{{state.user.username}}<span class="xiugai">去修改<uni-icons type="right" size="12" color="#949494"></uni-icons></span></p> -->
				<p class="role" v-if="state.user.role == 2">企业</p>
				<p class="role" v-if="state.user.role == 3">测评员</p>
			</view>
		</view>
		
		
		
		<view class="line2" v-if="state.user.role == 2">
			<h3 v-if="state.user.role == 2" style="font-weight: 600; font-size: 16px;">测评申请</h3>
			<view class="grayline"></view>
			<!-- 表头 -->
			<view class="apply-row" v-if="!state.empty">
				<p class="apply-item" style="font-weight: 600;">商品名</p>
				<p class="apply-item" style="font-weight: 600;">申请者</p>
				<p class="apply-item" style="font-weight: 600;">申请时间</p>
			</view>
			
			<!-- 表身 -->
			<view class="apply" v-for="(item, index) in state.apply" :key="index">
				<view class="apply-row">
					<p class="apply-item">{{item.goodName}}</p>
					<p class="apply-item">{{item.username}}</p>
					<p class="apply-item" style="color: #7c7c7c;">{{item.date}}</p>
				</view>
			</view>
			
			<!-- 表为空时 -->
			<view class="empty-apply" v-if="state.empty">
				<p style="padding: 40rpx; text-align: center; color: #7c7c7c;">暂时没有未处理的申请</p>
			</view>
			<view style="text-align: center; width: 100%; margin-top: 20rpx;">
				<button size="mini" class="apply-btn" @click="goApplydetail">查看全部</button>
			</view>
		</view>
		
		
		
		<view class="line2" v-if="state.user.role == 3">
			<h3 v-if="state.user.role == 3" style="font-weight: 600; font-size: 16px;">我的申请</h3>
			<view class="grayline"></view>
			<!-- 表头 -->
			<view class="apply-row" v-if="!state.empty">
				<p class="apply-item" style="font-weight: 600;">商品名</p>
				<p class="apply-item" style="font-weight: 600;">申请时间</p>
			</view>
			
			<!-- 表身 -->
			<view class="apply" v-for="(item, index) in state.apply" :key="index">
				<view class="apply-row">
					<p class="apply-item">{{item.goodName}}</p>
					<p class="apply-item" style="color: #7c7c7c;">{{item.date}}</p>
				</view>
			</view>
			
			<!-- 表为空时 -->
			<view class="empty-apply" v-if="state.empty">
				<p style="padding: 40rpx; text-align: center; color: #7c7c7c;">暂时没有未处理的申请</p>
			</view>
			<view style="text-align: center; width: 100%; margin-top: 20rpx;">
				<button size="mini" class="apply-btn" @click="goApplydetail">查看全部</button>
			</view>
		</view>
		
		<!-- 我的测评 -->
		<view class="line2" v-if="state.user.role == 3">
			<h3 v-if="state.user.role == 3" style="font-weight: 600; font-size: 16px;">我的测评</h3>
			<view class="grayline"></view>
			<view class="ceping" v-for="(item, index) in state.ceping" :key="index" @click="goCepingDetail(item.cepingId)">
				<view class="ceping-right">
					<p>{{item.cepingText}}</p>
					<p class="ceping-date">{{item.cepingDate}}</p>
				</view>
				
				<image class="cepingPicture" :src="item.cepingPicture[0]" mode=""></image>
			</view>
			<!-- 表为空时 -->
			<view class="empty-apply" style="text-align: center;" v-if="state.ceping.length == 0">
				<p style="padding: 40rpx; text-align: center; color: #7c7c7c;">你还没有发布测评</p>
				<button size="mini" class="apply-btn" @click="goCeping">点击发布</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onShow } from "@dcloudio/uni-app"
	import { reactive } from 'vue'
	
	const state = reactive({
		user: {},
		apply: [],
		empty: true,
		ceping: []
	})
	
	const getData = () => {
		// 查询用户信息
		uni.request({
			url: 'http://127.0.0.1:3000/user/selectuser?userId=' + getApp().globalData.userid,
			success(res) {
				if (res.data.status == 0) {
					state.user = res.data.data[0]
				}
			}
		})
		
		if (getApp().globalData.role == 2) {
			// 查询自己店铺的商品的申请
			uni.request({
				url: 'http://127.0.0.1:3000/shenqing/oneshenqinggood?goodProducterId=' + getApp().globalData.userid,
				success(res) {
					state.apply = res.data.data
					console.log(state);
					for (let i = state.apply.length - 1; i >= 0; i--) {
						let item = state.apply[i];
						if (item.shenqingStatus != 1) {
							state.apply.splice(i, 1);
							continue;
						}
						
						// 查询申请的测评者名字
						uni.request({
							url: 'http://127.0.0.1:3000/user/selectuser?userId=' + item.shenqingUserId,
							success(res) {
								item.username = res.data.data[0].username;
							}
						});
						
						// 查询申请的商品名字
						uni.request({
							url: 'http://127.0.0.1:3000/good/getgoodbyid?goodId=' + item.shenqingGoodId,
							success(res) {
								item.goodName = res.data.data[0].goodName;
							}
						});
					}
			
					// 检测是否没有未处理申请
					state.empty = (state.apply.find(item => item.shenqingStatus == 1) == null);
				}
			})
		}
		
		if (getApp().globalData.role == 3) {
			// 查询自己的申请
			uni.request({
				url: 'http://127.0.0.1:3000/shenqing/getshenqingbyuser?shenqingUserId=' + getApp().globalData.userid,
				success(res) {
					state.apply = res.data.data
					console.log(state);
					for (let i = state.apply.length - 1; i >= 0; i--) {
						let item = state.apply[i];
						if (item.shenqingStatus != 1) {
							state.apply.splice(i, 1);
							continue;
						}
						
						// 查询申请的商品名字
						uni.request({
							url: 'http://127.0.0.1:3000/good/getgoodbyid?goodId=' + item.shenqingGoodId,
							success(res) {
								item.goodName = res.data.data[0].goodName;
							}
						});
					}
			
					// 检测是否没有未处理申请
					state.empty = (state.apply.find(item => item.shenqingStatus == 1) == null);
				}
			})
			
			uni.request({
				url: 'http://127.0.0.1:3000/ceping/getcepingbyuserid?cepingerId=' + getApp().globalData.userid,
				success(res) {
					for (let i of res.data.data) {
						i.cepingPicture = i.cepingPicture.split(",")
						i.cepingDate = i.cepingDate.slice(0, 10)
						if (i.cepingText.length > 21) {
							i.cepingText = i.cepingText.slice(0, 20) + '...'
						}
					}
					state.ceping = res.data.data
				}
			})
		}

	}

	
	onShow(() => {
		getData()
	})
	
	const goApply = () => {
		uni.switchTab({
			url: '/pages/home3/home3'
		})
	}
	
	const goApplydetail = () => {
		uni.navigateTo({
			url: '/pages/applydetail/applydetail'
		})
	}
	
	const goCeping = () => {
		uni.switchTab({
			url: '/pages/home3/home3'
		})
	}
	
	const goCepingDetail = (cepingId) => {
		uni.navigateTo({
			url: '/pages/cepingDetail/cepingDetail?cepingId=' + cepingId
		})
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
		
	.top {
		display: flex;
		background-color: #fff;
		padding: 20rpx;
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
		
	.avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
	}
	
	.right {
		padding: 20rpx;
	}
	
	#name {
		font-size: 18px;
		font-weight: 600;
	}
	
	.role {
		color: #595959;
	}
	
	.xiugai {
		font-size: 14px;
		color: #949494;
		font-weight: 500;
		position: absolute;
		right: 40rpx;
	}
	
	.applyempty {
		padding: 20rpx 0 0 0;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	
	.apply-row {
		display: flex;
		flex-flow: row nowrap;
	}
	
	.apply-item {
		padding-bottom: 10rpx;
		width: 33%;
		margin: 0 auto;
		text-align: center;
	}
	
	.apply-btn {
		background-color: $uni-primary;
		color: #fff;
	}
	
	.grayline {
		margin: 20rpx 0 20rpx 0;
		border-bottom: 1px solid #0018b6;
	}
	
	.ceping {
		display: flex;
		margin-bottom: 40rpx;
	}
	
	.cepingPicture {
		width: 160rpx;
		height: 160rpx;
		border-radius: 10px;
	}
	
	.ceping-right {
    width: 400rpx;
		padding: 10rpx 20rpx 10rpx 20rpx;
	}
	
	.ceping-date {
		color: #595959;
	}
</style>
