"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "home3",
  setup(__props) {
    const state = common_vendor.reactive({
      goods: [],
      randGoods: [],
      role: getApp().globalData.role
    });
    const publish = () => {
      common_vendor.index.navigateTo({
        url: "/pages/publish/publish"
      });
    };
    common_vendor.onShow(() => {
      if (getApp().globalData.role == 2) {
        common_vendor.index.request({
          url: "http://127.0.0.1:3000/good/getgoodbyuserid?goodProducterId=" + getApp().globalData.userid,
          success(res) {
            for (let i of res.data.data) {
              i.goodPicture = i.goodPicture.split(",");
            }
            state.goods = res.data.data;
          }
        });
      }
      if (getApp().globalData.role == 3) {
        common_vendor.index.request({
          url: "http://127.0.0.1:3000/good/getrandgood",
          success(res) {
            if (res.data.status == 0) {
              for (let i of res.data.data) {
                i.goodPicture = i.goodPicture.split(",");
                i.goodDate = i.goodDate.slice(0, 10);
              }
              state.randGoods = res.data.data;
            }
          }
        });
      }
    });
    const gopublish = () => {
      common_vendor.index.navigateTo({
        url: "/pages/publish/publish"
      });
    };
    const apply = (shenqingGoodId) => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/shenqing/addshenqing",
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
      });
    };
    const goGood = (shenqingGoodId) => {
      common_vendor.index.navigateTo({
        url: "/pages/good/good?goodid=" + shenqingGoodId
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.role == 3
      }, state.role == 3 ? {
        b: common_vendor.p({
          type: "hand-up-filled",
          size: "24",
          color: "#ffb218"
        }),
        c: common_vendor.f(state.randGoods, (item, index, i0) => {
          return {
            a: item.goodPicture[0],
            b: common_vendor.t(item.goodName),
            c: common_vendor.t(item.goodPrice),
            d: common_vendor.t(item.goodDate),
            e: common_vendor.o(($event) => apply(item.goodId), index),
            f: index,
            g: common_vendor.o(($event) => goGood(item.goodId), index)
          };
        }),
        d: common_vendor.p({
          type: "fire-filled",
          size: "24",
          color: "#ff440c"
        }),
        e: common_vendor.f(state.randGoods, (item, index, i0) => {
          return {
            a: item.goodPicture[0],
            b: common_vendor.t(item.goodName),
            c: common_vendor.t(item.goodPrice),
            d: common_vendor.t(item.goodDate),
            e: common_vendor.o(($event) => apply(item.goodId), index),
            f: index,
            g: common_vendor.o(($event) => goGood(item.goodId), index)
          };
        })
      } : {}, {
        f: state.role == 2
      }, state.role == 2 ? common_vendor.e({
        g: state.goods.length == 0
      }, state.goods.length == 0 ? {
        h: common_assets._imports_0,
        i: common_vendor.o(publish)
      } : {}, {
        j: common_vendor.p({
          type: "compose",
          size: "20"
        }),
        k: common_vendor.p({
          type: "right",
          size: "18"
        }),
        l: common_vendor.o(gopublish),
        m: common_vendor.f(state.goods, (item, index, i0) => {
          return {
            a: item.goodPicture[0],
            b: common_vendor.t(item.goodName),
            c: common_vendor.t(item.goodPrice),
            d: common_vendor.o(($event) => goGood(item.goodId), index),
            e: index
          };
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/home3/home3.vue"]]);
wx.createPage(MiniProgramPage);
