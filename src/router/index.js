import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'


/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

// 系统机构模块
const AgencyIndex = () => import( /* webpackChunkName:'agencyManage' */ '@/views/system/agency/index')
const AgencyInfo = () => import( /* webpackChunkName:'agencyManage' */ '@/views/system/agency/agencyInfo')
const AgencyAdd = () => import( /* webpackChunkName:'agencyManage' */ '@/views/system/agency/agencyAdd')
// 账号
const AccountIndex = () => import( /* webpackChunkName:'agencyManage' */ '@/views/system/account/index')
const AccountInfo = () => import( /* webpackChunkName:'agencyManage' */ '@/views/system/account/accountInfo')
// 机车模块
const EngineStock = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/stock')
const EngineStockIn = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/stockIn')
const EngineStockInAdd = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/stockInAdd')
const EngineStockInBack = () => import( /*  webpackChunkName: "engineManage */ '@/views/engine/stockInBack')
const EngineStockInUpdate = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/stockInUpdate')
const EngineStockInDetail = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/stockInDetail')
const EngineStockOut = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/stockOut')
const EngineStockOutDetail = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/stockOutDetail')
const EngineStockOutAdd = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/stockOutAdd')
const EngineStatus = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/status')
const EngineService = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/service')
const EngineSave = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/save')
const EngineBind = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/bind')
const EngineBreakDown = () => import( /* webpackChunkName: "engineManage" */ '@/views/engine/breakDown')

// 数据统计
const Data = () => import( /* webpackChunkName: "Data */ '@/views/data/index')

