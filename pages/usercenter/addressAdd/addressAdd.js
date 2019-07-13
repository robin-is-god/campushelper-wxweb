var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var check = require('../../../utils/check.js');

var app = getApp();
Page({
  data: {
    address: {
      address: '',
      name: '',
      phone: '',
      remark:'',
      isDefault: 0
    },
    addressId: 0,
    update: 0,
    userInfo: {}
  },
  bindinputMobile(event) {
    let address = this.data.address;
    address.phone = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputName(event) {
    let address = this.data.address;
    address.name = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddress(event) {
    let address = this.data.address;
    address.address = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputRemark(event) {
    let address = this.data.address;
    address.remark = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault() {
    let address = this.data.address;
    address.isDefault = !address.isDefault;
    this.setData({
      address: address
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id
      });
    if (options.update) {
      this.setData({
        update: options.update
      })
    }
      this.getAddressDetail();
    }
  },
  onReady: function () {

  },
  cancelAddress() {
    wx.navigateBack();
  },
  saveAddress() {
    let address = this.data.address;

    if (address.name == '') {
      util.showErrorToast('请输入姓名');

      return false;
    }

    if (address.phone == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }

    if (address.address == '') {
      util.showErrorToast('请输入详细地址');
      return false;
    }

    if (address.remark == '') {
      util.showErrorToast('请输入备注');
      return false;
    }

    if (!check.isValidPhone(address.phone)) {
      util.showErrorToast('手机号不正确');
      return false;
    }

    let that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    });

    if(that.data.update == 1){      //更新
      util.request(api.UpdateAddress, {
        userId: that.data.userInfo.uid,
        aid: that.data.addressId,
        name: address.name,
        phone: address.phone,
        address: address.address,
        remark: address.remark,
        defaulted: address.isDefault
      }, 'POST').then(function (res) {
        if (res.success === true) {
          wx.navigateBack();
        }
      });
    } else {
      util.request(api.AddAddress, {    //添加
        userId :that.data.userInfo.uid,
        name: address.name,
        phone: address.phone,
        address: address.address,
        remark: address.remark,
        defaulted: address.isDefault
      }, 'POST').then(function (res) {
        if (res.success === true) {
          //返回之前，先取出上一页对象，并设置addressId
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          if (prevPage.route == "pages/shopping/checkout/checkout") {
            prevPage.setData({
              addressId: res.success.aid
            })

            try {
              wx.setStorageSync('addressId', res.success.aid);
            } catch (e) {

            }
            console.log("set address");
          }
          wx.navigateBack();
        }
      });
    }
  },

  getAddressDetail(){
    let that = this;
    util.request(api.GetAddress, {
      aId: that.data.addressId
    }).then(function (res) {
      if (res.success != null) {
        that.setData({
          address: res.success,
          addressId: res.success.aid
        });
      }
    });
  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})