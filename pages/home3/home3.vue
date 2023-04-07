<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
	<view class="container" v-if="state.role == 3">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="4000" :duration="500">
				<swiper-item>
					<view class="swiper-item">
						<img src="https://i0.hdslb.com/bfs/article/db5de5671ba332ea14de07a90b92ba9e5a8ae69e.png@942w_531h_progressive.webp"
							alt="">
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<img src="https://i0.hdslb.com/bfs/article/0535ed3fc8e8bd9004cf99c39be314bacc832d72.png@942w_531h_progressive.webp"
							alt="">
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<img src="https://i0.hdslb.com/bfs/article/3e2108dd9d918f73cce1ec7360988def15ed78aa.png@942w_531h_progressive.webp"
							alt="">
					</view>
				</swiper-item>
			</swiper>
		</view>


		<view class="tuijian">
			<view class="hot-title">
				<uni-icons type="hand-up-filled" size="24" style="position: relative; top: 4rpx;" color="#ffb218">
				</uni-icons>
				<span style="font-size: 16px; font-weight: 600;">为你推荐</span>
			</view>
			<view class="rand4">
				<view class="randgood" v-for="(item, index) in state.randGoods" :key="index" @click="goGood(item.goodId)">
					<img class="randgoodimg" :src="item.goodPicture[0]" alt="">
					<view class="goodright">
						<p style="font-weight: 600; color: #050d81; font-size: 18px;">{{item.goodName}}</p>
						<p>预售价格：<span style="color: #cc0c0c;">¥{{item.goodPrice}}</span></p>
						<p style="font-size: 12px; color: #5a5a5a;">{{item.goodDate}}</p>
						<button size="mini" style="position: absolute; right: 20rpx; bottom: 10rpx; background-color: #2753cc; color: #fff;" @click="apply(item.goodId)">立刻申请</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="new">
			<view class="hot-title">
				<uni-icons type="fire-filled" size="24" style="position: relative; top: 2rpx;" color="#ff440c">
				</uni-icons>
				<span style="font-size: 16px; font-weight: 600;">最新发布</span>
			</view>
			<view class="rand4">
				<view class="randgood" v-for="(item, index) in state.randGoods" :key="index" @click="goGood(item.goodId)">
					<img class="randgoodimg" :src="item.goodPicture[0]" alt="">
					<view class="goodright">
						<p style="font-weight: 600; color: #050d81; font-size: 18px;">{{item.goodName}}</p>
						<p>预售价格：<span style="color: #cc0c0c;">¥{{item.goodPrice}}</span></p>
						<p style="font-size: 12px; color: #5a5a5a;">{{item.goodDate}}</p>
						<button size="mini" style="position: absolute; right: 20rpx; bottom: 10rpx; background-color: #2753cc; color: #fff;" @click="apply(item.goodId)">立刻申请</button>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
	<view class="container" v-if="state.role == 2">
		<!-- 为空时 -->
		<view class="empty" v-if="state.goods.length == 0">
			<img style="margin: 0 auto; width: 160rpx; height: 160rpx;" src="@/static/images/empty.png" alt="">
			<p>你还没有发布商品</p>
			<button class="empty-pub-btn" @click="publish">点击发布</button>
		</view>
		<!-- 不为空 -->
		<view class="goods">
			<h2 class="title" @click="gopublish">
				<uni-icons type="compose" size="20" style="position: relative; top: 2rpx;"></uni-icons>
				去发布
				<uni-icons type="right" size="18" style="float: right;"></uni-icons>
			</h2>
			<view class="good" v-for="(item, index) in state.goods" :key="index">
				<img class="good-picture" :src="item.goodPicture[0]" alt="">
				<view class="good-right">
					<p class="goodname">{{item.goodName}}</p>
					<p class="goodsubtitle">预售价格：<span style="color: #cc0c0c;">¥{{item.goodPrice}}</span></p>
					<button class="detaiibtn" @click="goGood(item.goodId)" size="mini">详情</button>
					<button class="delbtn" size="mini">下架</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		onShow
	} from "@dcloudio/uni-app"
	import { reactive } from 'vue'
	
	const state = reactive({
		goods: [],
		randGoods: [],
		role: getApp().globalData.role
	})


	// 发布商品
	const publish = () => {
		uni.navigateTo({
			url: '/pages/publish/publish'
		})
	}

	onShow(() => {
		if (getApp().globalData.role == 2) {
			uni.request({
				url: 'http://127.0.0.1:3000/good/getgoodbyuserid?goodProducterId=' + getApp().globalData.userid,
				success(res) {
					for (let i of res.data.data) {
						i.goodPicture = i.goodPicture.split(",")
					}
					state.goods = res.data.data
				}
			})
		}
		if (getApp().globalData.role == 3) {
			uni.request({
				url: 'http://127.0.0.1:3000/good/getrandgood',
				success(res) {
					if (res.data.status == 0) {
						for (let i of res.data.data) {
							i.goodPicture = i.goodPicture.split(",")
							i.goodDate = i.goodDate.slice(0, 10)
						}
						state.randGoods = res.data.data
					}
				}
			})
		}
	})

	const gopublish = () => {
		uni.navigateTo({
			url: '/pages/publish/publish'
		})
	}
	
	const apply = (shenqingGoodId) => {
		uni.request({
			url: 'http://127.0.0.1:3000/shenqing/addshenqing',
			method: "POST",
			data: {
				shenqingUserId: getApp().globalData.userid,
				shenqingGoodId
			},
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success(res) {
				console.log(res);
			}
		})
	}
	
	const goGood = (shenqingGoodId) => {
		uni.navigateTo({
			url: '/pages/good/good?goodid=' + shenqingGoodId
		})
	}
</script>
<!-- 企业 -->
<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.empty {
		margin: 200rpx 0 200rpx 0;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		color: #b5b5b5;
	}

	.empty-pub-btn {
		background-color: $uni-primary;
		color: #fff;
		margin-top: 140rpx;
		width: 600rpx;
		font-size: 16px;
	}

	.title {
		background-color: #fff;
		margin-bottom: 60rpx;
		padding: 20rpx;
		border-radius: 20rpx;
	}

	.good {
		height: 200rpx;
		margin-bottom: 60rpx;
		display: flex;
		position: relative;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 20rpx;
	}

	.good-picture {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10px;
	}

	.good-right {
		padding: 6rpx 0 0 40rpx;
	}

	.goodname {
		font-weight: 600;
		font-size: 18px;
		color: #050d81;
	}

	.goodsubtitle {
		font-size: 14px;
	}

	.detaiibtn {
		position: absolute;
		right: 160rpx;
		bottom: 20rpx;
		font-size: 14px;
		background-color: $uni-primary;
		color: #fff;
	}

	.delbtn {
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		font-size: 14px;
		color: $uni-error;
	}
</style>

<!-- 测评员 -->
<style lang="scss">
	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		text-align: center;
	}

	.tuijian {
		margin-top: 40rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10px;
	}

	.hot-title {
		display: flex;
		align-items: center;
		padding: 10rpx;
	}

	.randgood {
		position: relative;
		display: flex;
		margin: 30rpx 0 60rpx 0;
	}

	.randgoodimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10px;
	}

	.goodright {
		padding: 10rpx 0 0 20rpx;
	}
	
	.new {
		margin-top: 40rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10px;
	}
</style>
