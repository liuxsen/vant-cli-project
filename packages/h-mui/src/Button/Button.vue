<template>
<div>
  <span>{{count}}</span>
  <button class="btn">
    <span class="success" @click="add">+ </span>
  </button>
</div>
</template>

<script>
export default {
  name: "h-button",
  data(){
    return {
      count: 0
    }
  },
  methods: {
    add(){
      this.count++
    }
  }
}
</script>


<style lang="less" scoped>
.btn {
  color: red;
  font-size: 20px;
}
</style>

<style lang="less" scoped>
.btn .success {
  color: green
}
</style>