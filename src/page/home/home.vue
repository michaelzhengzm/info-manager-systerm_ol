<template>
  <div style="height:100%">
    <head-top></head-top>
    <div class="introduction">
      <i class="el-icon-edit"></i>
      <span class="introduction-title">基本介绍</span>
      <ol>
        <li v-for="(item,index) in introduction" :key="index">{{item}}</li>
      </ol>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/headTop";
export default {
  data() {
    return {
      introduction: [
        "登录页有粒子动态效果，采用VueParticles，各项参数设置可参看https://www.jianshu.com/p/53199b842d25；",
        "登录后的昵称是用mock数据做的，mock.js需要在main.js中导入；",
        "左侧导航栏是根据element-ui的导航写的，直接可用index跳转，顶部导航为ui的面包屑导航；",
        "天气预报采用的echarts，需要导入使用，样式应该可以更美观，此处只做了基础的改变，数据为网上找的一个接口，部分城市可能无数据；",
        "文本编辑vue-quill-editor需要在main.js中导入，仅在编辑页做了变化示例，后期可考虑传值到父组件，可插入图片；",
        "表格操作是根据某后台管理系统的网页仿写的，有增删改查等功能，选择管理员和一般用户按钮可以看到不同的菜单，使用watch监测数据变化；",
        "新闻资讯也是网上找的数据接口，设置自动获取时间改变接口的时间参数每天自动刷新，开发时设置proxyTable代理进行跨域；",
      ]
    };
  },
  components: {
    headTop
  }
};
</script>
<style lang='scss' scoped>
.introduction {
  padding: 20px 0 0 50px;
  background-color: #fff;
  .introduction-title {
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  ol {
    padding: 0 0 50px 30px;
    li {
      line-height: 30px;
    }
  }
}
</style>


