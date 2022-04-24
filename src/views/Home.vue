<template>
  <div class="content-container">
    <template-list :list="testData"></template-list>
  </div>
</template>

<script lang="ts">
import { TemplateProps } from '@/store/modules/template'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import TemplateList from '../components/TemplateList.vue'
import { GlobalDataProps } from '../store'
export default defineComponent({
  name: 'home',
  components: { TemplateList },
  setup() {
    const store = useStore<GlobalDataProps>()
    const testData = computed<TemplateProps[]>(() => store.state.templates)
    console.log(store.getters)
    return {
      testData
    }
  }
})
</script>

<style>
.page-title {
  color: #fff;
  font-size: 20px;
}

.content-container {
  padding: 0 24px 24px 30px;
  min-height: 85hv;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>