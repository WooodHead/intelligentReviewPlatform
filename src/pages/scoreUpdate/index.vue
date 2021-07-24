<template>
  <div class="cover">
    <van-notify id="van-notify"/>
    <div v-if="canModify">
      <van-cell-group>
        <div v-for="(item,index) in ruleList" :key="index">
          <van-field
            :label="'评分项:'+item.ruleName+'的分数'"
            :value="item.score"
            @input="item.score=$event.mp.detail"
            :placeholder="'最高分数:'+item.maxScore+',最低分数:'+item.minScore"
            rule="number"
            type="digit"
            input-align="right"
          />
        </div>
      </van-cell-group>
      <div class="footerBtn">
        <van-button type="info" size="large" @click="modify">提交</van-button>
      </div>
    </div>
    <div v-else>
      <van-cell-group>
        <div v-for="(item,index) in ruleList" :key="index">
          <van-cell
            :title="'评分项:'+item.ruleName+'的分数'"
            :value="item.score"
          />
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>

import Notify from "../../../static/vant/notify/notify";

export default {
  data() {
    return {
      ruleList: [],
      matchID: '',
      canModify: true
    }
  },
  methods: {
    async modify() {
      try {
        let flag = true
        for (let i = 0; i < this.ruleList.length; i++) {
          let item = this.ruleList[i]
          let obj = {}
          obj.projectID = item.projectID
          obj.ruleID = item.ruleID
          obj.matchID = item.matchID
          obj.score = item.score
          if (item.score > item.maxScore || item.score < item.minScore) {
            flag = false
            Notify({type: 'danger', message: '非法分数'});
          }
        }
        if (flag === true) {
          for (let i = 0; i < this.ruleList.length; i++) {
            let item = this.ruleList[i]
            let obj = {}
            obj.projectID = item.projectID
            obj.ruleID = item.ruleID
            obj.matchID = item.matchID
            obj.score = item.score
            await this.$score.updateScore(obj)
          }
          Notify({type: 'success', message: '评分成功!'});
          wx.navigateTo({
            url: '/pages/scorePage/main?id=' + this.matchID
          })
        }
      } catch (e) {
        Notify({type: 'danger', message: e});
      }
    }
  },
  async onLoad() {
    this.matchID = this.$root.$mp.query.matchID
    let projectID = this.$root.$mp.query.projectID
    let res = await this.$score.getScore(projectID)
    let res2 = await this.$project.getProjectDetailInfo(this.matchID)
    console.log(res2.data[0].matchOptions.modifyScore)
    this.canModify = res2.data[0].matchOptions.modifyScore
    this.ruleList = res.data
  }

}
</script>

<style scoped>
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

.footerBtn {
  position: relative;
  top: 10vh;
  width: 80%;
  left: 10%;
  right: 10%;
}
</style>
