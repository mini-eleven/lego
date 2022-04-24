<template>
  <div class="editor" id="editor-layout-main">
    <a-layout :style="{ height: '100%' }">
      <a-layout-sider width="300" style="background: yellow">
        <div class="sidebar-container">组件列表</div>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area"></div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: purple" class="setting-container">
        <div>组件属性</div>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'editor',
})
</script>

<style>
#editor-layout-main {
  height: 100%;
  min-height: 85vh;
}

.page-title {
  color: #fff;
  font-size: 20px;
}
</style>