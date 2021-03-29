<template>
  <div class="verse">
    <text id="content">“{{content}}”</text>
    <br>
    <text id="origin">——{{dynasty}}·{{author}}</text>

  </div>
</template>

<script>
import jinrishici from '@/utils/jinrishici'
export default {
  name:"verse",
  data () {
    return {
      matchTag: [],
      content: [],
      hasData: true,
      desc: "",
      animationData: {},
      context:null,
      collectData:null,
      dynasty:null,
      author:null
    }
  },

  methods: {
    async loadSentence() {
      let vm = this;
      mpvue.showLoading({
        title: "加载中"
      });
      await jinrishici.load(
        result => {
          mpvue.hideLoading();
          let { status, data } = result;
          console.log(result)
          switch (status) {
            case "success":
              let { origin, content } = data;
              vm.collectData = data
              vm.desc = content;
              vm.hasData = true;
              vm.dynasty=origin.dynasty;
              vm.author=origin.author;
              vm.transOrgin(origin);
              break;
            default:
              vm.hasData = false;
              break;
          }
        },
        err => {
          mpvue.hideLoading();
          vm.hasData = false;
        }
      );
    },
    transOrgin(origin) {
      let {content} = origin;
      console.log(content)
      this.content = content[0];
      this.dynasty=origin.dynasty;
      this.author=origin.author;
    },
  },

  created () {
    // let app = getApp()
  },

  mounted (){
    this.loadSentence()
  }
}
</script>

<style>

  .verse{
    /*display: flex;*/
    /*flex-direction: row;*/
    /*flex-wrap:wrap;*/
    /*align-content: center;*/
  }
  text{
    font-size: 20px;
    color: #eeeeee;
    font-family: "Microsoft YaHei UI" !important;
  }
  #content{
    align-self: center;
  }
  #origin{
    float: right;
    align-self: flex-end;
  }
</style>

