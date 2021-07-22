<template>
  <div>
    <van-swipe-cell
      id="swipe-cell"
      :right-width="120"
      async-close
    >
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
      </van-cell-group>

      <view slot="right">
        <van-button type="primary">修改</van-button>
        <van-button type="danger">删除</van-button>
      </view>

    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: "index",
  async onLoad(){
    console.log(this.$root.$mp.query)
    let matchID = this.$root.$mp.query.id
    this.matchID = matchID
    // let res = await this.$project.getProjectDetailInfo(matchID)
    // res = res.data[0]
    // if(res.status === 1){
    //   this.status = false
    // }else{
    //   this.status=true
    // }
    // this.inviteCode = res.code
    // console.log(res)
  }
}
</script>

<style scoped>

</style>
