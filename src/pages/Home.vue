<template lang="pug">
#home
  div(style={textAlign: 'left'})
    h2
      | 世界杯大挑战
    p
      | 2018俄罗斯世界杯，东道主俄罗斯迎战夺冠热门德国，是否会有冷门爆出？
    h3
      | 挑战规则：
    li
      | 发起挑战者制定规则并存入自己的token
    li
      | 接受挑战者存入自己的token
    li
      | 挑战正式开始
    li
      | 双方挑战者可以拉自己的支持者前来下注
    li
      | 系统根据FIFA官方的比赛结果自动执行智能合约
    li
      | 获胜方依据自己的投注比例瓜分失败方的token


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
#rule
  text-align left
#chart
  width 100%
  height 150px
.post
  padding 40px
  width 60%
</style>
