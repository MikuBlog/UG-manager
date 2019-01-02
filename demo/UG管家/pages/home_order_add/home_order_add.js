
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放当前地址信息
    curPosition: "",

    // 是否显示提示框
    showWarn:false,

    // 快捷选择类目
    types: [
      "家电",
      "空调",
      "洗衣机"
    ],

    // 保存维修类目
    type: "请选择维修类目标签",

  },

  // 跳转路由
  forwardTo(event) {

    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    })

  },

  // 隐藏显示框
  hideWarnBox() {

    this.setData({

      showWarn:false

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '添加工单'
    })

  },

  onShow() {

    if (app.curPosition) {

      this.setData({

        curPosition: app.curPosition

      })

    }

    if(app.type) {

      this.setData({

        type: app.type

      })

    }

  }

})