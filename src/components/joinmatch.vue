<template>
  <div class="jm-block">
    <div class="input-container"><mp-input placeholder="请输入您的评审邀请码" type="text" confirmType="done"></mp-input></div>

    <div style="margin-top: 20px">
      <mp-button type="primary" lang="zh_CN" size="large" id="join">进入评审</mp-button>
    </div>
    <div>
      jkdas;lkdl;ask;ldkas;ldk;laskd;laksd;l
      <div>
        jasldfjlkdsfjlksdjkfl
      </div>
    </div>
  </div>

</template>

<script>
import mpButton from 'mpvue-weui/src/button';
import mpInput from 'mpvue-weui/src/input';
export default {
  name: "joinmatch",
  components: {
    mpButton,
    mpInput
  }
}
</script>

<style scoped>
  .jm-block{
    background-color:rgba(238,238,238,0.4) ;
    width: 50vw;
    height: 20vh;
  }
  .input-container{
    background-color: rgba(255,255,255,0.4);
    border-radius: 5px;
  }
  /*#join{*/
  /*  margin-top:20px !important;*/
  /*}*/
</style>
