import { mount, VueWrapper } from "@vue/test-utils"
// import rh from 'rgb-hex'
import ColorPicker from '@/components/ColorPicker.vue'

let wrapper: VueWrapper<any>

const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']

describe('ColorPicker component', () => {
    wrapper = mount(ColorPicker, {
        props: {
            value: '#ffffff'
        }
    })

    it('should render the correct interface', () => {
        // 预想ColorPicker结构
        // <div><input></div>
        // <ul class="picked-color-list">
        // <li class="item-0" or class="transparent-back">
        // <div></div>
        // </li></ul>

        // 测试左侧是否为input 类型和值是否正确
        expect(wrapper.find('div').exists()).toBeTruthy()
        const input = wrapper.get('input').element
        expect(input.type).toBe('color')
        expect(input.value).toBe('#ffffff')
        // 测试右侧是否有颜色的列表
        expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColors.length)
        // 检查一个元素的css backgroundColor属性是否相等对应颜色 
        const firstItem = wrapper.get('li:first-child div').element as HTMLElement
        // expect('#' + rh(firstItem.style.backgroundColor)).toBe(defaultColors[0])
        // 测试最后一个颜色是否有特殊类名
        const lastItem = wrapper.get('li:last-child div').element as HTMLElement
        expect(lastItem.classList.contains('transparent-back')).toBeTruthy()
    })

    // 测试input修改以后, 是否发送对应的时间和对应的值
    it('should send the correct event when change input', async () => {
        const blackHex = '#000000'
        const input = wrapper.get('div input')
        await input.setValue(blackHex)
        expect(wrapper.emitted()).toHaveProperty('change')
        const events = wrapper.emitted('change') ?? []
        expect(events[0]).toEqual([blackHex])
    })

    // 测试点击右侧颜色列表后, 是否发送对应的值
    it('should send the correct event when clicking the color list', async () => {
        const firstItem = wrapper.get('li:first-child div')
        firstItem.trigger('click')
        const events = wrapper.emitted('change') ?? []
        expect(events[1]).toEqual([defaultColors[0]])
    })
})