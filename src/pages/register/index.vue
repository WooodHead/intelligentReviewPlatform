<!--suppress HtmlUnknownTag -->
<template>
  <div class="wrapper">
    <div class="tips">
      <p>您的详细资料</p>
    </div>
    <ven-cell-group>
      <van-field :value="registerForm.username" label="用户名" name="username" placeholder="在此处填写"
                 @input="registerForm.username=$event.mp.detail"></van-field>
      <van-field :value="registerForm.phone" label="电话号码" name="phone" placeholder="在此处填写" type="number"
                 @input="registerForm.phone=$event.mp.detail"></van-field>
      <van-field :value="registerForm.email" label="邮箱" name="邮箱" placeholder="在此处填写"
                 @input="registerForm.email=$event.mp.detail"></van-field>
    </ven-cell-group>
    <div style="position: relative;margin-top: 5%;margin-left: 5%">
      <van-checkbox :value="registerForm.checked" icon-size="25px" @change="onChange">是否为教师身份？</van-checkbox>
    </div>
    <div class="button">
      <van-button size="large" type="info" @click="submit">提交资料</van-button>
    </div>
  </div>
</template>

<script>
import mpSwitch from 'mpvue-weui/src/button';

export default {
  components: {
    mpSwitch,
  },
  data() {
    return {
      registerForm: {
        username: '',
        phone: '',
        email: '',
        checked: false,
      },
      userInfo: {},
      token: ''
    }
  },
  methods: {
    onChange() {
      wx.showLoading()
      let temp = this.registerForm.checked;
      this.registerForm.checked = !this.registerForm.checked;
      if (temp !== this.checked) {
        wx.hideLoading()
      }
    }, onChangeField(event) {
    },
    async submit() {
      wx.showLoading({
        title: '注册中，请等待'
      })
      this.userInfo = wx.getStorageSync('userInfo')
      this.token = wx.getStorageSync('token')
      let {
        username,
        avatar,
        phone,
        email,
        token,
        power
      } = {
        username: this.$data.registerForm.username,
        avatar: this.userInfo.avatarUrl,
        phone: this.$data.registerForm.phone,
        email: this.$data.registerForm.email,
        token: this.token,
        power: this.$data.registerForm.checked
      }
      let obj = {}
      obj.username = username
      obj.avatar = avatar
      obj.phone = phone
      obj.email = email
      obj.token = token
      obj.power = power
      if (username && phone && email) {
        await this.$login.register(obj)
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '请填写相关信息进行注册',
          icon: 'none',
        })
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../static/stylus/mixin.styl"
body
  .tips
    height 60px

    p
      padding-top 20px
      padding-left 10px
      font-family -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif
      color #7a94ac

  .wrapper
    height 100vh
    background-color #f1f1f1

  .button
    position: relative;
    padding-top 3vh
    width 50vw
    padding-left 25vw
</style>
