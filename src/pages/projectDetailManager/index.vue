<template>
  <div class="cover">

    <div style="height: 2vh"></div>
    <van-notify id="van-notify"/>
    <van-cell-group>
      <van-cell title="评审状态管理" icon="fire-o" iconColor="#ee0a24"/>

      <div v-if="status">
        <van-cell value="进行中" icon="setting-o" iconColor="#0047FDFF" clickable @click="endProject">
          <view slot="title">
            <view class="van-cell-text">比赛状态</view>
            <van-tag type="danger">结束比赛</van-tag>
          </view>
        </van-cell>
      </div>
      <div v-else>
        <van-cell value="已结束" iconColor="#0047FDFF" icon="setting-o">
          <view slot="title">
            <view class="van-cell-text">比赛状态</view>
            <van-tag type="success">比赛已结束</van-tag>
          </view>
        </van-cell>
      </div>


    </van-cell-group>

    <div style="height: 3vh"></div>
    <van-cell-group>
      <van-cell title="完善评审配置"  icon="fire-o" iconColor="#ee0a24"/>
      <van-cell
        is-link
        icon="setting-o"
        title="评审基本信息配置"
        @click="toUpdate"
        iconColor="#0047FDFF"
      />
      <van-cell
        is-link
        icon="setting-o"
        title="选手配置"
        link-type="navigateTo"
        url="/pages/dashboard/index"
        iconColor="#0047FDFF"
      />
      <van-cell
        is-link
        icon="setting-o"
        title="评分项配置"
        link-type="navigateTo"
        url="/pages/dashboard/index"
        iconColor="#0047FDFF"
      />
    </van-cell-group>

    <div style="height: 3vh"></div>
    <van-cell-group>
      <van-cell title="评审分享"  icon="fire-o" iconColor="#ee0a24"/>
      <van-cell
        clickable
        icon="smile-comment-o"
        title="邀请码"
        :value="inviteCode"
        iconColor="#0047FDFF"
        is-link
        @click="copyCode"
      />
      <van-cell
        is-link
        icon="qr"
        title="二维码"
        iconColor="#0047FDFF"
      />
      <van-cell
        is-link
        icon="photo-o"
        title="海报分享"
        iconColor="#0047FDFF"
      />
    </van-cell-group>

    <div style="height: 3vh"></div>
    <van-cell-group>
      <van-cell title="实时数据查看"  icon="fire-o" iconColor="#ee0a24"/>
      <van-cell
        is-link
        icon="bar-chart-o"
        title="平均分排名"
        iconColor="#0047FDFF"
      />
      <van-cell
        is-link
        icon="chart-trending-o"
        title="平均分去最高最低排名"
        iconColor="#0047FDFF"
      />
      <van-cell
        is-link
        icon="bar-chart-o"
        title="各项平均分排名"
        iconColor="#0047FDFF"
      />
      <van-cell
        is-link
        icon="chart-trending-o"
        title="总分排名"
        iconColor="#0047FDFF"
      />
    </van-cell-group>


  </div>
</template>

<script>
import Notify from "../../../static/vant/notify/notify";
export default {
  data(){
    return{
      status: true,
      inviteCode:'',
      matchID:''
    }
  },
  methods:{
    copyCode(){
      wx.setClipboardData({
        //准备复制的数据内容
        data: this.inviteCode,
        success: function (res) {
          wx.showToast({
            title: '复制成功',
          });
        }
      });
    },
    toUpdate(){
      wx.navigateTo({
        url: '/pages/projectUpdate/main?id='+this.matchID
      })
    },
    async endProject(){
      try{
        await this.$project.endProject(this.matchID)
        Notify({type: 'success', message: '比赛已结束！'});
        wx.navigateTo({
          url: '/pages/projectDetailManager/main?id='+this.matchID
        })
      }catch (e) {
        Notify({type: 'danger', message: e});
      }
    }
  },
  async onLoad(){
    console.log(this.$root.$mp.query)
    let matchID = this.$root.$mp.query.id
    this.matchID = matchID
    let res = await this.$project.getProjectDetailInfo(matchID)
    res = res.data[0]
    if(res.status === 1){
      this.status = false
    }else{
      this.status=true
    }
    this.inviteCode = res.code
    console.log(res)
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
