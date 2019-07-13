var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp()
Page({
  data: {
    keywrod: '',
    searchStatus: false,
    goodsList: [],
    helpKeyword: [],
    currentSortType: 'goodName',
    currentSortOrder: 'desc',
    hotKeyword: [],
  },
  //事件处理函数
  closeSearch: function () {
    wx.navigateBack()
  },
  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false
    });
  },
  onLoad: function () {
  },


  inputChange: function (e) {
    this.setData({
      keyword: e.detail.value,
      searchStatus: false
    });
    if (e.detail.value) {
      this.getHelpKeyword();
    }
  },
  getHelpKeyword: function () {
    let that = this;
    util.request(api.GetGoodByName, {
      goodName: that.data.keyword,
      sort:'goodName',
      order: 'desc'
    }).then(function (res) {
      var list = res.goodsList;
      if (list != null) {
        that.setData({
          helpKeyword: list
        });
      }
    });
  },

  getGoodsList: function () {
    let that = this;
    util.request(api.GetGoodByName, {
      goodName: that.data.keyword,
      sort: that.data.currentSortType,
      order: that.data.currentSortOrder
    }).then(function (res) {
      var list = res.goodsList;
      if (list != null) {
        that.setData({
          searchStatus: true,
          goodsList: res.goodsList
        });
      }
    });
  },
  onKeywordTap: function (event) {

    this.getSearchResult(event.target.dataset.keyword);

  },
  getSearchResult(keyword) {
    if (keyword == '') {
      keyword = this.data.keyword;
    }
    this.setData({
      keyword: keyword,
      goodsList: []
    });

    this.getGoodsList();
  },
  openSortFilter: function (event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          currentSortType: 'goodType',
          currentSortOrder: 'desc',
        });
        this.getGoodsList();
        break;
      case 'priceSort':
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        this.setData({
          currentSortType: 'goodPrice',
          currentSortOrder: tmpSortOrder,
        });

        this.getGoodsList();
        break;
      default:
        //综合排序
        this.setData({
          currentSortType: 'goodName',
          currentSortOrder: 'desc',
        });
        this.getGoodsList();
    }
  },
  onKeywordConfirm(event) {
    this.getSearchResult(event.detail.value);
  }
})