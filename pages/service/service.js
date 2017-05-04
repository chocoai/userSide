// pages/service/service.js
var get_function = require('../../components/test/test1.js')

Page({
  data: {
    service: 0,
    goods_type: [],
    goods: [],
    price_range: ["0~10斤", "10~50斤", "50~100斤"],
    selected_type: 0,
    selected_goods: -1,
    image: ""
  },
  URL:'http://easy-mock.com/mock/59070ef87a878d73716e3aa7/wx-irecycle/',
  switchtab: function (e) {
    this.setData({
      selected_type: e.target.dataset.index
    })
  },
  selectgoods: function (e) {
    var sub = e.currentTarget.dataset.index
    if (sub == this.data.selected_goods)
      sub = -1
    this.setData({
      selected_goods: sub
    })
  },

  selectweight: function (e) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.setData({
      image: this.data.goods[this.data.selected_type][this.data.selected_goods].imgUrl
    })
    this.animation = animation
    if (this.data.goods[e.target.dataset.index].select == -1) {
      animation.translate(-168,30+45+e.target.dataset.index*87-380).step({duration:20})
        animation.opacity(1).scale(3,3).step({duration:20})
        animation.scale(1,1).translate(0,0).step({duration:440})
        animation.opacity(0).step()
    }
    else if (this.data.goods[e.target.dataset.index].select == e.target.dataset.weight_index) {
      animation.opacity(1).scale(2, 2).translateY(-40).step({ duration: 200 })
      animation.translateY(-45).translateX(50).rotate(90).step({ duration: 200 })
      animation.opacity(0).scale(1, 1).translateY(0).rotate(0).translateX(0).step({ duration: 0 })
    }
    else {
      animation.opacity(1).scale(2,2).translateY(-30).step({duration:200})
        animation.opacity(0).scale(1,1).translateY(0).step({duration:280})
    }
    this.setData({
      animationData_goods: animation.export(),
    })


    var copy = get_function.selectweight(e, this.data.goods)
    this.setData({
      goods: copy
    })


  },
  change_service: function (e) {
    this.setData({
      service: e.target.dataset.index
    }) //animationData_progress  translateX(107*e.target.dataset.index)
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease-out',
    })
    this.animation = animation
    animation.width(50 + 'rpx').left(e.target.dataset.index * 250 + 'rpx').step({ duration: 500 })
    animation.width(250 + 'rpx').step({ duration: 200 })
    this.setData({
      animationData_progress: animation.export()
    })
  },
  onLoad:function(){
    var that = this;
    wx.request({
      url: that.URL+'getgoods',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        that.setData({
          goods_type:res.data.data.goodsType,
          goods:res.data.data.goods
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})