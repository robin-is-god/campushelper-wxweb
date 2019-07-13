const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');

//获取应用实例
const app = getApp();

Page({
  data: {
    newGoods: [],
    newCamInfo:[]
  },

  onShareAppMessage: function () {
    return {
      title: '校园生活帮',
      desc: '校园生活帮',
      path: '/pages/index/index'
    }
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getIndexData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  getIndexData: function () {
    let that = this;
    util.request(api.GetIndexGood).then(function (res) {
      if (res.goodsList.length > 0) {
        that.setData({
          newGoods: res.goodsList
        });
      }
    })
    util.request(api.GetIndexInfo).then(function (res) {
      if (res.infoList.length > 0) {
        that.setData({
          newCamInfo: res.infoList
        });
      }
    })
    wx.hideLoading();
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '载入中...',
    })
    this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    this.getIndexData();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})