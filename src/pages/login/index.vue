<template>
  <div class="wrapper">
    <div class="box" v-if="true">
      <div class="logo">
        <img src="/static/images/logo.svg" />
      </div>
      <p>登录后开发者将获取一些权限</p>
      <ul>
        <li>获取你的公开信息（昵称、头像等）</li>
      </ul>
      <button type="primary" @tap="getUserProfile">微信登录</button>
    </div>
    <div class="low" v-else>当前版本太低，请升级！</div>
  </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    canIUse () {
      return wx.canIUse('button.open-type.getUserInfo')
    },
    getUserProfile (e) {
      wx.getUserProfile({
        desc:'用于完善会员资料',
        success:(profile)=>{
          this.$login.login(profile)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../static/stylus/mixin.styl"
body
  height: 100%
  .wrapper
    .box,.low
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      white-space: nowrap
    .box
      width: 80%
      .logo
        width: 100%
        padding-bottom: 40rpx
        margin-bottom: 40rpx
        text-align: center
        img
          width: 128rpx
          height: 128rpx
      & p,& ul
        margin-bottom: 40rpx
      & ul li
        list-style: disc!important
        color: gray
        margin-left: 30rpx
</style>
