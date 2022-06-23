import Vue from 'vue'
import { documents } from 'site-desktop-shared'
import VueRouter, { type RouteConfig } from 'vue-router'
import { decamelize } from '../common'
console.log(documents)

Vue.use(VueRouter)

const parseName = (name: string) => {
  if (name.indexOf('_') !== -1) {
    const pairs = name.split('_')
    const component = pairs.shift()
    return {
      component: `${decamelize}`
    }
  }
}

const names = Object.keys(documents)

names.forEach(name => {
  const item = documents[name]
  if (item.install) {
    Vue.use(item)
  }
})

const getRoutes = () => {
  const routes: RouteConfig[] = [
  ]
  names.forEach(name => {
    routes.push({
      name: `${name}`,
      path: `/${name}`,
      component: documents[name],
      meta: {
        name
      }
    })
  })
  return routes
}

export const router = new VueRouter({
  routes: getRoutes()
})
