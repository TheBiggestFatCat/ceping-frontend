"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "applydetail",
  setup(__props) {
    const state = common_vendor.reactive({
      apply: [],
      selected: 1,
      role: getApp().globalData.role
    });
    const alterStatus = (id, status) => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/shenqing/xiugaistatus?shenqingId=" + id + "&shenqingStatus=" + status,
        success(res) {
          getData();
        }
      });
    };
    const getData = () => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/shenqing/oneshenqinggood?goodProducterId=" + getApp().globalData.userid,
        success(res) {
          state.apply = res.data.data;
          for (let i of state.apply) {
            common_vendor.index.request({
              url: "http://127.0.0.1:3000/user/selectuser?userId=" + i.shenqingUserId,
              success(res2) {
                i.username = res2.data.data[0].username;
                console.log(i.shenqingStatus);
              }
            });
            common_vendor.index.request({
              url: "http://127.0.0.1:3000/good/getgoodbyid?goodId=" + i.shenqingGoodId,
              success(res2) {
                i.goodName = res2.data.data[0].goodName;
                i.picture = res2.data.data[0].goodPicture.split(",")[0];
              }
            });
          }
        }
      });
    };
    const getData2 = () => {
      state.selected = 2;
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/shenqing/getshenqingbyuser?shenqingUserId=" + getApp().globalData.userid,
        success(res) {
          console.log(res);
          state.apply = res.data.data;
          for (let i of state.apply) {
            common_vendor.index.request({
              url: "http://127.0.0.1:3000/good/getgoodbyid?goodId=" + i.shenqingGoodId,
              success(res2) {
                i.goodName = res2.data.data[0].goodName;
                i.picture = res2.data.data[0].goodPicture.split(",")[0];
              }
            });
          }
        }
      });
    };
    const goCeping = (shenqingGoodId, shenqingId) => {
      common_vendor.index.navigateTo({
        url: "/pages/ceping/ceping?shenqingGoodId=" + shenqingGoodId + "&shenqingId=" + shenqingId
      });
    };
    common_vendor.onShow(() => {
      if (getApp().globalData.role == 2) {
        getData();
      }
      if (getApp().globalData.role == 3) {
        getData2();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          color: state.selected == 1 ? "blue" : "",
          type: "more-filled",
          size: "24"
        }),
        b: common_vendor.n(state.selected == 1 ? "blue" : ""),
        c: common_vendor.n(state.selected == 1 ? "selected-tabbar-box tabbar-box" : "tabbar-box"),
        d: common_vendor.o(($event) => state.selected = 1),
        e: common_vendor.p({
          color: state.selected == 2 ? "blue" : "",
          type: "checkmarkempty",
          size: "24"
        }),
        f: common_vendor.n(state.selected == 2 ? "blue" : ""),
        g: common_vendor.n(state.selected == 2 ? "selected-tabbar-box tabbar-box" : "tabbar-box"),
        h: common_vendor.o(($event) => state.selected = 2),
        i: common_vendor.p({
          color: state.selected == 3 ? "blue" : "",
          type: "closeempty",
          size: "24"
        }),
        j: common_vendor.n(state.selected == 3 ? "blue" : ""),
        k: common_vendor.n(state.selected == 3 ? "selected-tabbar-box tabbar-box" : "tabbar-box"),
        l: common_vendor.o(($event) => state.selected = 3),
        m: common_vendor.n(state.selected == 1 ? "linetype1" : state.selected == 2 ? "linetype2" : "linetype3"),
        n: state.role == 2
      }, state.role == 2 ? {
        o: common_vendor.f(state.apply, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.username),
            b: common_vendor.t(item.goodName),
            c: common_vendor.t(item.date),
            d: item.shenqingStatus == 1
          }, item.shenqingStatus == 1 ? {
            e: common_vendor.o(($event) => alterStatus(item.shenqingId, 2), index)
          } : {}, {
            f: item.shenqingStatus == 1
          }, item.shenqingStatus == 1 ? {
            g: common_vendor.o(($event) => alterStatus(item.shenqingId, 3), index)
          } : {}, {
            h: item.picture,
            i: index,
            j: state.selected == item.shenqingStatus,
            k: index
          });
        })
      } : {}, {
        p: state.role == 3
      }, state.role == 3 ? {
        q: common_vendor.f(state.apply, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.goodName),
            b: common_vendor.t(item.date),
            c: item.shenqingStatus == 2
          }, item.shenqingStatus == 2 ? {
            d: "375055b4-3-" + i0,
            e: common_vendor.p({
              type: "right",
              size: "12",
              color: "#fff"
            }),
            f: common_vendor.o(($event) => goCeping(item.shenqingGoodId, item.shenqingId), index)
          } : {}, {
            g: item.picture,
            h: index,
            i: state.selected == item.shenqingStatus,
            j: index
          });
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/applydetail/applydetail.vue"]]);
wx.createPage(MiniProgramPage);
