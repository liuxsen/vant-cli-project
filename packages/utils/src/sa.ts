// @ts-nocheck
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
  }
  autoTrack(){
    const init = function(para) {
      var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
      if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
          return false;
      }
      w['sensorsDataAnalytic201505'] = n;
      w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
      var ifs = ['track','quick','register','use','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
      for (var i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i]);
      }
      if (!w[n]._t) {
        x = d.createElement(s), y = d.getElementsByTagName(s)[0];
        x.async = 1;
        x.src = p;
        x.setAttribute('charset','UTF-8');
        w[n].para = para;
        y.parentNode.insertBefore(x, y);
      }
    }
    init({
      use_client_time:true,
      send_type:'beacon',
      show_log: true,
      sdk_url: sdkUrl,
      heatmap_url: '',
      name: 'sensors',
      server_url: this.url,
      heatmap: {}
    });
    sensors.use('PageLeave');
    sensors.use('PageLoad');
  }
  // 注册公共属性
  registerPage(options: Record<string, string | number>){
    sensors.registerPage(options)
  }
  // 自动全埋点
  autoquick(){
    sensors.quick('autoTrack');
  }
  quick(quickName: string){
    sensors.quick(quickName);
  }
  // 设置用户profile
  setProfile(p: Parameters<typeof sensors.setProfile>[0]){
    sensors.setProfile(p)
  }
  // 注册自定义事件
  registerPlugin(p: object){
    let registerPlugin = sensors.use('RegisterProperties');
    registerPlugin.register(p)
  }
  track(eventName: string, p: object){
    sensors.track(eventName, p)
  }
}