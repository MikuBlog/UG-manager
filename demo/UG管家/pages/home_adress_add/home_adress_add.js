// pages/home_adress_add/home_adress_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放姓名
    name: "",

    // 存放电话号码
    phone: "",

    // 存放位置信息
    position: "",

    // 存放详细地址信息
    positionDetail: ""

  },

  // 选中邮箱
  isDelete() {

    

  },

  // 获取姓名
  getName(event) {

    this.setData({

      name:event.detail.value

    })

  },

  // 获取电话
  getPhone(event) {

    this.setData({

      phone: event.detail.value

    })

  },

  // 获取详细地址信息
  getPositionDetail(event) {

    this.setData({

      positionDetail: event.detail.value

    })

  },

  // 发送表单数据
  sendMessage() {

    wx.request({
      url: '',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '添加地址',
    })

  },

})