<!-- src/components/Sidebar.vue -->
<template>
  <div class="sidebar">
    <div class="logo">XXXXXXXXXX</div>
    <ul class="menu">
      <li v-for="item in menuItems" :key="item.path">
        <router-link :to="item.path" class="menu-item">
          <i :class="item.icon"></i>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { path: '/overview', name: '概览', icon: 'fa fa-home' },
//   { path: '/devices', name: '国标设备', icon: 'fa fa-server' },
//   { path: '/display', name: '分屏展示', icon: 'fa fa-desktop' },
//   { path: '/record', name: '云端录像', icon: 'fa fa-film' },
//   { path: '/alarm', name: '报警查询', icon: 'fa fa-bell' },
//   { path: '/link', name: '国标级联', icon: 'fa fa-link' },
//   { path: '/users', name: '用户管理', icon: 'fa fa-users' },
//   { path: '/logs', name: '操作日志', icon: 'fa fa-book' },
//   { path: '/config', name: '基础配置', icon: 'fa fa-cog' },
//   { path: '/version', name: '版本信息', icon: 'fa fa-info-circle' }
])
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #627bad;
  color: white;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #cbd5e0;
  text-decoration: none;
  transition: background-color 0.3s;
  border-left: 3px solid transparent;
}

.menu-item:hover,
.menu-item.router-link-active {
  background-color: #1b212c;
  color: white;
  border-left-color: #4299e1;
}

i {
  margin-right: 10px;
}
</style>
