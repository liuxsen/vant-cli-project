# editor

需要实现一个图片上传函数

```js
type uploadFile = (file: File) => Promise<{
  default: string
}>
```

```html
<Editor :disabled="false" v-model="html"/>
```