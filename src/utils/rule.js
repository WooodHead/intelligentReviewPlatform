import Vue from 'vue'

let vue = new Vue()

function addRule(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/rule/addRule',
      'data': {
        'maxScore': obj.maxScore,
        'ruleName': obj.ruleName,
        'matchID': obj.matchID,
        'token': token
      }
    }).then(async (res) => {
      if (res.data.length !== 0) {
        resolve("创建成功！")
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
        'ruleName': obj.ruleName,
        'matchID': obj.matchID,
        'id': obj.id,
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

function getRuleList(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/rule/getRuleList',
      'data': {
        'token': token,
        'matchID': obj.matchID
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
