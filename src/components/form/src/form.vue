<template>
  <div class="my-form">
    <el-form
      ref="form"
      v-if="formData"
      :validate-on-rule-change="false"
      v-bind="$attrs"
      :label-width="labelWidth"
    >
      <el-row>
        <template v-for="(item, index) in formItems" :key="index">
          <el-col v-bind="colLayout">
            <el-form-item
              :prop="item.prop"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.children || !item.children!.length"
            >
              <component
                v-if="item.type !== 'upload'"
                v-bind="item.attrs"
                :is="`el-${item.type}`"
                v-model="formData[`${item.prop}`]"
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
              :rules="item.rules"
              :style="itemStyle"
            >
              <component
                :placeholder="item.placeholder"
                v-bind="item.attrs"
                :is="`el-${item.type}`"
                v-model="formData[`${item.prop}`]"
              >
                <component
                  v-for="(child, i) in item.children"
                  :key="i"
                  :is="`el-${child.type}`"
                  :label="child.label"
                  :value="child.value"
                ></component> </component
            ></el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <el-form-item>
      <slot name="action"></slot>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from 'vue'
import { FormOptions } from '../types/types'
import cloneDeep from 'lodash/cloneDeep'
import { FormInstance } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Object
  },
  formItems: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  httpRequest: {
    type: Function
  },
  labelWidth: {
    type: String,
    default: () => '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // ≥1920px
      lg: 8, // ≥1200px
      md: 12, // ≥992px
      sm: 24, // ≥768px
      xs: 24 // <768px
    })
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
  'on-exceed',
  'update:modelValue'
])

const formData = ref<any>({ ...props.modelValue })
const form = ref<FormInstance>()

// 初始化表单
// const initForm = () => {
// if (props.formItems && props.formItems.length) {
//   let m: any = {}
//   props.formItems.map((item: FormOptions) => {
//     m[item.prop!] = item.value
//   })
//   formData.value = cloneDeep(m)
// }
// }

// onMounted(() => {
//   initForm()
// })

// // 监听父组件数据变了
// watch(
//   () => props.options,
//   () => {
//     initForm()
//   },
//   { deep: true }
// )

watch(
  formData,
  (newValue) => {
    emits('update:modelValue', newValue)
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
  const uploadItem = props.formItems.find((item) => item.type === 'upload')!
  formData.value[uploadItem.prop!] = { response, file, fileList }
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
  return formData.value
}
// 分发方法
defineExpose({
  resetFields,
  validate,
  getFormData
})
</script>

<style scoped lang="less">
.my-form {
  padding: 20px 20px 0;
}
</style>
