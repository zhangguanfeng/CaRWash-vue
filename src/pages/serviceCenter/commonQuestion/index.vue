<template>
  <div>
    <!-- 搜索部分 -->
    <el-card class="search_card" shadow="hover">
      <!-- 下半部分 -->
      <div class="search_card_top">
        <h2>{{$t('search_title')}}</h2>
      </div>
      <!-- 上半部分 -->
      <div class="search_card_bottom">
        <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable
          v-model="filter.search">
        </el-input>
        <el-button class="search" round @click="get_list">{{$t('search_zh')}}</el-button>
      </div>
    </el-card>

    <el-card class="container">
      <el-button type="primary" @click="dialogFormVisible = true">{{$t('FAQ').ask}}</el-button>
      <el-table :data="list_data.list" border style="width: 100%">
        <el-table-column prop="id" :label="$t('FAQ').id" min-width="1/9">
        </el-table-column>
        <el-table-column prop="create_time" :label="$t('FAQ').create_time" min-width="2/9">
        </el-table-column>
        <el-table-column prop="category" :label="$t('FAQ').category" min-width="1/9">
        </el-table-column>
        <el-table-column prop="title" :label="$t('FAQ').title" min-width="1/9">
        </el-table-column>
        <el-table-column prop="answer" :label="$t('FAQ').answer" min-width="2/9">
        </el-table-column>
        <el-table-column :label="$t('operation')" min-width="2/9">

          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
              <el-button size="mini" type="success" icon="el-icon-view"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
              <el-button size="mini" type="primary" icon="el-icon-edit-outline"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
              <el-button size="mini" type="danger" icon="el-icon-delete"
                @click="deleteContent(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 表单部分 -->
    <el-dialog :title="$t('FAQ').ask" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="rules">
        <el-form-item :label="$t('FAQ').category + '：'" prop="category">
          <el-input v-model="addForm.category"></el-input>
        </el-form-item>
        <el-form-item :label="$t('FAQ').title + '：'" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item :label="$t('FAQ').answer + '：'" prop="answer">
          <el-input type="textarea" rows="5" v-model="addForm.answer"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">{{$t('btnTip').add}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list, get_list } from "@/mixins";
import page from "@/components/page";
import { addFAQ, editFAQ, getFAQ, getFAQDetail, deleteFAQ } from '@/api/api';

export default {
  mixins: [mixin_pickerOptions, mixin_list(getFAQ)],
  created () {
    this.getData()
  },
  data () {
    return {
      filter: {
        search: ''
      },
      dialogFormVisible: false,
      addForm: {
        category: '',
        title: '',
        answer: ''
      },
      rules: {
        category: [
          {
            min: 2,
            message: '长度不少于两个字',
            trigger: 'change'
          }
        ],
        title: [
          {
            min: 2,
            message: '长度不少于两个字',
            trigger: 'blur'
          }
        ],
        answer: [
          {
            min: 2,
            message: '长度不少于两个字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
  },
  methods: {
    async getData () {
      const res = await getFAQ()
      console.log(res)
    },
    submitForm () {
      this.$refs['addForm'].validate(async (valid) => {
        var flag = 0
        Object.values(this.addForm).forEach(item => {
          if (item.length !== 0) {
            flag += 1
          }
        })
        if (valid & flag === 3) {
          var flag2 = true
          this.list_data.list.forEach(item => {
            if (item.title === this.addForm.title) {
              flag2 = false
            }
          })
          if (flag2) {
            var data = {
              category: this.addForm.category,
              title: this.addForm.title,
              answer: this.addForm.answer
            }
            const res = await addFAQ(data)
            const result = await getFAQ()
            this.list_data.list = result.list
            this.dialogFormVisible = false
          } else {
            this.$message({
              type: 'warning',
              message: '问题重复了'
            })
          }
        } else {
          this.$message('请正确填写信息')
          return false
        }
      })
    },
    deleteContent (row) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteFAQ(row.id)
        this.list_data.list.forEach((item, index) => {
          if (item.id === row.id) {
            this.list_data.list.splice(index, 1)
          }
        })
        this.$message({
          type: 'success',
          message: '成功删除'
        })
      }).catch(() => {
        this.$message('取消了删除')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 搜索部分
.search_card /deep/ {
  margin-bottom: 15px;
  .search_card_top {
    margin-bottom: 20px;
  }
  .search_card_bottom {
    height: 50px;
    width: 790px;
    display: flex;
    justify-content: space-between;
    .searchByName,
    .searchByShop {
      position: relative;
      width: 245px;
      input {
        height: 50px;
        padding: 0 8px 0 47px;
      }
      input:focus {
        border: 1.5px solid #545c64ac;
      }
    }
    .searchByName:before {
      content: "\e625";
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 30px;
      color: #545c64ac;
    }
    .searchByShop:before {
      content: "\e62f";
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 28px;
      color: #545c64ac;
    }
    .search {
      width: 100px;
      height: 45px;
      color: white;
      border-radius: 10px;
      background-color: #545c64ac;
      // border: none;
      transition: all 0.3s linear;
    }
    .search:hover {
      border: none;
      background-color: #545c6466;
      transition: all 0.3s linear;
    }
  }
}
.container /deep/ {
  // 表格部分
  .el-button {
    margin-bottom: 20px;
  }
  .el-table__header-wrapper {
    th {
      text-align: center;
    }
  }
  .el-table__body-wrapper {
    td {
      text-align: center;
    }
    td:last-child > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    td:last-child > div > button {
      margin: 0 0.5vw;
    }
    tr:nth-child(odd) {
      background-color: #e9eef3;
    }
  }
}
</style>