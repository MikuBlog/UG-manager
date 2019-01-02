//index.js
//获取应用实例
const app = getApp()

Page({

  onLoad() {

    

  },

  // 跳转路由
  forwardTo(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    })
  }
})
