<template>
  <el-table
    :data="data"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.$index + scope.column.id === currentEdit">
            <div style="display: flex">
              <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
              <div >
                <slot
                  name="cellEdit"
                  v-if="$slots.cellEdit"
                  :scope="scope"
                ></slot>
                <div class="action-icon" v-else>
                  <el-icon-check
                    class="check"
                    @click.stop="check(scope)"
                  ></el-icon-check>
                  <el-icon-close
                    class="close"
                    @click.stop="close(scope)"
                  ></el-icon-close>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
            <span v-else>{{ scope.row[item.prop!] }}</span>
            <component
              :is="`el-icon-${toLine(editIcon)}`"
              class="edit"
              v-if="item.editable"
              @click.stop="clickEditIcon(scope)"
            ></component>
          </template>
        </template>
      </el-table-column>
    </template>

    <el-table-column
      :label="actionOptions?.label"
      :align="actionOptions?.align"
      :width="actionOptions?.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref, watch } from 'vue'
import { TableOptions } from './types'
import { toLine } from '../../../utils'
import cloneDeep from 'lodash/cloneDeep'
const props = defineProps({
  //表格属性
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  // 加载
  elementLoadingText: {
    type: String
  },
  // 加载图标
  elementLoadingSpinner: {
    type: String
  },
  // 加载背景
  elementLoadingBackground: {
    type: String
  },
  // 加载图标
  elementLoadingSvg: {
    type: String
  },
  elementLoadingSvgViewBox: {
    type: String
  },
  // 编辑显示的图标
  editIcon: {
    type: String,
    default: 'Edit'
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false
  }, // 编辑行按钮的标识
  editRowIndex: {
    type: String,
    default: ''
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: false
  },
  // 显示分页的对齐方式
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  // 当前是第几页
  currentPage: {
    type: Number,
    default: 1
  },
  // 当前一页多少条数据
  pageSize: {
    type: Number,
    default: 10
  },
  // 显示分页数据多少条的选项
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40]
  },
  // 数据总条数
  total: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex'])
const currentEdit = ref<string>('')

// 点击编辑图标
const clickEditIcon = (scope: any) => {
  // 会做一个判断 判断是否当前单元格被点击了
  // 拼接$index和column的id
  currentEdit.value = scope.$index + scope.column.id
  // console.log(currentEdit.value)
}
// 拷贝一份表格的数据
const tableData = ref<any[]>(cloneDeep(props.data))

// 拷贝一份按钮的标识
const cloneEditRowIndex = ref<string>(props.editRowIndex)

// 监听的标识
const watchData = ref<boolean>(false)

// 点击确认
const check = (scope: any) => {
  emits('confirm', scope)
  currentEdit.value = ''
}
// 点击取消
const close = (scope: any) => {
  emits('cancel', scope)
  currentEdit.value = ''
}

// 如果data的数据变了 要重新给tableData赋值
// 只需要监听一次就可以了
const stopWatchData = watch(
  () => props.data,
  (val) => {
    watchData.value = true
    tableData.value = val
    tableData.value.map((item) => {
      item.rowEdit = false
    })
    if (watchData.value) stopWatchData()
  },
  { deep: true }
)
// 监听
watch(
  () => props.editRowIndex,
  (val) => {
    if (val) cloneEditRowIndex.value = val
  }
)

onMounted(() => {
  tableData.value.map((item) => {
    item.rowEdit = false
  })
})
// 过滤操作选项
const tableOptions = computed(() =>
  props.options.filter((item) => !item.action)
)

// 找出操作项
const actionOptions = computed(() => props.options.find((item) => item.action))

// 表格加载
const isLoading = computed(() => !props.data || !props.data.length)

// 点击行的事件
const rowClick = (row: any, column: any) => {
  // 判断是否是点击的操作项
  if (column.label === actionOptions.value!.label) {
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      // 编辑行的操作
      row.rowEdit = !row.rowEdit
      // 重置其他数据的rowEdit
      tableData.value.map((item) => {
        if (item !== row) item.rowEdit = false
      })
      // 重置按钮的标识
      if (!row.rowEdit) emits('update:editRowIndex', '')
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  left: 4px;
  cursor: pointer;
}
.action-icon {
  display: flex;
  svg {
    width: 1em;
    height: 1em;
    margin-left: 8px;
    position: relative;
    top: 8px;
    cursor: pointer;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
.pagination {
  margin-top: 16px;
  display: flex;
}
</style>
