<template>
  <div class="cover">

    <i-cell-group>
      <div class="cardDiv" v-for='item in playerData' :key="item.id">
          <view slot="content">
            <i-cell
              :title="'选手名称:'+item.playerName"
              :label="'参赛项目名称:'+item.projectName">
            </i-cell>
          </view>
      </div>

    </i-cell-group>


  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      playerData:[],
      playerName:'',
      projectName:'',
    }
  },
  methods:{
  },
  async onLoad(){
    console.log(this.$root.$mp.query)
    let matchID = this.$root.$mp.query.id
    this.showUpdateDialog = false
    this.matchID = matchID
    let obj = {}
    obj.matchID=matchID
    let res = await this.$player.getPlayerList(obj)
    console.log(res)
    this.playerData = res.data
  },

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
</style>
