import { v4 as uuidv4 } from 'uuid'
import { Module } from 'vuex'
import { GlobalDataProps } from '..'

export interface EditorProps {
    // 供中间编辑器渲染的数组
    components: ComponentData[]
    // 当前编辑的哪个元素 uuid
    currentElement: string
}

export interface ComponentData {
    props: { [key: string]: any }
    // uuid v4
    id: string
    // 业务组件名称 l-text, l-image 等
    name: string
}

const testComponents: ComponentData[] = [
    { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '20px', color: 'red', lineHeight: 1, textAlign: 'left', fontFamily: '' } },
    { id: uuidv4(), name: 'l-text', props: { text: 'hello2', fontSize: '10px' } },
    { id: uuidv4(), name: 'l-text', props: { text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com/' } },
]

const editor: Module<EditorProps, GlobalDataProps> = {
    namespaced: true,
    state: {
        components: testComponents,
        currentElement: ''
    },
    mutations: {
        addComponent(state, props) {
            const newComponent: ComponentData = {
                id: uuidv4(),
                name: 'l-text',
                props
            }
            state.components.push(newComponent)
        },
        deleteComponent(state, props) {
            const currentComponent: ComponentData | undefined = state.components.find(x => x.id == state.currentElement)
            if (currentComponent) {
                state.components = state.components.filter(x => x.id != currentComponent.id)
            }
        },
        setActive(state, currentId: string) {
            state.currentElement = currentId
        }
    },
    getters: {
        getCurrentElement: (state) => {
            return state.components.find(x => x.id == state.currentElement)
        }
    }
}

export default editor