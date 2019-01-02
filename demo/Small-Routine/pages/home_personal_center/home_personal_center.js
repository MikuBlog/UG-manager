// pages/home_personal_center/home_personal_center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"Miku灬酱"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: "个人中心"
    })

  },

  // 路由跳转
  forwardTo(event) {

    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    })

  }

  
})