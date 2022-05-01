<template>
    <div class="editor" id="editor-layout-main">
        <a-layout :style="{ height: '100%' }">
            <a-layout-sider width="300" style="background: yellow">
                <div class="sidebar-container">组件列表</div>
                <component-list :list="defaultTextTemplates" @onItemClick="addItem" />
            </a-layout-sider>
            <a-layout>
                <a-layout-content class="preview-container">
                    <p>画布区域</p>
                    <div class="preview-list" id="canvas-area">             
                        <component v-for="component in components" :key="component.id" :is="component.name"
                            v-bind="component.props" />
                    </div>
                </a-layout-content>
            </a-layout>
            <a-layout-sider width="300" style="background: purple" class="setting-container">
                <div>组件属性</div>
            </a-layout-sider>
        </a-layout>
    </div>
</template>

<script lang="ts">
import { GlobalDataProps } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import LText from '../components/LText.vue'
import ComponentList from '../components/ComponentList.vue'
import { defaultTextTemplates } from '@/defaultTemplates'
import { TextComponentProps } from '@/defaultProps'
export default defineComponent({
    name: 'editor',
    components: {
        LText,
        ComponentList
    },
    setup() {
        const store = useStore<GlobalDataProps>()
        const components = computed(() => store.state.editor.components)
        // 添加props只读文本组件类型
        const addItem = (props: Partial<TextComponentProps>) => {
            store.commit('editor/addComponent', props)
        }
        return {
            components,
            defaultTextTemplates,
            addItem
        }
    }
})
</script>

<style>
#editor-layout-main {
    position: relative;
    height: 100%;
    min-height: 85vh;
}

.page-title {
    color: #fff;
    font-size: 20px;
}

.preview-list {
    width: 500px;
    height: 200px;
    background-color: white;
    margin: auto;
}
</style>