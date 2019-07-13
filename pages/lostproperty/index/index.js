var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    findOrLost:0,
    selected:0,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getLostOrFind();
  },
  getLostOrFind: function () {
    let that = this;
    util.request(api.LostPropertyIndex, {
      findOrLost:that.data.findOrLost
    })
      .then(function (res) {
          that.setData({
            list: res.propertyList
          });
      });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.getLostOrFind();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  switchCate: function (e) {
    var that = this;
    if (that.data.findOrLost == e.currentTarget.dataset.findorlost){
      return false;
    }
    that.setData({
      findOrLost: e.currentTarget.dataset.findorlost
    });
    if(that.data.findOrLost == 0){
      that.setData({
        selected: 0
      });
    }
    else {
      that.setData({
        selected: 1
      });
    }
    that.getLostOrFind();
  }
})