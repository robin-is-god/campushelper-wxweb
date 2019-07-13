var api = require('../../../config/api.js');
var check = require('../../../utils/check.js');
var util = require('../../../utils/util.js');

var app = getApp();
Page({
  data: {
    userId:'',
    oldPassword:'',
    reOldPassword:'',
    password: '',
    confirmPassword: ''
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    if (wx.getStorageSync('userInfo') != '') {
      app.globalData.hasLogin = true;
      this.setData({
        userId: wx.getStorageSync('userInfo').uid,
        reOldPassword: wx.getStorageSync('userInfo').password,
      })
    }
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },

  startReset: function () {
    var that = this;

    if (this.data.oldPassword != this.data.reOldPassword) {
      wx.showModal({
        title: '错误信息',
        content: '旧密码输入错误',
        showCancel: false
      });
      return false;
    }

    if (this.data.password.length < 6) {
      wx.showModal({
        title: '错误信息',
        content: '用户名和密码不得少于6位',
        showCancel: false
      });
      return false;
    }

    if (this.data.password.length < 6) {
      wx.showModal({
        title: '错误信息',
        content: '用户名和密码不得少于6位',
        showCancel: false
      });
      return false;
    }

    if (this.data.password != this.data.confirmPassword) {
      wx.showModal({
        title: '错误信息',
        content: '确认密码不一致',
        showCancel: false
      });
      return false;
    }
    wx.request({
      url: api.UpdateUser,
      data: {
        uid: that.data.userId,
        password: that.data.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.success == true) {
          util.request(api.GetUserByUid, {
            uId: that.data.userId
          }).then(function (res) {
            wx.setStorageSync('userInfo', res.userInfo); 
            });
          wx.navigateBack();
        } else {
          wx.showModal({
            title: '密码重置失败',
            content: res.data.errmsg,
            showCancel: false
          });
        }
      }
    });
  },

  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  bindOldPasswordInput: function (e) {
    this.setData({
      oldPassword: e.detail.value
    });
  },

  bindConfirmPasswordInput: function (e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },
  
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
      case 'clear-password':
      this.setData({
        password: ''
      });
      break;
      case 'clear-old-password':
        this.setData({
          oldPassword: ''
        });
        break;
    }
  }
})