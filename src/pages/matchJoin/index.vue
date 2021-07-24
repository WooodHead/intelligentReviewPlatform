<template>
  <i-card
    :title="'主办方:'+creatorName"
    :extra="status===true?'进行中':'已结束'"
    :id="id"
    :extraColor="status===true? '#00ff8b':'#ed3f14'"
    bodySize="18px"
    border
    footerColor="#2d8cf0"
    headerBGColor="#5cadff"
    headerColor="white">
    <view slot="content">
      <van-cell :value="matchName">
        <view slot="title">
          <van-tag type="primary">赛事名称</van-tag>
        </view>
      </van-cell>
      <van-cell :value="player+'支'" is-link :url=" '/pages/playerList/main?id='+id">
        <view slot="title">
          <van-tag type="primary">参赛队伍</van-tag>
        </view>
      </van-cell>
      <van-cell :value="rule+'项'" is-link :url=" '/pages/ruleList/main?id='+id">
        <view slot="title">
          <van-tag type="primary">评分规则</van-tag>
        </view>
      </van-cell>
      <van-cell :value="description">
        <view slot="title">
          <van-tag type="primary">赛事描述</van-tag>
        </view>
      </van-cell>
      <van-cell>
        <van-button type="info" size="large" @click="join">进入评审</van-button>
      </van-cell>
    </view>
    <view slot="footer">开始时间：{{ time }}</view>
  </i-card>
</template>

<script>
export default {
  data(){
    return{
      name:'',
      status:'',
      id:'',
      time:'',
      player:0,
      rule:0,
      matchName:'',
      creatorName:'',
      description:''
    }
  },
  methods:{
    join(){
      wx.navigateTo({
        url:'/pages/scorePage/main?id='+this.id
      })
    }
  },
  async onLoad(){
    console.log(this.$root.$mp.query)
    let code = this.$root.$mp.query.code
    this.code = code
    let res = await this.$project.joinProject(code)
    console.log(res)
    res = res.data
    this.creatorName = res.matchInfo.creatorName
    this.matchName = res.matchInfo.matchName
    this.time = res.matchInfo.startTime
    this.id = res.matchInfo.id
    this.player = res.projectInfo.length
    this.rule = res.ruleInfo.length
    this.status = res.matchInfo.status === 0
    this.description = res.matchInfo.description
  }
}
</script>

<style scoped>

</style>
