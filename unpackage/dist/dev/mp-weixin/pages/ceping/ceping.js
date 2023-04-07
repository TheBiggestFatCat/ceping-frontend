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
  __name: "ceping",
  setup(__props) {
    const time = new Date();
    const state = common_vendor.reactive({
      goodInfo: {},
      cepingerId: getApp().globalData.userid,
      cepingPicture: [],
      cepingDate: time.toLocaleDateString(),
      cepingText: "",
      shenqingId: 0,
      cepingGoodId: 0,
      goodInfo: {
        goodPicture: []
      }
    });
    common_vendor.onLoad((option) => {
      state.cepingGoodId = option.shenqingGoodId;
      state.shenqingId = option.shenqingId;
    });
    common_vendor.onShow(() => {
      getData();
      console.log(state);
    });
    const getData = () => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/good/getgoodbyid?goodId=" + state.cepingGoodId,
        success(res) {
          for (let i of res.data.data) {
            i.goodPicture = i.goodPicture.split(",");
          }
          state.goodInfo = res.data.data[0];
        }
      });
    };
    const publish = () => {
      const goodPic = state.cepingPicture.join(",");
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/ceping/addceping",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          cepingGoodId: state.cepingGoodId,
          cepingerId: state.cepingerId,
          cepingPicture: goodPic,
          cepingDate: state.cepingDate,
          cepingText: state.cepingText
        },
        success(res) {
          if (res.data.status == 0) {
            common_vendor.index.showToast({
              title: "发布成功"
            });
            setTimeout(() => {
              common_vendor.index.redirectTo({
                url: "/pages/home3/home3"
              });
            }, 1500);
          } else {
            console.log(res);
          }
        },
        fail(err) {
          console.log(err);
        }
      });
    };
    const addPic = () => {
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
                state.cepingPicture.push(res2.fileID);
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
      state.cepingPicture.splice(index, 1);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.goodInfo.goodPicture[0],
        b: common_vendor.t(state.goodInfo.goodName),
        c: common_vendor.t(state.goodInfo.goodPrice),
        d: state.cepingText,
        e: common_vendor.o(($event) => state.cepingText = $event.detail.value),
        f: common_vendor.f(state.cepingPicture, (item, index, i0) => {
          return {
            a: "48112bf4-0-" + i0,
            b: common_vendor.o(($event) => cancelPic(index), index),
            c: item,
            d: index
          };
        }),
        g: common_vendor.p({
          type: "closeempty",
          size: "12",
          color: "#fff"
        }),
        h: state.cepingPicture.length < 9
      }, state.cepingPicture.length < 9 ? {
        i: common_vendor.p({
          type: "plus-filled",
          size: "20",
          color: "#949494"
        }),
        j: common_vendor.o(addPic)
      } : {}, {
        k: common_vendor.o(publish)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/ceping/ceping.vue"]]);
wx.createPage(MiniProgramPage);
