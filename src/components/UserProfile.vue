<template>
  <a-button
    type="primary"
    shape="round"
    v-if="!user.isLogin"
    @click="login"
  >登录</a-button>
  <div v-else>
    <a-dropdown-button class="user-profile-component">
      {{user.userName}}
      <template #overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item
            key="1"
            @click="logout"
          >
            登出
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from '@/store'
import { UserProps } from '@/store/modules/user'
import { message } from 'ant-design-vue'
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'user-profile',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const login = () => {
      store.commit('user/login')
      message.success('登录成功')
    }
    const logout = () => {
      store.commit('user/logout')
      message.success('登出成功, 2秒后跳转首页', 2)
      setTimeout(() => {
        router.push('/')
      }, 2000);
    }

    return {
      login,
      logout
    }
  }
})
</script>