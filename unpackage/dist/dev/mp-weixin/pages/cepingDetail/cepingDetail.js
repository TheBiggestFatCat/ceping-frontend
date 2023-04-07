"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "cepingDetail",
  setup(__props) {
    const state = common_vendor.reactive({
      cepingInfo: {},
      user: {},
      goodinfo: {}
    });
    common_vendor.onLoad((options) => {
      state.cepingInfo.cepingId = options.cepingId;
    });
    common_vendor.onShow(() => {
      getData();
    });
    function getData() {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/user/selectuser?userId=" + getApp().globalData.userid,
        success(res) {
          state.user = res.data.data[0];
          console.log(state);
        }
      });
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/ceping/getcepingbycepingid?cepingId=" + state.cepingInfo.cepingId,
        success(res) {
          state.cepingInfo = res.data.data[0];
          state.cepingInfo.cepingPicture = state.cepingInfo.cepingPicture.split(",");
          state.cepingInfo.cepingDate = state.cepingInfo.cepingDate.slice(0, 10);
          common_vendor.index.request({
            url: "http://127.0.0.1:3000/good/getgoodbyid?goodId=" + state.cepingInfo.cepingGoodId,
            success(res2) {
              state.goodinfo = res2.data.data[0];
              if (state.goodinfo.goodPicture == null) {
                state.goodinfo.goodPicture = "";
              }
              state.goodinfo.goodPicture = state.goodinfo.goodPicture.split(",");
              common_vendor.index.request({
                url: "http://127.0.0.1:3000/user/selectuser?userId=" + state.goodinfo.goodProducterId,
                success(res3) {
                  state.userinfo = res3.data.data[0];
                  console.log(state);
                }
              });
            }
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: state.user.picture,
        b: common_vendor.t(state.user.username),
        c: state.goodinfo.goodPicture,
        d: common_vendor.t(state.goodinfo.goodName),
        e: common_vendor.t(state.goodinfo.goodPrice),
        f: common_vendor.t(state.cepingInfo.cepingText),
        g: common_vendor.t(state.cepingInfo.cepingDate)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/cepingDetail/cepingDetail.vue"]]);
wx.createPage(MiniProgramPage);
