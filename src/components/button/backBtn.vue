<template>
  <el-button
    :type="type"
    :size="size"
    :plain="plain"
    :circle="circle"
    :disabled="disabled"
    @click="handleGoBack"
    class="custom-back-btn"
  >
    <template #default>
      <el-icon v-if="!circle" style="margin-right: 1px;">
        <arrow-left />
      </el-icon>
      <span v-if="!circle">{{ btnText }}</span>
    </template>

    <template #icon v-if="circle">
      <arrow-left style="stroke-width: 10px; left: 12px;"/>
    </template>
  </el-button>
</template>

<script setup name="CommonBackBtn">
import { ElButton, ElIcon } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'default' },
  plain: { type: Boolean, default: false },
  circle: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  btnText: { type: String, default: '返回' },
  fallbackPath: { type: String, default: '/' }
})

const handleGoBack = () => {
  if (props.disabled) return
//   window.history.length > 1 ? window.history.back() : router.push(props.fallbackPath)
}
</script>

<style scoped>
.custom-back-btn {
  margin-right: 8px;
}


</style>
