<template>
  <div>
    <mx-table
      :options="options"
      :data="tableData"
      elementLoadingText="加载中..."
      isEditRow
      border
      :total="total"
      :currentPage="current"
      :pageSize="pageSize"
      v-model:editRowIndex="editRowIndex"
      @confirm="confirm"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <template #date="{ scope }">
        <el-icon-timer></el-icon-timer>
        {{ scope.row.date }}
      </template>
      <template #name="{ scope }">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
      <template #editRow="scope">
        <el-button size="small" type="primary" @click="sure(scope.scope)"
          >确认</el-button
        >
        <el-button size="small" type="danger">取消</el-button>
      </template>
      <template #action="{ scope }">
        <el-button size="small" type="primary" @click="edit(scope)"
          >编辑</el-button
        >
        <el-button size="small" type="danger">删除</el-button>
      </template>
      <template #cellEdit="{ scope }">
        <div style="display: flex">
          <el-button size="small" type="primary">确认</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </template>
    </mx-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MxTable from '../components/table'
import { TableOptions } from '../components/table/src/types'
import axios from 'axios'

const tableData = ref<any>([])
const current = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const editRowIndex = ref<string>('')

setTimeout(() => {
  tableData.value = [
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      state: 'California',
      city: 'Los Angeles',
      address: 'No. 189, Grove St, Los Angeles',
      zip: 'CA 90036'
    }
  ]
}, 100)

const options: TableOptions[] = [
  {
    prop: 'date',
    label: '日期',
    // width: '180',
    align: 'center',
    slot: 'date',
    editable: true
  },
  {
    prop: 'name',
    label: '姓名',
    // width: '180',
    align: 'center',
    slot: 'name'
  },
  {
    prop: 'address',
    label: '地址',
    align: 'center',
    editable: true
  },
  {
    label: '操作',
    action: true,
    align: 'center'
  }
]
const getData = () => {
  axios
    .post('/api/list', {
      current: current.value,
      pageSize: pageSize.value
    })
    .then((res: any) => {
      if (res.data.code === '200') {
        tableData.value = res.data.data.rows
        total.value = res.data.data.total
        console.log(res.data.data)
      }
    })
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getData()
}
const handleCurrentChange = (val: number) => {
  current.value = val
  getData()
}

onMounted(() => {
  getData()
})

const sure = (scope: any) => {
  console.log(scope)
}
const edit = (scope: any) => {
  console.log(scope)
}

const confirm = (scope: any) => {
  // console.log(scope)
}
</script>

<style lang="less" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
