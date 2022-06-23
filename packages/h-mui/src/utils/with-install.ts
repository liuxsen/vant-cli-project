export const withInstall = (component) => {
  return (Vue) => {
    Vue.component(component.name, component)
  }
}
