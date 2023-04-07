"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  (_easycom_uni_easyinput2 + _easycom_uni_section2 + _easycom_uni_data_checkbox2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_section + _easycom_uni_data_checkbox)();
}
const _sfc_main = {
  __name: "register",
  setup(__props) {
    let role = 3;
    const range = [{ "value": 3, "text": "测评人" }, { "value": 2, "text": "企业" }];
    let username = "";
    let password = "";
    let picture = "";
    const register = () => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/user/adduser",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          username,
          password,
          picture,
          role
        },
        success(res) {
          common_vendor.index.showToast({
            title: "注册成功"
          });
          setTimeout(() => {
            common_vendor.index.redirectTo({
              url: "/pages/index/index"
            });
          }, 2e3);
        }
      });
    };
    const uploadAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success(res) {
          if (res.tempFilePaths.length > 0) {
            let filePath = res.tempFilePaths[0];
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
                picture = res2.fileID;
              },
              fail() {
                common_vendor.index.showToast({
                  title: "上传失败",
                  icon: "error"
                });
              }
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(username) ? username.value = $event : username = $event),
        b: common_vendor.p({
          placeholder: "请输入",
          modelValue: common_vendor.unref(username)
        }),
        c: common_vendor.p({
          title: "用户名",
          type: "line",
          padding: true
        }),
        d: common_vendor.o(($event) => common_vendor.isRef(password) ? password.value = $event : password = $event),
        e: common_vendor.p({
          placeholder: "请输入",
          modelValue: common_vendor.unref(password)
        }),
        f: common_vendor.p({
          title: "密码",
          type: "line",
          padding: true
        }),
        g: common_vendor.o(($event) => common_vendor.isRef(role) ? role.value = $event : role = $event),
        h: common_vendor.p({
          localdata: range,
          modelValue: common_vendor.unref(role)
        }),
        i: common_vendor.o(uploadAvatar),
        j: common_vendor.o(register)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
