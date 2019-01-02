
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放地址列表
    positionList:[],

    // 显示警告框
    showWarn:"none"

  },

  // 选中列表项
  isDelete(event) {

    var index = "positionList["+event.currentTarget.dataset.index+"].isSelected"

    var justify = event.currentTarget.dataset.justify

    if (justify == false) {

      this.setData({

        [index]:true

      })

    }else {

      this.setData({

        [index]: false

      })

    }

    

  },

  // 显示警告框
  showWarnBox() {

    this.setData({

      showWarn:"block"

    })

  },

  // 隐藏警告框
  hideWarn() {

    this.setData({

      showWarn: "none"

    })

  },

  // 返回上一页
  backTo() {

    wx.navigateTo({
      url:"../home_adress_list/home_adress_list"
    })

  },

  
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '删除地址',
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