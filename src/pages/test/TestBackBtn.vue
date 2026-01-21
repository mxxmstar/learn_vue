<!-- src/pages/TestBackBtn.vue -->
<template>
  <div style="padding: 20px;">
    <h2>BackBtn 测试页</h2>

    <!-- 基础用法 -->
    <back-btn @click="handleClick" size="medium" />

    <!-- 圆形按钮 -->
    <back-btn @click="handleClick" circle />

    <!-- 朴素按钮 -->
    <back-btn @click="handleClick" plain />

    <!-- 自定义文字 -->
    <back-btn @click="handleClick" btn-text="返回首页" />
  </div>
</template>

<script setup>
import backBtn from '../../components/button/backBtn.vue'

const handleClick = () => {
  alert('点击了返回按钮')
}
</script>

<style scoped>
/* 可选：添加一些样式 */
</style>
