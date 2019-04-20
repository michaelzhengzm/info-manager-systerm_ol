

<template>
  <el-container>
    <head-top></head-top>
    <el-header>定级备案与符合性测评</el-header>
    <el-main>
      <section class="searchForm">
        <el-row class="searchTop">
          <el-col :span="2">查询条件</el-col>
          <el-col :span="4" :offset="17">
            <el-button icon="el-icon-caret-bottom" size="mini" plain @click="toggle()">展开</el-button>
            <el-button icon="el-icon-refresh" size="mini" plain @click="resetForm('searchForm')">重置</el-button>
          </el-col>
        </el-row>
        <el-form
          :model="searchForm"
          label-width="80px"
          ref="searchForm"
          id="searchCondition"
          v-show="isShow"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="业务系统:" prop="busiSystem">
                <el-input v-model="searchForm.busiSystem" placeholder="请输入关键字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="所属部门:" prop="depName">
                <el-select v-model="searchForm.depName" placeholder="请选择">
                  <el-option label="企业信息化" value="企业信息化"></el-option>
                  <el-option label="业务部门" value="业务部门"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="所属专业:" prop="majorName">
                <el-select v-model="searchForm.majorName" placeholder="请选择">
                  <el-option label="行政平台" value="行政平台"></el-option>
                  <el-option label="业务平台" value="业务平台"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="系统类型:" prop="systemType">
                <el-input v-model="searchForm.systemType" placeholder="请输入系统类型"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="上传状态:" prop="status">
                <el-select v-model="searchForm.status" placeholder="请选择">
                  <el-option label="已上传" value="已上传"></el-option>
                  <el-option label="未上传" value="未上传"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <el-row class="tableArea">
        <el-row class="tableTop">
          <el-col :span="2" :offset="16">
            <el-button icon="el-icon-search" size="small" plain @click="search(searchForm)">查询</el-button>
          </el-col>
          <el-col :span="4">
            <el-radio v-model="userId" label="1">管理员</el-radio>
            <el-radio v-model="userId" label="2">一般用户</el-radio>
          </el-col>
          <el-col :span="2">
            <el-button icon="el-icon-plus" size="small" plain @click="add()" v-show="userId==2">新增</el-button>
          </el-col>
        </el-row>
        <el-table
          tooltip-effect="light"
          height="500"
          stripe
          style="width: 100%"
          :data="results"
          border
          class="table"
          :header-cell-style="{background:'#edf0f5'}"
        >
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="busiSystem" label="业务系统名称" width="200"></el-table-column>
          <el-table-column prop="companyName" label="所属单位"></el-table-column>
          <el-table-column prop="gradeName" label="定级备案名称" width="150"></el-table-column>
          <el-table-column prop="depName" label="所属部门"></el-table-column>
          <el-table-column prop="majorName" label="所属专业"></el-table-column>
          <el-table-column prop="systemType" label="系统类型"></el-table-column>
          <el-table-column prop="gradeLevel" label="定级等级"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <i class="el-icon-search" @click="edit(scope)">编辑</i>
              <i class="el-icon-delete" @click="del(scope.$index)" v-show="userId==1">删除</i>
              <i
                class="el-icon-upload"
                @click="upp()"
                v-show="scope.row.status=='未上传'&&userId==2"
              >上传</i>
              <i
                class="el-icon-check"
                @click="handel(scope)"
                v-show="scope.row.status=='未上传'&&userId==2"
              >提交</i>
              <i
                class="el-icon-upload2"
                @click="send(scope)"
                v-show="scope.row.status=='已上传'&&userId==1&&scope.row.count==1"
              >派发</i>
              <i
                class="el-icon-upload2"
                @click="reSend()"
                v-show="scope.row.status=='已上传'&&userId==1&&scope.row.count!=1"
              >再派发</i>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>

    <!-- 编辑、新增对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="60%" title="定级备案信息">
      <el-form :model="dialogForm" ref="dialogForm" :rules="rules" label-width="120px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="业务系统名称" prop="busiSystem">
              <el-input v-model.trim="dialogForm.busiSystem"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属单位" prop="companyName">
              <el-input v-model.trim="dialogForm.companyName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="定级备案名称" prop="gradeName">
              <el-input v-model.trim="dialogForm.gradeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="depName">
              <el-input v-model.trim="dialogForm.depName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属专业" prop="majorName">
              <el-input v-model.trim="dialogForm.majorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="系统类型" prop="systemType">
              <el-input v-model.trim="dialogForm.systemType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="定级等级" prop="gradeLevel">
              <el-input v-model.trim="dialogForm.gradeLevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-input v-model.trim="dialogForm.status" disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <template>
          <el-button id="modify" type="primary" @click="modify()" size="small">保存</el-button>
          <el-button @click="dialogVisible =false" type="primary" size="small">关闭</el-button>
        </template>
      </span>
    </el-dialog>
    <!-- 上传文件对话框 -->
    <el-dialog :visible.sync="uppVisible" title="请上传文件" width="80%" center>
      <el-row class="uppload_item">
        <el-col :span="2" :offset="5">定级备案</el-col>
        <el-col :span="2" :offset="10">符合性测评</el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="2">
          <el-upload
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="2"
            :before-upload="beforeAvatarUpload"
            accept=".doc, .xls, .pdf"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">上传文件只能是.xls格式，且不超过3MB</div>
          </el-upload>
          <el-button type="text" @click="download()">
            <span>文件示例1.xls</span>
          </el-button>
        </el-col>
        <el-col :span="8" :offset="4">
          <el-upload
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="2"
            :before-upload="beforeAvatarUpload"
            accept=".doc, .xls, .pdf"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">上传文件只能是.xls格式，且不超过3MB</div>
          </el-upload>
          <el-button type="text" @click="download()">
            <span>文件示例2.xls</span>
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="1" :offset="2">
          <h4>备注</h4>
        </el-col>
        <el-col :span="16">
          <el-input type="textarea"></el-input>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <template>
          <el-button @click="uppVisible=false">取消</el-button>
          <el-button @click="uppLoad(scope)">确定上传</el-button>
        </template>
      </span>
    </el-dialog>

    <!-- 派发对话框 -->
    <el-dialog :visible.sync="sendVisible">
      <el-steps :active="active" finish-status="success">
        <el-step title="提交"></el-step>
        <el-step title="审查"></el-step>
        <el-step title="审核"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="next()">提交</el-button>
    </el-dialog>
  </el-container>
