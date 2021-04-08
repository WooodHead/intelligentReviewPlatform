<template>
  <div class="jm-block">
    <div class="input-container">
<!--      <mp-input placeholder="请输入您的评审邀请码" placeholderStyle="font-size:20px;font-family: -apple-system-font, Helvetica Neue, sans-serif;left:15.5vw;" type="text" confirmType="done"></mp-input>-->
      <van-field autosize="true" border="false"  label="赛事邀请码" name="invitationCode" placeholder="在此处填写" size="large"></van-field>
    </div>
    <div style="width:80vw;position: relative;margin: 45px auto 0 auto; ">
      <mp-button type="primary" lang="zh_CN" size="large" id="join">进入评审</mp-button>
    </div>
    <div>
      <div>
      </div>
    </div>
  </div>

</template>

<script>
import mpButton from 'mpvue-weui/src/button';
export default {
  name: "joinmatch",
  components: {
    mpButton,
  }
}
</script>

<style scoped>
  .jm-block{
    background-color:rgba(238,238,238,0.4) ;
    width:90vw;
    height: 25vh;
    border-radius: 5px;
  }
  .input-container{
    position: relative;
    /*background-color: rgba(255,255,255,0.4);*/
    width: 80vw;
    height: 7vh;
    margin: 20px auto 0 auto;
    top:20px;
    border-radius: 5px;
  }
  /*#join{*/
  /*  margin-top:20px !important;*/
  /*}*/
</style>
