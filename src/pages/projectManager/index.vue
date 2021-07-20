<template>
  <div>
    <div class="cardDiv" v-for='item in cardData' :key="item.id">
      <i-card
        :title="'主办方:'+item.name"
        :extra="item.status"
        @click="cardActive"
        :id="item.id">
        <view slot="content">{{ item.title }}</view>
        <view slot="footer">开始时间：{{ item.time }}</view>
      </i-card>
    </div>
    <div class="footer">
      <i-button type="primary" inline size="small" shape="round" @click="btnClick">+</i-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardData: [{title: "123",name:"公司", status: "进行", id: "1234", time: "2021/7/20"},
        {title: "456",name:"公司", status: "进行", id: "24235", time: "2021/7/20"},
        {title: "789",name:"公司", status: "进行", id: "25325", time: "2021/7/20"},
        {title: "101",name:"公司", status: "进行", id: "35345", time: "2021/7/20"}]
    }
  },
  methods: {
    cardActive(e) {
      console.log(e.mp.currentTarget.id)
    },
    btnClick(){
      mpvue.navigateTo({url: '/pages/projectAdd/main'})
    }
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

.cardDiv {
  margin-top: 20px;
}
</style>
