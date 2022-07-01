<template>
<div>
  <Editor :disabled="disabled" v-model="html" :uploadFile="uploadFile"/>
  <button @click="disabled = !disabled">toggle</button>
  <div v-html="html"></div>
</div>
</template>

<script>
import Editor from '../Editor.vue'
export default {
  components: {
    Editor
  },
  data(){
    return {
      disabled: false,
      html: '<h1>阿斯顿了开发商的了富凯就啊地方</h1><p>adf,adsfasdsadfasdf</p><p>asdf</p><p>asdf</p><p>asdf</p><p>asdf</p><p>asdf</p><p>asd</p><p>fasd</p><p>fa</p><p>sdfasd</p><p>f</p>',
      uploadFile: (file) => {
        return new Promise((resolve, reject) => {
          resolve({
            default: 'https://img1.baidu.com/it/u=2863108920,4275403644&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281'
          })
        })
      }
    }
  }
}
</script>