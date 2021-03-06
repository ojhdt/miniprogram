//app.js
App({
  onLaunch: function () {
    //初始化云开发
    wx.cloud.init({
      env: "holotask-1gb3a2qhe28a3262"
    })
    //获取openid
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        this.globalData.openid = res.result.openid
        this.globalData.appid = res.result.appid
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(this.globalData.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取夜间模式
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.theme = res.theme;
      }
    })
  },
  globalData: {
    userInfo: null,
    theme: null,
    openid: null,
    appid: null
  }
})