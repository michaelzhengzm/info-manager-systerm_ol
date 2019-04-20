<template>
  <div class="bg">
    <div class="login-content">
      <h3>个人信息管理系统</h3>
      <h3>Welcome to my information manager systerm!</h3>
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0">
        <el-form-item prop="userName">
          <el-input placeholder="请输入用户名" v-model="loginForm.userName" prefix-icon="el-icon-check"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-between">
            <el-checkbox v-model="isCheck" @change="rememberPassword">记住密码</el-checkbox>
            <el-button type="text" @click="forget">忘记密码?</el-button>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Login" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 粒子漂浮物 -->
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="star"
      :particleSize="10"
      linesColor="#fff"
      :linesWidth="3"
      :lineLinked="true"
      :lineOpacity="0.6"
      :linesDistance="100"
      :moveSpeed="5"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCheck: true,
      loginForm: {
        userName: localStorage.userName || "root",
        password: localStorage.password || "admin1234"
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    rememberPassword() {
      if (isCheck) {
        localStorage.userName = this.loginForm.userName;
        localStorage.password = this.loginForm.password;
      } else {
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
      }
    },
    forget() {
      this.$message.warning("请发送短信0000到138XXXXXXXX进行查询");
    },
    Login() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$axios({
            url: "login",
            method: "POST",
            data: {
              userName: this.loginForm.userName,
              password: this.loginForm.password
            }
          }).then(res => {
            localStorage.nickname = res.data.data.nickname;
            localStorage.userId = res.data.data.userId;
            localStorage.token = res.data.data.token;
            this.$router.push("/main");
            this.$message({
              message: "登录成功^_^",
              type: "success"
            });
          });
        } else {
          this.$message.error("用户名或密码错误");
          return false;
        }
      });
    },
  }
};
</script>
<style scoped lang="scss">
.bg {
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("./img/bg.jpg");
  background-size: 100%;
  #particles-js {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.login-content {
  width: 300px;
  border-radius: 5px;
  padding: 20px;
  z-index: 1;
  margin-left: 40%;
  //   background: rgba(255, 255, 255, 0.5);
  background: #fff;

  h3 {
    text-align: center;
    color: #000;
    margin-top: 0px;
    margin-bottom: 5px;
  }
  .el-form {
    margin-top: 25px;
    .el-form-item {
      margin-bottom: 25px !important;
    }
  }
  .login-button {
    width: 100%;
  }
}
</style>


