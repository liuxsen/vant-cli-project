<template>
<div>
  <Editor v-if="show" :disabled="disabled" v-model="html" :uploadFile="uploadFile"/>
  <button @click="disabled = !disabled">toggle</button>
  <button @click="show =!show">toggle if</button>
  <div class="ck-content">
    <div v-html="html"></div>
  </div>
  <input type="text" v-model="html">
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
      show: true,
      html: '',
      uploadFile: (file) => {
        return new Promise((resolve, reject) => {
          resolve({
            default: 'https://img1.baidu.com/it/u=2863108920,4275403644&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281'
          })
        })
      }
    }
  },
  mounted(){
    setTimeout(() => {
      this.html = `<h1>阿斯顿了开发商的了富凯就啊地方</h1><p>adf,adsfasdsadfasdf</p><p>asdf</p><p>asdf</p><p>asdf</p><p>asdf</p><p>asdf</p><p>asd</p><p>fasd</p><p>fa</p><p>sdfasd</p><p>f</p>`
    }, 2000)
  }
}
</script>