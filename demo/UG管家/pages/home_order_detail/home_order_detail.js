
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放工单详情信息
    orderDetail: {},

    // 存放当前所选择的地址
    curPosition: {},

    // 是否显示警告框
    showWarn: false,

    // 是否显示取消按钮
    showCancel: false,

    // 是否显示重新下单按钮
    showReorder: false,

    // 是否显示评价按钮
    showComment: false

  },

  // 跳转路由
  forwardTo(event) {

    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    })

  },

  // 判断工单状态
  justifyStatus() {

    var status = this.data.orderDetail.status

    if (status == "新建单" || status == "待分配" || status == "进行中") {

      this.setData({

        showCancel: true

      })


    }

    if (status == "已取消" || status == "已完结") {

      this.setData({

        showReorder: true

      })

    }

    if (status == "待评价") {

      this.setData({

        showComment: true

      })

    }

  },

  // 显示警告框
  showWarnBox() {

    this.setData({

      showWarn: true

    })

  },

  // 隐藏警告框
  hideWarnBox() {

    this.setData({

      showWarn: false

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title:"工单详情"
    })

  },

  onShow() {

    // 先判断是否存在当前工单详情，如果存在当前工单详情，则使用该详情信息
    var orderDetail = app.curOrderDetail

    // 先判断当前地址信息是否存在，如果存在则选择该地址信息
    var curPosition = app.curPosition

    if (orderDetail) {

      this.setData({

        orderDetail: orderDetail

      })

      this.justifyStatus()

    }

    if (curPosition) {

      this.setData({

        curPosition: curPosition

      })

    }

  }

})