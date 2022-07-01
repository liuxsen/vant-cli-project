// dom操作
// insert dom
export const insertScript = (url: string, onload?: (e: Event) => void) => {
  const scripts = document.getElementsByTagName('script')
  const hasScript = Array.from(scripts).findIndex(script => {
    const src = script.getAttribute('src')
    return src === url
  }) > -1
  if(hasScript){
    return
  }
  let head = document.querySelector('head');
  const script = document.createElement('script')
  script.async = true
  script.src = url
  const firstScript = document.getElementsByTagName('script')[0]
  // firstScript.parentNode?.insertBefore(script, firstScript)
  if(onload){
    script.onload = onload
  }
  head?.appendChild(script)
}