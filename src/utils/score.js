import Vue from 'vue'

let vue = new Vue()

function addScore(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/score/addScore',
      'data': {
        'projectID': obj.projectID,
        'ruleID': obj.ruleID,
        'matchID': obj.matchID,
        'score': obj.score,
        'token': token
      }
    }).then(async (res) => {
      if (res.code == "101") {
        reject(res.msg)
      } else {
        resolve("创建成功！")
      }
    }).catch(err=>console.error(err))
  })
}

function updateScore(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/score/updateScore',
      'data': {
        'projectID': obj.projectID,
        'ruleID': obj.ruleID,
        'matchID': obj.matchID,
        'score': obj.score,
        'token': token
      }
    }).then(async (res) => {
      console.log(res)
      if (res.data.length !== 0) {
        resolve("修改成功！")
      } else {
        reject(res.msg)
      }
    })
      .catch(async (err) => {
        reject(err.data)
      })
  })
}

function getWaitScoreList(matchID) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/score/getWaitScoreList',
      'data': {
        'token': token,
        'matchID': matchID
      }
    }).then(async (res) => {
        resolve(res)
    })
  })
}

function getAlreadyScoreList(matchID) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/score/getAlreadyScoreList',
      'data': {
        'token': token,
        'matchID': matchID
      }
    }).then(async (res) => {
        resolve(res)
    }).catch(err => console.error(err))
  })
}

function getScore(projectID){
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/score/getScore',
      'data': {
        'token': token,
        'projectID': projectID
      }
    }).then(async (res) => {
      resolve(res)
    }).catch(err => console.error(err))
  })
}
export default {
  addScore,
  updateScore,
  getWaitScoreList,
  getAlreadyScoreList,
  getScore
}
