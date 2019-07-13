var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    campusInfoList: []
  },
  getCampusInfoList() {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    util.request(api.GetAllCampus).then(function (res) {
      if (res.camInfo != "") {
        that.setData({
          campusInfoList: res.camInfo
        });
      }
      wx.hideLoading();
    });
  },
  campusInfoDetail(event) {
    let that = this;
    let ciId = event.currentTarget.dataset.ciid;
      wx.navigateTo({
        url: '/pages/campusInfo/detail/detail?ciId=' + ciId,
      });
  },
  onLoad: function (options) {
    this.getCampusInfoList();
  },
  onReady: function () {

  },
  onShow: function () {
    this.getCampusInfoList();
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
})