<template>
  <div class="cover">

    <van-dialog id="van-dialog" />
    <van-notify id="van-notify"/>
    <i-cell-group>
      <div class="cardDiv" v-for='item in ruleData' :key="item.id">

        <i-swipeout  :actions="actions" @change="onChange" :id="item.id">
          <view slot="content">
            <i-cell
              :title="'评分项名称:'+item.ruleName"
              :label="'最大分数:'+item.maxScore">
            </i-cell>
          </view>
        </i-swipeout>

      </div>

    </i-cell-group>

    <van-dialog
      use-slot
      title="添加评分项信息"
      :show="showAddDialog"
      show-cancel-button
      :close="onClose2"
      @confirm="confirmB"
      @cancel="onClose2"
      headerBg="color"
    >
      <van-cell-group>
        <van-field
          :value="ruleName"
          @input="ruleName=$event.mp.detail"
          label="评分项名称"
          placeholder="请输入评分项名称"
        />
        <van-field
          :value="maxScore"
          @input="maxScore=$event.mp.detail"
          label="最大分数"
          placeholder="请输入最大分数"
          :border="false"
        />
      </van-cell-group>
    </van-dialog>

    <van-dialog
      use-slot
      title="修改评分项信息"
      :show="showUpdateDialog"
      show-cancel-button
      :close="onClose"
      @confirm="confirmA"
      @cancel="onClose"
      headerBg="color"
    >
      <van-cell-group>
        <van-field
          :value="ruleName"
          @input="ruleName=$event.mp.detail"
          label="评分项名称"
          placeholder="请输入评分项名称"
        />
        <van-field
          :value="maxScore"
          @input="maxScore=$event.mp.detail"
          label="最大分数"
          placeholder="请输入最大分数"
          :border="false"
        />
      </van-cell-group>
    </van-dialog>


    <div class="footer">
      <i-button type="primary" inline size="small" shape="round" @click="openAddDialog">+</i-button>
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
      ruleData:[],
      matchID:'',
      showUpdateDialog:false,
      showAddDialog:false,
      ruleName:'',
      maxScore:'',
      targetId:'',
      toggle:false,
      actions:[
        {
          name : '删除',
          color : '#fff',
          fontsize : '20',
          width : 100,
          icon : 'close',
          background : '#ed3f14'
        },
        {
          name : '编辑',
          width : 100,
          color : '#fff',
          fontsize : '20',
          icon : 'brush',
          background: '#2d8cf0'
        }
      ]
    }
  },
  methods:{
    deleteRule(e){
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
            await this.$rule.deleteRule(obj)
            Notify({type: 'success', message: '删除成功!'});
            let res = await this.$rule.getRuleList(obj)
            res = res.data
            this.ruleData = res
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
      this.$data.maxScore=""
      this.$data.ruleName=""
    },
    onClose2(){
      this.showAddDialog = false
      this.targetId=""
      this.$data.maxScore=""
      this.$data.ruleName=""
    },
    async openUpdateDialog(e){
      this.showUpdateDialog = true
      let id = e.mp.currentTarget.id
      this.targetId=id
      this.toggle=true
      console.log("btnID",id)
    },
    async openAddDialog(e){
      this.showAddDialog = true
      this.toggle=true
    },
    async confirmA(){
      this.showUpdateDialog = false
      let obj={}
      obj.matchID=this.matchID
      obj.maxScore=this.$data.maxScore
      obj.ruleName=this.$data.ruleName
      obj.id=this.targetId
      if (obj.maxScore && obj.ruleName) {
        try {
          await this.$rule.updateRule(obj)
          Notify({type: 'success', message: '修改成功'});
        } catch (e) {
          Notify({type: 'danger', message: e});
        }
      } else {
        Notify({type: 'danger', message: "请填写评分项名称和（或）最大分数！"});
      }
      let res = await this.$rule.getRuleList(obj)
      this.ruleData = res.data
      this.targetId=""
      this.$data.maxScore=""
      this.$data.ruleName=""
    },
    async confirmB(){
      this.showAddDialog = false
      let obj={}
      obj.matchID=this.matchID
      obj.maxScore=this.$data.maxScore
      obj.ruleName=this.$data.ruleName
      if (obj.maxScore && obj.ruleName) {
        try {
          await this.$rule.addRule(obj)
          Notify({type: 'success', message: '添加成功'});
        } catch (e) {
          Notify({type: 'danger', message: e});
        }
      } else {
        Notify({type: 'danger', message: "请填写选手名称和（或）选手项目名称！"});
      }
      let res = await this.$rule.getRuleList(obj)
      this.ruleData = res.data
      this.$data.maxScore=""
      this.$data.ruleName=""
    },
    onChange(e){
      console.log(e)
      //index = e.target.index
      if(e.target.index === 0){
        this.deleteRule(e)
      }else{
        this.openUpdateDialog(e)
      }
    }
  },
  async onLoad(){
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
