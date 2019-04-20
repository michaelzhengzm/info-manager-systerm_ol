<template>
  <div class="container">
    <el-row style="height: 100%;">
      <el-col :span="3" style="min-height: 100%;background-color: #3f4d67; ">
        <el-menu
          :default-active="$route.path"
          background-color="#3f4d67"
          text-color="#fff"
          :unique-opened="true"
          router
        >
          <el-menu-item index="main">
            <i class="el-icon-menu"></i>INFO MANAGER
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-rank"></i>天气预报
            </template>
            <el-menu-item index="weather">实时天气</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>数据管理
            </template>
            <el-menu-item index="tableOperation">表格操作</el-menu-item>
            <el-menu-item index="quillEditor">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>新闻资讯
            </template>
            <el-menu-item index="starNews">明星八卦</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-warning"></i>说明
            </template>
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="21" style="height:100%;overflow:auto;background-color:#fff">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
}

.el-submenu .el-menu-item {
  text-indent: 10px;
  min-width: 100%;
  background-color: #20333c !important;
}

.el-menu {
  border-right: none!important;
  i{
  color: #fff;
  }
}
</style>
