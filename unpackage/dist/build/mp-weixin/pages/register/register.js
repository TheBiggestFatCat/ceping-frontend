"use strict";const e=require("../../common/vendor.js");if(!Array){(e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-section")+e.resolveComponent("uni-data-checkbox"))()}Math||((()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js")+(()=>"../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js"))();const o={__name:"register",setup(o){let t=3;const n=[{value:3,text:"测评人"},{value:2,text:"企业"}];let i="",s="",a="";const u=()=>{e.index.request({url:"http://127.0.0.1:3000/user/adduser",header:{"Content-Type":"application/x-www-form-urlencoded"},method:"POST",data:{username:i,password:s,picture:a,role:t},success(o){e.index.showToast({title:"注册成功"}),setTimeout((()=>{e.index.redirectTo({url:"/pages/index/index"})}),2e3)}})},l=()=>{e.index.chooseImage({count:1,success(o){if(o.tempFilePaths.length>0){let t=o.tempFilePaths[0];e.Es.uploadFile({filePath:t,cloudPath:"a.png",onUploadProgress:function(e){console.log(e),Math.round(100*e.loaded/e.total)},success(e){a=e.fileID},fail(){e.index.showToast({title:"上传失败",icon:"error"})}})}}})};return(o,a)=>({a:e.o((o=>e.isRef(i)?i.value=o:i=o)),b:e.p({placeholder:"请输入",modelValue:e.unref(i)}),c:e.p({title:"用户名",type:"line",padding:!0}),d:e.o((o=>e.isRef(s)?s.value=o:s=o)),e:e.p({placeholder:"请输入",modelValue:e.unref(s)}),f:e.p({title:"密码",type:"line",padding:!0}),g:e.o((o=>e.isRef(t)?t.value=o:t=o)),h:e.p({localdata:n,modelValue:e.unref(t)}),i:e.o(l),j:e.o(u)})}};wx.createPage(o);