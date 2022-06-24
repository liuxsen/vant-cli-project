<template>
<div>
  <Button/>
  <div @click="test1">test utils</div>
</div>
</template>

<script lang="ts">
import Button from '../Button.vue'
import { LocalManager } from '@fostars/utils'
const lm = new LocalManager('product', 'name')
export default {
  components: {
    Button
  },
  methods: {
    test1(){
      console.log(LocalManager)
      lm.set('val', 1, 'day')
    }
  }
}
</script>
