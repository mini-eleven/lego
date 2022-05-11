# Webpack vs Rollup

## Webpack

### 大型 SPA 项目的模块化构建

- 通过各种 Loader 处理各种各样的静态资源
- 通过各种插件 Plugins 对整体文件进行一些处理
- Code splitting 将公共模块提取
- 提供一个 webpack-dev-server, 进行本地开发
- 支持 HMR 模块热替换

## Rollup

Rollup 设计之初就是面向 ES module 的, 构建出结构扁平, 性能出众的类库

### ES module 的规则

- import 只能作为模块顶层的语句出现, 不能出现在 function 里面或者 if 里
- ES import 的模块名只能是字符串常量
- 不管 import 语句出现在哪里, 在模块初始化的时候所有 import 都必须已经导入完成
- Tree shaking 机制, 目的就是将 es modules 打包生成特定的 JS 模块文件, 并减小体积

## Webpack 和 Rollup 对比

### webpack 优势

- 强大的生态插件
- 面向开发应用的特性支持 HMR, 按需加载, 公共模块提取
- 简化 Web 开发的环节, 图片自动转 base64, 资源的缓存(添加 chunkld)

### Rollup 优势

- 构建高效性能的模块文件, 这正是类库所需
- 编译出来的代码可读性好, 内容更小, 执行效率更高
- 配置较为简单
