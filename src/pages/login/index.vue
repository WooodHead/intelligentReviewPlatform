<template>
  <div class="wrapper">
    <div>
    </div>
    <div class="box" v-if="true">
      <div class="logo">
        <img src="/static/images/logo.svg" />
      </div>
      <p>登录后开发者将获取一些权限</p>
      <ul>
        <li>获取你的公开信息（昵称、头像等）</li>
      </ul>

      <ven-cell-group>
        <van-field label="用户名" name="username" placeholder="在此处填写"></van-field>
        <van-field label="电话号码" name="phone" placeholder="在此处填写" type="number"></van-field>
        <van-field label="邮箱" name="邮箱" placeholder="在此处填写"></van-field>
        是否为教师身份？<van-switch :checked="checked" @change="onChange"></van-switch>
      </ven-cell-group>
      <button open-type="getUserIn fo"  type="primary" @getuserinfo="getUserInfo">微信登录</button>
    </div>
    <div class="low" v-else>当前版本太低，请升级！</div>
  </div>
</template>
<script>
import mpSwitch from 'mpvue-weui/src/button';
export default {
  components: {
    mpSwitch,
  },
  data () {
    return {
      checked:false,
    }
  },
  methods: {
    canIUse () {
      return wx.canIUse('button.open-type.getUserInfo')
    },
    getUserInfo () {
      console.log("调用了login")
      this.$login.login()
    },
    onChange(){
      this.checked = !this.checked;
      this.$emit('change', this.checked);
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
      top: 30%
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
        border-1px:(rgba(7, 17, 27, 0.2))
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
