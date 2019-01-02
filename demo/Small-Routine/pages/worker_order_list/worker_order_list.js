
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放工单列表
    orderList:[]

  },

  // 跳转路由
  forwardTo(event) {

    if (event.currentTarget.dataset.item) {

      wx.navigateTo({
        url: '../worker_order_detail/worker_order_detail',
      })

      return

    }

    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    })

  },

  // 获取工单列表
  getOrderList() {

    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {

    wx.setNavigationBarTitle({
      title: '工单列表',
    })

    var _this = this


     // 判断工单列表是否存在，如果不存在则重新请求
     if (app.orderList.length == 0) {

       this.getOrderList()

     } else {

       var list = app.orderList

       this.setData({

         orderList: list

       })

     }

  },


  
})