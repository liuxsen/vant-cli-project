import Vue from 'vue'
import VueRouter, { type RouteConfig } from 'vue-router'
import { components } from 'site-demo-shared'

Vue.use(VueRouter)

console.log(components)
const getRoutes = () => {
  const routes: RouteConfig[] = components.map(item => {
    return {
      path: '/' + item.name,
      component: item.component
    }
  })
  return routes
}

export const router = new VueRouter({
  routes: getRoutes()
})
