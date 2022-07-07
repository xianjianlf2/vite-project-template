<template>
  <div class="nav-header">
    <span @click="toggle">
      <el-icon-expand
        style="margin-right: 10px"
        v-if="collapse"
      ></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  collapse: boolean
}>()
const emits = defineEmits(['update:collapse'])

const toggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>

<style lang="less" scoped>
.nav-header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>
