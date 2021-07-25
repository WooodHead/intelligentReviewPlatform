<template>
  <div class="cover">
    <van-cell-group>
      <van-cell title="实时数据查看"  icon="fire-o" iconColor="#ee0a24"/>
      <van-cell
        is-link
        icon="bar-chart-o"
        title="平均分排名"
        iconColor="#0047FDFF"
        :url="'/pages/scoreDetail/main?code='+code+'&type=1'"
      />
      <van-cell
        is-link
        icon="chart-trending-o"
        title="平均分(去高低)最低排名"
        iconColor="#0047FDFF"
        :url="'/pages/scoreDetail/main?code='+code+'&type=2'"
      />
      <van-cell
        is-link
        icon="bar-chart-o"
        title="各项平均分排名"
        iconColor="#0047FDFF"
        :url="'/pages/scoreDetail/main?code='+code+'&type=3'"
      />
      <van-cell
        is-link
        icon="chart-trending-o"
        title="总分排名"
        iconColor="#0047FDFF"
        :url="'/pages/scoreDetail/main?code='+code+'&type=4'"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data(){
    return{
      code:''
    }
  },
  onLoad(){
    this.code = this.$root.$mp.query.code
    console.log(this.code)
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
</style>
