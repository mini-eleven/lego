# vue3 相关

## vue 中的 3 种实例

### vue3 - Application Instance

- createApp 创建一个 **Application Instance**
- 应用实例用来注册应用中的全局内容
- 大部分支持链式调用, 返回**应用实例**
- [https://v3.vuejs.org/guide/instance.html](https://v3.vuejs.org/guide/instance.html)
- 为什么这样修改??

```typescript
const app = createApp(App)
```

### 组件实例 Component Instance

- createApp 传递的那个组件, 称之为 root component
- mount 方法用来:
  - 将应用实例挂载到 DOM 节点上
  - 返回的不是**应用实例**, 而是**组件实例**

```typescript
const vm = app.mount('#app')
```

### 组件内部实例 - Internal Component Instance

- getCurrentInstance()
- 混合实例
- proxy, 可以拿到**组件实例**上的内容
- appContext, 可以拿到**应用实例**上的内容

```typescript
setup() {
    const internal = getCurrentInstance()
    console.log(internal.proxy)
    console.log(internal.appContext)
}
```

## vue 中的四种通信方法

### 父组件访问子组件实例

- \$refs
- 在 composition API 中, 使用 template refs, 在 setup 中创建 ref 对象返回, 在 template 中添加同名的 ref 属性
- https://v3.vuejs.org/guide/composition-api-template-refs.html#template-refs

### 子组件访问父组件

- 通过 getCurrentInstance 获取当前组件
- 在当前组件实例上, 有一个特殊的属性\$parent, 可以取到父组件(可一直向上取到根父组件)
- **注意** ,直接调用父组件上的方法和属性, 破坏了单向数据流, 谨慎使用

### 使用 Provide/Inject 完成子组件到父组件的多级访问

- 属性传递和\$parent 在多级传递时非常繁琐
- 使用 provide 和 inject 完成跨级传递
- 响应式对象也可被 provide
- https://v3.vuejs.org/guide/component-provide-inject.html

### 使用事件监听完成父子组件通信

- 特殊情况:比如父组件中有 slot, 子组件是以 slot 形式存在的,没法添加 ref

```html
// parent.vue
<div><slot></slot></div>

//app.vue
<parent>
  <child />
</parent>
```

- vue2 中的$on,$off 等已被废除
- 官方推荐 mitt 第三方库
