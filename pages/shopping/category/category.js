var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    navList: [],
    goodsList: [],
    goodType:'学习用品',
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 100
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if (options.goodType) {
      that.setData({
        goodType: decodeURIComponent(options.goodType)
      });
  
    }

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });


    this.getCategoryInfo();

  },
  getCategoryInfo: function () {
    let that = this;
    util.request(api.GetGoodAllType, {
    })
      .then(function (res) {
          that.setData({
            navList: res.goodsList
          });

          wx.setNavigationBarTitle({
            title: '商品浏览'
          })

          //nav位置
          let currentIndex = 0;
          let navListCount = that.data.navList.length;
          for (let i = 0; i < navListCount; i++) {
            currentIndex += 1;
            if (that.data.navList[i].goodType == that.data.goodType) {
              break;
            }
          }
          if (currentIndex > navListCount / 2 && navListCount > 3) {
            that.setData({
              scrollLeft: currentIndex * 60
            });
          }
          that.getGoodsList();
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
  getGoodsList: function () {
    var that = this;
    util.request(api.GetGoodByType, {
      goodType: that.data.goodType
    })
      .then(function (res) {
        console.log(res);
        that.setData({
          goodsList: res.goodsList,
        });
      });
  },
  onUnload: function () {
    // 页面关闭
  },
  switchCate: function (event) {
    if (this.data.goodType == event.currentTarget.dataset.type) {
      return false;
    }
    var that = this;
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      goodType: event.currentTarget.dataset.type
    });

    this.getCategoryInfo();
  }
})