const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页
  {
    path: '',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'home'
    },
    children: [{
      path: 'home',
      name: 'HomePage',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页',
        icon: 'home'
      }
    }]
  },
  /*用户管理*/
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/userManageList',
    name: 'userManage',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [{
      path: 'userManageList',
      name: 'userManageList',
      component: () => import('@/views/userManage/userManageList/index'),
      meta: {
        title: '用户列表',
        icon: 'sms-flash'
      }
    }]
  },
  /*保险服务*/
  {
    path: '/insuranceService',
    component: Layout,
    redirect: '/insuranceService/customerData',
    name: 'insuranceService',
    meta: {
      title: '保险服务',
      icon: 'bao-xian'
    },
    children: [{
      path: 'customeData',
      name: 'customeData',
      component: () => import('@/views/insuranceService/customerData/index'),
      meta: {
        title: '客户资料卡',
        icon: 'sms-article'
      }
    },
      {
        path: 'memberGrade',
        name: 'memberGrade',
        component: () => import('@/views/insuranceService/memberGrade/index'),
        meta: {
          title: '会员等级模板',
          icon: 'user'
        }
      },
      {
        path: 'insuranceRisk',
        name: 'insuranceRisk',
        component: () => import('@/views/insuranceService/insuranceRisk/index'),
        meta: {
          title: '保险风险数据',
          icon: 'shu-ju'
        }
      },
      {
        path: 'accidentestoretwo',
        name: 'accidentestoretwo',
        component: () => import('@/views/insuranceService/accidentestoretwo/index'),
        meta: {
          title: '事故还原',
          icon: 'jiaotongshigu'
        }
      },
      {
        path: 'accidentestore',
        name: 'accidentestore',
        component: () => import('@/views/insuranceService/accidentestore/index'),
        meta: {
          title: '非顶级权限',
          icon: 'quanxian'
        }
      },

    ]
  },
  //公众号管理
  {
    path: '/officeAccount',
    component: Layout,
    redirect: '/officeAccount/officeAccountAdd',
    name: 'officeAccount',
    meta: {
      title: '公众号',
      icon: 'bao-xian'
    },
    children: [{
      path: 'officeAccountAdd',
      name: 'officeAccountAdd',
      component: () => import('@/views/officeAccount/officeAccountAdd/index'),
      meta: {
        title: '公账号新建',
        icon: 'sms-article'
      }
    },
      {
        path: 'officeAccountmanage',
        name: 'officeAccountmanage',
        component: () => import('@/views/officeAccount/officeAccountmanage/index'),
        meta: {
          title: '公账号管理',
          icon: 'user'
        }
      },
      {
        path: 'inforpush',
        name: 'inforpush',
        component: () => import('@/views/officeAccount/inforpush/index'),
        meta: {
          title: '消息推送',
          icon: 'shu-ju'
        }
      },
      {
        path: 'contentmanage',
        name: 'contentmanage',
        component: () => import('@/views/officeAccount/contentmanage/index'),
        meta: {
          title: '内容管理',
          icon: 'quanxian'
        }
      },

    ]
  },

  // 机车
  {
    path: '/engine',
    component: Layout,
    name: 'engine',
    meta: {
      title: '车机',
      icon: 'vehicle'
    },
    children: [{
      path: 'stock/put',
      name: 'engine-stock-in',
      component: EngineStockIn,
      meta: {
        title: '入库管理',
        icon: 'put-in'
      }
    }, {
      path: 'stock/put/detail',
      name: 'engine-stock-in-add',
      component: EngineStockInAdd,
      meta: {
        title: '采购入库',
        icon: 'product-add'
      },
      // hidden: true
    }, {
      path: 'stock/put/:id/detail',
      name: 'engine-stock-in-detail',
      component: EngineStockInDetail,
      meta: {
        title: '入库单',
        icon: 'sys-file'
      },
      hidden: true
    }, {
      path: 'stock/put/detail/back',
      name: 'engine-stock-in-back',
      component: EngineStockInBack,
      meta: {
        title: '退货单',
        icon: 'sys-file'
      },
      hidden: true
    }, {
      path: 'stock/put/detail/update/:id',
      name: 'engine-stock-in-update',
      component: EngineStockInUpdate,
      meta: {
        title: '入库单',
        icon: 'sys-file'
      },
      hidden: true
    }, {
      path: 'stock/out',
      name: 'engine-stock-out',
      component: EngineStockOut,
      meta: {
        title: '出库管理',
        icon: 'stock'
      }
    }, {
      path: 'stock/out/detail',
      name: 'engine-stock-out-add',
      component: EngineStockOutAdd,
      meta: {
        title: '新增出库',
        icon: 'product-add'
      },

    }, {
      path: 'stock/out/detail/:id',
      name: 'engine-stock-out-detail',
      component: EngineStockOutDetail,
      meta: {
        title: '出库单',
        icon: 'sys-file'
      },
      hidden: true
    }, {
      path: 'stock',
      name: 'engine-stock',
      component: EngineStock,
      meta: {
        title: '库存管理',
        icon: 'sys-file'
      }
    }, {
      path: 'service',
      name: 'engine-service',
      component: EngineService,
      meta: {
        title: '车机售后',
        icon: 'service'
      }
    }, {
      path: 'break',
      name: 'engine-break',
      component: EngineBreakDown,
      meta: {
        title: '故障机管理',
        icon: 'break'
      }
    }, {
      path: 'status',
      name: 'engine-status',
      component: EngineStatus,
      meta: {
        title: '车机状态',
        icon: 'status'
      }
    }, {
      path: 'save',
      name: 'engine-save',
      component: EngineSave,
      meta: {
        title: '车机盘存',
        icon: 'pan-dian'
      }
    }, {
      path: 'bind',
      name: 'engine-bind',
      component: EngineBind,
      meta: {
        title: '车机绑定',
        icon: 'bind'
      }
    }]
  },
  /*运营管理*/
  /* {
     path: '/operateManage',
     component: Layout,
     redirect: '/operateManage/serviceManage',
     name: 'operateManage',
     meta: {
       title: '运营管理',
       icon: 'yunyingguanli'
     },
     children: [{
         path: 'operateManage/serviceManage',
         name: 'operateManage-service',
         component: () => import('@/views/operateManage/serviceManage/index'),
         meta: {
           title: '服务管理',
           icon: 'sms-flash'
         }
       },
       {
         path: 'operateManage/serviceClassManage',
         name: 'operateManage-class',
         component: () => import('@/views/operateManage/serviceClassManage/index'),
         meta: {
           title: '服务分类管理',
           icon: 'product-cate'
         }
       },
       {
         path: 'operateManage/discountManage',
         name: 'operateManage/discountManage',
         component: () => import('@/views/operateManage/discountManage/index'),
         meta: {
           title: '优惠券管理',
           icon: 'tuan-gou'
         }
       },
       {
         path: 'operateManage/discountDetail',
         name: 'operateManage/discountDetail',
         component: () => import('@/views/operateManage/discountDetail/index'),
         meta: {
           title: '优惠券发放明细',
           icon: 'tuan-gou1'
         }
       },
     ]
   },*/
  // 商品
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {
      title: '商品',
      icon: 'product1'
    },
    children: [{
      path: 'product',
      name: 'ProductList',
      component: () => import('@/views/pms/product/index'),
      meta: {
        title: '商品列表',
        icon: 'product-list'
      }
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {
          title: '添加商品',
          icon: 'product-add'
        }
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {
          title: '修改商品',
          icon: 'product-add'
        },
        hidden: true
      },
      {
        path: 'productRecycle',
        name: 'productRecycle',
        component: () => import('@/views/pms/product/index'),
        meta: {
          title: '商品回收站',
          icon: 'product-recycle'
        },
        hidden: true
      },
      {
        path: 'productComment',
        name: 'productComment',
        component: () => import('@/views/pms/product/index'),
        meta: {
          title: '商品评价',
          icon: 'product-comment'
        },
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {
          title: '商品分类',
          icon: 'product-cate'
        }
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {
          title: '添加商品分类'
        },
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {
          title: '修改商品分类'
        },
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {
          title: '商品类型',
          icon: 'product-attr'
        }
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {
          title: '商品属性列表'
        },
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {
          title: '添加商品属性'
        },
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {
          title: '修改商品属性'
        },
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {
          title: '品牌管理',
          icon: 'product-brand'
        }
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {
          title: '添加品牌'
        },
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {
          title: '编辑品牌'
        },
        hidden: true
      }
    ]
  },
  // 店铺
  {
    path: '/store',
    component: Layout,
    redirect: '/store/list',
    name: 'store',
    meta: {
      title: '店铺',
      icon: 'product1'
    },
    children: [{
      path: 'list',
      name: 'store',
      component: () => import('@/views/store/index'),
      meta: {
        title: '店铺列表',
        icon: 'product-list'
      }
    },
      {
        path: 'addstore',
        name: 'add-store',
        component: () => import('@/views/store/addstore'),
        meta: {
          title: '新增店铺',
          icon: 'product-cate'
        },
        hidden: true
      },
      {
        path: 'operateManage/serviceClassManage',
        name: 'operateManage-class',
        component: () => import('@/views/operateManage/serviceClassManage/index'),
        meta: {
          title: '店铺分类',
          icon: 'product-cate'
        }
      }
    ]
  },
  // 订单
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {
      title: '订单',
      icon: 'order1'
    },
    children: [{
      path: 'order',
      name: 'order',
      component: () => import('@/views/oms/order/index'),
      meta: {
        title: '订单列表',
        icon: 'product-list'
      }
    },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {
          title: '订单详情'
        },
        hidden: true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {
          title: '发货列表'
        },
        hidden: true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {
          title: '订单设置',
          icon: 'order-setting'
        }
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {
          title: '退货申请处理',
          icon: 'order-return'
        }
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {
          title: '退货原因设置',
          icon: 'order-return-reason'
        }
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {
          title: '退货原因详情'
        },
        hidden: true
      }
    ]
  },
  // 营销
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {
      title: '营销',
      icon: 'ying-xiao'
    },
    children: [{
      path: 'article',
      name: 'article',
      component: () => import('@/views/article/index'),
      meta: {
        title: '文章列表',
        icon: 'sms-article'
      }
    }, {
      path: 'article/categories',
      name: 'article-categories',
      component: () => import('@/views/article/article-categories'),
      meta: {
        title: '文章分类',
        icon: 'product-attr'
      }
    },
      {
        path: 'addArticle',
        name: 'addArticle',
        component: () => import('@/views/article/add'),
        meta: {
          title: '添加文章'
        },
        hidden: true
      },
      {
        path: 'addArticleCate',
        name: 'addArticleCate',
        component: () => import('@/views/article/addCate'),
        meta: {
          title: '添加文章分类'
        },
        hidden: true
      },
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {
          title: '秒杀活动列表',
          icon: 'sms-flash'
        }
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {
          title: '秒杀时间段列表'
        },
        hidden: true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {
          title: '秒杀时间段选择'
        },
        hidden: true
      },
      // {
      //   path: 'flashProductRelation',
      //   name: 'flashProductRelation',
      //   component: () => import('@/views/sms/flash/productRelationList'),
      //   meta: {
      //     title: '秒杀商品列表'
      //   },
      //   hidden: true
      // },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {
          title: '优惠券列表',
          icon: 'sms-coupon'
        }
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {
          title: '添加优惠券'
        },
        hidden: true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {
          title: '修改优惠券'
        },
        hidden: true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {
          title: '优惠券领取详情'
        },
        hidden: true
      },
      {
        path: 'operateManage/discountDetail',
        name: 'operateManage/discountDetail',
        component: () => import('@/views/operateManage/discountDetail/index'),
        meta: {
          title: '优惠券明细',
          icon: 'tuan-gou1'
        }
      },
      // {
      //   path: 'brand',
      //   name: 'homeBrand',
      //   component: () => import('@/views/sms/brand/index'),
      //   meta: {
      //     title: '品牌推荐',
      //     icon: 'product-brand'
      //   }
      // },
      // {
      //   path: 'new',
      //   name: 'homeNew',
      //   component: () => import('@/views/sms/new/index'),
      //   meta: {
      //     title: '新品推荐',
      //     icon: 'sms-new'
      //   }
      // },
      // {
      //   path: 'hot',
      //   name: 'homeHot',
      //   component: () => import('@/views/sms/hot/index'),
      //   meta: {
      //     title: '人气推荐',
      //     icon: 'sms-hot'
      //   }
      // },
      // {
      //   path: 'subject',
      //   name: 'homeSubject',
      //   component: () => import('@/views/sms/subject/index'),
      //   meta: {
      //     title: '专题推荐',
      //     icon: 'sms-subject'
      //   }
      // },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {
          title: '广告列表',
          icon: 'sms-ad'
        }
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {
          title: '添加广告'
        },
        hidden: true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {
          title: '编辑广告'
        },
        hidden: true
      }
    ]
  },
  // 团购
  {
    path: '/group/buying',
    component: Layout,
    name: 'group',
    meta: {
      title: '团购',
      icon: 'tuan-gou1'
    },
    children: [{
      path: 'list',
      name: 'group-list',
      component: () => import('@/views/groupBuying/list'),
      meta: {
        title: '团购列表',
        icon: 'sms-article'
      }
    }, {
      path: 'add',
      name: 'group-add',
      component: () => import('@/views/groupBuying/add'),
      meta: {
        title: '添加团购',
        icon: 'tuan-gou'
      },
    }]
  },
  // 会员
  {
    path: '/memberManage',
    component: Layout,
    redirect: '/memberManage/memmerlist',
    name: 'memberManage',
    meta: {
      title: '会员',
      icon: 'member'
    },
    children: [{
      path: 'memmerlist',
      name: 'memberlist',
      component: () => import('@/views/memberManage/index'),
      meta: {
        title: '会员列表',
        icon: 'member'
      }
    }]
  },
  //   数据统计
  {
    path: '/data/count',
    component: Layout,
    meta: {
      title: '数据统计',
      icon: 'shu-ju'
    },
    children: [{
      path: 'special',
      name: 'special',
      component: () => import('@/views/data/count/special'),
      meta: {
        title: '专项页面',
        icon: 'home'
      }
    }, {
      path: 'banner',
      name: 'banner',
      component: () => import('@/views/data/count/banner'),
      meta: {
        title: 'banner',
        icon: 'home'
      }
    }, {
      path: 'navigation',
      name: 'navigation',
      component: () => import('@/views/data/count/navigation'),
      meta: {
        title: '导航栏',
        icon: 'home'
      }
    }, {
      path: 'article',
      name: 'article',
      component: () => import('@/views/data/count/article'),
      meta: {
        title: '文章阅读',
        icon: 'home'
      }
    }, {
      path: 'active',
      name: 'active',
      component: () => import('@/views/data/count/active'),
      meta: {
        title: '活动参与',
        icon: 'home'
      }
    }]
  },
  // 系统
  {
    path: '/system',
    component: Layout,
    redirect: '/system/adminlist',
    name: 'systemManage',
    meta: {
      title: '系统',
      icon: 'sys'
    },
    children: [{
      path: 'account',
      name: 'account',
      component: AccountIndex,
      meta: {
        title: '账号管理',
        icon: 'sys-file'
      }
    }, {
      path: 'account/info',
      name: 'account-info',
      component: AccountInfo,
      meta: {
        title: '账号信息',
        icon: 'sys-file'
      },
      hidden: true
    },
      //   {
      //     path: 'adminlist',
      //     name: 'adminlist',
      //     component: () => import('@/views/system/admin/index'),
      //     meta: {title: '管理员列表', icon: 'sys-manager'}
      //   },
      //   {
      //     path: 'addAdmin',
      //     name: 'addAdmin',
      //     component: () => import('@/views/system/admin/add'),
      //     meta: {title: '添加管理员'},
      //     hidden:true
      //   },
      {
        path: 'agency',
        name: 'agency',
        component: AgencyIndex,
        meta: {
          title: '机构管理',
          icon: 'sys-file'
        }
      }, {
        path: 'agency/info/:id',
        name: 'agency-detail',
        component: AgencyInfo,
        meta: {
          title: '机构信息',
          icon: 'sys-file'
        },
        hidden: true,
      }, {
        path: 'agency/add',
        name: 'agency-add',
        component: AgencyAdd,
        meta: {
          title: '新增机构',
          icon: 'sys-file'
        },
        hidden: true,
      }, {
        path: 'roleManage',
        name: 'roleManage',
        component: () => import('@/views/system/roleManage/index'),
        meta: {
          title: '角色管理',
          icon: 'sys-role'
        }
      }, {
        path: 'role/detail/:id',
        name: 'roleDetail',
        component: () => import('@/views/system/roleManage/detail'),
        meta: {
          title: '角色详情',
          icon: 'sys-role'
        },
        hidden: true
      },
      {
        path: 'authorityManage',
        name: 'authorityManage',
        component: () => import('@/views/system/authorityManage/index'),
        meta: {
          title: '权限管理',
          icon: 'sys-menu'
        }
      },
      {
        path: 'authority/detail/:id',
        name: 'authority-detail',
        component: () => import('@/views/system/authorityManage/detail'),
        meta: {
          title: '权限详情',
          icon: 'sys-menu'
        },
        hidden: true
      },
      //   {
      //     path: 'areaManage',
      //     name: 'areaManage',
      //     component: () => import('@/views/system/areaManage/index'),
      //     meta: {title: '地区管理', icon: 'sys-area'}
      //   },
      {
        path: 'fileManage',
        name: 'fileManage',
        component: () => import('@/views/system/fileManage/index'),
        meta: {
          title: '文件管理',
          icon: 'sys-file'
        }
      }
    ]
  },

  // /*配置信息管理*/
  // {
  //   path: '/configInfor',
  //   component: Layout,
  //   redirect: '/configInfor/bannerManage',
  //   name: 'configInfor',
  //   meta: {title: '配置信息管理', icon: 'sms'},
  //   children: [{
  //     path: 'configInfor/bannerManage',
  //     name: 'configInfor-banner',
  //     component: () => import('@/views/configInfor/bannerManage/index'),
  //     meta: {title: 'banner管理', icon: 'sms-flash'}
  //   },
  //     {
  //       path: 'configInfor/navRecommend',
  //       name: 'configInfor-nave',
  //       component: () => import('@/views/configInfor/navRecommend/index'),
  //       meta: {title: '导航推荐', icon: 'dao-hang'}
  //     },
  //     /* {
  //        path: 'configInfor',
  //        name: 'configInfor/dataCount',
  //        component: () => import('@/views/configInfor/dataCount/index'),
  //        meta: {title: '数据统计', icon: 'shu-ju'}
  //      },*/
  //   ]
  // },


  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const constantRouterObj = {
  Login: {
    path: '/login',
    name: 'login',
    component:
      () => import('@/views/login/index'),
    hidden: true
  },
  Redit: {
    path: '/404',
    name: '404',
    component:
      () => import('@/views/404'),
    hidden: true
  },
// 首页
// {
//   path: '',
//     name: 'Home',
//   component: Layout,
//   redirect: '/home',
//   meta: {
//   title: '首页',
//     icon: 'home'
// },
//   children: [{
//     path: 'home',
//     name: 'HomePage',
//     component: () => import('@/views/home/index'),
//     meta: {
//       title: '首页',
//       icon: 'home'
//     }
//   }]
// },
  Home: {
    path: '',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    meta: {
      title: '首页',
      icon:
        'home'
    },
    children: {
      HomePage: {
        path: 'home',
        name: 'HomePage',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页',
          icon: 'home'
        }
      }
    }
  },
  officeAccount: {
    path: '/officeAccount',
    component: Layout,
    redirect: '/officeAccount/officeAccountAdd',
    name: 'officeAccount',
    meta: {
      title: '公众号',
      icon: 'bao-xian'
    },
    children: {
      officeAccountAdd: {
        path: 'officeAccountAdd',
        name: 'officeAccountAdd',
        component: () => import('@/views/home/index'),
        meta: {
          title: '公账号新建',
          icon: 'sms-article'
        }
      },
      officeAccountmanage: {
        path: 'officeAccountmanage',
        name: 'officeAccountmanage',
        component: () => import('@/views/officeAccount/officeAccountmanage/index'),
        meta: {
          title: '公账号管理',
          icon: 'user'
        }
      },
      inforpush:  {
        path: 'inforpush',
        name: 'inforpush',
        component: () => import('@/views/officeAccount/inforpush/index'),
        meta: {
          title: '消息推送',
          icon: 'shu-ju'
        }
      },
      contentmanage:  {
        path: 'contentmanage',
        name: 'contentmanage',
        component: () => import('@/views/officeAccount/contentmanage/index'),
        meta: {
          title: '内容管理',
          icon: 'quanxian'
        }
      },
    }
  },
  /*用户管理*/
  UserControl: {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/userManageList',
    name: 'UserControl',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: {
      UsersList: {
        path: 'userManageList',
        name: 'UsersList',
        component: () => import('@/views/userManage/userManageList/index'),
        meta: {
          title: '用户列表',
          icon: 'sms-flash'
        }
      }
    }
  },
  /*保险服务*/
  InsuranceService: {
    path: '/insuranceService',
    component: Layout,
    redirect: '/insuranceService/customerData',
    name: 'InsuranceService',
    meta: {
      title: '保险服务',
      icon: 'bao-xian'
    },
    children: {
      CustomerCard: {
        path: 'customeData',
        name: 'CustomerCard',
        component: () => import('@/views/insuranceService/customerData/index'),
        meta: {
          title: '客户资料卡',
          icon: 'sms-article'
        }
      },
      MembershipLevelTemplate: {
        path: 'memberGrade',
        name: 'MembershipLevelTemplate',
        component: () => import('@/views/insuranceService/memberGrade/index'),
        meta: {
          title: '会员等级模板',
          icon: 'user'
        }
      },
      InsuranceRisktData: {
        path: 'insuranceRisk',
        name: 'InsuranceRisktData',
        component: () => import('@/views/insuranceService/insuranceRisk/index'),
        meta: {
          title: '保险风险数据',
          icon: 'shu-ju'
        }
      },
      TheAccidentReduction: {
        path: 'accidentestoretwo',
        name: 'TheAccidentReduction',
        component: () => import('@/views/insuranceService/accidentestoretwo/index'),
        meta: {
          title: '事故还原',
          icon: 'jiaotongshigu'
        }
      },
      NonTopLevelPermission: {
        path: 'accidentestore',
        name: 'NonTopLevelPermission',
        component: () => import('@/views/insuranceService/accidentestore/index'),
        meta: {
          title: '非顶级权限',
          icon: 'quanxian'
        }
      },
    }
  },
