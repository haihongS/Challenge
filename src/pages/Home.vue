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
      | 支持俄罗斯
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
      wallet: new Wallet(this),
      chart: null,
      price1: 1,
      price2: 1,
    };
  },
  methods: {
    buy(selection) {
      const betValue = Number(prompt("请输入下注金额(ETH)"));
      if (isNaN(betValue) || betValue <= 0) {
        alert("请输入有效押注金额");
        return;
      }
      const fun = this.wallet.contract.addBet;
      const prop = selection === 1 ? 1 : 0;
      fun(prop, {
        value: betValue * 1000000000000000000,
        gas: 220000,
        gasPrice: 1000000000 * 100,
      }, (error, result) => {
        if (!error) {
          this.$message({
            type: 'info',
            message: `已发送 ${result}`,
          });
        } else {
          this.$message({
            type: 'error',
            message: error,
          });
        }
      });
    },
    setChart(price1, price2) {
      this.chart.setOption({
        legend: {
          data: ['支持德国', '支持俄罗斯'],
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
                formatter: value => `${Math.abs(value.data) / 1000000000000000000} ETH`,
              },
            },
            data: [-price1],
          },
          {
            name: '支持俄罗斯',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                formatter: value => `${Math.abs(value.data) / 1000000000000000000} ETH`,
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
    //this.setChart(1, 1);
    this.wallet.contract.queryRedBalance((error, result) => {
      if (error) {
        this.$message({
          type: 'error',
          message: error,
        });
      } else {
        this.price1 = Number(result);
        this.setChart(this.price1, this.price2);
      }
    });
    this.wallet.contract.queryBlueBalance((error, result) => {
      if (error) {
        this.$message({
          type: 'error',
          message: error,
        });
      } else {
        this.price2 = Number(result);
        this.setChart(this.price1, this.price2);
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
#home
  text-align center
#chart
  width 100%
  height 100px
.post
  padding 40px
  width 60%
</style>
