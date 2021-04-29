<template>
  <div :style="{minHeight: windowHeight+'px', minWidth: windowWidth+'px'}" class="wrapper">

    <div v-if="isLogin">
            <van-image
            round
            :src="userInfo.avatarUrl"
            height="5rem"
            width="5rem"
          />
          <p>{{userInfo.nickName}}</p>

      </div>


    <div v-else class="box">
      <div class="logo">
        <img src="/static/images/logo.svg" />
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
    computed:{
    isLogin(){
      console.log(this.$store.getters.getLoginStatus)
      return this.$store.getters.getLoginStatus
    }
  },
  methods:{
    async initData(){
      await this.$login.isLogin()
      console.log(this.isLogin)
      if (this.isLogin) {
        this.userInfo = wx.getStorageSync('userInfo')
      }
    },
    initPageStyle () {
      let that = this
      wx.getSystemInfo({
        success (res) {
          that.windowHeight = res.windowHeight
          that.windowWidth = res.windowWidth
        }
      })
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
  },
  onShow(){
    this.initData()
    this.initPageStyle()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../static/stylus/mixin.styl"
body
  height:100%
  .wrapper
    .box
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      white-space nowrap
    .box
      width: 80%
      .logo
        width: 100%
        padding-bottom: 40rpx
        margin-bottom: 40rpx
        text-align: center
    .vanRow
      position absolute
      top 20%



</style>
