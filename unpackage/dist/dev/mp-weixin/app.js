"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/home3/home3.js";
  "./pages/mine3/mine3.js";
  "./pages/register/register.js";
  "./pages/publish/publish.js";
  "./pages/good/good.js";
  "./pages/applydetail/applydetail.js";
  "./pages/ceping/ceping.js";
  "./pages/cepingDetail/cepingDetail.js";
  "./pages/alteruser/alteruser.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    username: "",
    role: 0,
    userid: 0
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
