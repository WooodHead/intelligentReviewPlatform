<template>
  <div class="cover">

    <div class="cardDiv" v-for='item in cardData' :key="item.id">
      <i-card
        :title="'主办方:'+item.name"
        :extra="item.status"
        @click="cardActive"
        :id="item.code"
        :extraColor="item.status==='进行' ? '#00ff8b':'#ed3f14'"
        bodySize="18px"
        border
        footerColor="#2d8cf0"
        headerBGColor="#5cadff"
        headerColor="white">
        <view slot="content">{{ item.title }}</view>
        <view slot="footer">开始时间：{{ item.time }}</view>
      </i-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardData: []
    }
  },
  methods: {
    cardActive(e) {
      console.log(e.mp.currentTarget.id)
      wx.navigateTo({
        url:'/pages/matchJoin/main?code='+e.mp.currentTarget.id
      })
    },
    async initData(){
      let initCardData = await this.$project.getMyProject()
      initCardData = initCardData.data
      console.log(initCardData)
      let tempArr = []
      initCardData.forEach(
        function (item) {
          let tempObj = {}
          let title = item.matchName
          let name = item.creatorName
          let status = ""
          if(item.status === 1){
            status = "结束"
          }else{
            status = "进行"
          }
          tempObj.title=title
          tempObj.name=name
          tempObj.status= status
          tempObj.time =item.startTime
          tempObj.id = item.id
          tempObj.code = item.code
          tempArr.push(tempObj)
        }
      )
      this.cardData = tempArr
    }
  },
  async onShow(){
    // console.log(await this.$project.getCreatedProject())
    this.initData()
  }
}
</script>

<style scoped>

.cardDiv {
  margin-top: 20px;
}

.cover {
  background-color: #e5e5e5;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  overflow: auto;
  overscroll-behavior-y: contain;
}
</style>
