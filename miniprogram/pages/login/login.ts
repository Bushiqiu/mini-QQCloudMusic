// pages/login/login.ts
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '', //帐号
    password: '',  //密码
    QRbase64: '', //二维码
    timer: 0,
  },

  handleInput(event: any) {
    let type = event.currentTarget.id;
    this.setData({
      [type]: event.detail.value
    })
  },
  async login() {
    // let { user, password } = this.data

    // if (!user || !password) {
    //   wx.showToast({
    //     title: '不能为空',
    //     icon: 'error'
    //   })
    //   return;
    // }
    console.log('click login');
    if (this.data.QRbase64 || this.data.timer) {
      clearInterval(this.data.timer)
      this.setData({ QRbase64: '' })
    }
    let qrid: any = await request('/login/qr/key', { timerstamp: Date.now() })
    let key = qrid.data.unikey;
    console.log(qrid.data.unikey);

    let QRbase64: any = await request('/login/qr/create', { key, qrimg: true, timerstamp: Date.now() })
    this.setData({
      QRbase64: QRbase64.data.qrimg
    })
    let timer = setInterval(async () => {
      console.log('检测二维码状态', key);

      let QRstatus: any = await request('/login/qr/check', { key, timerstamp: Date.now() })
      console.log(QRstatus);

      if (QRstatus.code === 800) {
        wx.showToast({
          title: '二维码已过期,请重新获取',
          icon: 'error'
        })
        this.setData({ QRbase64: '' })
        clearInterval(timer)
      } else if (QRstatus.code === 803) {
        wx.showToast({
          title: '授权登录成功',
          icon: 'success'
        })
        let userInfo: any = await request('/login/status', { cookie: QRstatus.cookie })
        wx.setStorage({ key: 'userInfo', data: userInfo.data.profile })
        wx.switchTab({
          url: "/pages/personal/personal"
        })
        clearInterval(timer)
      }
    }, 3000)
    this.setData({ timer })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    console.log("hide");
    clearInterval(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log('unload');
    clearInterval(this.data.timer)
    this.setData({ QRbase64: '' })
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