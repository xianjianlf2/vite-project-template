<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="collapse"
  >
    <el-menu-item index="2">
      <el-icon-menu></el-icon-menu>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon-menu></el-icon-menu>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon-menu></el-icon-menu>
      <span>Navigator Two</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
const props = defineProps<{
  collapse: boolean
}>()
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu {
  height: 100%;
}
</style>
