// pages/home_order_photo/home_order_photo.js
Page({

  
  data: {

  },

  // 跳转路由
  forwardTo(event) {

    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })

  },

 
  // 加载成功后将标题设置为"拍摄"
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: "拍摄"
    })

  }

  
})