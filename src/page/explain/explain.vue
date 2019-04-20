<template>
  <div style="height:100%">
    <head-top></head-top>
    <div class="explain">
      <i class="el-icon-edit"></i>
      <span class="explain-title">基本介绍</span>
      <ol>
        <li v-for="(item,index) in explain" :key="index">{{item}}</li>
      </ol>
    </div>
    <div class="connect">
      <p>联系作者：</p>
      <p>手机：17771955800（微信同号）</p>
      <p>GitHub：https://github.com/michaelzhengzm</p>
    </div>
  </div>
</template>
<script>
import headTop from "../../components/headTop";
export default {
  data() {
    return {
      explain: [
        "这是自己学习vue后写的一个简单的网站；",
        "数据较少，暂未使用vuex数据管理，后面考虑用node.js+mongodb搭建数据管理后台，配合vuex进行数据管理；",
        "交互方式主要体现在数据操作栏目，基本需求的功能都有；",
        "还有较多未完善的地方：如登录页注册、手机登录、验证码、天气预报自动定位城市等；"
      ]
    };
  },
  components: {
    headTop
  }
};
</script>
<style lang='scss' scoped>
.explain {
  padding: 20px 0 0 50px;
  background-color: #fff;
  .explain-title {
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
.connect{
  padding-left: 55px
}
</style>


