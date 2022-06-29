<template>
  <HTable
    :total="200"
    :border="true"
    :data="list"
    :columns="columns"
    @load="onLoad"
    :pn.sync="pn"
    :size.sync="size"
  />
</template>

<script lang="ts">
import HTable from '../Table.vue'
export default {
  components: {
    HTable
  },
  data () {
    return {
      pn: 1,
      size: 20,
      list: [
        {
          id: 10001,
          name: 'Test1',
          role: 'Develop',
          sex: 'Man',
          age: 28,
          address: 'test abc'
        },
        {
          id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'
        },
        {
          id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'
        },
        {
          id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai'
        }
      ],
      columns: [
        {
          label: 'id', prop: 'id'
        },
        {
          label: '姓名', prop: 'name'
        },
        {
          label: '角色', prop: 'role'
        },
        {
          label: '性别', prop: 'sex'
        },
        {
          label: '年龄', prop: 'age'
        },
        {
          label: '地址', prop: 'address'
        }
      ]
    }
  },
  methods: {
    onLoad ({ size, pn }: {size: number, pn: number}) {
      console.log(size, pn)
    }
  }
}
</script>
