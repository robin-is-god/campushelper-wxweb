//校园生活帮-author:robin 前端页面参考地址：https://github.com/linlinjava/litemall

// 程序配置API地址

// 本机开发时使用
var WxApiRoot = 'http://localhost:8080/campushelper/';

// 局域网测试使用
// var WxApiRoot = 'http://192.168.1.209:8080/campushelper/';

// 部署时使用
// var WxApiRoot = 'http://';

module.exports = {
  //登录Url
  LoginByWx: WxApiRoot + 'user/loginwx',
  Login: WxApiRoot + 'user/login',
  UserRegister: WxApiRoot + 'user/register',
  UpdateUser: WxApiRoot + 'user/updateUser',
  GetUserByUid: WxApiRoot + 'user/getUserByUid',

  //文件上传Url
  ImageUpload: WxApiRoot + '/upload/uploadImage',

  //失物寻物相关模块Url
  LostPropertyIndex: WxApiRoot + 'lostProperty/getLPByFindOrLost',
  AddProperty: WxApiRoot + 'lostProperty/addProperty',
  GetPropertyById: WxApiRoot + 'lostProperty/getLPById',
  GetUserLPlist: WxApiRoot + 'lostProperty/getUserPropery',
  DeleteProperty: WxApiRoot + 'lostProperty/deleteProperty',
  UpdateProperty: WxApiRoot + 'lostProperty/updateProperty',

  //商品相关Url
  GetGoodAllType: WxApiRoot + 'good/getAllType', 
  GetGoodByType: WxApiRoot + 'good/getGoodByType',
  GetIndexGood: WxApiRoot + 'good/getIndexGood',
  GetGoodByName: WxApiRoot + 'good/getGoodByName',
  GetAllGode: WxApiRoot + 'good/getAllGood',
  GetGoodById: WxApiRoot + 'good/getGoodById',
  GetUserGood: WxApiRoot + 'good/getUserGood',
  AddGood: WxApiRoot + 'good/addGood',
  DeleteGood: WxApiRoot + 'good/updateGood',
  UpdateGood: WxApiRoot + 'good/deleteGood',
  GetGood: WxApiRoot + 'good/getGoods', 
  UpdateGoodStock: WxApiRoot + 'good/updateGoodStock',

  //用户地址
  AddAddress: WxApiRoot + 'address/addAddress',
  AddressList: WxApiRoot + 'address/getAddress',
  GetAddress: WxApiRoot + 'address/getAddressByAid',
  UpdateAddress: WxApiRoot + 'address/updateAddress',
  DeleteAddress: WxApiRoot + 'address/deleteAddress',

  //校园资讯相关Url
  GetAllCampus: WxApiRoot + 'campusinfo/getAllCampusInfo',
  GetCampusById: WxApiRoot + 'campusinfo/getCampusById',
  GetIndexInfo: WxApiRoot + 'campusinfo/getIndexInfo',
  AddCampus: WxApiRoot + 'campusinfo/addCampusInfo',
  
  //周边游玩Url
  GetAroundType: WxApiRoot + 'aroundInfo/getAroundType',
  GetAroundInfo: WxApiRoot + 'aroundInfo/getAllAroundInfo',
  AddAroundInfo: WxApiRoot + 'aroundInfo/addAroundInfo',
  GetAroundInfoById: WxApiRoot + 'aroundInfo/getAroundById',
  GetUserAroundList: WxApiRoot + 'aroundInfo/getUserAroundInfo',
  DeleteAround: WxApiRoot + 'aroundInfo/deleteAroundInfo',

  //互助交友Url
  GetCooInfo: WxApiRoot + 'cooperation/getAllCooInfo',
  AddCooInfo: WxApiRoot + 'cooperation/addCooInfo',
  GetCooInfoById: WxApiRoot + 'cooperation/getCooById',
  GetUserCoolist: WxApiRoot + 'cooperation/getUserCooInfo',
  DeleteCoo: WxApiRoot + 'cooperation/deleteCooInfo',
  UpdateCoo: WxApiRoot + 'cooperation/updateCooInfo',

  //订单Url
  GetUserOrder: WxApiRoot + 'order/getUserOrder',
  GetOrderDetail: WxApiRoot + 'order/getOrderDetail',
  AddOrder: WxApiRoot + 'order/addOrder',
  GetNotEva: WxApiRoot + 'order/getNotEvaOrder',

  //商品评论Url
  AddComment: WxApiRoot + 'evaluate/addEvaluate',
  GetGoodComment: WxApiRoot + 'evaluate/getGoodEva',

  //信息留言Url
  AddInfoMessage: WxApiRoot + 'infomessage/addInfoMessage',
  GetMessage: WxApiRoot + 'infomessage/getMessage',
};