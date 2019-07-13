var app = getApp()
var util = require("../../utils/util.js");
var api = require("../../config/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    load_statue: true,
    campusHelperInfo: {
      name: '校园生活帮',
      programAddress: 'https://github.com/robin-is-god/campushelper',
      address: '成都信息工程大学',
      latitude: 30.581839,
      longitude: 103.98845,
      linkPhone: '17708198764',
      qq: '2423445420',
      author:'robin'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  showLocation: function (e) {
    var that = this
    wx.openLocation({
      latitude: that.data.campusHelperInfo.latitude,
      longitude: that.data.campusHelperInfo.longitude,
      name: that.data.campusHelperInfo.name,
      address: that.data.campusHelperInfo.address,
    })
  },
  callPhone: function (e) {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.campusHelperInfo.linkPhone,
    })
  },
  reLoad: function (e) {
    this.loadcampusHelperInfo();
  }
})