<script setup>
import CommonAside from '../components/CommonAside.vue';
import CommonHeader from '../components/CommonHeader.vue';
</script>

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <!-- 自定义左侧栏组件 -->
      <CommonAside />
      <el-container>
        <el-header>
          <CommonHeader />
        </el-header>
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.common-layout, .lay-container {
  height: 100%;
}

.el-header {
  background-color: #333;
}

</style>
