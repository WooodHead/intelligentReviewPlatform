<template>
  <div>
    <div v-show="show">
      <van-dropdown-menu >
        <van-dropdown-item :value="value1" :options="option1" @change="onChange"/>
      </van-dropdown-menu>
    </div>
    <div class="table">
      <div class="tr bg-w">
        <div class="th">名次</div>
        <div class="th">选手</div>
        <div class="th">得分</div>
      </div>
      <div v-for='(item,index) in listData' :key="index">
        <div class="tr bg-g" v-if="index % 2 === 0">
          <div class="td">{{ index + 1 }}</div>
          <div class="td">{{ item.name }}</div>
          <div class="td">{{ item.score }}</div>
        </div>
        <div class="tr" v-else>
          <div class="td">{{ index + 1 }}</div>
          <div class="td">{{ item.name }}</div>
          <div class="td">{{ item.score }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      code: '',
      type: '',
      listData: '',
      show: false,
      value1: '',
      option1: [],
      res2:[]
    }
  },
  methods: {
    mergeData(arr) {
      let result = [];
      arr.forEach(v => {
        let cindex = result.findIndex(e => e.id === v.projectID);
        if (cindex === -1) {
          result.push({
            id: v.projectID,
            name: v.playerName,
            score: [v.score]
          })
        } else {
          // (!result[cindex]['score'].includes(v.score)) && result[cindex]['score'].push(v.score);
          result[cindex]['score'].push(v.score)
        }
      });
      return result;
    },
    compare(obj1, obj2) {
      var val1 = obj1.score;
      var val2 = obj2.score;
      if (val1 > val2) {
        return -1;
      } else if (val1 < val2) {
        return 1;
      } else {
        return 0;
      }
    },
    compare2(x, y) {//比较函数
      if (x < y) {
        return -1;
      } else if (x > y) {
        return 1;
      } else {
        return 0;
      }
    },
    mergeData2(arr) {
      let result = [];
      function sum(arr) {
        return arr.reduce(function(prev, curr, idx, arr){
          return prev + curr;
        });
      }
      arr.forEach(v => {
        let cindex = result.findIndex(e => e.id === v.projectID && e.ruleID === v.ruleID);
        if (cindex === -1) {
          result.push({
            id: v.projectID,
            name: v.playerName,
            score: [parseInt(v.score)],
            ruleID: v.ruleID,
            ruleName: v.ruleName
          })
        } else {
          // (!result[cindex]['score'].includes(v.score)) && result[cindex]['score'].push(v.score);
          result[cindex]['score'].push(parseInt(v.score))
          result[cindex]['score'] = sum(result[cindex]['score'])
        }
      });

      function compare(obj1, obj2) {
        var val1 = obj1.ruleID;
        var val2 = obj2.ruleID;
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }

      result.sort(compare)
      return result;
    },
    getOptions(arr) {
      let result = [];
      arr.forEach(v => {
        let cindex = result.findIndex(e => e.value === v.ruleID);
        if (cindex === -1) {
          result.push({
            text: v.ruleName,
            value: v.ruleID
          })
        }
      });
      return result;
    },
    getRuleScore(arr, value) {
      let tempArr = []
      arr.forEach(function (item) {
        if (item.ruleID === value) {
          tempArr.push(item)
        }
      })
      return tempArr
    },
    onChange(e){
      console.log(e)
      let result = this.getRuleScore(this.res2, e.mp.detail)
      result.sort(this.compare)
      this.listData=result
    }
  },
  async onLoad() {
    let code = this.$root.$mp.query.code
    let type = this.$root.$mp.query.type
    this.code = code
    this.type = type
    let res = await this.$score.getMatchScore(code)
    let res2 = await this.$score.getMatchScoreT(code)
    res = this.mergeData(res)
    // console.log("type",type)
    try{
      res2 = this.mergeData2(res2)
      this.res2 = res2
    }catch (e) {
      console.error(e)
    }
    // console.log(res2)
    switch (type) {
      case '1':
        this.show=false
        let newArr = []
        try {
          res.forEach(function (item) {
            // console.log(item)
            let tempObj = {}
            tempObj.name = item.name
            let tempNum = 0
            for (let index in item.score) {
              tempNum += parseInt(item.score[index])
            }
            tempNum = tempNum / item.score.length
            tempObj.score = tempNum
            newArr.push(tempObj)
          })
          // console.log(newArr)
          this.listData = newArr.sort(this.compare)
        } catch (e) {
          console.error(e)
        }
        break;
      case '2':
        let newArr2 = []
        this.show=false

      function compare2(x, y) {//比较函数
        if (x < y) {
          return -1;
        } else if (x > y) {
          return 1;
        } else {
          return 0;
        }
      }

        try {
          res.forEach(function (item) {
            // console.log(item)
            let tempObj = {}
            tempObj.name = item.name
            let tempNum = 0
            for (let index in item.score) {
              item.score[index] = parseInt(item.score[index])
            }
            // console.log(typeof item.score)
            item.score.sort(compare2)
            item.score.pop();
            item.score.shift()
            for (let index in item.score) {
              tempNum += item.score[index]
              // console.log("tempNUm", tempNum)
            }
            // console.log(item.score)
            tempNum = tempNum / item.score.length
            // console.log("length", item.score.length)
            tempObj.score = tempNum
            newArr2.push(tempObj)
          })
          // console.log(newArr2)
          this.listData = newArr2.sort(this.compare)
        } catch (e) {
          console.error(e)
        }
        break;
      case '3':
        // console.log("3")
        try{
          let options = this.getOptions(res2)
          console.log(res2)
          this.option1 = options
          // console.log(options)
          this.value1 = options[0].value
          let result = this.getRuleScore(res2, this.value1)
          result.sort(this.compare)
          this.listData=result
          this.show = true
        }catch (e) {
          console.error(e)
        }
        break;
      case '4':
        let newArr4 = []
        this.show=false
        try {
          res.forEach(function (item) {
            // console.log(item)
            let tempObj = {}
            tempObj.name = item.name
            let tempNum = 0
            for (let index in item.score) {
              tempNum += parseInt(item.score[index])
            }
            tempObj.score = tempNum
            newArr4.push(tempObj)
          })
          // console.log(newArr4)
          this.listData = newArr4.sort(this.compare)
        } catch (e) {
          console.error(e)
        }
        break;
    }
  }
}
</script>

<style scoped>
.table {
  border: 0px solid darkgray;
}

.tr {
  display: flex;
  width: 100%;
  justify-content: center;
  height: 1rem;
  align-items: center;
}

.td {
  width: 40%;
  justify-content: center;
  text-align: center;
}

.bg-w {
  background: snow;
}

.bg-g {
  background: #E6F3F9;
}

.th {
  width: 40%;
  justify-content: center;
  background: #3366FF;
  color: #fff;
  display: flex;
  height: 1rem;
  align-items: center;
}
</style>
