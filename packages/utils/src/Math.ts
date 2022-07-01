/**
 * 获取随机的字符串
 * @returns string
 */
export const getRandomId = () => {
  return `${Math.random().toString(36).substring(3, 8)}`
}