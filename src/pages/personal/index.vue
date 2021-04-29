<template>
  <div :style="{minHeight: windowHeight+'px', minWidth: windowWidth+'px'}" class="wrapper">

      <div v-if="isLogin">
        <div class="bg-header">
          <image class="bg_ware" src="https://cdn.nlark.com/yuque/0/2019/png/280373/1552908032971-assets/web-upload/e795fee4-c6cd-4951-b7d8-134aa9cd7c6b.png"></image>
          <div class="userAvatar" style="padding-left: 5vw;padding-top: 5vh">
            <van-image
              :src="userInfo.avatarUrl"
              height="5rem"
              round
              width="5rem"
            />
          </div>
          <p style="position:absolute;padding-left: 28vw;color: white;bottom: 23vh;font-size: 20px">{{userInfo.nickName}}</p>
        </div>
        <div class="vanGrid">
          <van-grid column-num="3">
            <van-grid-item icon="medal-o" icon-color="#0048FFFF" text="赛事管理" />
            <van-grid-item icon="manager-o" icon-color="#FF8C00FF" text="我的赛事" />
            <van-grid-item icon="info-o" icon-color="#FF5100FF" text="个人详细" />
          </van-grid>
        </div>
        <div class="pageBody">
          <div class="realBody">
            <van-cell-group>
              <van-cell
                is-link
                link-type="switchTab"
                size="large"
                title="单元格"
                url="/pages/index/main"
              />
              <van-cell
                is-link
                link-type="navigateTo"
                size="large"
                title="单元格"
                url="/pages/counter/main"
              />
              <van-cell
                is-link
                link-type="navigateTo"
                size="large"
                title="单元格"
                url="/pages/dashboard/index"
              />
              <van-cell
                is-link
                link-type="navigateTo"
                size="large"
                title="单元格"
                url="/pages/dashboard/index"
              />
            </van-cell-group>
          </div>
        </div>
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
  background-color #fff
  .wrapper
    .bg-header
      height 35vh
      position relative
      .bg_ware
        position: absolute
        width: 100vw
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
    .pageBody
      top 10%
      background-color #f1f1f1
      height 53vh
      .realBody
        position relative
        background-color white
        top 3vh
        box-shadow white

</style>
<style scoped>
</style>