// 车机
  CarMachine: {
    path: '/engine',
    component: Layout,
    name: 'CarMachine',
    meta: {
      title: '车机',
      icon: 'vehicle'
    },
    children: {
      StockManagement: {
        path: 'stock/put',
        name: 'StockManagement',
        component: EngineStockIn,
        meta: {
          title: '入库管理',
          icon: 'put-in'
        }
      },
      ProcurementWarehousing: {
        path: 'stock/put/detail',
        name: 'ProcurementWarehousing',
        component: EngineStockInAdd,
        meta: {
          title: '采购入库',
          icon: 'product-add'
        },
        // hidden: true
      },
      // 4-17
// {
//       path: 'stock/put/:id/detail',
//       name: 'engine-stock-in-detail',
//       component: EngineStockInDetail,
//       meta: {
//         title: '入库单',
//         icon: 'sys-file'
//       },
//       hidden: true
//     },
      returnSingle: {
        path: 'stock/put/detail/back',
        name: 'returnSingle',
        component: EngineStockInBack,
        meta: {
          title: '退货单',
          icon: 'sys-file'
        },
        hidden: true
      },
      // 4-17
// {
//       path: 'stock/put/detail/update/:id',
//       name: 'engine-stock-in-update',
//       component: EngineStockInUpdate,
//       meta: {
//         title: '入库单',
//         icon: 'sys-file'
//       },
//       hidden: true
//     },
      WarehouseManagement: {
        path: 'stock/out',
        name: 'WarehouseManagement',
        component: EngineStockOut,
        meta: {
          title: '出库管理',
          icon: 'stock'
        }
      },
      EngineStockOutAddMenu: {
        path: 'stock/out/detail',
        name: 'EngineStockOutAddMenu',
        component: EngineStockOutAdd,
        meta: {
          title: '新增出库',
          icon: 'product-add'
        },

      },
      OutboundOrder: {
        path: 'stock/out/detail/:id',
        name: 'OutboundOrder',
        component: EngineStockOutDetail,
        meta: {
          title: '出库单',
          icon: 'sys-file'
        },
        hidden: true
      },
      StockControl: {
        path: 'stock',
        name: 'StockControl',
        component: EngineStock,
        meta: {
          title: '库存管理',
          icon: 'sys-file'
        }
      },
      CarMachineAfterSales: {
        path: 'service',
        name: 'CarMachineAfterSales',
        component: EngineService,
        meta: {
          title: '车机售后',
          icon: 'service'
        }
      },
      TroubleMachineManagement: {
        path: 'break',
        name: 'TroubleMachineManagement',
        component: EngineBreakDown,
        meta: {
          title: '故障机管理',
          icon: 'break'
        }
      },
      MachineState: {
        path: 'status',
        name: 'MachineState',
        component: EngineStatus,
        meta: {
          title: '车机状态',
          icon: 'status'
        }
      },
      inventory: {
        path: 'save',
        name: 'inventory',
        component: EngineSave,
        meta: {
          title: '车机盘存',
          icon: 'pan-dian'
        }
      },
      MachineBinding: {
        path: 'bind',
        name: 'MachineBinding',
        component: EngineBind,
        meta: {
          title: '车机绑定',
          icon: 'bind'
        }
      }
    }
  },
  /*运营管理*/
  /* {
     path: '/operateManage',
     component: Layout,
     redirect: '/operateManage/serviceManage',
     name: 'operateManage',
     meta: {
       title: '运营管理',
       icon: 'yunyingguanli'
     },
     children: [{
         path: 'operateManage/serviceManage',
         name: 'operateManage-service',
         component: () => import('@/views/operateManage/serviceManage/index'),
         meta: {
           title: '服务管理',
           icon: 'sms-flash'
         }
       },
       {
         path: 'operateManage/serviceClassManage',
         name: 'operateManage-class',
         component: () => import('@/views/operateManage/serviceClassManage/index'),
         meta: {
           title: '服务分类管理',
           icon: 'product-cate'
         }
       },
       {
         path: 'operateManage/discountManage',
         name: 'operateManage/discountManage',
         component: () => import('@/views/operateManage/discountManage/index'),
         meta: {
           title: '优惠券管理',
           icon: 'tuan-gou'
         }
       },
       {
         path: 'operateManage/discountDetail',
         name: 'operateManage/discountDetail',
         component: () => import('@/views/operateManage/discountDetail/index'),
         meta: {
           title: '优惠券发放明细',
           icon: 'tuan-gou1'
         }
       },
     ]
   },*/
