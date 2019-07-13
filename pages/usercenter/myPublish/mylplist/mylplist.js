var app = getApp();
var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');

Page({
  data: {
    propertyList: [],
    userId: '',
    openAttr: false,
    index:'',
    pId:'',
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    if (wx.getStorageSync('userInfo')) {
      app.globalData.hasLogin = true;
      this.setData({
        userId: wx.getStorageSync('userInfo').uid
      })
      this.getPropertyList();
    } else {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      })
    }
  },
  getPropertyList() {
    let that = this;
    util.request(api.GetUserLPlist, {
      userId: wx.getStorageSync('userInfo').uid
    }).then(function (res) {
      if (res.propertyList.length > 0) {
        that.setData({
          propertyList: res.propertyList
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
      pId: this.data.propertyList[that.data.index].pid
    })
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      that.setData({
        openAttr:true
      })
    } else {
      wx.navigateTo({
        url: '/pages/lostproperty/detail/detail?pid=' + that.data.pId,
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
  deleteInfo(){
    let that = this;
    let index = that.data.index;
    wx.showModal({
      title: '',
      content: '要删除所选记录？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.DeleteProperty, {
            pId: that.data.pId
          }).then(function (res) {
            that.setData({
              openAttr: false
            })
            if (res.success == true) {
              that.data.propertyList.splice(index, 1)
              that.setData({
                propertyList: that.data.propertyList
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
    let msg = this.data.propertyList[that.data.index].solve == false ? '确定要设置为已解决' :'确定要设置为未解决';
    wx.showModal({
      title: '',
      content: msg,
      success: function (res) {
        if (res.confirm) {
          util.request(api.UpdateProperty, {
            pId: that.data.pId,
            solve: that.data.propertyList[that.data.index].solve==0?1:0
          },'GET').then(function (res) {
            that.setData({
              openAttr: false
            })
            if (res.success == true) {
              that.data.propertyList[that.data.index].solve = !that.data.propertyList[that.data.index].solve
                that.setData({
                  propertyList:that.data.propertyList
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
    this.getPropertyList();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})