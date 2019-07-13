var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    ciId:'1',
    campusInfo:{}
  },
  getCampusInfo() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.GetCampusById, {
      ciId: that.data.ciId
    }).then(function (res) {
      if (res.camInfo != "") {
        that.setData({
          campusInfo: res.camInfo
        });
      }
      wx.hideLoading();
    });
  },
  
  onLoad: function (options) {
    if (options.ciId) {
      this.setData({
        ciId: parseInt(options.ciId)
      });
      this.getCampusInfo();
    }
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
})