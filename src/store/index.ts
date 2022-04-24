import { createStore } from 'vuex'
import templates, { TemplateProps } from './modules/template'
import user, { UserProps } from './modules/user'

export interface GlobalDataProps {
    user: UserProps
    templates: TemplateProps[]
}

const store = createStore<GlobalDataProps>({
    modules: {
        user,
        templates
    },
})

export default store