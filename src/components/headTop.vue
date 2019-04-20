<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">INFO首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-right:20px">
      <span>Welcome, {{userName}}！</span>
      <el-button type="text" @click="home">[回到首页]</el-button>
      <el-button type="text" @click="logout">[退出登录]</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: localStorage.nickname || ""
    };
  },
  methods: {
    home() {
      this.$router.push("/main");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "退出成功"
      });
    }
  }
};
</script>

<style lang="scss">
.header {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
</style>
