"use strict";
const common_vendor = require("../../../../common/vendor.js");
function obj2strClass(obj) {
  let classess = "";
  for (let key in obj) {
    const val = obj[key];
    if (val) {
      classess += `${key} `;
    }
  }
  return classess;
}
function obj2strStyle(obj) {
  let style = "";
  for (let key in obj) {
    const val = obj[key];
    style += `${key}:${val};`;
  }
  return style;
}
const _sfc_main = {
  name: "uni-easyinput",
  emits: [
    "click",
    "iconClick",
    "update:modelValue",
    "input",
    "focus",
    "blur",
    "confirm",
    "clear",
    "eyes",
    "change"
  ],
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  options: {
    virtualHost: true
  },
  inject: {
    form: {
      from: "uniForm",
      default: null
    },
    formItem: {
      from: "uniFormItem",
      default: null
    }
  },
  props: {
    name: String,
    value: [Number, String],
    modelValue: [Number, String],
    type: {
      type: String,
      default: "text"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: " "
    },
    placeholderStyle: String,
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    confirmType: {
      type: String,
      default: "done"
    },
    clearSize: {
      type: [Number, String],
      default: 24
    },
    inputBorder: {
      type: Boolean,
      default: true
    },
    prefixIcon: {
      type: String,
      default: ""
    },
    suffixIcon: {
      type: String,
      default: ""
    },
    trim: {
      type: [Boolean, String],
      default: true
    },
    passwordIcon: {
      type: Boolean,
      default: true
    },
    primaryColor: {
      type: String,
      default: "#2979ff"
    },
    styles: {
      type: Object,
      default() {
        return {
          color: "#333",
          disableColor: "#F7F6F6",
          borderColor: "#e5e5e5"
        };
      }
    },
    errorMessage: {
      type: [String, Boolean],
      default: ""
    }
  },
  data() {
    return {
      focused: false,
      val: "",
      showMsg: "",
      border: false,
      isFirstBorder: false,
      showClearIcon: false,
      showPassword: false,
      focusShow: false,
      localMsg: ""
    };
  },
  computed: {
    // 输入框内是否有值
    isVal() {
      const val = this.val;
      if (val || val === 0) {
        return true;
      }
      return false;
    },
    msg() {
      return this.localMsg || this.errorMessage;
    },
    // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
    inputMaxlength() {
      return Number(this.maxlength);
    },
    // 处理外层样式的style
    boxStyle() {
      return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
    },
    // input 内容的类和样式处理
    inputContentClass() {
      return obj2strClass({
        "is-input-border": this.inputBorder,
        "is-input-error-border": this.inputBorder && this.msg,
        "is-textarea": this.type === "textarea",
        "is-disabled": this.disabled
      });
    },
    inputContentStyle() {
      const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
      const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
      return obj2strStyle({
        "border-color": borderColor || "#e5e5e5",
        "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
      });
    },
    // input右侧样式
    inputStyle() {
      const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
      return obj2strStyle({
        "padding-right": paddingRight,
        "padding-left": this.prefixIcon ? "" : "10px"
      });
    }
  },
  watch: {
    value(newVal) {
      this.val = newVal;
    },
    modelValue(newVal) {
      this.val = newVal;
    },
    focus(newVal) {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    }
  },
  created() {
    this.init();
    if (this.form && this.formItem) {
      this.$watch("formItem.errMsg", (newVal) => {
        this.localMsg = newVal;
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.focused = this.focus;
      this.focusShow = this.focus;
    });
  },
  methods: {
    /**
     * 初始化变量值
     */
    init() {
      if (this.value || this.value === 0) {
        this.val = this.value;
      } else if (this.modelValue || this.modelValue === 0) {
        this.val = this.modelValue;
      } else {
        this.val = null;
      }
    },
    /**
     * 点击图标时触发
     * @param {Object} type
     */
    onClickIcon(type) {
      this.$emit("iconClick", type);
    },
    /**
     * 显示隐藏内容，密码框时生效
     */
    onEyes() {
      this.showPassword = !this.showPassword;
      this.$emit("eyes", this.showPassword);
    },
    /**
     * 输入时触发
     * @param {Object} event
     */
    onInput(event) {
      let value = event.detail.value;
      if (this.trim) {
        if (typeof this.trim === "boolean" && this.trim) {
          value = this.trimStr(value);
        }
        if (typeof this.trim === "string") {
          value = this.trimStr(value, this.trim);
        }
      }
      if (this.errMsg)
        this.errMsg = "";
      this.val = value;
      this.$emit("input", value);
      this.$emit("update:modelValue", value);
    },
    /**
     * 外部调用方法
     * 获取焦点时触发
     * @param {Object} event
     */
    onFocus() {
      this.$nextTick(() => {
        this.focused = true;
      });
      this.$emit("focus", null);
    },
    _Focus(event) {
      this.focusShow = true;
      this.$emit("focus", event);
    },
    /**
     * 外部调用方法
     * 失去焦点时触发
     * @param {Object} event
     */
    onBlur() {
      this.focused = false;
      this.$emit("focus", null);
    },
    _Blur(event) {
      event.detail.value;
      this.focusShow = false;
      this.$emit("blur", event);
      this.$emit("change", this.val);
      if (this.form && this.formItem) {
        const { validateTrigger } = this.form;
        if (validateTrigger === "blur") {
          this.formItem.onFieldChange();
        }
      }
    },
    /**
     * 按下键盘的发送键
     * @param {Object} e
     */
    onConfirm(e) {
      this.$emit("confirm", this.val);
      this.$emit("change", this.val);
    },
    /**
     * 清理内容
     * @param {Object} event
     */
    onClear(event) {
      this.val = "";
      this.$emit("input", "");
      this.$emit("update:modelValue", "");
      this.$emit("clear");
    },
    /**
     * 去除空格
     */
    trimStr(str, pos = "both") {
      if (pos === "both") {
        return str.trim();
      } else if (pos === "left") {
        return str.trimLeft();
      } else if (pos === "right") {
        return str.trimRight();
      } else if (pos === "start") {
        return str.trimStart();
      } else if (pos === "end") {
        return str.trimEnd();
      } else if (pos === "all") {
        return str.replace(/\s+/g, "");
      } else if (pos === "none") {
        return str;
      }
      return str;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.prefixIcon
  }, $props.prefixIcon ? {
    b: common_vendor.o(($event) => $options.onClickIcon("prefix")),
    c: common_vendor.p({
      type: $props.prefixIcon,
      color: "#c0c4cc",
      size: "22"
    })
  } : {}, {
    d: $props.type === "textarea"
  }, $props.type === "textarea" ? {
    e: $props.inputBorder ? 1 : "",
    f: $props.name,
    g: $data.val,
    h: $props.placeholder,
    i: $props.placeholderStyle,
    j: $props.disabled,
    k: $options.inputMaxlength,
    l: $data.focused,
    m: $props.autoHeight,
    n: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    o: common_vendor.o((...args) => $options._Blur && $options._Blur(...args)),
    p: common_vendor.o((...args) => $options._Focus && $options._Focus(...args)),
    q: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  } : {
    r: $props.type === "password" ? "text" : $props.type,
    s: common_vendor.s($options.inputStyle),
    t: $props.name,
    v: $data.val,
    w: !$data.showPassword && $props.type === "password",
    x: $props.placeholder,
    y: $props.placeholderStyle,
    z: $props.disabled,
    A: $options.inputMaxlength,
    B: $data.focused,
    C: $props.confirmType,
    D: common_vendor.o((...args) => $options._Focus && $options._Focus(...args)),
    E: common_vendor.o((...args) => $options._Blur && $options._Blur(...args)),
    F: common_vendor.o((...args) => $options.onInput && $options.onInput(...args)),
    G: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  }, {
    H: $props.type === "password" && $props.passwordIcon
  }, $props.type === "password" && $props.passwordIcon ? common_vendor.e({
    I: $options.isVal
  }, $options.isVal ? {
    J: $props.type === "textarea" ? 1 : "",
    K: common_vendor.o($options.onEyes),
    L: common_vendor.p({
      type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
      size: 22,
      color: $data.focusShow ? $props.primaryColor : "#c0c4cc"
    })
  } : {}) : $props.suffixIcon || _ctx.$slots.suffixIcon ? common_vendor.e({
    N: $props.suffixIcon
  }, $props.suffixIcon ? {
    O: common_vendor.o(($event) => $options.onClickIcon("suffix")),
    P: common_vendor.p({
      type: $props.suffixIcon,
      color: "#c0c4cc",
      size: "22"
    })
  } : {}) : common_vendor.e({
    Q: $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea"
  }, $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? {
    R: $props.type === "textarea" ? 1 : "",
    S: common_vendor.o($options.onClear),
    T: common_vendor.p({
      type: "clear",
      size: $props.clearSize,
      color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc"
    })
  } : {}), {
    M: $props.suffixIcon || _ctx.$slots.suffixIcon,
    U: common_vendor.n($options.inputContentClass),
    V: common_vendor.s($options.inputContentStyle),
    W: $options.msg ? 1 : "",
    X: common_vendor.s($options.boxStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/WebProjects/ceping-frontend/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
wx.createComponent(Component);
