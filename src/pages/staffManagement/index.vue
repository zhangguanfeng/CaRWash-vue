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
        <!-- <el-input :placeholder="$t('inputUsername')" class="searchByName" clearable
          v-model="filter.name">
        </el-input>
        <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable
          v-model="filter.shop">
        </el-input> -->
        <el-input :placeholder="$t('inputShop')" class="searchByShop" clearable
          v-model="filter.search">
        </el-input>
        <el-button class="search" round @click="get_list">{{$t('search_zh')}}</el-button>
      </div>
    </el-card>

    <el-card class="container">
      <!-- 添加管理员部分 -->
      <el-button type="primary" @click="staffFormFun('add')" class="addManager">
        {{$t('staff').addStaff}}
      </el-button>

      <!-- 表格部分 -->
      <el-table :data="list_data.list" border style="width: 100%" @selection-change="allSelect"
        @sort-change="sort_change">
        <el-table-column prop="id" sortable="custom" label="ID" width="130">
        </el-table-column>
        <el-table-column prop="name" :label="$t('username')" width="130">
        </el-table-column>
        <el-table-column prop="account" :label="$t('account')" width="130">
        </el-table-column>
        <el-table-column prop="phone" :label="$t('phone')" width="130">
        </el-table-column>
        <el-table-column prop="store.id" :label="$t('shopID')" width="130">
        </el-table-column>
        <el-table-column prop="store.name" :label="$t('shopName')" width="130">
        </el-table-column>
        <el-table-column :label="$t('operation')">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').check" placement="top">
              <el-button @click="staffFormFun('check',scope.row)" icon="el-icon-view" type="success"
                size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
              <el-button @click="staffFormFun('edit',scope.row)" icon="el-icon-edit-outline"
                type="primary" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
              <el-button @click="remove(scope.row)" icon="el-icon-delete" type="danger" size="mini">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 表单 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="staffForm" :model="staffForm" label-width="90px" label-position="left"
        style="padding-left:30px;">
        <el-form-item :label="$t('username') + '：'">
          <el-col :span="5">
            <el-input v-if="title !== '关闭'" v-model="staffForm.name"
              :placeholder="$t('inputUserID') + '：'"></el-input>
            <span v-else :disabled="true">{{staffForm.name}}</span>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('account') + '：'">
          <el-col :span="8">
            <el-input v-if="title !== '关闭'" v-model="staffForm.account" autocomplete="off"
              :placeholder="$t('inputAccount')"></el-input>
            <span v-else :disabled="true">{{staffForm.account}}</span>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('password') + '：'">
          <el-col :span="8">
            <el-input v-if="title !== '关闭'" show-password v-model="staffForm.password"
              :placeholder="$t('inputPassword')">
            </el-input>
            <span v-else show-password :disabled="true">{{list_data.list.password}}</span>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('phone') + '：'">
          <el-col :span="8">
            <el-input v-if="title !== '关闭'" v-model="staffForm.phone"
              :placeholder="$t('inputPhoneNum')"></el-input>
            <span v-else :disabled="true">{{staffForm.phone}}</span>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('managerList.auth') + '：'">
          <el-col :span="8">
            <span :disabled="true">{{staffForm.auth}}</span>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('shop') + '：'">
          <el-col :span="10">
            <el-select v-if="title !== '关闭'" v-model="staffForm.store"
              :placeholder="$t('choiceShop')">
              <el-option v-for="item in storeList" :key="item.id" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
            <span v-else :disabled="true">{{staffForm.store}}</span>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button @click="done(title)" type="primary" style="margin-left:30px;">{{title}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list, get_list } from "@/mixins";
import page from "@/components/page";
import { getStaff, getStaffDetail, deleteStaff, editStaff, addStaff, getStore } from '@/api/api';

export default {
  mixins: [mixin_pickerOptions, mixin_list(getStaff)],
  data () {
    return {
      filter: {
        // name: '',
        // shop: '',
        search: '',
        // order: '-id'
      },
      tableData: [],
      // 是否显示添加表单
      dialogFormVisible: false,
      // 添加表单信息
      staffForm: {
        password: '',
        account: '',
        name: '',
        phone: '',
        store: '',
        auth: '1',
        id: ''
      },
      which: '',
      storeList: '',
      idToEdit: '',
      storeIDToEdit: ''
    }
  },
  computed: {
    title () {
      switch (this.which) {
        case 'add':
          return this.$t('btnTip').add;
        case 'check':
          return this.$t('btnTip').close;
        case 'edit':
          return this.$t('btnTip').edit;
      }
    }
  },
  methods: {
    async staffFormFun (type, row) {
      this.dialogFormVisible = true
      this.which = type
      const res = await getStore()
      this.storeList = res.list
      if (row) {
        this.idToEdit = row.id
        this.storeIDToEdit = row.store.id
        this.staffForm = {
          password: '',
          account: row.account,
          name: row.name,
          phone: row.phone,
          store: row.store.name,
          auth: '1',
          id: row.id
        }
      } else {
        this.staffFrom = {
          password: '',
          account: '',
          name: '',
          phone: '',
          store: '',
          auth: '1'
        }
      }
    },
    remove (row) {
      this.$confirm('是否删除' + row.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteStaff(row.id)
        this.list_data.list.forEach((item, index) => {
          if (row.id === item.id) {
            this.list_data.list.splice(index, 1)
          }
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    async done (title) {
      var flag = false
      var arr = Object.values(this.staffForm)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].length !== 0) {
          flag = true
        }
        else {
          flag = false
          break
        }
      }
      if (flag) {
        switch (title) {
          case '添加':
            await addStaff(this.staffForm)
            const res1 = await getStaff()
            this.list_data.list = res1.list
            this.dialogFormVisible = false
            break;
          case '编辑':
            var data = {
              id: this.idToEdit,
              name: this.staffForm.name,
              account: this.staffForm.account,
              password: this.staffForm.password,
              phone: this.staffForm.phone,
              store: this.staffForm.store
            }
            await editStaff(data)
            this.list_data.list.forEach((item, index) => {
              if (item.id === this.staffForm.id) {
                var name = ''
                this.storeList.forEach((item, index) => {
                  if (item.id === this.staffForm.store) {
                    name = item.name
                  }
                })
                item.name = this.staffForm.name,
                  item.account = this.staffForm.account,
                  item.password = this.staffForm.password,
                  item.phone = this.staffForm.phone,
                  item.store.id = this.staffForm.store,
                  item.store.name = name
              }
            })
            this.dialogFormVisible = false
            break;
          case '关闭':
            break;
        }
        switch (this.which) {
          case 'add':
            return
          case 'check':
            return
          case 'edit':
            return
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请完善表单内容'
        })
      }
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
  // 添加管理员部分
  .addManager {
    margin-bottom: 15px;
  }
  // 表格部分
  .el-table__header-wrapper {
    th {
      text-align: center;
    }
  }
  .el-table__body-wrapper {
    td {
      text-align: center;
    }
    tr:nth-child(odd) {
      background-color: #e9eef3;
    }
  }
  // 添加表单部分
}
</style>