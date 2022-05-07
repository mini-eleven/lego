import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import axios from 'axios'
import flushPromises from 'flush-promises'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const msg = 'new message'
let wrapper: VueWrapper<any>

describe.skip('HelloWorld.vue', () => {

    beforeAll(() => {
        // 单一实例 所有的case都共用同一个wrapper
        wrapper = shallowMount(HelloWorld, {
            props: { msg }
        })

    })

    it('should update the count when clicking the button', async () => {
        await wrapper.get('button').trigger('click')
        expect(wrapper.get('button').text()).toBe('2')
    })

    it('should add todo when fill the input and click the add button', async () => {
        const todoContent = 'buy milk'
        await wrapper.get('input').setValue(todoContent)
        expect(wrapper.get('input').element.value).toBe(todoContent)
        await wrapper.get('.addTodo').trigger('click')
        expect(wrapper.findAll('li')).toHaveLength(1)
        expect(wrapper.get('li').text()).toBe(todoContent)
        console.log(wrapper.emitted())
        expect(wrapper.emitted()).toHaveProperty('send')
        const events = wrapper.emitted('send') ?? []
        expect(events[0]).toEqual([todoContent])
    })

    it.only('should load user message when click the load button', async () => {
        mockAxios.get.mockResolvedValueOnce({ data: { username: 'viking' } })
        await wrapper.get('.loadUser').trigger('click')
        expect(mockAxios.get).toHaveBeenCalled()
        expect(wrapper.find('.loading').exists()).toBeTruthy()

        // Flush all pending resolved promise handlers. Useful in tests.
        await flushPromises()
        // 界面更新完毕
        expect(wrapper.find('.loading').exists()).toBeFalsy()
        expect(wrapper.get('.userName').text()).toBe('viking')
    })

    it.only('should load error when return promise reject', async () => {
        mockAxios.get.mockRejectedValueOnce(new Error('error!'))
        await wrapper.get('.loadUser').trigger('click')
        expect(mockAxios.get).toHaveBeenCalled()
        // afterEach 重置了mockAxios, 否则上方case也调用了mockAxios, times实际为2
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
        expect(wrapper.find('.error').exists()).toBeTruthy()
    })

    // 清空共享状态
    afterEach(() => {
        // 避免wrapper的单一实例调用问题, 在每次调用之后重置
        mockAxios.get.mockReset()
    })
})

