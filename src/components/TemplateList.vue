<template>
  <div class="template-list-component">
    <a-row :gutter="16">
      <a-col
        :span="6"
        v-for="item in list"
        :key="item.id"
        class="poster-item"
      >
        <router-link :to="{ name: 'template', params: { id: item.id } }">
          <a-card hoverable>
            <template #cover>
              <img
                :alt="item.title"
                :src="item.coverImg"
              />
              <div class="hover-item">
                <a-button
                  type="primary"
                  size="large"
                > 使用该模板创建</a-button>
              </div>
            </template>
            <a-card-meta :title="item.title">
              <template #description>
                <div class="description-detail">
                  <span>作者: {{item.author}}</span>
                  <span class="user-number">{{item.copiedCount}}</span>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </router-link>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TemplateProps } from '@/store/modules/template'
export default defineComponent({
  name: 'templateList',
  props: {
    list: {
      type: Array as PropType<TemplateProps[]>,
      required: true,
    }
  }
})
</script>

<style>
.poster-item:hover .hover-item {
  display: flex;
}

.poster-item {
  position: relative;
  margin-bottom: 20px;
}

.poster-item .ant-card {
  border-radius: 12px;
}

.poster-item .ant-card-cover {
  height: 390px;
  position: relative;
  overflow: hidden;
}

.poster-item .ant-card-body {
  padding: 0;
}

.poster-item .ant-card-meta-title {
  text-align: left;
  color: #333;
  font-size: 16px;
  padding: 10px 12px;
  margin: 0 !important;
  border-bottom: 1px solid #f2f2f2;
}

.poster-item .description-detail {
  display: flex;
  justify-content: space-between;
  padding: 13px 12px;
}

.editor-button {
  position: absolute;
}

.hover-item {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  display: none;
  justify-content: center;
  align-items: center;
}

.hover-item .ant-btn {
  position: relative;
  border-radius: 20px;
}
</style>