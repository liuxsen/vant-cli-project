/**
 * 下载文件流
 * @param blob 文件流
 * @param filename 文件名字
 * @param type 文件类型 "application/excel"
 */
export function downloadStreamBlob (blob, filename, type = 'application/excel') {
  // if (navigator.appVersion.toString().indexOf('.NET') > 0) {
  //   window.navigator.msSaveBlob(blob, filename)
  // } else {
  // 防止重复添加a链接
  const oOldA = document.getElementById('downloadstream')
  if (oOldA) {
    document.body.removeChild(oOldA)
  }
  // let filename = "设备导出{0}.xlsx".format(vpms.core.date.format("yyyyMMddhhmmss"));
  const binaryData = []
  const oAElement = document.createElement('a')
  oAElement.setAttribute('id', 'downloadstream')
  binaryData.push(blob)
  const URL = window.URL || window.webkitURL // 兼容处理
  const url = URL.createObjectURL(new Blob(binaryData, { type }))

  oAElement.href = url
  oAElement.download = filename
  oAElement.click()
  URL.revokeObjectURL(url)
  // }
}

/**
 * 由于 window.open 如果是在异步情况下打开，会被浏览器拦截，所以，需要做处理
 * @param url 下载链接 可以是http 或者 oss
 */
export function downloadUtil (url) {
  // 防止重复添加a链接
  const oOldA = document.getElementById('download_a')
  if (oOldA) {
    document.body.removeChild(oOldA)
  }

  const oElDom = document.createElement('a')
  document.body.appendChild(oElDom)
  oElDom.setAttribute('href', url)
  oElDom.setAttribute('target', '_blank')
  oElDom.setAttribute('id', 'download_a')
  // 因为提示可能有动画，这里做延迟操作，先展示提示
  oElDom.click()
}
