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
  __name: "publish",
  setup(__props) {
    const time = new Date();
    const state = common_vendor.reactive({
      goodName: "",
      goodProducterId: getApp().globalData.userid,
      goodPicture: [],
      goodDate: time.toLocaleDateString(),
      goodPrice: 0,
      goodText: ""
    });
    const publish = () => {
      const goodPic = state.goodPicture.join(",");
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/good/addgood",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          goodName: state.goodName,
          goodProducterId: state.goodProducterId,
          goodPicture: goodPic,
          goodDate: state.goodDate,
          goodPrice: state.goodPrice,
          goodText: state.goodText
        },
        success(res) {
          common_vendor.index.showToast({
            title: "发布成功"
          });
          setTimeout(() => {
            common_vendor.index.redirectTo({
              url: "/pages/home3/home3"
            });
          }, 1500);
        },
        fail(err) {
          console.log(err);
        }
      });
    };
    const addPic = () => {
      state.goodPicture.join(",");
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          if (res.tempFilePaths.length > 0) {
            let filePath = res.tempFilePaths[0];
            common_vendor.index.showLoading({
              title: "上传中..",
              mask: true
            });
            common_vendor.Es.uploadFile({
              filePath,
              cloudPath: "a.png",
              onUploadProgress: function(progressEvent) {
                console.log(progressEvent);
                Math.round(
                  progressEvent.loaded * 100 / progressEvent.total
                );
              },
              success(res2) {
                state.goodPicture.push(res2.fileID);
              },
              fail() {
                common_vendor.index.showToast({
                  title: "上传失败",
                  icon: "error"
                });
                common_vendor.index.hideLoading();
              },
              complete() {
                common_vendor.index.hideLoading();
              }
            });
          }
        }
      });
    };
    const cancelPic = (index) => {
      state.goodPicture.splice(index, 1);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.goodName,
        b: common_vendor.o(($event) => state.goodName = $event.detail.value),
        c: state.goodText,
        d: common_vendor.o(($event) => state.goodText = $event.detail.value),
        e: common_vendor.f(state.goodPicture, (item, index, i0) => {
          return {
            a: "0b20e254-0-" + i0,
            b: common_vendor.o(($event) => cancelPic(index), index),
            c: item,
            d: index
          };
        }),
        f: common_vendor.p({
          type: "closeempty",
          size: "12",
          color: "#fff"
        }),
        g: state.goodPicture.length < 9
      }, state.goodPicture.length < 9 ? {
        h: common_vendor.p({
          type: "plus-filled",
          size: "20",
          color: "#949494"
        }),
        i: common_vendor.o(addPic)
      } : {}, {
        j: common_assets._imports_0$1,
        k: state.goodPrice,
        l: common_vendor.o(($event) => state.goodPrice = $event.detail.value),
        m: common_vendor.o(publish)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/publish/publish.vue"]]);
wx.createPage(MiniProgramPage);