// 商品
  Commodity: {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'Commodity',
    meta: {
      title: '商品',
      icon: 'product1'
    },
    children: {
      ProductList: {
        path: 'product',
        name: 'ProductList',
        component: () => import('@/views/pms/product/index'),
        meta: {
          title: '商品列表',
          icon:
            'product-list'
        }
      },
      AddMerchandise: {
        path: 'addProduct',
        name: 'AddMerchandise',
        component: () => import('@/views/pms/product/add'),
        meta: {
          title: '添加商品',
          icon:
            'product-add'
        }
      },
      EditProduct: {
        path: 'updateProduct',
        name: 'EditProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {
          title: '修改商品',
          icon:
            'product-add'
        },
        hidden: true
      },
      ProductRecycle: {
        path: 'productRecycle',
        name: 'ProductRecycle',
        component: () => import('@/views/pms/product/index'),
        meta: {
          title: '商品回收站',
          icon:
            'product-recycle'
        },
        hidden: true
      },
      ProductComment: {
        path: 'productComment',
        name: 'ProductComment',
        component: () => import('@/views/pms/product/index'),
        meta: {
          title: '商品评价',
          icon:
            'product-comment'
        },
        hidden: true
      },
      CommodityClassification: {
        path: 'productCate',
        name: 'CommodityClassification',
        component: () => import('@/views/pms/productCate/index'),
        meta: {
          title: '商品分类',
          icon:
            'product-cate'
        }
      },
      AddProductCate: {
        path: 'addProductCate',
        name: 'AddProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {
          title: '添加商品分类'
        },
        hidden: true
      },
      UpdateProductCate: {
        path: 'updateProductCate',
        name: 'UpdateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {
          title: '修改商品分类'
        },
        hidden: true
      },
      TypeOfMerchandise: {
        path: 'productAttr',
        name: 'TypeOfMerchandise',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {
          title: '商品类型',
          icon:
            'product-attr'
        }
      },
      ProductAttrList: {
        path: 'productAttrList',
        name: 'ProductAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {
          title: '商品属性列表'
        },
        hidden: true
      },
      AddProductAttr: {
        path: 'addProductAttr',
        name: 'AddProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {
          title: '添加商品属性'
        },
        hidden: true
      }
      ,
      EditProductAttr: {
        path: 'updateProductAttr',
        name: 'EditProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {
          title: '修改商品属性'
        },
        hidden: true
      }
      ,
      BrandManagement: {
        path: 'brand',
        name: 'BrandManagement',
        component: () => import('@/views/pms/brand/index'),
        meta: {
          title: '品牌管理',
          icon:
            'product-brand'
        }
      },
      AddBrand: {
        path: 'addBrand',
        name: 'AddBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {
          title: '添加品牌'
        },
        hidden: true
      },
      EditBrand: {
        path: 'updateBrand',
        name: 'EditBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {
          title: '编辑品牌'
        },
        hidden: true
      }
    }
  },
