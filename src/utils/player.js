import Vue from 'vue'
let vue = new Vue()

function addPlayer(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/player/addPlayer',
      'data': {
        'playerName':obj.playerName,
        'projectName':obj.projectName,
        'matchID':obj.matchID,
        'token':token
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

function updatePlayer(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/player/updatePlayer',
      'data': {
        'data': {
          'playerName':obj.playerName,
          'projectName':obj.projectName,
          'matchID':obj.matchID,
          'id':obj.id,
          'token':token
        }
      }
    }).then(async (res) => {
      console.log(res)
      if (res.data.length !== 0) {
        resolve("修改成功！")
      } else {
        reject(res.msg)
      }
    })
      .catch(async (err)=>{
        reject(err.data)
      })
  })
}

function deletePlayer(obj) {
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/player/deletePlayer',
      'data': {
        'matchID': obj.matchID,
        'id': obj.id,
        'token':token
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

function getPlayerList(obj){
  let token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    vue.$http.post({
      'url': '/player/getPlayerList',
      'data': {
        'token':token,
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
  addPlayer,
  updatePlayer,
  deletePlayer,
  getPlayerList
}
