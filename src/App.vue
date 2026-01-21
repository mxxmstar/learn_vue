<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <!-- <header class="header">
      <div class="logo">XXXXXXXXXX</div>
      <div class="user-info">
        <span>admin</span>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header> -->

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0);
}

.logo {
  font-size: 18px;
  color: #303133;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
