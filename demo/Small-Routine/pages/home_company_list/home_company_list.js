
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放公司列表
    companyList: []

  },

  // 跳转路由
  forwardTo(event) {

    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })

  },

  // 请求公司列表
  getCompanyList() {



  },


  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: "周边服务"
    })

  },

  onShow() {

    // 判断工单列表是否存在，如果不存在则重新请求
    if (app.companyList.length == 0) {

      this.getcompanyList()

    } else {

      var list = app.companyList

      this.setData({

        companyList: list

      })

    }

  }

})