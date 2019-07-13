var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var check = require('../../../utils/check.js');

var app = getApp();
Page({
  data: {
    userInfo: {
      nickName: '',
      payPass: '',
      phone:'',
      picturePath:''
    },
    user:{},
    files: [],
    update:false
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
          that.data.userInfo.picturePath = _res.url
          that.setData({
            userInfo: that.data.userInfo
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

  bindinputMobile(event) {
    let userInfo = this.data.userInfo;
    userInfo.phone = event.detail.value;
    this.setData({
      userInfo: userInfo
    });
  },
  bindinputNickName(event) {
    let userInfo = this.data.userInfo;
    userInfo.nickName = event.detail.value;
    this.setData({
      userInfo: userInfo
    });
  },
  bindinputPayPass(event) {
    let userInfo = this.data.userInfo;
    userInfo.payPass = event.detail.value;
    this.setData({
      userInfo: userInfo
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getUserInfoDetail();
  },
  onReady: function () {

  },
  getUserInfoDetail() {
    let that = this;
    util.request(api.GetUserByUid, {
      uId: wx.getStorageSync('userInfo').uid
    }).then(function (res) {
      if (res.userInfo != null) {
        that.setData({
          userInfo: res.userInfo
        });
      }
    });
  },
  saveUserInfo() {
    let userInfo = this.data.userInfo;

    if (userInfo.nickName == '') {
      util.showErrorToast('请输入昵称');
      return false;
    }

    if (userInfo.phone == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }

    if (userInfo.payPass == '') {
      util.showErrorToast('请输入支付密码');
      return false;
    }

    if (!check.isValidPhone(userInfo.phone)) {
      util.showErrorToast('手机号不正确');
      return false;
    }

    if (!check.isValidPayPass(userInfo.payPass)) {
      util.showErrorToast('支付密码格式不正确');
      return false;
    }

    let that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    });

    util.request(api.UpdateUser, {
      uid: wx.getStorageSync('userInfo').uid,
      nickName: userInfo.nickName,
      picturePath:userInfo.picturePath,
      phone: userInfo.phone,
      payPass: userInfo.payPass
    }, 'POST').then(function (res) {
      if (res.success === true) {
        util.request(api.GetUserByUid, {
          uId: wx.getStorageSync('userInfo').uid
        }).then(function (res) {
          if (res.userInfo != null) {
            wx.setStorageSync('userInfo', res.userInfo);
          }
        });
      }
    });
    wx.switchTab({
      url: "/pages/index/index"
    })
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