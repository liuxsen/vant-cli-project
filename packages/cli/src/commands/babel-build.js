const babel = require('@babel/core')
const path = require('path')
const babelConfigPath = path.join(__dirname, '../../.babelrc.js')
babel.transform(`
let a = 1;
const b = () => {}
class c {}
`, {
  configFile: babelConfigPath
}, function (err, res) {
  console.log(err, res)
})
