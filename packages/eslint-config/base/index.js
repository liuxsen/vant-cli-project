module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true
  },
  extends: [
    'standard',
    'eslint:recommended'
  ],
  rules: {
    'object-curly-newline': ['error', {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true, minProperties: 3
      }
    }]
  }
}
