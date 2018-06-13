/* 常用函数 */
import { DOMAIN } from './config'
import iview from 'iview'
import enumParams from '@/const/enumData'

export default {
  // 获取列表常量
  getEnumParams () {
    return enumParams
  },
  // 通过id获取name共通方法
  getNameById (id, listName) {
    let name = ''
    for (let item of enumParams[listName]) {
      if (item.id === id || item.id === parseInt(id)) {
        name = item.name
        break
      }
    }
    return name
  },
  // 列表页面过滤参数存储
  setFilterParams (params) {
    sessionStorage.setItem('paramsFilter', JSON.stringify(params))
  },
  // 列表页面过滤参数获取
  getFilterParams (params) {
    return JSON.parse(sessionStorage.getItem('paramsFilter')) || {}
  },
  // 列表页面 页码存储
  setPage (page) {
    sessionStorage.setItem('page', page)
  },
  // 列表页面 页码获取
  getPage () {
    return sessionStorage.getItem('page') || -1
  },
  // 验证手机号码格式
  isMobilePhone (mobile) {
    return mobile && /(^13\d{9}$)|(^14)[5,7,9]\d{8}$|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^17)[0,1,3,5,6,7,8]\d{8}$|(^18\d{9}$)/.test(mobile)
  },
  // 验证固定电话格式
  isTelephone (telephone) {
    return telephone && /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/.test(telephone)
  },
  // 验证邮编格式
  isPostcode (postcode) {
    return postcode && /^[1-9][0-9]{5}$/.test(postcode)
  },
  // 验证传真
  isFax (fax) {
    return fax && /^(\d{3,4}-)?\d{7,8}$/.test(fax)
  },
  // 验证字符串（数字、字母、下划线）
  isNumberLetterUnderline (str) {
    return str && /^\w+$/.test(str)
  },
  // 验证字符串（数字、字母）
  isNumberLetter (str) {
    return str && /^[A-Za-z0-9]+$/.test(str)
  },
  // 验证数字
  isNumber (str) {
    return str && /^[0-9]+$/.test(str)
  },
  // 验证字符串（汉字）
  isCharacter (str) {
    return str && /^[\u4e00-\u9fa5]{0,}$/.test(str)
  },
  // 时间格式化
  dateFormat (date, fmt = 'yyyy-MM-dd hh:mm:ss') { // author: meizz
    if (date) {
      if (Object.prototype.toString.call(date) !== '[object Date]') {
        if (Object.prototype.toString.call(date) === '[object String]') {
          date = date.toString().replace(/-/g, '/')
        }
        date = new Date(date)
      }
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    } else {
      return ''
    }
  },
  // 金额格式化(千位符格式)
  formatMoney (money, n) {
    n = n >= 0 && n <= 20 ? n : 2
    if (money === '' || money === undefined) return ''
    money = parseFloat((money + '').replace(/[^[0-9].-]/g, '')).toFixed(n) + ''
    let l = money.split('.')[0].split('').reverse()
    let r = money.split('.')[1] || ''
    let t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    let suffix = ''
    if (r) {
      suffix = '.' + r
    }
    return t.split('').reverse().join('') + suffix
  },
  // 金额格式化（正则格式化整数）
  miliFormat (num) {
    let DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g
    let MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g
    return num => num && num.toString().replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ','))
  },
  // 文件下载（iFrame）
  downloadFileByIFrame (src, type) {
    let iframe = ''
    // 判断页面是否有iframe标签
    if (document.getElementsByTagName('iframe').length) {
      iframe = document.getElementsByTagName('iframe')[0]
    } else {
      iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
    }
    iframe.src = (type === 'wms' ? DOMAIN.fileFTPWMS : DOMAIN.fileFTP) + src
  },
  // 添加selected字段
  addFiledSelected (list) {
    list.forEach(function (item) {
      item.selected = false
    })
    return list
  }
}

export const alert = (msg, type) => {
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
    default:
      iview.Notice.error({
        title: '错误',
        desc: msg || '服务器开小差了~',
        duration: 5
      })
      break
  }
}
