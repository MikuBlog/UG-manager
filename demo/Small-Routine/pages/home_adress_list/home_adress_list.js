
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放地址列表
    positionList: [],

    // 存放当前地址信息
    curPosition: {},

    // 显示删除提示
    showWarn: false

  },

  forwardTo(event) {

    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title:"地址列表"
    })

  },

  onShow() {

    // 判断工单列表是否存在，如果不存在则重新请求
    if (app.positionList.length == 0) {

      this.getPositionList()

    } else {

      var list = app.positionList

      this.setData({

        positionList: list

      })

    }

  }

  
})