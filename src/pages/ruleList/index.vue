<template>
  <div class="cover">

    <i-cell-group>
      <div class="cardDiv" v-for='item in ruleData' :key="item.id">

          <view slot="content">
            <i-cell
              :title="'评分项名称:'+item.ruleName"
              :label="'最高分数:'+item.maxScore+',最低分数'+item.minScore">
            </i-cell>
          </view>

      </div>

    </i-cell-group>

  </div>
</template>

<script>
import Dialog from "../../../static/vant/dialog/dialog";
import Notify from "../../../static/vant/notify/notify";

export default {
  name: "index",
  data(){
    return{
      ruleData:[],
      ruleName:'',
      maxScore:'',
    }
  },
  methods:{
  },
  async onLoad(){
    console.log(this.$root.$mp.query)
    console.log(this.$root.$mp.query)
    let matchID = this.$root.$mp.query.id
    this.showUpdateDialog = false
    this.matchID = matchID
    let obj = {}
    obj.matchID=matchID
    let res = await this.$rule.getRuleList(obj)
    console.log(res)
    this.ruleData = res.data
  },

}
</script>

<style scoped>
.footer {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 50px;
  height: 50px;
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
