var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../utils/user.js');

Page({
  data: {
    userInfo:{},
    gId: 1,
    goods: {},
    comments: [],
    productList: [],
    cartGoodsCount: 0,
    number: 1,
    checkedSpecText: '规格数量选择',
    tmpSpecText: '请选择规格数量',
    openAttr: false,
    openShare: false,
  },

  // 获取商品信息
  getGoodsInfo: function () {
    let that = this;
    util.request(api.GetGoodById, {
      gId: that.data.gId
    }).then(function (res) {
        that.setData({
          goods: res.good
        });
    });
  },

  getGoodComment: function () {
    let that = this;
    util.request(api.GetGoodComment, {
      gId: that.data.gId
    }).then(function (res) {
      that.setData({
        comments: res.evaGoodList
      });
    });
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.gId) {
      this.setData({
        gId: parseInt(options.gId)
      });
      this.getGoodsInfo();
      this.getGoodComment();
    }
  },
  onShow: function () {
    // 页面显示购物车商品数量
  },

  //立即购买
  addFast: function () {
    //判断是否登录了
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }

    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {
      var stock = this.data.goods.goodStock;
      if (stock == 0 || stock < this.data.number) {
        //提示没有库存
        wx.showToast({
          image: '/images/other/icon_error.png',
          title: '库存不足'
        });
        return false;
      }
      if (stock >= that.data.number) {
        that.setData({
          productList:[]
        });
        var goodInfo={};
        goodInfo.goodName = that.data.goods.goodName;
        goodInfo.gId = that.data.goods.gid;
        goodInfo.quantity = that.data.number;
        goodInfo.goodPic = that.data.goods.goodPic;
        goodInfo.goodPrice = that.data.goods.goodPrice;
        goodInfo.suserId = that.data.goods.userId;
        that.data.productList.push(goodInfo);

        try {
          wx.setStorageSync('productList', this.data.productList);
          this.setData({
            openAttr: !this.data.openAttr
          });
          wx.navigateTo({
            url: '/pages/shopping/checkout/checkout'
          })
        } catch (e) { }

      } else {
        wx.showToast({
          image: '/images/other/icon_error.png',
          title: '请求错误',
          mask: true
        });
      }
    }
  },

  cutNumber: function () {
    //减少数量
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    //增加数量
    this.setData({
      number: this.data.number + 1
    });
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/shopping/tmpcart/tmpcart'
    });
  },
  onReady: function () {
    // 页面渲染完成

  }

})