<template>
  <div class="detail-container">
    <!-- <pre>{{template}}</pre> -->
    <a-row>
      <a-col :span="12">
        <img
          :src="template.coverImg"
          alt=""
          style="width: 100%"
        />
      </a-col>
      <a-col :span="12">
        <div>
          <div class="detail-title">
            <h2>{{template.title}}</h2>
            <p>{{template.title}}</p>
          </div>
          <div class="detail-author">
            <span>该模板由{{template.author}}创作</span>
          </div>
          <div class="detail-qrcode"></div>
          <div class="detail-button">
            <router-link to="/editor">
              <a-button type="primary">使用模板</a-button>
            </router-link>
            <a-button>下载图片海报</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { TemplateProps } from '@/store/modules/template'
import { GlobalDataProps } from '@/store'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'templateDetail',
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentTemplateId = route.params.id as string
    const template = computed<TemplateProps>(() => store.getters['templates/getTemplateById'](parseInt(currentTemplateId)))
    return { route, template }
  }
})
</script>

<style>
.detail-container {
  margin: 80px 10px;
  padding: 0px 50px;
}
</style>