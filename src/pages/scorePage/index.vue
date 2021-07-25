<template>
  <div>
    <van-tabs sticky @vclick="onClick" >
      <van-tab title="待评分列表">
        <div class="cover" >
          <i-cell-group>
            <div class="cardDiv" v-for='item in waitData' :key="item.id">
              <view slot="content">
                <i-cell
                  :title="'选手名称:'+item.playerName"
                  :label="'参赛项目名称:'+item.projectName"
                  :id="item.id"
                  @click="openScoreAdd"
                  is-link>
                </i-cell>
              </view>
            </div>
          </i-cell-group>
        </div>
      </van-tab>

      <van-tab title="已评分列表">
        <div class="cover" >
          <i-cell-group>
            <div class="cardDiv" v-for='item in alreadyData' :key="item.id">
              <view slot="content">
                <i-cell
                  :title="'选手名称:'+item.playerName"
                  :label="'参赛项目名称:'+item.projectName"
                  :id="item.id"
                  @click="openScoreEdit"
                  is-link>
                </i-cell>
              </view>
            </div>
          </i-cell-group>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      waitData: [],
      alreadyData: [],
      matchID: '',
    }
  },
  methods: {
    async onClick(e) {
      switch (e.mp.detail.index) {
        case 0:
          let result = await this.$score.getWaitScoreList(this.matchID)
          this.waitData = result.data
          console.log(result)
          break;
        case 1:
          // let res3 = await this.$score.getWaitScoreList(matchID)
          let res3 = await this.$score.getAlreadyScoreList(this.matchID)
          this.alreadyData = res3.data
          console.log(res3)
          break;
      }
    },
    openScoreAdd(e){
      console.log(e.mp.target.id)
      wx.navigateTo({
        url:"/pages/scoreAdd/main?matchID="+this.matchID+"&projectID="+e.mp.target.id
      })
    },
    openScoreEdit(e){
      console.log(e.mp.target.id)
      wx.navigateTo({
        url:"/pages/scoreUpdate/main?matchID="+this.matchID+"&projectID="+e.mp.target.id
      })
    }
  },
  async onLoad() {
    let matchID = this.$root.$mp.query.id
    this.matchID = matchID
    console.log(this.$root.$mp.query)
    let res = await this.$score.getWaitScoreList(matchID)
    // let res2 = await this.$score.getAlreadyScoreList(matchID)
    this.waitData = res.data
  }
}
</script>

<style scoped>
.cover {
  background-color: #e5e5e5;
  height: 100%;
  position: fixed;
  left: 0;
  width: 100%;
  overflow: auto;
  overscroll-behavior-y: contain;
}
</style>
