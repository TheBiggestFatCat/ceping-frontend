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
  __name: "index",
  setup(__props) {
    let role = 3;
    const range = [{ "value": 3, "text": "测评人" }, { "value": 2, "text": "企业" }];
    let username = "";
    let password = "";
    const login = () => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3000/user/yanzhen",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          username,
          password,
          role
        },
        success(res) {
          if (res.data.status == 0) {
            getApp().globalData.role = role;
            getApp().globalData.userid = res.data.data;
            common_vendor.index.switchTab({
              url: "/pages/home3/home3"
            });
          }
        }
      });
    };
    const toRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
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
        i: common_vendor.o(login),
        j: common_vendor.o(toRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/WebProjects/ceping-frontend/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
