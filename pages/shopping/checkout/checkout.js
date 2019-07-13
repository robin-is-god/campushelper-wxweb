var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    checkedGoodsList: [],
    checkedAddress: {},
    goodsTotalPrice: 0.00, //商品总价
    addressId: 0,
    message: '',
    inputPassword: '', //输入的密码
    passwordInputHidden: true,//hidden是true 默认隐藏
    password: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },

  //获取checkou信息
  getCheckoutInfo: function () {
    let that = this;
    util.request(api.GetAddress, {
      aId: that.data.addressId
    }).then(function (res) {
      if (res.success != null) {
        that.setData({
          checkedAddress: res.success,
          addressId: res.success.aid
        });
      }
    });

    util.request(api.GetUserByUid, {
      uId: wx.getStorageSync('userInfo').uid
    }).then(function (res) {
      if (res.userInfo != null) {
        that.setData({
          password:res.userInfo.payPass
        })
      }
    });
    wx.hideLoading();
  },
  selectAddress() {
    wx.navigateTo({
      url: '/pages/usercenter/address/address',
    })
  },
  bindMessageInput: function (e) {
    this.setData({
      message: e.detail.value
    });
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    //页面显示
    wx.showLoading({
      title: '加载中...',
    });
    try {
      var addressId = wx.getStorageSync('addressId');
      if (addressId === "") {
        addressId = 0;
      }

      var productList = wx.getStorageSync('productList');
      this.setData({
        checkedGoodsList: productList,
        addressId: addressId,
        goodsTotalPrice: parseInt(productList[0].quantity) * parseFloat(productList[0].goodPrice)
      });

    } catch (e) {
      // Do something when catch error
      console.log(e);
    }

    this.getCheckoutInfo();
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  addOrder: function () {
    var that = this;
    wx.request({
      url: api.AddOrder,
      data: {
        suserId: that.data.checkedGoodsList[0].suserId,
        buserId: wx.getStorageSync('userInfo').uid,
        gid: that.data.checkedGoodsList[0].gId,
        quantity: that.data.checkedGoodsList[0].quantity,
        aid: wx.getStorageSync('addressId'),
        total: that.data.goodsTotalPrice
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.success.oid != null) {
          util.request(api.UpdateGoodStock, {
            gId: that.data.checkedGoodsList[0].gId
          }).then(function (res) {
          });
          wx.redirectTo({
            url: '/pages/shopping/payResult/payResult'
          });
        } else {
          wx.showModal({
            title: '支付失败',
            content: res.data.success,
            showCancel: false
          });
        }
      }
    });
  },
  submitOrder: function () {
    if (this.data.addressId <= 0) {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    this.passwordInputHidden();
  },
  inputPassword(e) {
    //键盘输入的密码 赋值给inputPassword
    this.data.inputPassword = this.data.inputPassword + e.currentTarget.dataset.key;
    this.setData({
      inputPassword: this.data.inputPassword
    });
    //当输入密码正确时 
    if (this.data.inputPassword.length == 6 && this.data.password == this.data.inputPassword) {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 800
      })
      this.passwordInputHidden();//关闭小键盘
      this.addOrder();
    }
    //当输入密码错误时 给个提示 并且把输入的密码清零
    if (this.data.inputPassword.length == 6 && this.data.password != this.data.inputPassword) {
      wx.showModal({
        title: "提示",
        content: "输入密码错误",
      })
      this.setData({
        inputPassword: ''
      });
    }
  },
  passwordInputHidden() {
    this.setData({
      passwordInputHidden: !this.data.passwordInputHidden //取反 打开关闭小键盘
    });
    this.setData({
      inputPassword: ''
    });
  },
  //删除输入错误的密码
  clear() {
    var index = this.data.inputPassword.length;
    if (index > 0) {
      var inputPassword = this.data.inputPassword.substr(0, index - 1);
      this.setData({
        inputPassword: inputPassword
      });
    }
  },
});