var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    goodsList: [],
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function (options) {
    this.getCatalog();
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getCatalog();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  getCatalog: function () {
    //CatalogList
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.GetGoodAllType).then(function (res) {
      that.setData({
        goodsList: res.goodsList,
      });
      wx.hideLoading();
    });

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.getCatalog();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})