// 店铺
  Shop: {
    path: '/store',
    component: Layout,
    redirect: '/store/list',
    name: 'Shop',
    meta: {
      title: '店铺',
      icon: 'dianpu'
    },
    children: {
      TheStoreList: {
        path: 'list',
        name: 'TheStoreList',
        component: () => import('@/views/store/index'),
        meta: {
          title: '店铺列表',
          icon: 'product-list'
        }
      },
      AddStore: {
        path: 'addstore',
        name: 'AddStore',
        component: () => import('@/views/store/addstore'),
        meta: {
          title: '新增店铺',
          icon: 'product-cate'
        },
        hidden: true
      },
      StoreClassification: {
        path: 'operateManage/serviceClassManage',
        name: 'StoreClassification',
        component: () => import('@/views/operateManage/serviceClassManage/index'),
        meta: {
          title: '店铺分类',
          icon: 'product-cate'
        }
      }
    }
  },
// 订单
  TheOrder: {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'TheOrder',
    meta: {
      title: '订单',
      icon:
        'order1'
    },
    children: {
      TheOrderList: {
        path: 'order',
        name: 'TheOrderList',
        component: () => import('@/views/oms/order/index'),
        meta: {
          title: '订单列表',
          icon: 'product-list'
        }
      },
      OrderDetail: {
        path: 'orderDetail',
        name: 'OrderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {
          title: '订单详情'
        },
        hidden: true
      },
      DeliveryList: {
        path: 'deliverOrderList',
        name: 'DeliveryList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {
          title: '发货列表'
        },
        hidden: true
      },
      TheOrderIsSet: {
        path: 'orderSetting',
        name: 'TheOrderIsSet',
        component: () => import('@/views/oms/order/setting'),
        meta: {
          title: '订单设置',
          icon: 'order-setting'
        }
      },
      ProcessingOfReturnApplication: {
        path: 'returnApply',
        name: 'ProcessingOfReturnApplication',
        component: () => import('@/views/oms/apply/index'),
        meta: {
          title: '退货申请处理',
          icon: 'order-return'
        }
      },
      ReasonSetting: {
        path: 'returnReason',
        name: 'ReasonSetting',
        component: () => import('@/views/oms/apply/reason'),
        meta: {
          title: '退货原因设置',
          icon: 'order-return-reason'
        }
      },
      ReturnReasonDetail: {
        path: 'returnApplyDetail',
        name: 'ReturnReasonDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {
          title: '退货原因详情'
        },
        hidden: true
      }
    }
  },
