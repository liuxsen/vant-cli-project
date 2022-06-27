<template>
<div>
  <Button/>
  <div @click="test1">set local</div>
  <div @click="test2">get local</div>
  <div @click="testSa">auto track</div>
  <div @click="testSa1">click to track</div>
</div>
</template>

<script lang="ts">
import Button from '../Button.vue'
import { LocalManager, Sa } from '@fostars/utils'
const lm = new LocalManager({
  appName: 'h5-pro',
  productName: 'jrb',
  name: 'form'
})
const sa = new Sa({
  project: 'app_xinghu',
  env: 'test',
  host: 'http://10.200.10.143:8000/'
})
export default {
  components: {
    Button
  },
  methods: {
    test1(){
      console.log(LocalManager)
      lm.set('val', 1, 'day')
    },
    test2(){
      const val = lm.get()
      console.log('val', val)
    },
    testSa(){
      sa.autoTrack()
      setTimeout(() => {
        sa.init()
        sa.quick()
      }, 200)
    },
    testSa1(){
      
    }
  }
}
</script>
