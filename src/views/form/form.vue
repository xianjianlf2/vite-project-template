<template>
  <div>
    <mx-form
      ref="form"
      label-width="100px"
      :options="options"
      @on-change="handleChange"
      @before-upload="handleBeforeUpload"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-exceed="handleExceed"
    >
      <template #uploadArea>
        <el-button size="small" type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">
          jpg/png files with a size less than 500kb
        </div></template
      >
      <template #action="scope">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </template>
    </mx-form>
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from '../../components/form/types/types'
import MxForm from '../../components/form'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { ref } from 'vue'

const form = ref()

const options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'userName',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger: 'blur'
      }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    label: '职位',
    rules: [
      {
        required: true,
        message: '职位不为空',
        trigger: 'blur'
      }
    ],
    children: [
      { type: 'option', label: '经理', value: '1' },
      { type: 'option', label: '主管', value: '2' },
      { type: 'option', label: '员工', value: '3' }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '乒乓球',
        value: '3'
      }
    ]
  },
  {
    type: 'radio-group',
    value: [],
    prop: 'gender',
    label: '性别',
    children: [
      {
        type: 'radio',
        label: '男',
        value: '1'
      },
      {
        type: 'radio',
        label: '女',
        value: '2'
      },
      {
        type: 'radio',
        label: '保密',
        value: '3'
      }
    ]
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 3
    },
    rules: [
      {
        required: true,
        message: '图片不能为空',
        trigger: 'blur'
      }
    ]
  }
]

const submitForm = () => {
  if (form.value.validate()) {
    ElMessage.success('提交成功')
  } else {
    ElMessage.error('表单填写有误,请检查')
  }
}
// 重置表单
const resetForm = () => {
  form.value.resetFields()
}

const handleRemove = (file: any, fileList: any) => {
  console.log('handleRemove')
  console.log(file, fileList)
}
const handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}
const beforeRemove = (val: any) => {
  console.log('beforeRemove')
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}
const handleExceed = (val: any) => {
  console.log('handleExceed', val)
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  )
}
const handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}
const handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
const handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
  console.log(val)
}
</script>

<style></style>
