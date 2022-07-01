import Editor from './Editor.vue'

export const install = (app) => {
  app.component(Editor.name, Editor)
}

export default Editor
