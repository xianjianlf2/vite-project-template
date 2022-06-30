<template>
  <div class="mx-Container">
    <el-container class="main-content">
      <el-aside width="auto">
        <nav-side :collapse="isCollapse"></nav-side>
      </el-aside>
      <el-container class="page">
        <el-header>
          <nav-header v-model:collapse="isCollapse"></nav-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavSide from '../../nav-side/src/nav-side.vue'
import NavHeader from '../../nav-header/src/nav-header.vue'
const isCollapse = ref(false)
</script>

<style lang="less" scoped>
.mx-Container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}
</style>
