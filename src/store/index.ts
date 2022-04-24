import { createStore } from 'vuex'
import templates, { TemplateProps } from './modules/template'
import user, { UserProps } from './modules/user'
import editor, { EditorProps } from './modules/editor'

export interface GlobalDataProps {
    user: UserProps
    templates: TemplateProps[]
    editor: EditorProps
}

const store = createStore<GlobalDataProps>({
    modules: {
        user,
        templates,
        editor
    },
})

export default store