</template>

<script>
import headTop from "../../components/headTop";
export default {
  data() {
    return {
      userId: "1",
      businessSystem: [],
      dialogVisible: false,
      uppVisible: false,
      sendVisible: false,
      active: 0,
      isShow: true,
      rules: {
        busiSystem: [
          { required: true, message: "请输入系统名称", tigger: "blur" },
          {
            pattern: /[\u4e00-\u9fa5a-zA-Z]/,
            message: "只能为汉字或英文"
          }
        ],
        gradeName: [
          { required: true, message: "请输入定级备案名称", tigger: "blur" },
          {
            pattern: /[\u4e00-\u9fa5a-zA-Z]/,
            message: "只能为汉字或英文"
          }
        ],
        gradeLevel: [
          { required: true, message: "请输入评级等级", tigger: "blur" },
          { min: 1, max: 5, message: "请输入评级等级，1-5之间" },
          { pattern: /[0-9]/, message: "只能为数字" }
        ]
      },
      tableData: [
        {
          busiSystem: "中国电信山东省省公司辅助系统1",
          companyName: "省公司",
          gradeName: "一级备案",
          depName: "企业信息化",
          majorName: "行政平台",
          systemType: "电信自用系统",
          gradeLevel: "1",
          status: "未上传",
          count: "1"
        },
        {
          busiSystem: "中国电信山东省省公司辅助系统2",
          companyName: "省公司",
          gradeName: "二级备案",
          depName: "业务部门",
          majorName: "业务平台",
          systemType: "电信自用系统",
          gradeLevel: "2",
          status: "已上传",
          count: "1"
        },
        {
          busiSystem: "中国电信山东省省公司主系统1",
          companyName: "省公司",
          gradeName: "三级备案",
          depName: "企业信息化",
          majorName: "业务平台",
          systemType: "电信自用系统",
          gradeLevel: "3",
          status: "未上传",
          count: "1"
        },
        {
          busiSystem: "中国电信山东省省公司主系统2",
          companyName: "省公司",
          gradeName: "三级备案",
          depName: "企业信息化",
          majorName: "业务平台",
          systemType: "电信公用系统",
          gradeLevel: "3",
          status: "已上传",
          count: "2"
        }
      ],
      dialogForm: {},
      searchForm: {
        busiSystem: "",
        depName: "",
        majorName: "",
        chargePerson: "",
        status: ""
      },
      results: []
    };
  },
  components: {
    headTop
  },
  created() {
    this.results = this.list;
  },
  watch: {
    list(val) {
      this.results = this.list;
    }
  },
  computed: {
    list: function() {
      if (this.userId == 1) {
        return this.tableData;
      } else {
        return this.tableData.filter(item => item.status == "未上传");
      }
    }
  },

  methods: {
    search(searchForm) {
      this.results = this.list.filter(item => {
        let MatchBusiness = true;
        let MatchDep = true;
        let MatchMajor = true;
        let MatchSystemType = true;
        let MatchStatus = true;

        if (searchForm.depName) {
          MatchDep = item.depName == searchForm.depName;
        }
        if (searchForm.majorName) {
          MatchMajor = item.majorName == searchForm.majorName;
        }
        if (searchForm.status) {
          MatchStatus = item.status == searchForm.status;
        }

        if (searchForm.busiSystem) {
          // 模糊搜索;
          let key = searchForm.busiSystem.trim();
          MatchBusiness = item.busiSystem.indexOf(key.trim()) != -1;
        }
        if (searchForm.systemType) {
          // 模糊搜索;
          let key = searchForm.systemType.trim();
          MatchSystemType = item.systemType.indexOf(key.trim()) != -1;
        }
        return (
          MatchBusiness &&
          MatchDep &&
          MatchMajor &&
          MatchSystemType &&
          MatchStatus
        );
      });
    },

    toggle() {
      if (this.isShow) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.results = this.list;
    },
    add() {
      this.dialogVisible = true;
      this.dialogForm = {};
      this.dialogForm.status = "未上传";
    },
    //查看数据
    edit({ row }) {
      this.dialogVisible = true;
      this.dialogForm = JSON.parse(JSON.stringify(row));
    },
    getUser(name) {
      let index = -1;
      let isFlag = this.results.some((item, i) => {
        index = i;
        return item.busiSystem === name;
      });
      return { index, isFlag };
    },
    modify() {
      let data = this.dialogForm;
      let { index, isFlag } = this.getUser(data.busiSystem);
      this.$refs["dialogForm"].validate(validate => {
        if (validate) {
          if (isFlag) {
            this.$confirm("确认保存数据吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.dialogVisible = false;
              this.tableData.splice(index, 1, data);
              this.$message({
                type: "success",
                message: "修改成功!"
              });
            });
          } else {
            this.dialogVisible = false;
            this.tableData.push(data);
          }
        }
      });
    },
    //查看数据
    del(i) {
      this.$confirm("确认删除数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.tableData.splice(i, 1);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    upp() {
      this.uppVisible = true;
    },
    handel({ row }) {
      row.status = "已上传";
      row.count = "1";
      this.$message({
        type: "success",
        message: "提交成功..."
      });
    },
    send({ row }) {
      row.count = "2";
      this.$message({
        type: "success",
        message: "派发成功..."
      });
    },
    reSend() {
      this.sendVisible = true;
    },
    next() {
      if (this.active++ > 2) this.sendVisible = false;
    },
    uppLoad() {
      this.uppVisible = false;
      this.$message({
        type: "success",
        message: "上传成功..."
      });
    },
    download() {
      this.$message({
        type: "success",
        message: "下载中..."
      });
    },
    beforeAvatarUpload(file) {
      // const isDOC = file.type === "doc";
      // const isXLS = file.type === "xls";
      // const isPDF = file.type === "pdf";
      const isLt3M = file.size / 1024 / 1024 < 3;

      const regx = /(xls|doc|pdf)$/;
      if (!regx.test(file.name)) {
        this.$message.error("上传文件只能是.doc/.xls/.pdf格式!");
      }

      // if (!isJPG && !isXLS && !isPDF) {
      //     this.$message.error("上传文件只能是.doc/.xls/.pdf格式!");
      // }
      if (!isLt3M) {
        this.$message.error("上传文件大小不能超过 3MB!");
      }
      return regx && isLt3M;
    }
  }
};
</script>


    <style>
body {
  padding: 0;
  margin: 0;
}

.el-header {
  border: 1px solid #ebeef5;
  padding-top: 15px;
}

.searchTop {
  border: 1px solid #ebeef5;
  background-color: #f5f5f5;
}

.searchTop .el-col {
  margin-top: 15px;
  margin-bottom: 10px;
}

.searchTop .el-col:first-of-type {
  margin-left: 20px;
}

#searchCondition {
  border: 1px solid #ebeef5;
  padding: 20px;
}

.tableArea {
  margin-top: 20px;
}

.tableTop {
  border: 1px solid #ebeef5;
  padding: 10px 0;
}

.table i {
  cursor: pointer;
}

.uppload_item {
  margin-bottom: 5px;
  font-size: 16px;
}
</style>