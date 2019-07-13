var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {
      nickName: '点击登录',
      picturePath:''
    },
    uncomment:false,
    hasLogin: false
  },
  onLoad: function () {
  
  },
  onReady: function () {

  },
  onShow: function () {
    //获取用户的登录信息
    if (wx.getStorageSync('userInfo')){
      app.globalData.hasLogin = true;
    }
    if (app.globalData.hasLogin) {
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      });
      let that = this;
      that.setData({
        uncomment: false
      });
      util.request(api.GetNotEva, {
        userId: wx.getStorageSync('userInfo').uid
      }).then(function (res) {
        if (res.notEvaList.rows.length > 0) {
          that.setData({
            uncomment: true
          });
        }
      });
    }
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  goLogin() {
    if (!this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  goOrder() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/shopping/order/index/index"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },

  goUserInfo() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/usercenter/mine/mine"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },

  goComment() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/shopping/comment/index/index"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },

  goAddress() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/usercenter/address/address"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },

  goMyPublish() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/usercenter/myPublish/index/index"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },

  goReset() {
    if (this.data.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/reset/reset"
      });
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    };
  },

  aboutUs: function () {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  goHelp: function () {
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },

  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (!res.confirm) {
          return;
        }
        app.globalData.hasLogin = false;
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        wx.removeStorageSync('addressId');
        wx.reLaunch({
          url: '/pages/index/index'
        });
      }
    })

  }
})