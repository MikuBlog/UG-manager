
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放家电类型
    typeHouse: [
      "空调",
      "洗衣机",
      "油烟机",
      "冰箱",
      "风扇",
      "烤箱"
    ],

    // 存放数码产品类型
    typeTel: [
      "手机",
      "电脑",
      "相机",
      "手表"
    ]

  },

  // 保存type信息
  getType(event) {

    var isType = event.currentTarget.dataset.item

    app.type = isType

    wx.navigateBack({
      
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }

})