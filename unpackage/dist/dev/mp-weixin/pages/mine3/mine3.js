"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mine3",
  setup(__props) {
    const state = common_vendor.reactive({
      user: {},
      apply: [],
      empty: true,
      ceping: []
    });
    const getData = () => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/user/selectuser?userId=" + getApp().globalData.userid,
        success(res) {
          if (res.data.status == 0) {
            state.user = res.data.data[0];
          }
        }
      });
      if (getApp().globalData.role == 2) {
        common_vendor.index.request({
          url: "http://127.0.0.1:3000/shenqing/oneshenqinggood?goodProducterId=" + getApp().globalData.userid,
          success(res) {
            state.apply = res.data.data;
            console.log(state);
            for (let i = state.apply.length - 1; i >= 0; i--) {
              let item = state.apply[i];
              if (item.shenqingStatus != 1) {
                state.apply.splice(i, 1);
                continue;
              }
              common_vendor.index.request({
                url: "http://127.0.0.1:3000/user/selectuser?userId=" + item.shenqingUserId,
                success(res2) {
                  item.username = res2.data.data[0].username;
                }
              });
              common_vendor.index.request({
                url: "http://127.0.0.1:3000/good/getgoodbyid?goodId=" + item.shenqingGoodId,
                success(res2) {
                  item.goodName = res2.data.data[0].goodName;
                }
              });
            }
            state.empty = state.apply.find((item) => item.shenqingStatus == 1) == null;
          }
        });
      }
      if (getApp().globalData.role == 3) {
        common_vendor.index.request({
          url: "http://127.0.0.1:3000/shenqing/getshenqingbyuser?shenqingUserId=" + getApp().globalData.userid,
          success(res) {
            state.apply = res.data.data;
            console.log(state);
            for (let i = state.apply.length - 1; i >= 0; i--) {
              let item = state.apply[i];
              if (item.shenqingStatus != 1) {
                state.apply.splice(i, 1);
                continue;
              }
              common_vendor.index.request({
                url: "http://127.0.0.1:3000/good/getgoodbyid?goodId=" + item.shenqingGoodId,
                success(res2) {
                  item.goodName = res2.data.data[0].goodName;
                }
              });
            }
            state.empty = state.apply.find((item) => item.shenqingStatus == 1) == null;
          }
        });
        common_vendor.index.request({
          url: "http://127.0.0.1:3000/ceping/getcepingbyuserid?cepingerId=" + getApp().globalData.userid,
          success(res) {
            for (let i of res.data.data) {
              i.cepingPicture = i.cepingPicture.split(",");
              i.cepingDate = i.cepingDate.slice(0, 10);
              if (i.cepingText.length > 21) {
                i.cepingText = i.cepingText.slice(0, 20) + "...";
              }
            }
            state.ceping = res.data.data;
          }
        });
      }
    };
    common_vendor.onShow(() => {
      getData();
    });
    const goApplydetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/applydetail/applydetail"
      });
    };
    const goCeping = () => {
      common_vendor.index.switchTab({
        url: "/pages/home3/home3"
      });
    };
    const goCepingDetail = (cepingId) => {
      common_vendor.index.navigateTo({
        url: "/pages/cepingDetail/cepingDetail?cepingId=" + cepingId
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.user.picture,
        b: state.user.role == 2
      }, state.user.role == 2 ? {} : {}, {
        c: state.user.role == 3
      }, state.user.role == 3 ? {} : {}, {
        d: state.user.role == 2
      }, state.user.role == 2 ? common_vendor.e({
        e: state.user.role == 2
      }, state.user.role == 2 ? {} : {}, {
        f: !state.empty
      }, !state.empty ? {} : {}, {
        g: common_vendor.f(state.apply, (item, index, i0) => {
          return {
            a: common_vendor.t(item.goodName),
            b: common_vendor.t(item.username),
            c: common_vendor.t(item.date),
            d: index
          };
        }),
        h: state.empty
      }, state.empty ? {} : {}, {
        i: common_vendor.o(goApplydetail)
      }) : {}, {
        j: state.user.role == 3
      }, state.user.role == 3 ? common_vendor.e({
        k: state.user.role == 3
      }, state.user.role == 3 ? {} : {}, {
        l: !state.empty
      }, !state.empty ? {} : {}, {
        m: common_vendor.f(state.apply, (item, index, i0) => {
          return {
            a: common_vendor.t(item.goodName),
            b: common_vendor.t(item.date),
            c: index
          };
        }),
        n: state.empty
      }, state.empty ? {} : {}, {
        o: common_vendor.o(goApplydetail)
      }) : {}, {
        p: state.user.role == 3
      }, state.user.role == 3 ? common_vendor.e({
        q: state.user.role == 3
      }, state.user.role == 3 ? {} : {}, {
        r: common_vendor.f(state.ceping, (item, index, i0) => {
          return {
            a: common_vendor.t(item.cepingText),
            b: common_vendor.t(item.cepingDate),
            c: item.cepingPicture[0],
            d: index,
            e: common_vendor.o(($event) => goCepingDetail(item.cepingId), index)
          };
        }),
        s: state.ceping.length == 0
      }, state.ceping.length == 0 ? {
        t: common_vendor.o(goCeping)
      } : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/mine3/mine3.vue"]]);
wx.createPage(MiniProgramPage);