// 营销
  Marketing: {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'Marketing',
    meta: {
      title: '营销',
      icon:
        'ying-xiao'
    },
    children: {
      TheArticleLists: {
        path: 'article',
        name: 'TheArticleLists',
        component: () => import('@/views/article/index'),
        meta: {
          title: '文章列表',
          icon: 'sms-article'
        }
      },
      TheArticleClassification: {
        path: 'article/categories',
        name: 'TheArticleClassification',
        component: () => import('@/views/article/article-categories'),
        meta: {
          title: '文章分类',
          icon: 'product-attr'
        }
      },
      AddArticle: {
        path: 'addArticle',
        name: 'AddArticle',
        component: () => import('@/views/article/add'),
        meta: {
          title: '添加文章'
        },
        hidden: true
      },
      AddArticleType: {
        path: 'addArticleCate',
        name: 'AddArticleType',
        component: () => import('@/views/article/addCate'),
        meta: {
          title: '添加文章分类'
        },
        hidden: true
      },
      KilledActivityList: {
        path: 'flash',
        name: 'KilledActivityList',
        component: () => import('@/views/sms/flash/index'),
        meta: {
          title: '秒杀活动列表',
          icon: 'sms-flash'
        }
      },
      KilledTime: {
        path: 'flashSession',
        name: 'KilledTime',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {
          title: '秒杀时间段列表'
        },
        hidden: true
      },
      KilledTimeSelect: {
        path: 'selectSession',
        name: 'KilledTimeSelect',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {
          title: '秒杀时间段选择'
        },
        hidden: true
      },
      // {
      //   path: 'flashProductRelation',
      //   name: 'flashProductRelation',
      //   component: () => import('@/views/sms/flash/productRelationList'),
      //   meta: {
      //     title: '秒杀商品列表'
      //   },
      //   hidden: true
      // },
      CouponList: {
        path: 'coupon',
        name: 'CouponList',
        component: () => import('@/views/sms/coupon/index'),
        meta: {
          title: '优惠券列表',
          icon: 'sms-coupon'
        }
      },
      AddCoupon: {
        path: 'addCoupon',
        name: 'AddCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {
          title: '添加优惠券'
        },
        hidden: true
      },
      EditCoupon: {
        path: 'updateCoupon',
        name: 'EditCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {
          title: '修改优惠券'
        },
        hidden: true
      },
      ReceiveDetail: {
        path: 'couponHistory',
        name: 'ReceiveDetail',
        component: () => import('@/views/sms/coupon/history'),
        meta: {
          title: '优惠券领取详情'
        },
        hidden: true
      },
      CouponDetails: {
        path: 'operateManage/discountDetail',
        name: 'CouponDetails',
        component: () => import('@/views/operateManage/discountDetail/index'),
        meta: {
          title: '优惠券明细',
          icon: 'tuan-gou1'
        }
      },
      AdvertisingList: {
        path: 'advertise',
        name: 'AdvertisingList',
        component: () => import('@/views/sms/advertise/index'),
        meta: {
          title: '广告列表',
          icon: 'sms-ad'
        }
      },
      AddAdvertise: {
        path: 'addAdvertise',
        name: 'AddAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {
          title: '添加广告'
        },
        hidden: true
      },
      EditAdvertise: {
        path: 'updateAdvertise',
        name: 'EditAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {
          title: '编辑广告'
        },
        hidden: true
      }
    }
  },
