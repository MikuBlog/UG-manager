//app.js
App({
  
  // 存放用户名
  userName: "",

  // 存放用户的唯一ID
  userId: "",

  // 保存当前工单信息(模拟假数据)
  curOrderDetail: {

    id: 1,

    price: "127.00",

    status: "进行中",

    time: "2018-11-07",

    type: "空调",

    description: "空调开不了机",

    remark: "用的时间比较长了",

    upload: "../images/user/head.png",

    curPosition: 1,

    history: [

      {

        time: "2018-11-07 11:11",

        name: "旋仔"

      }

    ]

  },

  // 存放所有工单列表数据(模拟假数据)
  orderList: [{

    id: 1,

    price: "127.00",

    status: "待建单",

    time: "2018-11-07",

    type: "笔记本",

    description: "笔记本开不了机",

    remark: "用的时间比较长了",

    upload: "../images/user/head.png",

    curPosition: 1,

    history: [

      {

        time: "2018-11-07 11:11",

        name: "旋仔"

      }

    ]

  }, {

    id: 2,

    price: "127.00",

    status: "待分配",

    time: "2018-11-07",

    type: "电脑",

    description: "电脑开不了机",

    remark: "用的时间比较长了",

    upload: "../images/user/head.png",

    curPosition: 2,

    history: [

      {

        time: "2018-11-07 11:11",

        name: "旋仔"

      }

    ]

  }, {

    id: 3,

    price: "127.00",

    status: "已结束",

    time: "2018-11-07",

    type: "洗衣机",

    description: "洗衣机开不了机",

    remark: "用的时间比较长了",

    upload: "../images/user/head.png",

    curPosition: 3,

    history: [

      {

        time: "2018-11-07 11:11",

        name: "旋仔"

      }

    ]

  }],

  // 存放当前地址信息(先模拟假数据)
  curPosition: {

    id: 1,

    position: "广东省顺德区乐从镇",

    name: "旋仔",

    phone: "18024900423"

  },

  // 存档用户地址数组
  positionList: [{

    id: 1,

    position: "广东省顺德区乐从镇",

    name: "旋仔",

    phone: "18024900423",

    isSelected:false

  }, {

    id: 2,

    position: "广东省顺德区乐从镇",

    name: "小旋仔",

    phone: "18024900423",

    isSelected: false

  }, {

    id: 3,

    position: "广东省顺德区乐从镇",

    name: "大旋仔",

    phone: "18024900423",

    isSelected: false

  }],

  // 保存当前类目信息
  type: "请选择维修类目标签",

  // 保存类目筛选结果
  typeList: [],

  // 保存当前员工信息
  workerMes: {

    number: "0429",

    name: "旋仔",

    phone: "18024900423",

    identity: "440681199904293170"

  },

  // 保存当前公司信息
  curCompany: {

    id: 1,

    // 公司名称
    name: "海思B122",

    // 位移量
    distance: "0.45km",

    // 经营范围
    types: [

      {
        typeName: "维修",

        typeSecond: [

          {
            typeName: "家电",

            list: [

              "冰箱",

              "风扇",

              "烤箱",

            ]
          },

          {

            typeName: "数码",

            list: [

              "手机",

              "平板",

              "电脑"

            ]

          }

        ]

      }

    ],

    // 地址
    position: "广东海洋大学",

    description: "收费标准:一小时1000块钱~"

  },

  // 保存公司列表
  companyList: [

    {

      id: 1,

      // 公司名称
      name: "海思B122",

      // 位移量
      distance: "0.45km",

      // 经营范围
      types: [

        {
          typeName: "维修",

          typeSecond: [

            {
              typeName: "家电",

              list: [

                "冰箱",

                "风扇",

                "烤箱",

              ]
            },

            {

              typeName: "数码",

              list: [

                "手机",

                "平板",

                "电脑"

              ]

            }

          ]

        }

      ],

      // 地址
      position: "广东海洋大学",

      description: "收费标准:一小时1000块钱~"

    },
    {

      id: 1,

      // 公司名称
      name: "海思B123",

      // 位移量
      distance: "0.75km",

      // 经营范围
      types: [

        {
          typeName: "维修",

          typeSecond: [

            {
              typeName: "家电",

              list: [

                "冰箱",

                "风扇",

                "烤箱",

              ]
            },

            {

              typeName: "数码",

              list: [

                "手机",

                "平板",

                "电脑"

              ]

            }

          ]

        }

      ],

      // 地址
      position: "广东海洋大学",

      description: "收费标准:一小时10000块钱~"

    }

  ]

})