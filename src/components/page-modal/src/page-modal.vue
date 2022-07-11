<template>
  <div class="page-modal">
    <el-dialog v-model="visible" width="30%" center>
      <mx-form
        v-model="formData"
        :formItems="options"
        :colLayout="{
          span: 24
        }"
      ></mx-form>

      <template #footer>
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="closeDialog">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MxForm from '../../form'
import { FormOptions } from '../../form/types/types'

const emits = defineEmits(['update:dialogVisible'])
const props = defineProps({
  dialogVisible: { type: Boolean, required: true }
})

const visible = ref(props.dialogVisible)

watch(
  () => props.dialogVisible,
  (val) => {
    visible.value = val
  }
)

const closeDialog = () => {
  emits('update:dialogVisible', false)
}

const formData = ref({})
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
</script>

<style></style>
