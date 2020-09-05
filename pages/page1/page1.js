
const app = getApp()
Page({
  data: {
    iconSize: 30,
    iconType: 'search',
    progress: 10,
    inputValue: "",
    disabled: false,

  },
  //获取输入
  bindInput(e) {
    this.setData({
      inputValue: e.detail.value,
      progress: 50
    })
    console.log(e.detail.value)


  },
  //搜索功能
  search() {
    //首先判断关键字是否为空
    if (this.data.inputValue == "") {
      wx.showToast({
        title: '请输入关键字',
        icon: 'false',
        duration: 2000
      });
    }
    else {
      let url_ = 'http://du.kanux.cn/du/' + this.data.inputValue
      this.setData({
        progress: 100,
        disabled: true
      })
      wx.request({
        url: url_, //+ String(this.inputValue), //884129-030
        method: 'GET',
        success: (result) => {
          console.log(result.data) //输出data
          //console.log(this.url)
          //判断是否有此商品
          if (result.data.data.productList == '') {
            wx.showToast({
              title: '无此商品',
              icon: 'false',
              duration: 1500
            })
          }
          else {
            for (var i = 0; i < result.data.data.productList.length; i++) {
              if (result.data.data.productList[i].price == 0) {
                result.data.data.productList[i].price = '暂无报价'
              }
              else {
                result.data.data.productList[i].price = String(result.data.data.productList[i].price).slice(0, -2)
                console.log(result.data.data.productList[i].price)
              }
            }
            //let price_ = String(result.data.data.productList[0].price).substring(0, String(result.data.data.productList[0].price).length - 2)
            //console.log(price_.substring(0, price_.length - 2))
            console.log()
            this.setData({
              Text: JSON.stringify(result),
              items: result.data.data.productList,//productList[0]
              // price: price_
            });
          }
        },
        //处理request错误的情况
        fail: (err) => {
          wx.showToast({
            title: err,
            icon: 'false',
            duration: 2000
          })
          console.log("error:" + err);
          wx.hideLoading();
        }

      })
    }
    this.setData({
      disabled: false
    })

  },
  //转发
  onShareAppMessage: function () {
    let users = wx.getStorageSync('user');
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/page1/page1',
      success: function (res) { }
    }
  }
})