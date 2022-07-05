<template>
  <div>
    <mx-table :options="options" :data="tableData">
      <template #editRow="scope">
        <el-button size="small" type="primary" @click="sure(scope.scope)"
          >确认</el-button
        >
        <el-button size="small" type="danger">取消</el-button>
      </template>
      <template #action="scope">
        <el-button size="small" type="primary" @click="edit(scope.scope)"
          >编辑</el-button
        >
        <el-button size="small" type="danger">删除</el-button>
      </template>
    </mx-table>
  </div>
</template>

<script setup lang="ts">
import MxTable from '../components/table'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }
]

const options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center'
  },
  {
    label: '操作',
    align: 'center',
    action: true
  }
]

const sure = (scope: any) => {
  console.log(scope)
}
const edit = (scope: any) => {
  console.log(scope)
}
</script>

<style></style>