// 团购
  ABulk: {
    path: '/group/buying',
    component: Layout,
    name: 'ABulk',
    meta: {
      title: '团购',
      icon: 'tuan-gou1'
    },
    children: {
      GroupPurchaseList: {
        path: 'list',
        name: 'GroupPurchaseList',
        component: () => import('@/views/groupBuying/list'),
        meta: {
          title: '团购列表',
          icon: 'sms-article'
        }
      },
      AddACoupon: {
        path: 'add',
        name: 'AddACoupon',
        component: () => import('@/views/groupBuying/add'),
        meta: {
          title: '添加团购',
          icon: 'tuan-gou'
        },
      }
    }
  }
  ,
// 会员
  Members: {
    path: '/memberManage',
    component: Layout,
    redirect: '/memberManage/memmerlist',
    name: 'Members',
    meta: {
      title: '会员',
      icon: 'member'
    },
    children: {
      TheMemberList: {
        path: 'memmerlist',
        name: 'TheMemberList',
        component: () => import('@/views/memberManage/index'),
        meta: {
          title: '会员列表',
          icon: 'member'
        }
      }
    }
  },
//   数据统计
  DataStatistics: {
    path: '/data/count',
    component: Layout,
    name: 'DataStatistics',
    meta: {
      title: '数据统计',
      icon:
        'shu-ju'
    },
    children: {
      TheSpecialPage: {
        path: 'special',
        name: 'TheSpecialPage',
        component: () => import('@/views/data/count/special'),
        meta: {
          title: '专项页面',
          icon: 'zhuanxiang'
        }
      },
      Banner: {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/data/count/banner'),
        meta: {
          title: 'banner',
          icon: 'banner-icon'
        }
      },
      TheNavigationBar: {
        path: 'navigation',
        name: 'TheNavigationBar',
        component: () => import('@/views/data/count/navigation'),
        meta: {
          title: '导航栏',
          icon: 'daohang'
        }
      },
      ReadTheArticle: {
        path: 'article',
        name: 'ReadTheArticle',
        component: () => import('@/views/data/count/article'),
        meta: {
          title: '文章阅读',
          icon: 'read-wenzhang'
        }
      },
      ActivitiesInvolvedIn: {
        path: 'active',
        name: 'ActivitiesInvolvedIn',
        component: () => import('@/views/data/count/active'),
        meta: {
          title: '活动参与',
          icon: 'huodong'
        }
      }
    }
  },


  RbPublicAddress: {
    path: '/officeAccount',
    component: Layout,
    redirect: '/officeAccount/officeAccountAdd',
    name: 'officeAccount',
    meta: {
      title: '公众号',
      icon: 'gongzhonghao'
    },
    children: {officeAccountAdd:{
      path: 'officeAccountAdd',
      name: 'officeAccountAdd',
      component: () => import('@/views/officeAccount/officeAccountAdd/index'),
      meta: {
        title: '公账号新建',
        icon: 'sms-article'
      }
    },
      officeAccountmanage:{
        path: 'officeAccountmanage',
        name: 'officeAccountmanage',
        component: () => import('@/views/officeAccount/officeAccountmanage/index'),
        meta: {
          title: '公账号管理',
          icon: 'user'
        }
      },
      inforpush:{
        path: 'inforpush',
        name: 'inforpush',
        component: () => import('@/views/officeAccount/inforpush/index'),
        meta: {
          title: '消息推送',
          icon: 'shu-ju'
        }
      },
      contentmanage:{
        path: 'contentmanage',
        name: 'contentmanage',
        component: () => import('@/views/officeAccount/contentmanage/index'),
        meta: {
          title: '内容管理',
          icon: 'quanxian'
        }
      },

}
  },
