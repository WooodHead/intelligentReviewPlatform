<template>
  <div id="bg">
    <van-notify id="van-notify" />
    <van-dialog id="van-dialog" />
    <div style="height: 20px"></div>
    <van-cell-group>
      <van-cell title="基本信息"/>
      <van-field
        :value="matchName"
        @input="matchName=$event.mp.detail"
        label="评审比赛名称"
        placeholder="请输入评审项目名称"
      />
      <van-field
        :value="creatorName"
        @input="creatorName=$event.mp.detail"
        label="比赛举办单位"
        placeholder="请输入举办单位名称"
      />
      <van-cell title="评审开始时间" is-link :value="fmtDate" @click="onOpen"/>
      <van-popup :show="show" @close="onClose" position="bottom" custom-style="width: 100%;">
        <van-datetime-picker
          type="datetime"
          :value="currentDate"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirmTime"
          @cancel="onClose"
        />
      </van-popup>
    </van-cell-group>
    <div style="height: 20px"></div>
    <van-cell-group>
      <van-cell title="评委权限"/>

        <van-cell-group>
          <van-cell
            title="评审前可以修改分数"
            clickable
            @click="toggle"
          >
            <van-checkbox slot="right-icon" :value="modifyScore" />
          </van-cell>
          <van-cell
            title="评委可以查看排名"
            clickable
            @click="toggle1"
          >
            <van-checkbox slot="right-icon" :value="readRank" />
          </van-cell>
        </van-cell-group>

    </van-cell-group>

    <div style="height: 20px"></div>
    <van-cell title="比赛简介"></van-cell>
    <van-cell-group>
      <van-field
        :value="description"
        @input="description=$event.mp.detail"
        label="比赛简介"
        type="textarea"
        placeholder="请输入简介"
        autosize
        border="false"
      />
    </van-cell-group>
    <div class="footer" v-show="showBtn">
      <van-button type="info" size="large" @click="updateProject" round style="width: 80vw">修改</van-button>

    </div>

  </div>
</template>

<script>
import Dialog from "../../../static/vant/Dialog/Dialog";
import Notify from "../../../static/vant/notify/notify";
export default {
  data() {
    return {
      value: "",
      show: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date().getTime(),
      maxDate: new Date(2022, 10, 1).getTime(),
      currentDate: "",
      fmtDate: "",
      modifyScore:true,
      readRank:true,
      description:"",
      mysqlTime:'',
      matchName:'',
      creatorName: '',
      matchID:'',
      showBtn:true
    }
  },
  methods: {
    onClose() {
      this.show = false
    },
    onOpen() {
      this.show = true
    },
    confirmTime(e) {
      let date2 = new Date(e.mp.detail)
      this.currentDate=e.mp.detail
      this.fmtDate = this.dateFormat("YYYY-mm-dd HH:MM", date2)
      this.mysqlTime = date2.toISOString().split('T')[0] + ' ' + date2.toTimeString().split(' ')[0];
      this.show = false
    },
    toggle(){
      this.modifyScore=!this.modifyScore
    },
    toggle1(){
      this.readRank=!this.readRank
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
        ;
      }
      ;
      return fmt;
    },
    async updateProject(){
      let obj={}
      obj.matchName = this.$data.matchName
      obj.creatorName=this.$data.creatorName
      obj.description=this.$data.description
      obj.startTime=this.$data.mysqlTime
      let options = {}
      options.modifyScore = this.modifyScore
      options.readRank = this.readRank
      obj.matchOptions = options
      obj.matchID = this.matchID
      if(obj.matchName&&obj.creatorName){
        console.log(this.$data.matchName)
        try{
          console.log(obj)
          await this.$project.updateProject(obj)
          Notify({ type: 'success', message: "修改成功！" });
        }catch (e) {
          Notify({ type: 'danger', message: "修改失败" });
        }
      }else{
        Notify({ type: 'danger', message: "请填写比赛名称和（或）赛事创办方！" });
      }


    }
  },
  async onShow() {
    let date = new Date()
    console.log(date)
    let matchID = this.$root.$mp.query.id
    this.matchID= matchID
    let res = await this.$project.getProjectDetailInfo(matchID)
    res = res.data[0]
    if(res.status === 1){
      Dialog.alert({
        title: '提示！',
        message: '评审已结束，无法进行更改',
      }).then(() => {
        Dialog.close()
      });
      this.showBtn=false
    }else{
      this.showBtn = true
    }
    this.matchName=res.matchName
    this.creatorName=res.creatorName
    this.description=res.description
    this.modifyScore=res.matchOptions.modifyScore
    this.readRank=res.matchOptions.readRank
    this.currentDate=new Date(res.startTime).getTime()
    this.fmtDate=res.startTime
    this.mysqlTime=res.startTime
  }
}
</script>

<style scoped>
.footer{
  position: absolute;
  bottom: 20px;
  width:80vw;
  left: 10vw;
  right: 10vw;
}
</style>
