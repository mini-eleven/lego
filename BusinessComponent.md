# 组件

## 业务组件

- 创建编辑器 vuex store 结构, 画布循环展示组件
- 组件实现 (使用 loadsh 分离样式属性)
- 添加通用和特殊属性, 转换为 props 类型
- 抽取重用逻辑(代码复用 style 和跳转)
- 组件库点击添加到画布里的逻辑完善

## 组件属性对应表单组件的展示和更新

- 获得正在被编辑的元素, vuex getter
- 创建属性和表单组件的对应关系
- 使用 PropsTable 将传入的属性渲染为对应的表单组件
- 丰富对应关系字段支持更多自定义配置
- 使用标准流程更新表单并实时同步 **单向数据流**

## Vue 组件渲染的真谛和不同的写法

- VitrualDOM
- createVNode 和 h 函数
- template 写法
- **JSX 写法**
- SFC 单文件格式, 函数式组件, render function 格式

## 要点

- typescript 在实际项目中的实践
- 开发展示和编辑的属性表达组件的真题
  - 必须提供一个属性传入需要编辑的值 默认为 value
  - 必须提供一个事件发射出编辑后的新值 默认为 change
- vue 组件的返回, 以及 template 和 JSX 的异同
