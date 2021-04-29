<template>
  <div class="wrapper">
    <div>
    </div>
      <ven-cell-group>
        <van-field :value="registerForm.username" label="用户名" name="username" placeholder="在此处填写" @input="registerForm.username=$event.mp.detail"></van-field>
        <van-field :value="registerForm.phone" label="电话号码" name="phone" placeholder="在此处填写" type="number" @input="registerForm.phone=$event.mp.detail"></van-field>
        <van-field :value="registerForm.email" label="邮箱" name="邮箱" placeholder="在此处填写" @input="registerForm.email=$event.mp.detail"></van-field>
      </ven-cell-group>
      <div style="position: relative;margin-top: 5%">
        <van-checkbox :value="registerForm.checked" icon-size="25px" @change="onChange">是否为教师身份？</van-checkbox>
      </div>
      <button open-type="getUserInfo" style="position: relative;margin-top:20%" type="primary"  @click="submit">微信登录</button>


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
      registerForm:{
        username:'',
        phone:'',
        email:'',
        checked:false,
      }
    }
  },
  methods: {
    canIUse () {
      return wx.canIUse('button.open-type.getUserInfo')
    },
    onChange(){
      wx.showLoading()
      let temp=this.registerForm.checked;
      this.registerForm.checked = !this.registerForm.checked;
      if(temp !== this.checked){
        wx.hideLoading()
      }
    },onChangeField(event){
      console.log(event.detail)
    },
    async submit(){
      wx.showLoading({
        title:'注册中，请等待'
      })
      let{
        username,
        phone,
        email,
        power
      }={
        username:this.$data.registerForm.username,
        phone:this.$data.registerForm.phone,
        email:this.$data.registerForm.email,
        power:this.$data.registerForm.power
      }
      if(username&&phone&&email){

      }else{
        wx.hideLoading()
        wx.showToast({
          title:'请填写相关信息进行注册',
          icon:'none',
        })

      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../static/stylus/mixin.styl"
body
  height: 100%
  .wrapper
    .box,.low
      position: absolute
      top: 40%
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
