"use strict";const e=require("../../common/vendor.js"),t={__name:"mine3",setup(t){const a=e.reactive({user:{},apply:[],empty:!0,ceping:[]});e.onShow((()=>{e.index.request({url:"http://127.0.0.1:3000/user/selectuser?userId="+getApp().globalData.userid,success(e){0==e.data.status&&(a.user=e.data.data[0])}}),2==getApp().globalData.role&&e.index.request({url:"http://127.0.0.1:3000/shenqing/oneshenqinggood?goodProducterId="+getApp().globalData.userid,success(t){a.apply=t.data.data,console.log(a);for(let s=a.apply.length-1;s>=0;s--){let t=a.apply[s];1==t.shenqingStatus?(e.index.request({url:"http://127.0.0.1:3000/user/selectuser?userId="+t.shenqingUserId,success(e){t.username=e.data.data[0].username}}),e.index.request({url:"http://127.0.0.1:3000/good/getgoodbyid?goodId="+t.shenqingGoodId,success(e){t.goodName=e.data.data[0].goodName}})):a.apply.splice(s,1)}a.empty=null==a.apply.find((e=>1==e.shenqingStatus))}}),3==getApp().globalData.role&&(e.index.request({url:"http://127.0.0.1:3000/shenqing/getshenqingbyuser?shenqingUserId="+getApp().globalData.userid,success(t){a.apply=t.data.data,console.log(a);for(let s=a.apply.length-1;s>=0;s--){let t=a.apply[s];1==t.shenqingStatus?e.index.request({url:"http://127.0.0.1:3000/good/getgoodbyid?goodId="+t.shenqingGoodId,success(e){t.goodName=e.data.data[0].goodName}}):a.apply.splice(s,1)}a.empty=null==a.apply.find((e=>1==e.shenqingStatus))}}),e.index.request({url:"http://127.0.0.1:3000/ceping/getcepingbyuserid?cepingerId="+getApp().globalData.userid,success(e){for(let t of e.data.data)t.cepingPicture=t.cepingPicture.split(","),t.cepingDate=t.cepingDate.slice(0,10),t.cepingText.length>21&&(t.cepingText=t.cepingText.slice(0,20)+"...");a.ceping=e.data.data}}))}));const s=()=>{e.index.navigateTo({url:"/pages/applydetail/applydetail"})},r=()=>{e.index.switchTab({url:"/pages/home3/home3"})};return(t,p)=>e.e({a:a.user.picture,b:2==a.user.role},(a.user.role,{}),{c:3==a.user.role},(a.user.role,{}),{d:2==a.user.role},2==a.user.role?e.e({e:2==a.user.role},(a.user.role,{}),{f:!a.empty},(a.empty,{}),{g:e.f(a.apply,((t,a,s)=>({a:e.t(t.goodName),b:e.t(t.username),c:e.t(t.date),d:a}))),h:a.empty},(a.empty,{}),{i:e.o(s)}):{},{j:3==a.user.role},3==a.user.role?e.e({k:3==a.user.role},(a.user.role,{}),{l:!a.empty},(a.empty,{}),{m:e.f(a.apply,((t,a,s)=>({a:e.t(t.goodName),b:e.t(t.date),c:a}))),n:a.empty},(a.empty,{}),{o:e.o(s)}):{},{p:3==a.user.role},3==a.user.role?e.e({q:3==a.user.role},(a.user.role,{}),{r:e.f(a.ceping,((t,a,s)=>({a:e.t(t.cepingText),b:e.t(t.cepingDate),c:t.cepingPicture[0],d:a,e:e.o((a=>{return s=t.cepingId,void e.index.navigateTo({url:"/pages/cepingDetail/cepingDetail?cepingId="+s});var s}),a)}))),s:0==a.ceping.length},0==a.ceping.length?{t:e.o(r)}:{}):{})}};wx.createPage(t);
