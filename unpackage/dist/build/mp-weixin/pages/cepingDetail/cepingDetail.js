"use strict";const e=require("../../common/vendor.js"),o={__name:"cepingDetail",setup(o){const n=e.reactive({cepingInfo:{},user:{},goodinfo:{}});return e.onLoad((e=>{n.cepingInfo.cepingId=e.cepingId})),e.onShow((()=>{e.index.request({url:"http://127.0.0.1:3000/user/selectuser?userId="+getApp().globalData.userid,success(e){n.user=e.data.data[0],console.log(n)}}),e.index.request({url:"http://127.0.0.1:3000/ceping/getcepingbycepingid?cepingId="+n.cepingInfo.cepingId,success(o){n.cepingInfo=o.data.data[0],n.cepingInfo.cepingPicture=n.cepingInfo.cepingPicture.split(","),n.cepingInfo.cepingDate=n.cepingInfo.cepingDate.slice(0,10),e.index.request({url:"http://127.0.0.1:3000/good/getgoodbyid?goodId="+n.cepingInfo.cepingGoodId,success(o){n.goodinfo=o.data.data[0],null==n.goodinfo.goodPicture&&(n.goodinfo.goodPicture=""),n.goodinfo.goodPicture=n.goodinfo.goodPicture.split(","),e.index.request({url:"http://127.0.0.1:3000/user/selectuser?userId="+n.goodinfo.goodProducterId,success(e){n.userinfo=e.data.data[0],console.log(n)}})}})}})})),(o,i)=>({a:n.user.picture,b:e.t(n.user.username),c:n.goodinfo.goodPicture,d:e.t(n.goodinfo.goodName),e:e.t(n.goodinfo.goodPrice),f:e.t(n.cepingInfo.cepingText),g:e.t(n.cepingInfo.cepingDate)})}};wx.createPage(o);