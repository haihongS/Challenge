<template lang="pug">
#home
  h2
    | 世界杯大挑战
  p
    | 2018俄罗斯世界杯，法国队客场挑战巨头德国队，是否会有冷门爆出？
  h3
    | 挑战规则：
  p
    | 法国队支持者可向挑战合约申请创建一枚 ERC721 Token，存入指定数目的 Ether 并指定德国队作为被挑战者、并指定一名中立的见证者。 被挑战方如果认可这名见证者，则向挑战合约调用 Accept() 函数并打入符合要求的 Ether 宣告正式接受挑战。双方的支持者可以在挑战开始之后，分别向双方的支持者发起赞助，每次赞助将会溢价 20%，当有后续的支持者继续赞助时，则可以获得本金和回报。当挑战结束时，将由见证者指定挑战的获胜方，获胜方和他最后一名支持者，将根据自己投入的金额，瓜分失败方存入合约的 Ether。

  #chart(ref="chart")
  .actions
    el-button(type="danger", @click="buy(1)")
      | 支持德国
    el-button(type="primary", @click="buy(2)")
      | 支持法国
    el-button(type="addOne")
      | 我也要发起赌局
  img.post(src="/static/post.jpg")
</template>

<script>
import echarts from 'echarts';
import Wallet from '@/utils/wallet';

export default {
  name: 'Home',
  data() {
    return {
      // wallet: new Wallet(this),
      chart: null,
      price1: 1,
      price2: 1,
    };
  },
  methods: {
    buy(selection) {
      const price = Number(prompt("请输入下注金额(ETH)"));
      if (isNaN(price) || price < 0) {
        alert("请输入有效押注金额");
        return;
      }
      if (selection === 1) {
        this.price1 += price;
      } else {
        this.price2 += price;
      }
      this.setChart(this.price1, this.price2);
      // alert(price)
      // const fun = selection === 1 ? this.wallet.contract.buy1 : this.wallet.contract.buy2;
      // const price = selection === 1 ? this.price1 : this.price2;
      // fun(0, {
      //   value: price,
      //   gas: 220000,
      //   gasPrice: 1000000000 * 100,
      // }, (error, result) => {
      //   if (!error) {
      //     this.$message({
      //       type: 'info',
      //       message: `已发送 ${result}`,
      //     });
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: error,
      //     });
      //   }
      // });
    },
    setChart(price1, price2) {
      this.chart.setOption({
        legend: {
          data: ['支持德国', '支持法国'],
          show: false,
        },
        xAxis: {
          type: 'value',
          position: 'top',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: ['default'],
        },
        series: [
          {
            name: '支持德国',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideLeft',
                formatter: value => `${Math.abs(value.data)} ETH`,
              },
            },
            data: [-price1],
          },
          {
            name: '支持法国',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                formatter: value => `${Math.abs(value.data)} ETH`,
              },
            },
            data: [price2],
          },
        ],
      });
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.setChart(this.price1, this.price2);
    // this.wallet.contract.allOf(0, (error, result) => {
    //   if (error) {
    //     this.$message({
    //       type: 'error',
    //       message: error,
    //     });
    //   } else {
    //     this.price1 = Number(result[2]);
    //     this.price2 = Number(result[3]);
    //     this.setChart(this.price1, this.price2);
    //   }
    // });
  },
};
</script>

<style lang="stylus" scoped>
#home
  text-align center
#chart
  width 100%
  height 150px
.post
  padding 40px
  width 60%
</style>
