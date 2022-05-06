import { h, VNode } from "vue"
import { TextComponentProps } from "./defaultProps"

export interface PropToForm {
    component: string
    subComponent?: string
    extraProps?: { [key: string]: any }
    text?: string
    options?: { text: string | VNode; value: any }[]
    initalTransform?: (v: any) => any
    afterTransform?: (v: any) => any
    valueProp?: string
    eventName?: string
}

export type PropsToForms = {
    [P in keyof TextComponentProps]?: PropToForm
}

const fontFamilyArr = [
    { text: '无', value: '' },
    { text: '宋体', value: '"Simsun","STSong"' },
    { text: '黑体', value: '"SimHei","STHeiti"' },
    { text: '楷体', value: '"KaiTi","STKaiti"' },
    { text: '仿宋', value: '"FangSong", "STFangsong" ' }
]
const fontFamilyOptions = fontFamilyArr.map(font => {
    return {
        value: font.value,
        text: h('span', { style: { fontFamily: font.value } }, font.text)
    }
})

export const mapPropsToForms: PropsToForms = {
    text: {
        component: 'a-input',
        text: '文本',
        afterTransform: (e: any) => e.target.value
    },
    fontSize: {
        component: 'a-input-number',
        text: '字号',
        initalTransform: (v: string) => parseInt(v),
        afterTransform: (e: number) => e ? `${e}px` : ''
    },
    lineHeight: {
        component: 'a-slider',
        extraProps: { min: 0, max: 3, step: 0.1 },
        text: '行高',
        initalTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e.toString()
    },
    textAlign: {
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        text: '对齐',
        options: [
            { text: '左', value: 'left' },
            { text: '中', value: 'center' },
            { text: '右', value: 'right' }
        ],
        afterTransform: (e: any) => e.target.value
    },
    fontFamily: {
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '字体',
        options: [
            { text: '无', value: '' },
            ...fontFamilyOptions
        ],
    }
}                