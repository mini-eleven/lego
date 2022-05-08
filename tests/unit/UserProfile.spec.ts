import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import { message } from 'ant-design-vue'
import UserProfile from '@/components/UserProfile.vue'
import store from '@/store'

let wrapper: VueWrapper<any>
jest.mock('ant-design-vue', () => ({
    message: {
        success: jest.fn()
    }
}))
// jest.mock('vuex')
// jest.mock('vue-router')

const mockedRoutes: string[] = []
jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: (url: string) => mockedRoutes.push(url)
    })
}))

const mockComponent = {
    template: '<div><slot></slot></div>'
}
const mockComponent2 = {
    template: '<div><slot></slot><slot name="overlay"></slot></div>'
}
const globalComponent = {
    'a-button': mockComponent,
    'a-dropdown-button': mockComponent2,
    'router-link': mockComponent,
    'a-menu': mockComponent,
    'a-menu-item': mockComponent,
}

describe('UserProfile Component', () => {

    beforeAll(() => {
        jest.useFakeTimers()
        // 单一实例 所有的case都共用同一个wrapper
        wrapper = mount(UserProfile, {
            props: {
                user: { isLogin: false }
            },
            global: {
                components: globalComponent,
                provide: {
                    store
                }
            }
        })

    })

    it('should render login button when login is false', async () => {
        console.log(wrapper.html())
        expect(wrapper.get('div').text()).toBe('登录')
        await wrapper.get('div').trigger('click')
        expect(message.success).toHaveBeenCalled()
        expect(store.state.user.userName).toBe('wuyu')
    })

    it('should render username when login is true', async () => {
        await wrapper.setProps({
            user: { isLogin: true, userName: 'wuyu' }
        })
        console.log(wrapper.html())
        expect(wrapper.get('.user-profile-component').html()).toContain('wuyu')
        expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
    })

    it('should call logout and show message, call router.push after timeout', async () => {
        await wrapper.get('.user-profile-dropdown div').trigger('click')
        expect(store.state.user.isLogin).toBeFalsy()
        expect(message.success).toHaveBeenCalledTimes(1)
        jest.runAllTimers()
        expect(mockedRoutes).toEqual(['/'])
    })

    afterEach(() => {
        (message as jest.Mocked<typeof message>).success.mockReset()
    })
})

