import store from "@/store"

describe('test vuex store', () => {
    it('should have three modules', () => {
        expect(store.state).toHaveProperty('user')
        expect(store.state).toHaveProperty('templates')
        expect(store.state).toHaveProperty('editor')
    })

    describe('test user module', () => {
        it('test login mutation', () => {
            store.commit('user/login')
            expect(store.state.user.isLogin).toBeTruthy()
        })

        it('test logout mutation', () => {
            store.commit('user/logout')
            expect(store.state.user.isLogin).toBeFalsy()
        })
    })

    describe('test template module', () => {
        it('should get the correct template by Id', () => {
            const selectTemplate = store.getters['templates/getTemplateById'](1)
            expect(selectTemplate.title).toBe('test1')
        })
    })

    describe('test editor module', () => {
        it('should get current component when set active one component', () => {
            
        })
    })
})