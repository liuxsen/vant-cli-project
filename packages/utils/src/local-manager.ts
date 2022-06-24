import dayjs, { ManipulateType } from 'dayjs'
export class LocalManager {
  productName: string
  name: string
  timeout: string // 时间戳
  constructor(productName: string, name: string){
    this.productName = productName
    this.name = name
  }
  /**
   * 设置local
   * @param val 值
   * @param timeOut 过期时间
   */
  set(val: string, timeOutVal: number, timeoutUnit: ManipulateType){
    const timeout = dayjs().add(timeOutVal, timeoutUnit).format('YYYY-MM-DD HH:mm:ss')
    this.timeout = timeout
    const key = [this.productName, this.name].join('$')
    localStorage.setItem(key, val)
    const timeoutKey = [this.productName, this.name, 'timeout'].join('$')
    localStorage.setItem(timeoutKey, this.timeout)
  }
  get(){
    const localKey = [this.productName, this.name].join('$')
    const localVal = localStorage.getItem(localKey)
    const timeoutKey = [this.productName, this.name, 'timeout'].join('$')
    const timeoutVal = localStorage.get(timeoutKey)
    const isOld = Date.now() - new Date(timeoutVal).getTime() < 0
    if(isOld){
      // remove
      localStorage.removeItem(localKey)
      localStorage.removeItem(timeoutKey)
      return ''
    } else {
      return localVal
    }
  }
}