<template>
  <div class="container">
      <versev1></versev1>
    <div class="ig">
      <joinmatch></joinmatch>
    </div>
  </div>
</template>

<script>
import versev1 from "../../components/versev1";
import joinmatch from "../../components/joinmatch";
export default {
  components: {
    versev1,joinmatch
  }
}
</script>


<style>
  .container{
    height: 100vh;
    background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.soutu123.com%2Fback_pic%2F18%2F09%2F09%2F872edc0b466cd8ed03e98b12bfee9138.jpg%21%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.soutu123.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616331969&t=6c997635b0ae4eff37dfa8988bb8d310");
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 300rpx 0;
    box-sizing: border-box;
  }
  /*.abs{*/
  /*  min-height: 20vh;*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*}*/
  .ig{
    position: absolute;
    top: 50%;
  }
</style>
