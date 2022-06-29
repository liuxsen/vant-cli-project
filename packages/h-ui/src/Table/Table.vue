<template>
  <div>
    <div>
      <vxe-table
        :data="data"
        size="small"
        :border="border"
      >
        <vxe-column
          type="seq" width="60"
        />
        <vxe-column
          v-for="(item) in columns" :key="item.prop"
          :field="item.prop"
          :title="item.label"
        />
      </vxe-table>
    </div>
    <div style="padding: 10px 0px;text-align: right;">
      <el-pagination
        :current-page="pn"
        :page-sizes="[20, 50, 100, 150, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import ElementUI from 'element-ui'
import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(VXETable)
Vue.prototype.$ELEMENT = {
  size: 'small', zIndex: 1000
}
Vue.use(ElementUI)
export default {
  name: 'HTable',
  components: {
  },
  props: {
    size: {
      type: Number, default: 20
    },
    pn: {
      type: Number, default: 1
    },
    total: {
      type: Number, default: 0
    },
    border: {
      type: Boolean, default: false
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onChange ({size, pn}) {
      this.$emit('load', {
        size: size,
        pn: pn
      })
    },
    onSizeChange (size) {
      this.$emit('update:size', size)
      this.$emit('update:pn', 1)
      this.onChange({size, pn: 1})
    },
    onCurrentChange (pn) {
      this.$emit('update:pn', pn)
      this.onChange({size: this.size, pn})
    }
  }
}
</script>
