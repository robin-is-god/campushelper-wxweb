var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  data: {
    navList: [],
    aroundList: [],
    type: '出行',
    scrollTop: 0,
    scrollHeight: 0,
  },
  onLoad: function () {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getAroundType();
  },
  getAroundType: function () {
    let that = this;
    util.request(api.GetAroundType)
      .then(function (res) {
        that.setData({
          navList: res.typeList
        });

        wx.setNavigationBarTitle({
          title: '周边资讯'
        })

        //nav位置
        let currentIndex = 0;
        let navListCount = that.data.navList.length;
        for (let i = 0; i < navListCount; i++) {
          currentIndex += 1;
          if (that.data.navList[i].type == that.data.type) {
            break;
          }
        }
        if (currentIndex > navListCount / 2 && navListCount > 3) {
          that.setData({
            scrollLeft: currentIndex * 60
          });
        }
        that.getAroundInfo();
      });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAroundType();
  },
  onHide: function () {
    // 页面隐藏
  },
  getAroundInfo: function () {
    var that = this;
    util.request(api.GetAroundInfo, {
      type: that.data.type
    })
      .then(function (res) {
        console.log(res);
        that.setData({
          aroundList: res.aroundList,
        });
      });
  },
  onUnload: function () {
    // 页面关闭
  },
  switchCate: function (event) {
    if (this.data.type == event.currentTarget.dataset.type) {
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
      type: event.currentTarget.dataset.type
    });

    this.getAroundInfo();
  }
})