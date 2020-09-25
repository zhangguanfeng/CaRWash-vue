<template>
  <el-form
    ref="form"
    class="page-form"
    :class="className"
    :model="data"
    :rules="rules"
    :size="size"
    :disabled="disabled"
    :label-width="labelWidth"
  >
    <el-form-item
      v-for="(item, index) in getConfigList()"
      :key="index"
      :prop="item.value"
      :label="item.label"
      v-show="!item.hidden"
      :class="item.className"
      :label-width="item.labelWidth"
    >
      <template v-if="item.type === 'slot'">
        <slot :name="'form-' + item.value" />
      </template>
      <el-input
        v-if="item.type === 'input' || item.type === 'password'"
        v-model="data[item.value]"
        :style="{width:item.width+'px'}"
        :type="item.type"
        :disabled="item.disabled"
        :placeholder="getPlaceholder(item)"
        @focus="handleEvent(item.event)"
        @change="handleEventChange(item.event,data[item.value])"
      />
      <el-input
        v-if="item.type === 'textarea'"
        v-model="data[item.value]"
        :type="item.type"
        :disabled="item.disabled"
        :placeholder="getPlaceholder(item)"
        :autosize="item.autosize || {minRows: 2, maxRows: 10}"
        @focus="handleEvent(item.event)"
      />
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="data[item.value]"
        @change="handleEvent(item.event,data[item.value])"
      >
        <el-radio-button
          v-for="childItem in listTypeInfo[item.list]"
          :label="childItem.value"
          :key="childItem.value"
        >{{childItem.label}}</el-radio-button>
      </el-radio-group>
      <el-input-number
        v-if="item.type === 'inputNumber'"
        v-model="data[item.value]"
        size="small"
        :style="item.style"
        :min="item.min"
        :max="item.max"
        :step-strictly="item.stepStrictly"
        :controls-position="item.controlsPosition"
        @change="handleEvent(item.event)"
      />
      <el-select
        v-if="item.type === 'select'"
        v-model="data[item.value]"
        :style="{width:item.width+'px'}"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :filterable="item.filterable"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event, data[item.value])"
      >
        <el-option
          v-for="childItem in listTypeInfo[item.list]"
          :key="childItem.value"
          :label="childItem.label"
          :value="childItem.value"
        />
      </el-select>
      <el-select
        v-if="item.type === 'remoteSelect'"
        v-model="data[item.value]"
        :style="{width:item.width+'px'}"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :multiple="item.multiple"
        filterable
        remote
        :remote-method="(query) => remoteMethod(item.event, query, item)"
        :loading="item.loading"
        :placeholder="getPlaceholder(item)"
        @change="handleRemoteSelectEvent(item.value, data[item.value], item.dataObj)"
      >
        <el-option
          v-for="childItem in listTypeInfo[item.list]"
          :key="childItem.value"
          :label="childItem.label"
          :value="childItem.value"
        />
      </el-select>
      <el-cascader
        v-if="item.type === 'cascader'"
        :style="{width:item.width+'px'}"
        v-model="data[item.value]"
        :options="listTypeInfo[item.list]"
        :props="item.props"
        :filterable="item.filterable"
        :placeholder="getPlaceholder(item)"
        :clearable="item.clearable"
        @change="handleEvent(item.event, data)"
      ></el-cascader>
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="data[item.value]"
        :style="{width:item.width+'px'}"
        :type="item.dateType"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="item.TimePickerOptions"
        :clearable="item.clearable"
        :disabled="item.disabled"
        :placeholder="getPlaceholder(item)"
        @focus="handleEvent(item.event)"
      />
      <el-tag
        v-if="item.type === 'tag'"
      >{{ $fn.getDataName({dataList: listTypeInfo[item.list], value: 'value', label: 'key', data: data[item.value]}) || '-' }}</el-tag>
      <template v-if="item.slot">
        <slot :name="'form-item-' + item.value" />
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FormPage',
  props: {
    className: {
      type: String
    },
    data: {
      type: Object
    },
    size: {
      type: String,
      default: 'small'
    },
    fieldList: {
      type: Array
    },
    rules: {
      type: Object
    },
    listTypeInfo: {
      type: Object
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    refObj: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  watch: {
    data: {
      handler: function (val) {
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true
    }
  },
  mounted () {
    this.$emit('update:refObj', this.$refs.form)
  },
  methods: {
    getConfigList () {
      return this.fieldList.filter(item => !Object.prototype.hasOwnProperty.call(item, 'show') || (Object.prototype.hasOwnProperty.call(item, 'show') && item.show))
    },
    getPlaceholder (row) {
      let placeholder
      if (row.type === 'input' || row.type === 'textarea') {
      } else if (row.type === 'select' || row.type === 'time' || row.type === 'date' || row.type === 'cascader') {
      } else if (row.type === 'remoteSelect') {
      } else {
        placeholder = row.label
      }
      return placeholder
    },
    handleEvent (evnet, data) {
      this.$emit('handleEvent', evnet, data)
    },
    handleEventChange (evnet, data) {
      this.$emit('handleEventChange', evnet, data)
    },
    handleRemoteSelectEvent (key, value, obj) {
      this.$emit('handleRemoteSelectEvent', key, value, obj)
    },
    handleClick (event, data) {
      this.$emit('handleClick', event, data)
    },
    remoteMethod (event, query, item) {
      this.$emit('remoteMethod', event, query, item)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-form {
  .el-form-item {
    display: inline-block;
    width: 48%;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-textarea,
      .el-cascader {
        width: 100%;
      }
      .el-input-number {
        .el-input {
          width: inherit;
        }
      }
    }
  }
  .el-form-block {
    display: block;
    width: 100%;
    .el-form-item__content {
      .el-textarea {
        width: 100%;
      }
    }
  }
  /deep/ .el-input.is-disabled {
    .el-input__inner,
    .el-textarea__inner {
      color: #333;
      border-color: transparent;
      cursor: inherit;
    }
  }
  /deep/ .el-textarea.is-disabled {
    .el-textarea__inner {
      color: #333;
      border-color: transparent;
      cursor: inherit;
    }
  }
  /deep/ .el-radio-group {
    .is-active.is-disabled {
      .el-radio-button__inner {
        color: #ffffff;
        background-color: #1890ff;
        border-color: #1890ff;
        cursor: inherit;
      }
    }
  }
}
.page-form-block {
  .el-form-item {
    display: block;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-textarea {
        width: inherit;
      }
      .el-input-number {
        .el-input {
          width: inherit;
        }
      }
    }
  }
  .el-form-block {
    display: block;
    width: 100%;
    .el-form-item__content {
      .el-textarea {
        width: 100%;
      }
    }
  }
}
.report-media-page-form {
  @media only screen and (min-width: 0px) {
    .el-form-item {
      display: inline-block;
      width: 100%;
    }
  }
  @media only screen and (min-width: 1000px) {
    .el-form-item {
      display: inline-block;
      width: 50%;
    }
  }
  @media only screen and (min-width: 1450px) {
    .el-form-item {
      display: inline-block;
      width: 33.33%;
    }
  }
  // @media only screen
  // and (min-width : 1600px) {
  //   .el-form-item{
  //     display: inline-block;
  //     width: 25%;
  //   }
  // }
}
</style>
