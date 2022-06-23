import { readFileSync } from 'fs'

import { join } from 'path'
const findRootDir = (dir: string) => {
  return dir
}

// Toot paths
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const ES_DIR = join(ROOT, 'es')
export const LIB_DIR = join(ROOT, 'lib')
export const DIST_DIR = join(ROOT, 'dist')
export const LIB_DOCS = join(ROOT, 'docs')
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json')
export const POSTCSS_CONFIG_FILE = join(ROOT, 'postcss.config.js')

export const SRC_DIR = join(ROOT, 'src')
export const STYLE_DIR = join(ROOT, 'style')
export const DOCS_DIR = join(ROOT, 'docs')

export const SITE_SRC_DIR = join(__dirname, '..', '..', 'site')

export const getPckageJSON = () => {
  const rawJSON = readFileSync(PACKAGE_JSON_FILE, 'utf-8')
  return JSON.parse(rawJSON)
}

export const getVueVersion = () => {
  const rawJSON = readFileSync(PACKAGE_JSON_FILE, 'utf-8')
  const hasV2 = rawJSON.includes('"vue": "2"')
  if (hasV2) {
    return '2'
  } else {
    return '3'
  }
}
