module.exports={
  addPhoto:function(){
    var that = this;
    console.log("adads")
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        // success
        console.log(that)
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        that.setData({
          secondHand_imgUrl:tempFilePaths[0]
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
}