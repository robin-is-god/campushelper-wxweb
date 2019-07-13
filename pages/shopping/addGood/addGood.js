var util = require('../../../utils/util.js');
var check = require('../../../utils/check.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    array: ['请选择信息类型', '学习用品', '饮食物品', '生活物品', '娱乐物品', '工具物品'],
    index: 0,
    content: '',
    contentLength: 0,
    goodPrice: '',
    goodStock:'',
    goodName: '',
    picUrl: '',
    files: [],
    hasPicture: false
  },
  chooseImage: function (e) {
    if (this.data.files.length > 1) {
      util.showErrorToast('只能上传1张图片')
      return false;
    }

    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          files: res.tempFilePaths
        });
        that.upload(res);
      }
    })
  },

  upload: function (res) {
    var that = this;
    const uploadTask = wx.uploadFile({
      url: api.ImageUpload,
      filePath: res.tempFilePaths[0],
      name: 'file',
      success: function (res) {
        var _res = JSON.parse(res.data);
        if (_res.url != null) {
          that.setData({
            hasPicture: true,
            picUrl: _res.url
          })
        }
      },
      fail: function (e) {
        wx.showModal({
          title: '错误',
          content: '上传失败',
          showCancel: false
        })
      },
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })

  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },


  //输入内容函数
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },

  goodNameInput: function (e) {
    this.setData({
      goodName: e.detail.value
    });
  },

  goodPriceInput: function (e) {
    this.setData({
      goodPrice: e.detail.value
    });
  },

  goodStockInput: function (e) {
    this.setData({
      goodStock: e.detail.value
    });
  },

  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    });
  },

  clearGoodPrice: function (e) {
    this.setData({
      contentLength: e.detail.cursor,
      content: e.detail.value,
    });
  },

  clearGoodName: function (e) {
    this.setData({
      goodName: ''
    });
  },

  clearGoodStock: function (e) {
    this.setData({
      goodStock: ''
    });
  },


  submitFeedback: function (e) {

    let that = this;
    if (that.data.index == 0) {
      util.showErrorToast('请选择商品信息类型');
      return false;
    }

    if (that.data.content == '') {
      util.showErrorToast('请输入商品描述内容');
      return false;
    }

    if (that.data.goodPrice == '') {
      util.showErrorToast('请输入商品价格');
      return false;
    }

    if (that.data.goodName == '') {
      util.showErrorToast('请输入商品名称');
      return false;
    }

    if (that.data.goodStock == '') {
      util.showErrorToast('请输入商品数量');
      return false;
    }

    if (!check.isValidStock(that.data.goodStock)) {
      util.showErrorToast('商品数量不正确');
      return false;
    }

    if (!check.isValidPrice(that.data.goodPrice)) {
      util.showErrorToast('商品价格不正确');
      return false;
    }


    wx.showLoading({
      title: '提交中...',
      mask: true,
      success: function () {
      }
    });

    util.request(api.AddGood, {
      userId: wx.getStorageSync('userInfo').uid,
      goodName: that.data.goodName,
      goodType: that.data.array[that.data.index],
      goodDescription: that.data.content,
      goodPrice: that.data.goodPrice,
      goodStock: that.data.goodStock,
      goodPic: that.data.picUrl
    }, 'POST').then(function (res) {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
      })
      wx.navigateBack({
        url: "/pages/index/index"
      })
    });
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    if (wx.getStorageSync('userInfo'))
      app.globalData.hasLogin = true;
    if (!app.globalData.hasLogin) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  }
})