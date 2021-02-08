// pages/account/account.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    avatarUrl: "/source/img/account/avatar.png",
    nickName: "未登录",
    user:{
      name: "Ojhdt",
      description: "个性签名",
    },
    motto: "From small beginnings comes great things.",
    motto_from: "Winston Churchill",
    imgUrl: "",
    hitokoto: false,
    bing: true
  },

  refreshData: function(){
    if(this.data.login){
      this.setData({
        nickName: this.data.userInfo.nickName,
        avatarUrl: this.data.userInfo.avatarUrl
      })
    }
    else{console.log("failed")}
  },

  refreshUserInfo: function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        login: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          login: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            login: true
          })
        }
      })
    }
  },

  getImage: function(){
    if(this.data.bing){
      wx.request({
        url: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
        method: 'GET',
        dataType: 'json',
        success: res => {
          let url = 'https://s.cn.bing.net/' + res.data.images[0].url;
          this.setData({
            imgUrl: url
          })
        }
      })
    }
    else{
      wx.cloud.getTempFileURL({
        fileList: ["cloud://holotask-1gb3a2qhe28a3262.686f-holotask-1gb3a2qhe28a3262-1304966310/image/account/sajad-nori-i4lvriR96Ek-unsplash.jpg"],
        success: res => {
          this.setData({
            imgUrl: res.fileList[0].tempFileURL
          })
        },
        fail: res => {
          console.log("Failed to request img.")
        }
      })
    }
  },

  getMoto: function(){
    if(this.data.hitokoto){
      wx.request({
        url: 'https://v1.hitokoto.cn/?c=a&c=b&c=c&c=d&c=i&encode=json&max_length=30',
        method: 'GET',
        dataType: 'json',
        success: res => {
          this.setData({
            motto: res.data.hitokoto,
            motto_from: res.data.from
          })
          // console.log(res.data);
        }
      })
    }
  },

  animation: function(){
    this.animate('#motto_container', [{
      opacity: 1.0,
      offset: 0
    },{
      opacity: 0.0,
      offset: 1
    },], 2000, {
      scrollSource: '#scroller',
      timeRange: 2000,
      startScrollOffset: 50,
      endScrollOffset: 280
    })

    this.animate('#header', [{
      height: '100%',
    },{
      height: '120%',
    },], 2000, {
      scrollSource: '#scroller',
      timeRange: 2000,
      startScrollOffset: 0,
      endScrollOffset: 280
    })
    
    this.animate('#motto_setting', [{
      opacity: 1.0,
      transform: 'rotate(0deg)',
      offset: 0
    },{
      opacity: 1.0,
      transform: 'rotate(32deg)',
      offset: .18
    },{
      opacity: 0.0,
      transform: 'rotate(180deg)',
      offset: 1
    },], 2000, {
      scrollSource: '#scroller',
      timeRange: 2000,
      startScrollOffset: 0,
      endScrollOffset: 280
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshUserInfo();
    this.getImage();
    this.getMoto();
    this.animation();
    this.refreshData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.getMoto();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refreshUserInfo()
    this.refreshData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})