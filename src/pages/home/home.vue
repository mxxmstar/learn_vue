<template>
  <div class="preview-container">
    <!-- 顶部导航栏 -->
    <div class="header">
        <back-btn @click="$router.back()" size="medium" />
      <span class="title">Preview</span>
      <el-select v-model="streamType" placeholder="Select Stream Type" style="width: 200px;">
        <el-option label="Video Stream (URL)" value="video-url"></el-option>
        <el-option label="Image Stream (URL)" value="image-url"></el-option>
        <el-option label="Image Stream (WebSocket)" value="image-websocket"></el-option>
      </el-select>
    </div>

    <!-- 预览区域 -->
    <div class="preview-area">
      <div v-if="streamType === 'video-url'" class="video-wrapper">
        <video :src="videoUrl" autoplay controls></video>
      </div>

      <div v-else-if="streamType === 'image-url'" class="image-wrapper">
        <img :src="imageUrl" alt="Live Image" />
      </div>

      <div v-else-if="streamType === 'image-websocket'" class="websocket-wrapper">
        <div v-if="!webSocketConnected" class="loading">Connecting to WebSocket...</div>
        <canvas ref="canvas" width="640" height="480" v-else></canvas>
      </div>

      <div v-else class="placeholder">
        Please select a stream type.
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="footer">
      <el-button round icon="el-icon-refresh" @click="refreshStream">Refresh</el-button>
      <el-button round icon="el-icon-setting" @click="openConfig">Config</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import BackBtn from '../../components/button/backBtn.vue';
export default defineComponent({
  name: 'PreviewPage',
  components: {
    backBtn: BackBtn // 将大写组件映射为小写标签
  },
  setup() {

    const streamType = ref<string>('video-url');
    const videoUrl = ref<string>('https://example.com/stream.m3u8'); // 示例视频流 URL
    const imageUrl = ref<string>('http://192.168.66.83:8081/snap0.jpeg?quality=3'); // 示例图片流 URL
    const webSocketConnected = ref<boolean>(false);
    const canvas = ref<HTMLCanvasElement | null>(null);

    let ws: WebSocket | null = null;

    // 刷新流
    const refreshStream = () => {
      if (streamType.value === 'video-url') {
        // 可以重新加载视频
        const video = document.querySelector('video');
        if (video) video.load();
      }
    };

    // 打开配置页面
    const openConfig = () => {
      alert('Open Config Page');
    };

    // WebSocket 图片流处理
    const connectWebSocket = () => {
      if (ws) ws.close();

      ws = new WebSocket('ws://localhost:8080/image-stream');

      ws.onopen = () => {
        webSocketConnected.value = true;
        console.log('WebSocket connected');
      };

      ws.onmessage = (event) => {
        if (event.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const ctx = canvas.value?.getContext('2d');
              if (ctx && canvas.value) {
                ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
                ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height);
              }
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(event.data);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        webSocketConnected.value = false;
        console.log('WebSocket closed');
      };
    };

    // 监听 streamType 变化
    const handleStreamChange = () => {
      if (streamType.value === 'image-websocket') {
        connectWebSocket();
      } else if (ws) {
        ws.close();
      }
    };

    onMounted(() => {
      handleStreamChange();
    });

    onUnmounted(() => {
      if (ws) ws.close();
    });

    return {
      streamType,
      videoUrl,
      imageUrl,
      webSocketConnected,
      canvas,
      refreshStream,
      openConfig,
      handleStreamChange,
    };
  },
});
</script>

<style scoped>
.preview-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #00bfff;
  color: white;
  font-size: 18px;
}

.title {
  margin: 0;
}

.footer {
  padding: 10px;
  text-align: center;
}

.preview-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  overflow: hidden;
}

.video-wrapper, .image-wrapper, .websocket-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-wrapper video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.websocket-wrapper canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.placeholder {
  color: #999;
  font-size: 16px;
}
</style>
