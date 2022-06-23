import Vue from 'vue'
import App from './app.vue'
import HMUI from '@fostars/h-mui'

Vue.use(HMUI)

const app = new Vue(
  {
    render: h => h(App)
  }
)

app.$mount('#app')
