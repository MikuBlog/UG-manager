
var app = new getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放员工信息
    workerMes: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '员工信息',
    })

    // 判断当前员工信息是否存在
    var workerMes = app.workerMes

    if (workerMes) {

      this.setData({

        workerMes:workerMes

      })

    }

  },

  
})