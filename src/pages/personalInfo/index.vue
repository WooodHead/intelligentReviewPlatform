<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <div v-if="isRegister" class="realBody">
      <van-notice-bar
        background="#ecf9ff"
        color="#1989fa"
        left-icon="volume-o"
        text="小程序还处于内测阶段，如需更改个人资料可以联系开发者，联系邮箱：Marsh@88.com"
      />
      <div class="avatar">
        <van-image
          :src="userInfo.avatarUrl"
          height="8rem"
          round
          width="8rem"
        />
      </div>
      <div class="info">
        <p id="tips">{{tips}}</p>
        <p id="email">您的邮箱为：</p>
        <p class="importantInfo">{{infoFrom.email}}</p>
        <p id="phone">您的手机号码为：</p>
        <br>
        <p class="importantInfo">{{infoFrom.phone}}</p>
      </div>
    </div>
    <div v-else class="box">
      <div class="logo">
        <img alt="imgUndefined" src="/static/images/logo.svg"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
      isRegister:false,
      tips:'',
      infoFrom:{
        username:'',
        phone:'',
        email:'',
        teacher:''
      }
    }
  },
  methods: {
    /**
     * 初始化用户存储在服务器的详细资料
     */
    async initData() {
      let obj = {}
      obj.token = wx.getStorageSync('token')
      this.isRegister = await this.$login.isRegister(obj)
      this.infoFrom.username=wx.getStorageSync('details')[0].username
      this.infoFrom.phone=wx.getStorageSync('details')[0].phone
      this.infoFrom.email=wx.getStorageSync('details')[0].email
      this.userInfo = wx.getStorageSync('userInfo')
    },
    timeTips(){
      let now = new Date();
      let hours = now.getHours();
      let username
      if(wx.getStorageSync('details')[0].teacher===1){
        username = wx.getStorageSync('userInfo').nickName+"老师"
      }else{
        username = wx.getStorageSync('userInfo').nickName+"同学"
      }
      if(hours>=0&&hours<=5){
        this.tips=`深夜了,${username}注意休息`
      }else if(hours>=6&&hours<=11){
        this.tips=`早上好,${username}`
      }else if(hours>=12&&hours<=14){
        this.tips=`午安,${username}`
      }else if(hours>=15&&hours<=17){
        this.tips=`下午好,${username}`
      }else if (hours>=18&&hours<=22){
        this.tips=`晚上好,${username}`
      }else{
        this.tips=`${username}，该休息了`
      }
    }
  },
  onShow() {
    this.initData()
    this.timeTips()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../static/stylus/mixin.styl"
body
  height: 100%
  .realBody
    height 100vh
    background-image url("https://cdn.nlark.com/yuque/0/2019/jpeg/280373/1552400570049-assets/web-upload/32aeb81a-1bf9-4a0c-aa6c-60bada9c1154.jpeg")
    .avatar
      position relative
      left 50%
      margin-left -64px
    .info
      font-size 25px
      .importantInfo
        font-family -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif
        font-size 25px
        color #ff8400
        font-weight bolder
        position relative
        padding-left 3vh
    #tips
      font-family -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif
      font-size 25px
      color white
      font-weight lighter
      position relative
      padding-left 3vh
      padding-top 9.5vh
    #email
      font-family -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif
      font-size 25px
      color white
      font-weight lighter
      position relative
      padding-left 3vh
      padding-top 3.5vh
    #phone
      font-family -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif
      font-size 25px
      color white
      font-weight lighter
      position relative
      padding-left 3vh
      padding-top 2vh
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
</style>
