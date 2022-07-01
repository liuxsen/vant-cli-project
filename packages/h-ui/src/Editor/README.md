# editor

> pc端富文本组件

需要实现一个图片上传函数

```js
type uploadFile = (file: File) => Promise<{
  default: string
}>
```

```html
<Editor :disabled="false" v-model="html" :uploadFile="uploadFile"/>
```

如果是在移动端显示，由于不需要显示pc端组件，只是显示，所以只需要引入ckeditor的样式即可

样式cdn地址为： `https://pub-xinghunet-pro.oss-cn-shanghai-finance-1-pub.aliyuncs.com/lib/ckeditor/editor.css`