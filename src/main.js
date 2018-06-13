// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iview from 'iview'
import 'babel-polyfill'

Vue.use(iview)
Vue.config.productionTip = false

Vue.prototype.alert = (msg, type) => {
  switch (type) {
    case 'info':
      iview.Notice.info({
        title: '提示',
        desc: msg || '服务器开小差了~',
        duration: 5
      })
      break
    case 'success':
      iview.Notice.success({
        title: '成功',
        desc: msg || '服务器开小差了~',
        duration: 3
      })
      break
    case 'warning':
      iview.Notice.warning({
        title: '警告',
        desc: msg || '服务器开小差了~',
        duration: 5
      })
      break
    default :
      iview.Notice.error({
        title: '错误',
        desc: msg || '服务器开小差了~',
        duration: 5
      })
      break
  }
}

// 清除原有提示(Notice)
Vue.prototype.clearNotice = () => {
  iview.Notice.destroy()
}

// 错误信息提示列表(Notice)
Vue.prototype.noticeList = (msgList) => {
  iview.Notice.destroy()
  if (msgList.length > 3) {
    iview.Notice.warning({
      title: '提示',
      desc: '请完善页面信息！',
      duration: 5
    })
  } else {
    for (let i in msgList) {
      iview.Notice.info({
        title: '提示',
        desc: msgList[i],
        duration: 5
      })
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
