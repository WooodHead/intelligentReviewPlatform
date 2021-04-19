<template>
  <div class="page">
    <div class="header">
      <div class="userinfo">
        <div v-if="!hasUserInfo" class="noInfo">
          <van-image
            height="4rem"
            round
            src="../../../../../../../static/images/userAvatar.svg"
            width="4rem"
          />
          <button v-if="canIUseGetUserProfile" @click="getUserProfile"> 获取头像昵称 </button>
          <button v-else open-type="getUserInfo" @click="getUserInfo"> 获取头像昵称 </button>
        </div>
        <div v-else>
          <image :src="userInfo.avatarUrl" class="userinfo-avatar"></image>
          <text class="userinfo-nickname">{{userInfo.nickName}}</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      userInfo: {},
      hasUserInfo: false,
      canIUseGetUserProfile: false,
    }
  },
  onLoad(){
    if (wx.getUserProfile) {
        this.canIUseGetUserProfile= true

    }
  },
  methods:{
    async initData(){
      await this.$login.isLogin()
      if (this.isLogin) {
        this.userInfo = wx.getStorageSync('userInfo')
      }
    },
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于展示个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.userInfo=res.userInfo;
          this.hasUserInfo=true;
          console.log(res)
        }
      })
    },
    getUserInfo(e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
}
// export default {
//   data () {
//     return {
//       userInfo: {},
//       windowHeight: 0,
//       windowWidth: 0,
//       userPageData: {},
//       infoCard: {
//         title: '个人信息',
//         listObjData: {},
//         originData: {}
//       }
//     }
//   },
//   components: {
//
//   },
//   computed: {
//     isLogin () {
//       console.log('计算isLogin')
//       return this.$store.getters.getLoginStatus
//     }
//   },
//   methods: {
//     async initData () {
//       //  等待登录函数调用完毕后再执行下一步
//       await this.$login.isLogin()
//       if (this.isLogin) {
//         this.userInfo = wx.getStorageSync('userInfo')
//         this.userPageData = sysData.userPageData
//       }
//     },
//     initPageStyle () {
//       let that = this
//       wx.getSystemInfo({
//         success (res) {
//           that.windowHeight = res.windowHeight
//           that.windowWidth = res.windowWidth
//         }
//       })
//     },
//     initAddressData () {
//       if (this.isLogin) {
//         this.$http.get({
//           url: '/address'
//         }).then(res => {
//           let resMap = {
//             'name': {'name': '姓名', 'value': ''},
//             'mobile': {'name': '联系电话', 'value': ''},
//             'address': {'name': '现住址', 'value': ''}
//           }
//           for (let key in resMap) {
//             resMap[key].value = res[key]
//           }
//           this.$nextTick(() => {
//             this.$set(this.infoCard, 'listObjData', resMap)
//             this.$set(this.infoCard, 'originData', res)
//           })
//         }).catch((err) => {
//           this.$nextTick(() => {
//             if (err.statusCode === 404) {
//               this.$set(this.infoCard, 'listObjData', {})
//             }
//           })
//         })
//       }
//     }
//   },
//   //  每次进入页面都会执行
//   onShow () {
//     this.initData()
//     this.initPageStyle()
//     this.initAddressData()
//   }
// }
</script>

<style>
  .userinfo-avatar{
    max-height: 80px;
    max-width: 80px;
    border-radius: 100%;
  }
  .header{
    height: 30vh;
    width: 100%;
    background: #56CCF2;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
