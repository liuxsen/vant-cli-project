module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    // 'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0
  }
}
