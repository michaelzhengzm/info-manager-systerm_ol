<template>
  <div>
    <head-top></head-top>
    <div style="margin:30px">
      <span>请选择城市：</span>
      <el-select
        v-model="city_code"
        filterable
        placeholder="请选择城市"
        @change="initData"
        style="width:80px"
      >
        <el-option
          v-for="(item,index) in cityList"
          :label="item.city_name"
          :value="item.city_code"
          :key="index"
        ></el-option>
      </el-select>
      <el-row style="margin-top:20px">
        <el-button plain>气温：{{cityWeatherData.wendu}} ℃; 湿度：{{cityWeatherData.shidu}}</el-button>
        <el-button
          plain
        >PM25：{{cityWeatherData.pm25}}；空气质量：{{cityWeatherData.quality}}</el-button>
        <el-button plain type="success">温馨提示:{{cityWeatherData.ganmao}}</el-button>
      </el-row>
      <el-row style="margin-top:30px" v-if="flag">
        <line-weather :lineData="lineData"></line-weather>
      </el-row>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
import lineWeather from "../../components/lineWeather";
import cityList from "../../mock/citylist.json";
export default {
  data() {
    return {
      city_code: "101010100",
      flag: false,
      cityWeatherData: {},
      cityList: cityList,
      lineData: {
        xAxis: [],
        series1: [],
        series2: []
      }
    };
  },
  components: {
    headTop,
    lineWeather
  },
  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      this.flag = false;
      var url =
        "http://t.weather.sojson.com/api/weather/city/" + this.city_code;
      this.$axios
        .get(url)
        .then(res => {
          this.flag = true;
          if (res.status == 200) {
            let weatherData = res.data.data;
            this.cityWeatherData = weatherData;
            this.city_name = res.data.cityInfo.city;
            this.renderChart(weatherData.forecast);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    renderChart(data) {
      this.lineData.xAxis = [];
      this.lineData.series1 = [];
      this.lineData.series2 = [];
      data.forEach(item => {
        this.lineData.xAxis.push(item.date + "日");
        this.lineData.series1.push(item.high.match(/-|\d+/g).join("."));
        this.lineData.series2.push(item.low.match(/-|\d+/g).join("."));
      });
    }
  }
};
</script>
<style>
</style>
