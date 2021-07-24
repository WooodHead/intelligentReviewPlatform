import Vue from 'vue'

let vue = new Vue()

function addRule(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/rule/addRule',
      'data': {
        'maxScore': obj.maxScore,
        'minScore': obj.minScore,
        'ruleName': obj.ruleName,
        'matchID': obj.matchID,
        'token': token
      }
    }).then(async (res) => {
      if (res.hasOwnProperty("data")) {
        resolve("创建成功！")
      }else if(res.code === "101"){
        reject(res.msg)
      } else {
        reject(res.msg)
      }
    })
  })
}

function updateRule(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/rule/updateRule',
      'data': {
        'maxScore': obj.maxScore,
        'minScore': obj.minScore,
        'ruleName': obj.ruleName,
        'matchID': obj.matchID,
        'id': obj.id,
        'token': token
      }
    }).then(async (res) => {
      if (res.hasOwnProperty("data")) {
        resolve("创建成功！")
      }else if(res.code === "101"){
        reject(res.msg)
      } else {
        reject(res.msg)
      }
    })
      .catch(async (err) => {
        reject(err.data)
      })
  })
}

function deleteRule(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/rule/deleteRule',
      'data': {
        'matchID': obj.matchID,
        'id': obj.id,
        'token': token
      }
    }).then(async (res) => {
      if (res.data.length !== 0) {
        resolve(res)
      } else {
        reject(res.msg)
      }
    })
  })
}

function getRuleList(matchID) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/rule/getRuleList',
      'data': {
        'token': token,
        'matchID': matchID
      }
    }).then(async (res) => {
      if (res.data.length !== 0) {
        resolve(res)
      } else {
        reject(res.msg)
      }
    })
  })
}

export default {
  addRule,
  updateRule,
  deleteRule,
  getRuleList
}
