var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');

Page({
  data: {
    orderId: 0,
    orderInfo: {},
    orderType:'买家',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.oid
    });
    this.getOrderDetail();
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getOrderDetail();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  getOrderDetail: function () {
    wx.showLoading({
      title: '加载中',
    });

    setTimeout(function () {
      wx.hideLoading()
    }, 2000);

    let that = this;
    util.request(api.GetOrderDetail, {
      oId: that.data.orderId
    }).then(function (res) {
      if (res.success.oid != '') {
        if (res.success.suserId == wx.getStorageSync('userInfo').uid){
          that.setData({
            orderType:'卖家'
          })
        } else {
          that.setData({
            orderType: '买家'
          })
        }
        that.setData({
          orderInfo: res.success
        });
      }
      wx.hideLoading();
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})