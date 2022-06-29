require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    '../base/index.js',
    'plugin:vue/recommended',
    '@vue/eslint-config-typescript'
  ],
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 2
      },
      multiline: {
        max: 2
      }
    }],
    // https://eslint.vuejs.org/rules/multi-word-component-names.html
    'vue/multi-word-component-names': 0
  }
}
