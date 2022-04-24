<template>
  <div
    class="homepage-container"
    v-if="withHeader"
  >
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <div
          class="page-title-left"
          style="color:#fff; "
        >
          <router-link to="/">首页 </router-link>
        </div>
        <div class="page-title-right">
          <div class="user-operation">
            <a-button
              type="primary"
              shape="round"
              :size="size"
            >创建设计</a-button>
            <a-button
              type="primary"
              shape="round"
              :size="size"
            >我的作品</a-button>
            <user-profile :user="user"/>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view> </router-view>
      </a-layout-content>
      <a-layout-footer> @ xxx版权所有 2021 - 9 - 16 </a-layout-footer>
    </a-layout>
  </div>
  <div
    class="homepage-container"
    v-else
  >
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import UserProfile from './components/UserProfile.vue'
import { GlobalDataProps } from './store'
export default defineComponent({
  name: 'App',
  components: { UserProfile },
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const withHeader = computed(() => route.meta.withHeader)
    const user = computed(() => store.state.user)
    return {
      withHeader,
      user
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.homepage-container {
  position: relative;
}

.home-layout {
  margin: 0 112px;
  min-height: 85vh;
}

.header {
  display: flex;
  justify-content: space-between;
}

.user-operation > * {
  margin: 0 20px;
  display: inline-block;
}
</style>
