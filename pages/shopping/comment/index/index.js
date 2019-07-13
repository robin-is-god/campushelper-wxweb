var app = getApp();
var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');

Page({
  data: {
    notEvaList: [],
    userId: '',
    page: 1,
    rows: 5,
    totalPage: 1
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    if (wx.getStorageSync('userInfo')) {
      app.globalData.hasLogin = true;
      this.setData({
        userId: wx.getStorageSync('userInfo').uid
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      })
    }
  },
  getNotEvaList() {
    let that = this;
    util.request(api.GetNotEva, {
      userId: wx.getStorageSync('userInfo').uid,
      page: that.data.page,
      rows: that.data.rows
    }).then(function (res) {
      if (res.notEvaList.rows.length > 0) {
        that.setData({
          notEvaList: that.data.notEvaList.concat(res.notEvaList.rows),
          totalPage: res.notEvaList.totalPage
        });
      }
    });
  },
  onReachBottom() {
    if (this.data.totalPage > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
      this.getNotEvaList();
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getNotEvaList();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})