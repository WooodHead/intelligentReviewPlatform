<template>
  <div class="verse">
    <text id="content">“{{content}}”</text>
    <br>
    <text id="origin">——{{author}}</text>
  </div>
</template>

<script>
export default {
  name: "versev1",
  data () {
    return{
      content:null,
      author:null
    }
  },

  methods:{
  async loadSentence(){
    let vm = this;
    mpvue.showLoading({
      title: "加载中"
    });
    await wx.request({
      url:'https://v1.jinrishici.com/all.json',
      header: {
        'content-type': 'application/json' // 默认值
      },success(res) {
          vm.hasData=true;
          let {data}= res;
          vm.content=data.content;
          vm.author=data.author;
          vm.transOrgin(data);
        mpvue.hideLoading();
        console.log(data)
        },fail(res) {
          mpvue.hideLoading();
          vm.hasData=false;
          console.log('fail')
        }
      }

    )
  },
    transOrgin(data) {
      this.content = data.content
      this.author=data.author;
    }
  },
  created () {
     let app = getApp()
  },

  mounted (){
    this.loadSentence()
  }
}
</script>
<style>
text{
  font-size: 20px;
  color: #eeeeee;
}
#content{
  align-self: center;
}
#origin{
  float: right;
  align-self: flex-end;
}
</style>
