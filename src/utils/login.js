import Vue from 'vue'
import token from "./token";

let vue = new Vue()

function checkDetails(obj) {
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/user/getDetails',
      'data': {
        'token': obj.token
      }
    }).then(async (res) => {
      if (res.data.length != 0) {
        vue.$store.commit('SET_DETAILS', res.data)
        wx.setStorageSync('details', res.data)
        resolve(res)
      } else {
        reject("details not found")
      }
    })
  })
}

function register(obj) {
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/user/addDetails',
      'data': {
        'username': obj.username,
        'avatar': obj.avatar,
        'phone': obj.phone,
        'email': obj.email,
        'token': obj.token,
        'teacher': obj.teacher
      }
    }).then(async (res) => {
      wx.hideLoading()
      if (res.code == 200) {
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
        let wait = ms => new Promise(resolve => setTimeout(resolve, ms))
        await wait(3000)
        wx.navigateBack()
        vue.$store.commit('SET_DETAILS', obj)
        wx.setStorageSync('details', obj)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'error',
          duration: 3000
        })
      }
      resolve(res)
    })
  })
}

//  登录获取openid
function login(profile) {
  wx.showLoading()
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          let result = res
          //  登录成功，获取用户信息
          getUserProfile(profile).then((res) => {
            console.log(res)
            //  此处res是getUserProfile获得的用户信息
            console.log(result.code)
            return vue.$http.post({
                'url': '/token/getToken',
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
            vue.$store.commit('SET_TOKEN', res.token)
            wx.setStorageSync('token', res.token)
            resolve(result)
          }).catch((res) => {
            showToast()
          })
        } else {
          showToast()
        }
      },
      fail() {
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

//  获取用户存储在服务器的详细资料
function getDetails(details) {
  return new Promise((resolve, reject) => {
    vue.$store.commit('SET_DETAILS', details)
    wx.setStorageSync('details', details)
    resolve(details)
  })
}

//  toast弹窗
function showToast(content = '登录失败，请稍后再试') {
  wx.showToast({
    title: content,
    icon: 'none'
  })
}

//  显示一键登录的弹窗
function showLoginModal() {
  wx.showModal({
    title: '提示',
    content: '你还未登录，请先登录',
    confirmText: '一键登录',
    success(res) {
      //    点击一键登录，去授权页面
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/login/main'
        })
      }
    }
  })
}

//  显示前去注册的弹窗
function showRegisterModal() {
  wx.showModal({
    title: '提示',
    content: '你还未完善详细资料，请先完善',
    confirmText: '前去完善',
    success(res) {
      //    点击一键登录，去授权页面
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/register/main'
        })
      }
    }
  })
}

async function isRegister(obj) {
  console.log(wx.getStorageSync('details'))
  if (!wx.getStorageSync('details')) {
    await checkDetails(obj)
      .then(async (result) => {
        wx.reLaunch({url:'/pages/personalInfo/main'})
      return true
    }).catch(async err => {
      showRegisterModal();
      return false;
    })
  } else {
    return true
  }
}


function isLogin() {
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
  showToast,
  isRegister,
  register,
  checkDetails
}
