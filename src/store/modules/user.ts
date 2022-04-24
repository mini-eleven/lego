import { Module } from 'vuex'
import { GlobalDataProps } from '..'

export interface UserProps {
    isLogin: boolean
    userName?: string
}

export interface UserDataProps {
    user: UserProps
}

const user: Module<UserProps, GlobalDataProps> = {
    namespaced: true,
    state: { isLogin: false },
    mutations: {
        login(state) {
            state.isLogin = true
            state.userName = 'wuyu'
        },
        logout(state) {
            state.isLogin = false
        }
    }
}

export default user
