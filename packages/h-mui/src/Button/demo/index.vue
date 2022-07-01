<template>
<div>
  <Button/>
  <div @click="test1">set local</div>
  <div @click="test2">get local</div>
  <button @click="testSa">auto track</button>
  <button @click="testSa2">auto track2</button>
</div>
</template>

<script lang="ts">
import Button from '../Button.vue'
import { LocalManager, Sa } from '../../../../utils/src/index'
const lm = new LocalManager({
  appName: 'h5-pro',
  productName: 'jrb',
  name: 'form'
})
const sa = new Sa({
  project: 'app_xinghu',
  env: 'test',
  host: 'https://sa.fostars.com'
  // '/sa.gif?project=app_xinghu'
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
    },
    testSa2(){
      sa.track('clickEvent', {
        name: 'name',
        customData: '1111111111111111'
      })
    }
  }
}
</script>
