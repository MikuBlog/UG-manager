// pages/home_business_filter/home_business_filter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 存放类目信息(模拟数据)
    types: [

      {
        typeName: "维修",

        typeSecond: [

          {
            typeName: "家电",

            list: [

              "空调",

              "洗衣机",

              "油烟机",

              "冰箱",

              "风扇",

              "烤箱"

            ]
          },

          {

            typeName: "数码",

            list: [

              "手机",

              "平板",

              "笔记本",

              "电脑"

            ]

          }

        ]

      },

      {

        typeName: "清洗",

        typeSecond: [

          {
            typeName: "家电",

            list: [

              "空调",

              "洗衣机",

              "油烟机",

              "冰箱",

              "风扇",

              "烤箱"

            ]
          },

        ]

      }

    ],

  },

  // 点击元素改变元素样式
  handleClick(event) {

    console.log(event.currentTarget.dataset.text)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '类目筛选',
    })

  },


})