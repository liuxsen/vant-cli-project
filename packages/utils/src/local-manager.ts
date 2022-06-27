import dayjs, { ManipulateType } from 'dayjs'

interface InputParams {
  appName: string, productName: string, name: string
}
export class LocalManager {
  appName: string
  productName: string
  name: string
  timeout: string // 时间戳
  constructor(
    {appName, productName, name}: InputParams){
    this.productName = productName
    this.name = name
    this.timeout = ''
    this.appName = appName
    if(!appName && !productName || !name){
      console.warn('初始化参数不完整, 请检查！')
    }
  }
  getKeyVal(){
    const localKey = [this.appName, this.productName, this.name].join('$')
    const timeoutKey = [this.appName, this.productName, this.name, 'timeout'].join('$')
    const localVal = localStorage.getItem(localKey) || ''
    const timeoutVal = localStorage.getItem(timeoutKey) || ''
    return {
      localKey,
      timeoutKey,
      localVal,
      timeoutVal
    }
  }
  /**
   * 设置local
   * @param val 值
   * @param timeOut 过期时间
   */
  set(val: string, timeOutVal: number, timeoutUnit: ManipulateType){
    const {localKey, timeoutKey} = this.getKeyVal()
    const timeout = dayjs().add(timeOutVal, timeoutUnit).format('YYYY-MM-DD HH:mm:ss')
    this.timeout = timeout
    localStorage.setItem(localKey, val)
    localStorage.setItem(timeoutKey, this.timeout)
  }
  /**
   * 获取保存的值
   * @returns string
   */
  get(){
    const { localVal, timeoutVal } = this.getKeyVal()
    if(!timeoutVal){
      return localVal
    }
    const isOld = Date.now() - new Date(timeoutVal).getTime() > 0
    if(isOld){
      this.remove()
      return ''
    } else {
      return localVal
    }
  }
  /**
   * 删除保存的值
   */
  remove(){
    const { localKey, timeoutKey } = this.getKeyVal()
    localStorage.removeItem(localKey)
    localStorage.removeItem(timeoutKey)
  }
}
