var app = getApp();
var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');

Page({
  data: {
    cooList: [],
    userId: '',
    openAttr: false,
    index: '',
    cooId: '',
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    if (wx.getStorageSync('userInfo')) {
      app.globalData.hasLogin = true;
      this.setData({
        userId: wx.getStorageSync('userInfo').uid
      })
      this.getCooList();
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      })
    }
  },
  getCooList() {
    let that = this;
    util.request(api.GetUserCoolist, {
      userId: wx.getStorageSync('userInfo').uid
    }).then(function (res) {
      if (res.cooList.length > 0) {
        that.setData({
          cooList: res.cooList
        });
      }
    });
  },

  changeItem(event) {
    let that = this;
    var touchTime = that.data.touchEnd - that.data.touchStart;
    console.log(touchTime);
    this.setData({
      index: event.currentTarget.dataset.index
    })
    this.setData({
      cooId: this.data.cooList[that.data.index].cooId
    })
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      that.setData({
        openAttr: true
      })
    } else {
      wx.navigateTo({
        url: '/pages/cooperation/detail/detail?cooid=' + that.data.cooId,
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

  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },
  deleteInfo() {
    let that = this;
    let index = that.data.index;
    wx.showModal({
      title: '',
      content: '要删除所选记录？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.DeleteCoo, {
            cooId: that.data.cooId
          }).then(function (res) {
            that.setData({
              openAttr: false
            })
            if (res.success == true) {
              that.data.cooList.splice(index, 1)
              that.setData({
                cooList: that.data.cooList
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
  },
  setSolve() {
    let that = this;
    let index = that.data.index;
    let msg = this.data.cooList[that.data.index].solve == false ? '确定要设置为已解决' : '确定要设置为未解决';
    wx.showModal({
      title: '',
      content: msg,
      success: function (res) {
        if (res.confirm) {
          util.request(api.UpdateCoo, {
            cooId: that.data.cooId,
            solve: that.data.cooList[that.data.index].solve == 0 ? 1 : 0
          }, 'GET').then(function (res) {
            that.setData({
              openAttr: false
            })
            if (res.success == true) {
              that.data.cooList[that.data.index].solve = !that.data.cooList[that.data.index].solve
              that.setData({
                cooList: that.data.cooList
              })
              wx.showToast({
                title: '设置成功',
                icon: 'success',
                duration: 2000
              });
            }
          });
        }
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getCooList();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})