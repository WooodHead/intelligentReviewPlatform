import Vue from 'vue'

let vue = new Vue()

//  登录获取openid
function login (profile) {
  wx.showLoading()
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        if (res.code) {
          let result = res
          //  登录成功，获取用户信息
          getUserProfile(profile).then((res) => {
            console.log(res)
            //  此处res是getUserProfile获得的用户信息
            console.log(result.code)
            return vue.$http.post({
              'url': '/user/getToken',
              'data': {'code': result.code}
            }
            )
          }).then((res) => {
            //  此处res是post请求获得的token
            //console.log("cnm"+JSON.stringify(res))
            console.log(res)
            wx.hideLoading()
            wx.navigateBack()
            //  此处将token存储起来
            vue.$store.commit('SET_TOKEN', res.info)
            wx.setStorageSync('token', res.info)
            resolve(result)
          }).catch((res) => {
            showToast()
          })
        } else {
          showToast()
        }
      },
      fail () {
        showToast()
      }
    })
  })
}

//  获取用户信息
function getUserProfile(profile) {
  return new Promise((resolve, reject) => {
        //console.log("FUNCTION getUserInfo:"+JSON.stringify(res))
        vue.$store.commit('SET_USERINFO', profile.userInfo)
        wx.setStorageSync('userInfo', profile.userInfo)
        resolve(profile)
    })
}

//  toast弹窗
function showToast (content = '登录失败，请稍后再试') {
  wx.showToast({
    title: content,
    icon: 'none'
  })
}

//  显示一键登录的弹窗
function showLoginModal () {
  wx.showModal({
    title: '提示',
    content: '你还未登录，请先登录',
    confirmText: '一键登录',
    success (res) {
      //    点击一键登录，去授权页面
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/login/main'
        })
      }
    }
  })
}

function isLogin () {
  console.log(wx.getStorageSync('token'))
  if (!wx.getStorageSync('token')) {
    showLoginModal()
    return false
  } else {
    return true
  }
}

export default {
  login,
  showLoginModal,
  isLogin,
  showToast
}
