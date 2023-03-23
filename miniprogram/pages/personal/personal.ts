import request from "../../utils/request"

// pages/personal/personal.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: { userId: 0 },
    collectList: {},
    iflogin: false
  },

  async getlogin() {
    let loginstatus: any = await request('/login/status')
    if (loginstatus) {
      this.setData({ iflogin: true })
    }
    this.setData({ iflogin: false })

    let uid = this.data.userInfo.userId;
    let collectList: any = await request('/user/playlist', { uid })
    this.setData({ collectList:collectList.playlist })
  },
  tologin() {
    if (!this.data.iflogin) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo })
      this.getlogin()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})