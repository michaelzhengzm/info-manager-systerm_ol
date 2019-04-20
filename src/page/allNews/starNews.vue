<template>
  <div>
    <head-top></head-top>
    <div class="article_content">
      <el-row v-for="(item,index) in articleList" :key="index" class="articles" scoped>
        <el-button type="text" @click="getContent(index)">{{index+1}}:{{item.title}}</el-button>
        <span
          style="padding-left:50px;font-size:12px"
        >[{{new Date(item.publishDate*1000).toLocaleString()}}]</span>
        <div class="content" v-show="index==isShow"></div>
      </el-row>
    </div>
  </div>
</template>

<script>
import headTop from "../../components/headTop";
export default {
  data() {
    return {
      isShow: -1,
      articleList: ""
    };
  },
  components: {
    headTop
  },
  created() {
    this.initData();
  },

  methods: {
    initData() {
      var myDate = new Date();
      // 获取当前时间的年月日后+8小时再转换为毫秒数，没想到其他好方法
      var dateStr =
        myDate.getFullYear() +
        "-" +
        (myDate.getMonth() + 1) +
        "-" +
        myDate.getDate();
      var achieveDate = new Date(dateStr).getTime() / 1000 + 8 * 3600;
      var beforeDate = achieveDate - 24 * 3600;
      var url =
        "/idataapi?KwPosition=3&catLabel1=娱乐&catLabel2=明星八卦&publishDateRange=" +
        beforeDate +
        "," +
        achieveDate +
        "&apikey=aEjzICcdIuqPjhorAFMqOOShisMMfpid6BDVtt9j8xODbNXovtHu1ZrR3C2b4ir7";
      this.$axios
        .get(process.env.API_HOST + url)
        .then(res => {
          if (res.status == 200) {
            this.articleList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getContent(index) {
      if (this.isShow == -1) {
        this.isShow = index;
      } else {
        this.isShow = -1;
      }
      for (var index in this.articleList) {
        document.getElementsByClassName("content")[
          index
        ].innerHTML = this.articleList[index].html;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.article_content {
  margin: 40px;
  height: 100%;
}
.articles {
  border: 1px solid #000;
  margin: 20px 0;
  h3,
  div {
    text-indent: 2em;
    line-height: 1.5em;
  }
}
</style>
