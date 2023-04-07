"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "good",
  setup(__props) {
    const state = common_vendor.reactive({
      goodid: 0,
      goodinfo: {},
      userinfo: "",
      cepingInfo: []
    });
    common_vendor.onLoad((option) => {
      state.goodid = option.goodid;
    });
    common_vendor.onShow(() => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/good/getgoodbyid?goodId=" + state.goodid,
        success(res) {
          state.goodinfo = res.data.data[0];
          if (state.goodinfo.goodPicture == null) {
            state.goodinfo.goodPicture = "";
          }
          state.goodinfo.goodPicture = state.goodinfo.goodPicture.split(",");
          common_vendor.index.request({
            url: "http://127.0.0.1:3000/user/selectuser?userId=" + state.goodinfo.goodProducterId,
            success(res2) {
              state.userinfo = res2.data.data[0];
            }
          });
        }
      });
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/ceping/getcepingbygoodid?cepingGoodId=" + state.goodid,
        success(res) {
          for (let i of res.data.data) {
            i.goodPicture = i.goodPicture.split(",");
          }
          state.cepingInfo = res.data.data;
          for (let i in res.data.data) {
            common_vendor.index.request({
              url: "http://127.0.0.1:3000/user/selectuser?userId=" + res.data.data[i].cepingerId,
              success(res2) {
                state.cepingInfo[i].username = res2.data.data[0].username;
              }
            });
          }
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.goodinfo.goodPicture, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        b: common_vendor.t(state.goodinfo.goodName),
        c: state.userinfo.picture,
        d: common_vendor.t(state.userinfo.username),
        e: common_vendor.t(state.goodinfo.goodText),
        f: common_vendor.f(state.cepingInfo, (item, index, i0) => {
          return {
            a: item.cepingPicture,
            b: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/good/good.vue"]]);
wx.createPage(MiniProgramPage);