// 系统
  System: {
    path: '/system',
    component: Layout,
    redirect: '/system/adminlist',
    name: 'System',
    meta: {
      title: '系统',
      icon: 'sys'
    },
    children: {
      AccountManagement: {
        path: 'account',
        name: 'AccountManagement',
        component: AccountIndex,
        meta: {
          title: '账号管理',
          icon: 'sys-file'
        }
      },
      AccountInfo: {
        path: 'account/info',
        name: 'AccountInfo',
        component: AccountInfo,
        meta: {
          title: '账号信息',
          icon: 'sys-file'
        },
        hidden: true
      },
      OrganizationManagement: {
        path: 'agency',
        name: 'OrganizationManagement',
        component: AgencyIndex,
        meta: {
          title: '机构管理',
          icon: 'sys-file'
        }
      },
      OrganizationInfo: {
        path: 'agency/info/:id',
        name: 'OrganizationInfo',
        component: AgencyInfo,
        meta: {
          title: '机构信息',
          icon: 'sys-file'
        },
        hidden: true,
      },
      AddOrganization: {
        path: 'agency/add',
        name: 'AddOrganization',
        component: AgencyAdd,
        meta: {
          title: '新增机构',
          icon: 'sys-file'
        },
        hidden: true,
      },
      RoleManagement: {
        path: 'roleManage',
        name: 'RoleManagement',
        component: () => import('@/views/system/roleManage/index'),
        meta: {
          title: '角色管理',
          icon: 'sys-role'
        }
      },
      RoleDetail: {
        path: 'role/detail/:id',
        name: 'RoleDetail',
        component: () => import('@/views/system/roleManage/detail'),
        meta: {
          title: '角色详情',
          icon: 'sys-role'
        },
        hidden: true
      },
      RightsManagement: {
        path: 'authorityManage',
        name: 'RightsManagement',
        component: () => import('@/views/system/authorityManage/index'),
        meta: {
          title: '权限管理',
          icon: 'sys-menu'
        }
      },
      RightsDetail: {
        path: 'authority/detail/:id',
        name: 'RightsDetail',
        component: () => import('@/views/system/authorityManage/detail'),
        meta: {
          title: '权限详情',
          icon: 'sys-menu'
        },
        hidden: true
      },
      //   {
      //     path: 'areaManage',
      //     name: 'areaManage',
      //     component: () => import('@/views/system/areaManage/index'),
      //     meta: {title: '地区管理', icon: 'sys-area'}
      //   },
      FileManagement: {
        path: 'fileManage',
        name: 'FileManagement',
        component: () => import('@/views/system/fileManage/index'),
        meta: {
          title: '文件管理',
          icon: 'sys-file'
        }
      }
    }
  },
}
const routes = [];
Object.keys(constantRouterObj).forEach(module => {
  if (constantRouterObj[module].children) {
    Object.keys(constantRouterObj[module].children).forEach((page) => {
      const {path, component} = constantRouterObj[module].children[page];
      routes.push({
        name: page,
        path,
        component
      });
    })
  } else {
    const {path, component} = constantRouterObj[module]
    routes.push({
      name: constantRouterObj[module].name,
      path,
      component
    });
  }
});
// console.log(routes);
// console.log(constantRouterMap);

const router = new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
  // routes: routes
})
router.beforeEach((to, from, next) => {
  console.log(to);
  next()
})
// console.log(router);
router.onError((error) => {
  console.log(error);
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
})
export {
  constantRouterObj
}
export default router
