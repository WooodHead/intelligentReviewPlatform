import * as types from './mutation-types'

const matations = {
  /**
   * state: 当前状态树
   * v: 提交matations时传的参数
   */
  [types.SET_TOKEN] (state, v) {
    state.token = v
    //  同步存入本地缓存
    wx.setStorageSync('token', v)
  },
  [types.UPDATE_TOKEN] (state, v) {
    state.token = v
    wx.setStorageSync('token', v)
  },
  /**
   * 设置用户信息
   */
  [types.SET_USERINFO] (state, v) {
    state.userInfo = v
    wx.setStorageSync('userInfo', v)
  },
  /**
   * 设置页面宽高
   */
  [types.SET_WINDOWATTRI] (state, v) {
    state.windowAttri = v
    wx.setStorageSync('windowAttri', v)
  },
  /**
   * 设置存储在服务器的详细资料
   */
  [types.SET_DETAILS] (state,v){
    state.details = v
    wx.setStorageSync('details',v)
  }
}

export default matations
