/**
 * url?list=a,b,c&name=foo => {list: [a,b,c], name: foo}
 * @param url string
 * @returns object
 */
export const queryToObj = (url: string) => {
  const theRequest: Record<string, any> = {}
  if (url.includes('?')) {
    url = url.slice(1)
  }
  const strs = url.split('&')
    for (let i = 0; i < strs.length; i++) {
      const arr = strs[i].split('=')
      const key = decodeURIComponent(arr[0])
      let val: string | string[] = decodeURIComponent(arr[1])
      if(val.includes(',')){
        val = val.split(',')
      }
      theRequest[key] = val
    }
  return theRequest
}

export const objToQuery = (obj: Record<string | number, any>) => {
  return Object.keys(obj).map((key) => {
    let val = obj[key]
    if(Array.isArray(val)){
      val = val.join(',')
    }
    return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
  }).join('&')
}