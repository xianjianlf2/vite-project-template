<template>
  <el-form
    ref="form"
    v-if="model"
    :validate-on-rule-change="false"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        :prop="item.prop"
        :label="item.label"
        v-if="!item.children || !item.children!.length"
      >
        <component
          v-if="item.type !== 'upload'"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        ></component>
        <el-upload
          v-else
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot> </el-upload
      ></el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          ></component> </component
      ></el-form-item>
    </template>

    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from 'vue'
import { FormOptions } from '../types/types'
import cloneDeep from 'lodash/cloneDeep'
import { FormInstance } from 'element-plus'
const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  httpRequest: {
    type: Function
  }
})

const emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed'
])

const model = ref<any>(null)
const rules = ref<any>(null)
const form = ref<FormInstance>()

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}
    let r: any = {}
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

onMounted(() => {
  initForm()
})

// 监听父组件数据变了
watch(
  () => props.options,
  () => {
    initForm()
  },
  { deep: true }
)

// 上传组件的所有方法
const onPreview = (file: File) => {
  emits('on-preview', file)
}
const onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
const onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  const uploadItem = props.options.find((item) => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
const onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList })
}
const onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
const onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
const beforeUpload = (file: File) => {
  emits('before-upload', file)
}
const beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
const onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}

// 重置表单
let resetFields = () => {
  // 重置element-plus的表单
  form.value!.resetFields()
}
// 表单验证方法
let validate = () => {
  return form.value!.validate
}
// 获取表单数据
let getFormData = () => {
  return model.value
}
// 分发方法
defineExpose({
  resetFields,
  validate,
  getFormData
})
</script>

<style></style>
