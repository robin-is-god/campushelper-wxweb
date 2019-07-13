var app = getApp();
var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');

Page({
  data: {
    aroundList: []
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    if (wx.getStorageSync('userInfo')) {
      app.globalData.hasLogin = true;
      this.setData({
        userId: wx.getStorageSync('userInfo').uid
      })
      this.getAroundList();
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      })
    }
  },
  getAroundList() {
    let that = this;
    util.request(api.GetUserAroundList, {
      userId: wx.getStorageSync('userInfo').uid
    }).then(function (res) {
      if (res.aroundList.length > 0) {
        that.setData({
          aroundList: res.aroundList
        });
      }
    });
  },

  deleteItem(event) {
    let that = this;
    let index = event.currentTarget.dataset.index;
    let aiId = this.data.aroundList[index].aiId;
    var touchTime = that.data.touchEnd - that.data.touchStart;
    console.log(touchTime);

    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      wx.showModal({
        title: '',
        content: '要删除所选记录？',
        success: function (res) {
          if (res.confirm) {
            util.request(api.DeleteAround, {
              aiId: aiId
            }).then(function (res) {
              if (res.success == true) {
                that.data.aroundList.splice(index, 1)
                that.setData({
                  aroundList: that.data.aroundList
                });
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
              }
            });
          }
        }
      });
    } else {
      wx.navigateTo({
        url: '/pages/aroundInfo/detail/detail?aiid=' + aiId,
      });
    }
  },

  //按下事件开始
  touchStart: function (e) {
    let that = this;
    that.setData({
      touchStart: e.timeStamp
    })
    console.log(e.timeStamp + '- touchStart')
  },
  //按下事件结束  
  touchEnd: function (e) {
    let that = this;
    that.setData({
      touchEnd: e.timeStamp
    })
    console.log(e.timeStamp + '- touchEnd')
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAroundList();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})