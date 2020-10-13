<template>
  <div>
    <!-- 搜索部分 -->
    <!-- <el-card class="search_card" shadow="hover">
      <el-row type="flex" :gutter="20" align="middle">
        <el-col :xs="12" :sm="10" :md="8" :lg="5">
          <el-input
            :placeholder="$t('search')"
            class="searchByName"
            clearable
            v-model="filter.search"
          ></el-input>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6">
          <el-button @click="get_list" type="primary">{{$t('search_zh')}}</el-button>
        </el-col>
      </el-row>
    </el-card> -->
    <el-card class="container" shadow="hover">
       <el-button
        type="primary"
        @click="areaFormFun('add')"
        class="addArea"
      >{{$t('serviceArea').addArea}}</el-button>
      <my-table
        :columns="columns"
        :data="list_data.list"
        :showIndex="false"
        :showSelection="false"
        :cellStyle="{padding: '6px 0'}"
        :headerCellStyle="{background:'rgba(51, 55, 68)',color:'#fff'}"
        @emitSelection="allSelect"
        @sortChange="sort_change"
      >
        <template v-slot:areaSecond="slotProps">
            <div v-if="slotProps.callback.row.children.length===0"></div>
            <div v-else>
                <div v-for="(item,index) in slotProps.callback.row.children" :key="index">{{item.name}}</div>
            </div>
        </template>
        <template v-slot:operation="slotProps">
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').edit" placement="top">
            <el-button
              @click="areaFormFun('edit',slotProps.callback.index)"
              icon="el-icon-edit-outline"
              type="primary"
              size="mini"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="$t('btnTip').delete" placement="top">
            <el-button
              @click="remove(slotProps.callback.row.id)"
              icon="el-icon-delete"
              type="danger"
              size="mini"
            ></el-button>
          </el-tooltip>
        </template>
      </my-table>
    </el-card>
    <!-- 添加表单 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="500px">
      <form-page
        :ref-obj.sync="formInfo.ref"
        :data="formInfo.data"
        :field-list="formInfo.fieldList"
        :rules="formInfo.rules"
        :label-width="formInfo.labelWidth"
        :list-type-info="listTypeInfo"
        :disabled="formInfo.disabled"
      >
        <template v-slot:form-item-children>
            <el-tag
            :key="index"
            v-for="(tag,index) in selectData.children"
            closable
            :disable-transitions="false"
            @close="remove(tag.id)">
            {{tag.name}}
            </el-tag>
            <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(selectData.id)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">{{$t('serviceList').addSecondCategory}}</el-button>
        </template>
      </form-page>
      <span slot="footer" class="dialog-footer">
        <el-button @click="done()" type="primary" style="margin-left:30px;">{{title}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin_pickerOptions, mixin_list } from "@/mixins"
import myTable from '@/components/Table'
import FormPage from '@/components/FormPage'
import { getServiceArea, editServiceArea, addServiceArea, deleteServiceArea,  } from '@/api/api';
const formInfoData = {
  name: '',
  parant: ''
}
export default {
  name: "serviceArea",
  components: {
    FormPage,
    myTable
  },
  mixins: [mixin_pickerOptions, mixin_list(getServiceArea)],
  data () {
    return {
        inputVisible: false,
        inputValue: '',
        selectData:'',
      filter: {
        search: '',
      },
      // 是否显示添加表单
      dialogFormVisible: false,
      // 添加表单信息
      which: '',
    //   shopList: '',
      listTypeInfo: {
        childrenList: [],
      },
      columns: [
        {
          label: 'ID',
          width:200,
          sortable:true,
          prop: 'id',
        }, {
          label: this.$t('serviceArea.first'),
          sortable:true,
          prop: 'name',
        },
        {
          label: this.$t('serviceArea.second'),
          prop: '',
          slot: 'areaSecond'
        },
        {
          label: this.$t('operation'),
          prop: '',
          align: 'center',
          slot: 'operation'
        }],
      formInfo: {
        ref: null,
        disabled: false,
        data: formInfoData,
        fieldList: [
          { label: this.$t('serviceArea.first'), value: 'name', width: '260', type: 'input', className: 'el-form-block', required: true, hidden: false },
          { label: this.$t('serviceArea.second'), value:'children', slot:true, hidden: false },
        ],
        rules: {
        },
        labelWidth: '120px'
      },
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

  filters: {
  },
  created () {
    this.initRules()
  },
  methods: {
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm(parent) {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.formInfo.data={parent,name:inputValue}
          this.addServiceArea(this.formInfo.data)
        //   this.selectData=this.list_data.list[this.list_data.list.findIndex(v=>v.id===this.selectData.id)]
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
    initRules () {
      const formInfo = this.formInfo
      formInfo.rules = this.$initRules(formInfo.fieldList)
    },
    async areaFormFun (type, data) {
      switch (type) {
        case 'edit':
            this.selectData=this.list_data.list[data]
            this.formInfo.fieldList[1].hidden=false
            this.formInfo.data = { ...this.list_data.list[data]}
            this.initRules()
          break;
        case 'add':
            this.formInfo.fieldList[1].hidden=true
            this.formInfo.data = formInfoData
            if(!data){
                delete this.formInfo.data.parant
            }
            this.initRules()
            break;
      }
      this.dialogFormVisible = true
      this.which = type
    },
    remove (id) {
      this.$confirm('确定删除该区域吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteServiceArea(id)
        if (res.errcode == 2000) {
        //   this.list_data.list = this.list_data.list.filter((value) => {
        //     return value.id != id
        //   })
        this.dialogFormVisible = false
        this.get_list()
        }
      }).catch({
      })
    },
    done () {
      switch (this.which) {
        case 'add':
          this.formInfo.ref.validate((valid) => {
            if (valid) {
              this.addServiceArea(this.formInfo.data)
            }
          })
          return
        case 'check':
          this.dialogFormVisible = false
          return
        case 'edit':
          this.formInfo.ref.validate((valid) => {
            if (valid) {
              delete this.formInfo.data.parent
              delete this.formInfo.data.children
              this.editServiceArea(this.formInfo.data)
            }
          })
          return
      }
    },
    async addServiceArea (form) {
      await addServiceArea(form)
      this.dialogFormVisible = false
      this.get_list()
    },
    async editServiceArea (form) {
      await editServiceArea(form)
      this.dialogFormVisible = false
      this.get_list()
    },

  }
}
</script>

<style lang="scss" scoped>
// 搜索部分
.search_card /deep/ {
  margin-bottom: 15px;
}
.container /deep/ {
  // 添加管理员部分
  .addArea {
    margin-bottom: 15px;
  }
}
.el-tag {
margin-right: 10px;
margin-bottom:5px;
}
.button-new-tag {
height: 32px;
line-height: 30px;
padding-top: 0;
padding-bottom: 0;
}
.input-new-tag {
width: 100px;
vertical-align: bottom;
}
</style>