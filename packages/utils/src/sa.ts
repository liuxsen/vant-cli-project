import { objToQuery } from "./query"
// 埋点函数
// https://fostars.yuque.com/xhkj/wus4l3/fhngm3

// https://pub-xinghunet-pro.oss-cn-shanghai-finance-1-pub.aliyuncs.com/sa/sensorsdata.min.js
const sdkUrl = 'https://pub-xinghunet-pro.oss-cn-shanghai-finance-1-pub.aliyuncs.com/sa/sensorsdata.min.js'

export class Sa {
  project: string
  env: string
  url: string
  host: string
  constructor({
    project,
    env,
    host
  }: {
    project: string
    env: 'product' | 'test'
    host: string
  }) {
    this.project = project
    this.env = env
    this.host = host
    const queryInfo = {
      project: this.project,
      remark: this.env
    }
    const queryStr = objToQuery(queryInfo)
    this.url = `${host}/sa.gif?${queryStr}`
    // window.sensors = window.sensorsDataAnalytic201505
  }
  init(){
    const options = {
      server_url: this.url,
		  is_track_single_page:true, // 单页面配置，默认开启，若页面中有锚点设计，需要将该配置删除，否则触发锚点会多触发 $pageview 事件
      use_client_time:true,
      send_type:'beacon',
      heatmap: {
        //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
        clickmap:'not_collect',
        //是否开启触达图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
        scroll_notice_map:'not_collect'
      }
    }
    // this.sensors = window['sensorsDataAnalytic201505'];
    sensors.init(options)
  }
  autoTrack(){
    if(typeof(window.sensorsDataAnalytic201505) !== 'undefined'){
      return false
    }
    window.sensorsDataAnalytic201505 = 'sensors'
    const script = document.createElement('script')
    script.async = true
    script.src = sdkUrl
    script.setAttribute('charset','UTF-8');
    const firstScript = document.getElementsByTagName('script')[0]
    if(!window.sensors){
      window.sensors = (a: any) => {
        (window.sensors._q = window.sensors._q || []).push(
          a, arguments
        )
      }
    }
    window.sensors.para = {
      name: 'sensors',
      server_url: this.url,
      sdkUrl,
      heatmap: {}
    }
    firstScript.parentNode?.insertBefore(script, firstScript)
  }
  // 注册公共属性
  registerPage(options: Record<string, string | number>){
    sensors.registerPage(options)
  }
  // 自动全埋点
  quick(){
    sensors.quick('autoTrack');
  }
  // 打开页面停留事件
  listenPageLeave(){
    sensors.use('PageLeave');
  }
  // 设置用户profile
  setProfile(p: Parameters<typeof sensors.setProfile>[0]){
    sensors.setProfile(p)
  }
  // 注册自定义事件
  registerPlugin(p: object){
    let registerPlugin = sensors.use('RegisterProperties');
    // {
    //   events:['pageOpen'],
    //   properties: {
    //     radradaI:'',
    //     radaName:''
    //   }
    // }
    registerPlugin.register(p)
  }
  track(eventName: string, p: object){
    sensors.track(eventName, p)
  }
}