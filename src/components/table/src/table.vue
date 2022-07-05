<template>
  <el-table :data="data">
    <template v-for="(item, index) in options" :key="index">
      <el-table-column
        v-if="item.prop && !item.action"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :align="item.align"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
          </template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div style="display: flex">
                <el-input
                  size="small"
                  v-model="scope.row[item.prop!]"
                ></el-input>
                <div>
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
          </template> </template
      ></el-table-column>
    </template>
    <el-table-column
      :label="actionOption!.label"
      :width="actionOption!.width"
      :align="actionOption!.align"
    >
      <template #default="scope">
        <slot name="editRow" :scope="scope" v-if="scope.row.rowEdit"></slot>
        <slot name="action" :scope="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { TableOptions } from './types'
const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true
  }
})

// 过滤操作项之后的配置
const tableOption = computed(() => props.options.filter((item) => !item.action))
// 操作项
const actionOption = computed(() => props.options.find((item) => item.action))

// 是否在加载中
const isLoading = computed(() => !props.data || !props.data.length)
</script>

<style></style>
