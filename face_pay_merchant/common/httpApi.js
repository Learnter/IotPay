/**
 * API接口配置文件
 */
module.exports = {
  system:'Index/systemInfo',//系统信息
  login:'storeuser/accountLogin',//登录
  forgot:'storeuser/forLoginPassword',//找回密码
  updatePwd:'storeuser/editPassword',//修改密码
  phoneCode:'smscode/sendSmsRegCode',//获取手机验证码
  updatePicture:'upload/uploadImageFile',//上传图片
  mobileCode:'smscode/sendSmsRegCode',//短信验证码
  firstPage:{ //首页
    swipers:'index/adList',//轮播图
    shopList:'index/storeList'//商家列表
  },
  me:{ //个人中心
    myData:'store/myInfo',//我的数据
    collectDetail:'order/orderList',//收银列表明细
    myInfo:'store/getUserData',//我的资料
    editInfo:'store/setUserData',//编辑个人信息
    cashierList:'store/cashierList',//收银员列表
    addCashier:'store/addCashier'//添加收银员
  },
  setUp:{ //设置
    issue:'index/singlePage' //问题中心,关于我们
  },
  arouse:{ //唤醒支付宝Iot小程序
    equipments:'Store/equipmentList',//商家设备列表
    push:'Socket/appToEquipment' //推送至IoT小程序
  }
};
