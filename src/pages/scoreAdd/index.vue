<template>
  <div class="cover">
    <van-notify id="van-notify"/>
    <van-cell-group>
      <div v-for="(item,index) in form.ruleList" :key="index">
        <van-field
          :label="'评分项:'+item.ruleName+'的分数'"
          :value="item.score"
          @input="item.score=$event.mp.detail"
          :placeholder="'最高分数:'+item.maxScore+',最低分数:'+item.minScore"
          rule="number"
          type="digit"
        />
      </div>
    </van-cell-group>
    <div class="footerBtn">
      <van-button type="info" size="large" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import Notify from "../../../static/vant/notify/notify";

export default {
  data() {
    return {
      form: {
        ruleList: [
          {
            ruleName: '',
            maxScore: '',
            minScore: '',
            score: '',
            ruleID: '',
            projectID: '',
            matchID: ''
          }
        ]
      },
      matchID:''
    }
  },
  methods: {
    async submit() {
      try{
        let flag = true
        for(let i=0;i<this.form.ruleList.length;i++){
          let item = this.form.ruleList[i]
          let obj = {}
          obj.projectID = item.projectID
          obj.ruleID = item.ruleID
          obj.matchID = item.matchID
          obj.score = item.score
          if(item.score>item.maxScore || item.score<item.minScore){
            flag = false
            Notify({type: 'danger', message: '非法分数'});
          }
        }
        if(flag === true){
          for(let i=0;i<this.form.ruleList.length;i++){
            let item = this.form.ruleList[i]
            let obj = {}
            obj.projectID = item.projectID
            obj.ruleID = item.ruleID
            obj.matchID = item.matchID
            obj.score = item.score
            await this.$score.addScore(obj)
          }
          Notify({type: 'success', message: '评分成功!'});
          wx.navigateTo({
            url:'/pages/scorePage/main?id='+this.matchID
          })
        }
      }catch (e) {
        Notify({type: 'danger', message: e});
      }
    }
  },
  async onLoad() {
    let matchID = this.$root.$mp.query.matchID
    this.matchID = matchID
    let projectID = this.$root.$mp.query.projectID
    let res = await this.$rule.getRuleList(matchID)
    // this.form.ruleList = res.data
    let form = {
      ruleList: []
    }
    res.data.forEach(function (resItem) {
      let ruleListItem = {}
      ruleListItem.ruleID = resItem.id
      ruleListItem.projectID = projectID
      ruleListItem.matchID = resItem.matchID
      ruleListItem.ruleName = resItem.ruleName
      ruleListItem.maxScore = resItem.maxScore
      ruleListItem.minScore = resItem.minScore
      ruleListItem.score = ""
      form.ruleList.push(ruleListItem)
    })
    this.form.ruleList = form.ruleList
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
