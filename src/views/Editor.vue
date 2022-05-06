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
                        <edit-wrapper v-for="component in components" :key="component.id" :id="component.id"
                            @set-active="setActive" :active="component.id == (currentElement && currentElement.id)">
                            <component :is="component.name" v-bind="component.props" />
                        </edit-wrapper>
                    </div>
                </a-layout-content>
            </a-layout>
            <a-layout-sider width="300" style="background: gray" class="setting-container">
                组件属性
                <props-table v-if="currentElement && currentElement.props" :props="currentElement.props"
                    @change="handleChange"></props-table>
                <pre>{{ currentElement?.props }}</pre>
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
import EditWrapper from '@/components/EditWrapper.vue'
import PropsTable from '@/components/PropsTable.vue'
import { defaultTextTemplates } from '@/defaultTemplates'
import { TextComponentProps } from '@/defaultProps'
import { ComponentData } from '@/store/modules/editor'
export default defineComponent({
    name: 'editor',
    components: {
        LText,
        ComponentList,
        EditWrapper,
        PropsTable
    },
    setup() {
        const store = useStore<GlobalDataProps>()
        const components = computed(() => store.state.editor.components)
        const currentElement = computed<ComponentData | null>(() => store.getters['editor/getCurrentElement'])
        console.log(store.getters)
        // 添加props只读文本组件类型
        const addItem = (props: Partial<TextComponentProps>) => {
            store.commit('editor/addComponent', props)
        }
        const setActive = (id: string) => {
            store.commit('editor/setActive', id)
        }
        const handleChange = (e: any) => {
            store.commit('editor/updateComponent', e)
        }
        return {
            components,
            defaultTextTemplates,
            addItem,
            setActive,
            currentElement,
            handleChange
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