interface TSetProfile {
  unionId: string
  openId: string
  mobile: string
  platform: 'mini' | 'web' // 平台
}

declare namespace sensors {
  function init (options: object): void
  function registerPage(options: object): void
  function quick(p: string):void
  function use(p: string): {
    register (p: object): void
  }
  function track(eventName: string, p: object): void
  function setProfile(p: TSetProfile): void
}

interface Window {
  test: string;
  sensorsDataAnalytic201505: any
  sensors: sensors
}