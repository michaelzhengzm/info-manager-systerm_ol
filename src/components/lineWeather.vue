<template>
  <div id="weatherChartLine"></div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入折线图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");
// 引入提示框和图例组件
require("echarts/lib/component/title");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/legend");

export default {
  props: {
    lineData: {
      type: Object,
      required: true,
      default() {
        return {
          xAxis: [],
          series1: [],
          series2: []
        };
      }
    }
  },
  mounted() {
    this.renderLine();
  },

  methods: {
    renderLine() {
      let myChart = echarts.init(document.getElementById("weatherChartLine"));
      var option = {
        title: {
          text: "未来15日气温变化",
          x: "center",
          textStyle: {
            color: "#666"
          }
        },
        grid: {
          top: "15%",
          left: "0",
          right: "5%",
          bottom: "15%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          top: 0,
          right: 20,
          feature: {
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          bottom: 0,
          data: ["最高气温", "最低气温"]
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.lineData.xAxis
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            smooth: true,
            data: this.lineData.series1,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}℃"
              }
            }
          },
          {
            name: "最低气温",
            type: "line",
            smooth: true,
            data: this.lineData.series2,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}℃"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
      //根据窗口的大小变动图表 --- 重点
      window.onresize = function() {
        myChart.resize();
      };
    }
  }
};
</script>
<style lang="scss">
#weatherChartLine {
  width: 100%;
  height: 75vh;
}
</style>
