var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
    addressList: [],
    userInfo: {},
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAddressList();
  },
  getAddressList() {
    let that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    util.request(api.AddressList, {
      userId: that.data.userInfo.uid
    }).then(function (res) {
      var list = res.addressList;
      if (list != null) {
        that.setData({
          addressList: res.addressList
        });
      }
    });
  },
  addressAddOrUpdate(event) {
    //返回之前，先取出上一页对象，并设置addressId
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    if (prevPage.route == "pages/shopping/checkout/checkout") {
      try {
        console.log(event.currentTarget.dataset.addressId);
        wx.setStorageSync('addressId', event.currentTarget.dataset.addressId);
      } catch (e) {

      }

      let addressId = event.currentTarget.dataset.addressId;
      if (addressId && addressId != 0) {
        wx.navigateBack();
      } else {
        wx.navigateTo({
          url: '/pages/usercenter/addressAdd/addressAdd?id=' + addressId
        })
      }

    } else {
      wx.navigateTo({
        url: '/pages/usercenter/addressAdd/addressAdd?id=' + event.currentTarget.dataset.addressId + '&update=1'
      })
    }
  },
  deleteAddress(event) {
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          util.request(api.DeleteAddress, {
            aId: addressId
          }, 'GET').then(function (res) {
            if (res.success == true) {
              that.getAddressList();
              wx.removeStorage({
                key: 'addressId',
                success: function (res) { },
              })
            }
          });
          console.log('用户点击确定')
        }
      }
    })
    return false;
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})