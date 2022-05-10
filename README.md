# lego

## 自定义组件

### 支持属性展示和编辑的组件

- 必须提供一个属性传入需要编辑的值 默认为 value
- 必须提供一个事件发射出编辑后新的值 默认为 change

### template 语法

**优点**

- 指令多, 可以快速完成任务
- 基于 DOM 结构, 更容易理解
- 基于 template 分析做了很多优化

**缺点**

- 不够灵活

### JSX 或者 h 函数

**优点**

- 灵活, 可以利用 js 表达各种逻辑

**缺点**

- 可读性差
- 编译优化

结论: **优先选择 template, 当 template 写起来费劲时上 jsx**

### 注意第十周 4-3

### 静态图片展示

#### URL.createObjectURL()

- 静态方法,创建一个 DOMString, 返回一个 URL, URL 和 document 绑定, 表示指定的 File 对象

#### FileReader.readAsDataURL()

- FileReader 上的实例方法,读取指定的 File 对象 , 读取完成的时候触发回调, 返回 URL 格式的字符串(base64)

### 异同

- 返回值

  - fileReader.readAsDataURL(file) 返回 base64 字符串
  - URL.createObjectURL(file) 返回当前文件的内存 URL

- 执行机制

  - fileReader.readAsDataURL(file) 通过回调的机制, 异步执行
  - URL.createObjectURL(file) 直接返回, 同步执行

- 内存清理
  - fileReader.readAsDataURL(file) 依照 JS 垃圾回收机制自动清理
  - URL.createObjectURL(file) 存在于当前 document 内, 清除方式只有 unload()或者 revokeObjectURL() 手动清除

### 总结

- URL.createObjectURL(file) 同步使用, 方便快捷, 多次使用需要注意手动释放内存, 性能优秀
- fileReader.readAsDataURL(file) 直接转为 base64, 可以直接用于业务, 无需二次转换
