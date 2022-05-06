import { TextComponentProps } from "./defaultProps"

export interface PropToForm {
    component: string
    subComponent?: string
    value?: string
    extraProps?: { [key: string]: any }
    text?: string
    options?: { text: string; value: any }[]
    initalTransform?: (v: any) => any
    valueProp?: string
}

export type PropsToForms = {
    [P in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForms: PropsToForms = {
    text: {
        component: 'a-input',
        text: '文本'
    },
    fontSize: {
        component: 'a-input-number',
        text: '字号',
        initalTransform: (v: string) => parseInt(v)
    },
    lineHeight: {
        component: 'a-slider',
        extraProps: { min: 0, max: 3, step: 0.1 },
        text: '行高',
        initalTransform: (v: string) => parseFloat(v)
    },
    textAlign: {
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        text: '对齐',
        options: [
            { text: '左', value: 'left' },
            { text: '中', value: 'center' },
            { text: '右', value: 'right' }
        ]
    },
    fontFamily: {
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '字体',
        options: [
            { text: '无', value: '' },
            { text: '宋体', value: '"Simsun","STSong"' },
            { text: '黑体', value: '"SimHei","STHeiti"' },
            { text: '楷体', value: '"KaiTi","STKaiti"' },
            { text: '仿宋', value: '"FangSong", "STFangsong" ' }
        ]
    }
}                