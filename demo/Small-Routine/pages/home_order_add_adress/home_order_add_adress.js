
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放地址列表
    positionList: [],

  },

  // 改变当前选择的地址
  getAdress(event) {

    var index = event.currentTarget.dataset.index

    app.curPosition = this.data.positionList[index]

    wx.navigateBack({
      
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '选择地址',
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