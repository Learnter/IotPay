/**
 * API接口配置文件
 */
module.exports = {
  allCity:'Config/getSortPinyinCityList',//所有城市
  hostCity:'Config/getHotCity',//热门城市
  system:'Index/systemInfo',//系统信息
  allRegion:'index/getAllRegion',//获取所有地区
  uploadFile:'upload/uploadImageFile',//上传照片
  banksType:'salesman/chooseBankList',//银行卡类型
  login:'salesman/accountLogin',//登录
  forgot:'salesman/forLoginPassword',//找回密码
  updatePwd:'Salesman/editPassword',//修改密码
  phoneCode:'smscode/sendSmsRegCode',//获取手机验证码
  updatePicture:'upload/uploadImageFile',//上传图片
  mobileCode:'smscode/sendSmsRegCode',//短信验证码
  qrCode:'salesman/myQrCode', //二维码
  carousel:'index/adList', //轮播图
  myPoster:'salesman/myPoster',//推广二维码
  me:{ //个人中心
    myInfo:'store/getUserData',//我的资料
    myData:'salesman/myInfo',//我的数据
    shopList:'store/storeList',//商家列表
    walletList:'moneycarrylog/moneyCarryLogList',//钱包列表
    bankList:'salesman/myBankCard',//银行卡列表
    addBank:'salesman/addBankCard',//添加银行卡
    withdraw:'moneycarrylog/moneyCarry',//提现
    brokerage:'moneylog/moneyLogList',//佣金明细
    recuitment:'store/addStore',//商家入驻申请
    editInfo:'store/setUserData',//编辑个人信息
    cashierList:'store/cashierList',//收银员列表
    addCashier:'store/addCashier',//添加收银员
    shareInfo:'Salesman/salesmanInfo',//分润信息
    shareMonth:'moneylog/monthLogList', //月份分润
    editManInfo:'salesman/editSalesmanInfo' //编辑资料
  },
  setUp:{ //设置
    issue:'index/singlePage' //问题中心,关于我们
  },
  product:{ //产品
    list:'goods/getGoodsList', //产品列表
    detail:'goods/goodsDetail',//产品详情
    category:'Store/getCateList',//分类列表
    cateGoods:'goods/goodsListByCateId', //分类下的商品
    recommend:'goods/getTopGoodsList',//推荐列表
    hotSale:'goods/getHotGoodsList' //热卖列表
  },
  address:{ //地址
    list:'address/addressList', //地址列表
    add:'address/addAddress', //添加地址
    edit:'address/editAddress', //编辑地址
    remove:'address/delAddress', //删除地址
    setDefault:'address/setDefaultAddress',//设置默认
    info:'address/addressInfo'//地址详细信息
  },
  order:{ //订单
    commit:'Order/commitOrder',//提交订单
    comfirmPay:'Order/createThirdOrder',//第三方订单
    list:'Order/salesOrderList',//订单列表
    detail:'order/orderDetail' //订单详情
  },
  medic:{ //铺货
    list:'store/marketShopList', //铺货列表
    install:'order/createMarketOrder', //铺货
    order:'order/marketOrderList', //铺货订单列表
    comfirmMedic:'order/createMarketOrder', //确认铺货
    medicOrders:'order/marketOrderList'//已铺货订单列表
  },
  agency:{ //代理
    apply:'Agent/agentApplication' //代理申请
  },
  equipment:{ //我的设备
    storelist:'salesman/myEquipments' //门店列表
  },
  business:{ //商学院
    newCategory:'News/newsCateList', //公告分类
    cateIdNews:'News/getNewsByCateId', //分类下的列表
    details:'News/getNewsInfoById' //分类详情
  },
  teamEquipment:{ //团队设备
    list:'salesman/teamEquipments'
  },
  find:{ //查询
   sn:'MoneyLog/getLogListBySn' //sn设备查询
  }
};
