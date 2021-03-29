<template>
  <div class="wrapper" :style="{minHeight: windowHeight+'px', minWidth: windowWidth+'px'}">
    <div v-if="isLogin" class="content">
      <div class="header">
        <div class="user">
          <img id="avatar" :src='userInfo.avatarUrl'/>
          <span>{{userInfo.nickName}}</span>
        </div>
      </div>
    </div>
    <div v-else class="outline">请先登录</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfo: {},
      windowHeight: 0,
      windowWidth: 0,
      userPageData: {},
      infoCard: {
        title: '个人信息',
        listObjData: {},
        originData: {}
      }
    }
  },
  components: {

  },
  computed: {
    isLogin () {
      console.log('计算isLogin')
      return this.$store.getters.getLoginStatus
    }
  },
  methods: {
    async initData () {
      //  等待登录函数调用完毕后再执行下一步
      await this.$login.isLogin()
      if (this.isLogin) {
        this.userInfo = wx.getStorageSync('userInfo')
        this.userPageData = sysData.userPageData
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
    initAddressData () {
      if (this.isLogin) {
        this.$http.get({
          url: '/address'
        }).then(res => {
          let resMap = {
            'name': {'name': '姓名', 'value': ''},
            'mobile': {'name': '联系电话', 'value': ''},
            'address': {'name': '现住址', 'value': ''}
          }
          for (let key in resMap) {
            resMap[key].value = res[key]
          }
          this.$nextTick(() => {
            this.$set(this.infoCard, 'listObjData', resMap)
            this.$set(this.infoCard, 'originData', res)
          })
        }).catch((err) => {
          this.$nextTick(() => {
            if (err.statusCode === 404) {
              this.$set(this.infoCard, 'listObjData', {})
            }
          })
        })
      }
    }
  },
  //  每次进入页面都会执行
  onShow () {
    this.initData()
    this.initPageStyle()
    this.initAddressData()
  }
}
</script>
<style>
  #avatar{
    max-height: 80px;
    max-width: 80px;
    border-radius: 100%;
  }
</style>
