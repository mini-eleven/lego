import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import axios from 'axios'
import Uploader from '@/components/Uploader.vue'
import flushPromises from "flush-promises";

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

let wrapper: VueWrapper<any>

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
const mockComponents = ''

describe('Uploader Component', () => {
    beforeAll(() => {
        wrapper = shallowMount(Uploader, {
            props: {
                action: 'test.url'
            }
        })
    })

    it('basic layout before uploading', () => {
        expect(wrapper.find('button').exists()).toBeTruthy()
        expect(wrapper.get('button span').text()).toBe('点击上传')
        expect(wrapper.get('input').isVisible()).toBeFalsy()
    })

    it('upload process should works fine', async () => {
        // change e.target.files
        // create a file 
        mockedAxios.post.mockResolvedValueOnce({ status: 'error' })
        const fileInput = wrapper.get('input').element as HTMLInputElement
        const files = [testFile] as any
        Object.defineProperty(fileInput, 'files', {
            value: files,
            writable: false
        })
        await wrapper.get('input').trigger('change')
        expect(mockedAxios.post).toHaveBeenCalledTimes(1)
        // expect(wrapper.get('button span').text()).toBe('正在上传')  ??
        await flushPromises()
        expect(wrapper.get('button span').text()).toBe('上传成功')
    })

    it('should return error text when post is rejected', async () => {
        mockedAxios.post.mockRejectedValueOnce({ error: 'error' })
        await wrapper.get('input').trigger('change')
        expect(mockedAxios.post).toHaveBeenCalledTimes(2)
        // expect(wrapper.get('button span').text()).toBe('正在上传') ??
        await flushPromises()
        expect(wrapper.get('button span').text()).toBe('上传失败')
    })

    it.only('should show the correct interface when using custom solt', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { url: 'wuyu.url' } })
        const wrapper = mount(Uploader, {
            props: {
                action: 'test.url'
            },
            slots: {
                default: '<button>Custom button</button>',
                loading: '<div class="loading">custom loading</div>',
                uploaded: `<template #uploaded="{ uploadedData }">
                    <div class="custom-loaded">{{uploadedData.url}}</div>
                </template>`
            },
            // global: {
            //     stubs: mockComponents
            // }
        })
    })
})