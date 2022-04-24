import { Module } from 'vuex'
import { GlobalDataProps } from '../index'

export interface TemplateProps {
    id: number
    title: string
    description: string
    coverImg: string
    author: string
    copiedCount: number
}

const testData: TemplateProps[] = [
    {
        id: 1, title: 'test1', description: 'desc1', author: 'w1',
        coverImg: 'http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',
        copiedCount: 0
    },
    {
        id: 2, title: 'test2', description: 'desc2', author: 'w1',
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
        copiedCount: 0
    },
    {
        id: 3, title: 'test2', description: 'desc2', author: 'w1',
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
        copiedCount: 0
    },
    {
        id: 4, title: 'test2', description: 'desc2', author: 'w1',
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-323204.png',
        copiedCount: 0
    },
    {
        id: 5, title: 'test2', description: 'desc2', author: 'w1',
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-726751.png',
        copiedCount: 0
    },
    {
        id: 6, title: 'test2', description: 'desc2', author: 'w1',
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-682056.png',
        copiedCount: 0
    },
    {
        id: 7, title: 'test2', description: 'desc2', author: 'w1',
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-133701.png',
        copiedCount: 0
    },
    {
        id: 8, title: 'test2', description: 'desc2', author: 'w1',
        coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-649919.png',
        copiedCount: 0
    }
]

const templates: Module<TemplateProps[], GlobalDataProps> = {
    namespaced: true,
    state: testData,
    getters: {
        getTemplateById: (state, getters, rootState) => (id: number) => {
            return state.find(t => t.id == id)
        }
    }
}

export default templates