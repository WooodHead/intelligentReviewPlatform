<template>
  <div class="cover">

    <van-dialog id="van-dialog" />
    <div style="height: 2vh"></div>
    <van-notify id="van-notify"/>

    <div class="cardDiv" v-for='item in playerData' :key="item.id">
      <van-swipe-cell
        id="swipe-cell"
        :right-width="120"
        async-close
      >
        <i-card
          :title="'选手名:'+item.playerName"
          full
          bodySize="18px"
          footerColor="#2d8cf0"
          headerBGColor="#5cadff"
          headerColor="white">
          <view slot="content">参赛项目名称： {{ item.projectName }}</view>
        </i-card>

        <view slot="right" style="height: 100%">
          <van-button type="primary" autoHeight :id="item.id" @click="openUpdateDialog">修改</van-button>
          <van-button type="danger" autoHeight :id="item.id" @click="deletePlayer">删除</van-button>
        </view>

      </van-swipe-cell>

      <div style="height: 3vh"></div>
    </div>

    <van-dialog
      use-slot
      title="修改选手信息"
      :show="showUpdateDialog"
      show-cancel-button
      :close="onClose"
      @confirm="confirmA"
      @cancel="onClose"
      headerBg="color"
    >
      <van-cell-group>
        <van-field
          :value="playerName"
          @input="playerName=$event.mp.detail"
          label="选手名称"
          placeholder="请输入选手名称"
        />
        <van-field
          :value="projectName"
          @input="projectName=$event.mp.detail"
          label="选手项目"
          placeholder="请输入选手项目名称"
          :border="false"
        />
      </van-cell-group>
    </van-dialog>


    <div class="footer">
      <i-button type="primary" inline size="small" shape="round" @click="btnClick">+</i-button>
    </div>
  </div>
</template>

<script>
import Dialog from "../../../static/vant/dialog/dialog";
import Notify from "../../../static/vant/notify/notify";

export default {
  name: "index",
  data(){
    return{
      playerData:[],
      matchID:'',
      showUpdateDialog:false,
      playerName:'',
      projectName:'',
      targetId:''
    }
  },
  methods:{
    deletePlayer(e){
      try{
        Dialog.confirm({
          title: '警告！',
          message: '该操作无法逆转，确认删除？',
        })
          .then(async () => {
            // on confirm
            console.log(e.mp.currentTarget.id)
            let id = e.mp.currentTarget.id
            let obj={}
            obj.id=id
            obj.matchID = this.matchID
            await this.$player.deletePlayer(obj)
            Notify({type: 'success', message: '删除成功!'});
            let res = await this.$player.getPlayerList(obj)
            res = res.data
            this.playerData = res
          })
          .catch(() => {
            // on cancel
            Dialog.close()
          });

      }catch (e) {
        Notify({type: 'danger', message: e});
      }
    },
    onClose(){
      this.showUpdateDialog = false
      this.targetId=""
    },
    async openUpdateDialog(e){
      this.showUpdateDialog = true
      let id = e.mp.currentTarget.id
      this.targetId=id
      console.log("btnID",id)
    },
    async confirmA(){
      this.showUpdateDialog = false
      let obj={}
      obj.matchID=this.matchID
      obj.projectName=this.$data.projectName
      obj.playerName=this.$data.playerName
      obj.id=this.targetId
      if (obj.projectName && obj.playerName) {
        try {
          await this.$player.updatePlayer(obj)
          Notify({type: 'success', message: '修改成功'});
        } catch (e) {
          Notify({type: 'danger', message: e});
        }
      } else {
        Notify({type: 'danger', message: "请填写选手名称和（或）选手项目名称！"});
      }
      console.log(obj)
      this.targetId=""
    }
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
  }
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
