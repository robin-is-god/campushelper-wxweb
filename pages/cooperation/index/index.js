var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    cooInfoList: [],
    scrollTop: 0,
    scrollHeight: 0,
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getCooInfo();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getCooInfo();
  },
  onHide: function () {
  },
  getCooInfo: function () {
    var that = this;
    util.request(api.GetCooInfo)
      .then(function (res) {
        console.log(res);
        that.setData({
          cooInfoList: res.cooInfoList,
        });
      });
  },
  onUnload: function () {
    // 页面关闭
  }
})