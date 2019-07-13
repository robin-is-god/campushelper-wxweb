// 上传组件 参考 基于https://github.com/Tencent/weui-wxss/tree/master/src/example/uploader
var app = getApp();
var util = require('../../../../utils/util.js');
var api = require('../../../../config/api.js');
Page({
  data: {
    oId: 0,
    goodName:'',
    goodPic:'',
    gId:'',
    valueId: 0,
    content: '',
    stars: [0, 1, 2, 3, 4],
    star: 5,
    starText: '十分满意',
    hasPicture: false,
    picUrl: '',
    files: []
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
  selectRater: function (e) {
    var star = e.currentTarget.dataset.star + 1;
    var starText;
    if (star == 1) {
      starText = '很差';
    } else if (star == 2) {
      starText = '不太满意';
    } else if (star == 3) {
      starText = '满意';
    } else if (star == 4) {
      starText = '比较满意';
    } else {
      starText = '十分满意'
    }
    this.setData({
      star: star,
      starText: starText
    })

  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      oId: options.oid,
      goodName: options.goodName,
      gId: options.gid,
      goodPic:options.goodPic
    });
  },
  onClose: function () {
    wx.navigateBack();
  },
  onPost: function () {
    let that = this;
    if (!this.data.content) {
      util.showErrorToast('请填写评论')
      return false;
    }
    util.request(api.AddComment, {
      oid:that.data.oId,
      userId:wx.getStorageSync('userInfo').uid,
      gid: that.data.gId,
      content: that.data.content,
      score: that.data.star,
      evaPic: that.data.picUrl
    }, 'POST').then(function (res) {
      if (res.success === 'success') {
        wx.showToast({
          title: '评论成功',
          complete: function () {
            wx.switchTab({
              url: '/pages/usercenter/index/index'
            })
          }
        })
      }
    });
  },
  bindInputValue(event) {

    let value = event.detail.value;

    //判断是否超过140个字符
    if (value && value.length > 140) {
      return false;
    }

    this.setData({
      content: event.detail.value,
    })
  },
  onReady: function () {

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