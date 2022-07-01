# HUI

## install

- npm install @fostars/h-ui
  - 请确保npmrc配置了私有仓库地址
- 配置nuxt项目需要配置如下，否则会导致引入包发生错误

```js
// nuxt.config.js
build.standalone: true
```

全局安装

```js
import Vue from 'vue'
import HUI from '@fostars/h-ui'
Vue.use(HUI)
```

## components

- [Table](./src/Table/README.md)
- [Editor](./src/Editor/README.md)