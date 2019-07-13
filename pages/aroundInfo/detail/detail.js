var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    aiid: '',
    detail: {},
    comments: [],
    message: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options) {
      this.setData({
        aiid: options.aiid
      })
    }
    this.getDetail();
  },
  getDetail: function () {
    let that = this;
    util.request(api.GetAroundInfoById, {
      aiId: that.data.aiid
    }).then(function (res) {
      that.setData({
        detail: res.success
      });
    });
    util.request(api.GetMessage, {
      aiId: that.data.aiid
    }, 'POST').then(function (res) {
      console.log(res)
      that.setData({
        comments: res.msgList
      });
    });
  },

  bindinputMesssage(event) {
    let message = this.data.message;
    message = event.detail.value;
    this.setData({
      message: message
    });
  },

  submitOrder: function () {
    let that = this;

    if (wx.getStorageSync('userInfo'))
      app.globalData.hasLogin = true;
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
    if (that.data.message == '') {
      util.showErrorToast('请输入内容');
      return false;
    }
    if (wx.getStorageSync('userInfo')) {
      wx.showLoading({
        title: '提交中...',
      })
      util.request(api.AddInfoMessage, {
        userId: wx.getStorageSync('userInfo').uid,
        aiId: that.data.aiid,
        content: that.data.message
      }, 'POST').then(function (res) {
        wx.hideLoading();
        that.setData({
          message: ''
        });
        that.getDetail();
      });
    }
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getDetail();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})