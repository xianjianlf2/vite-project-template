<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="collapse"
  >
    <el-menu-item index="2" @click="$router.push('/')">
      <el-icon-menu></el-icon-menu>
      <span>Home</span>
    </el-menu-item>
    <el-menu-item index="2" @click="$router.push('/table')">
      <el-icon-menu></el-icon-menu>
      <span>Table</span>
    </el-menu-item>
    <el-menu-item index="2" @click="$router.push('/form')">
      <el-icon-menu></el-icon-menu>
      <span>Form</span>
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
