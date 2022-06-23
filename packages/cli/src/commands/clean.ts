import fse from 'fs-extra'
import { ES_DIR, LIB_DIR, DIST_DIR } from '../common/constant'

const { remove } = fse
export const clean = async () => {
  try {
    await remove(ES_DIR)
    await remove(LIB_DIR)
    await remove(DIST_DIR)
  } catch (error) {
  }
}
