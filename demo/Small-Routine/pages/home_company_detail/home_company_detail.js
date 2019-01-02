
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放公司
    curCompany: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '商户详情',
    })

  },

  onShow() {

    // 判断当前商户信息是否存在
    var curCompany = app.curCompany


    if (curCompany) {

      this.setData({

        curCompany: curCompany

      })

    }

  }

})