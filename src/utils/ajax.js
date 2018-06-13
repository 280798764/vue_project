/* 访问Wms项目 */
import axios from 'axios'
import {DOMAIN, TOKEN_NAME} from '@/utils/config'

axios.defaults.baseURL = DOMAIN.apiPath

export default {
  // 登陆后私有接口使用
  api (data) {
    return new Promise((resolve, reject) => {
      data.parameters.iToken = sessionStorage.getItem(TOKEN_NAME)
      axios.post('/', data).then(
        res => {
          let resData = res.data
          if (resData.error) {
            // 登陆失败
            if (resData.error.errorCode === '100' || resData.error.errorCode === 100) {
              // 重定向到登陆页面
              sessionStorage.clear()
              window.location.pathname = ''
            } else {
              reject(resData.error)
            }
          } else {
            resolve(resData.response)
          }
        }
      ).catch(
        res => {
          const error = {
            errorCode: res.status,
            errorInfo: '服务器开小差了~~'
          }
          reject(error)
        }
      )
    })
  },
  // 无需登录公有接口使用
  apiPublic (params) {
    return new Promise((resolve, reject) => {
      axios.post('/', params).then(
        res => {
          if (res.data.error) {
            reject(res.data.error)
          } else {
            resolve(res.data.response)
          }
        }
      ).catch(
        res => {
          const error = {
            errorCode: res.status,
            errorInfo: res.statusText
          }
          reject(error)
        }
      )
    })
  },
  // 文件上传至自家服务器
  apiFileUpload (file, cmd) {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append('file', file)
      formData.append('token', sessionStorage.getItem('token'))
      axios.post(DOMAIN.fileFTPWMS + cmd, formData).then(
        res => {
          if (res.data.error) {
            reject(res.data.error)
          } else {
            resolve(res.data)
          }
        }
      ).catch(
        res => {
          const error = {
            errorCode: res.status,
            errorInfo: '服务器开小差了~~'
          }
          reject(error)
        }
      )
    })
  },
  // 获取文件上传至七牛需要的token
  apiGetQiNiuToken () {
    return new Promise((resolve, reject) => {
      this.apiPublic({
        cmd: 'support/file/requestUploadToken',
        parameters: {
          appID: 'oncall',
          appCode: '',
          appType: '',
          bizId: 1
        }
      }).then(
        res => {
          resolve(res)
        },
        rej => {
          reject(rej)
        }
      )
    })
  },
  // 文件上传至七牛
  apiUploadQiNiu (file) {
    return new Promise((resolve, reject) => {
      this.apiPublic({
        cmd: 'support/file/requestUploadToken',
        parameters: {
          appID: 'oncall',
          appCode: '',
          appType: '',
          bizId: 1
        }
      }).then(
        res => {
          let token = res
          let formData = new window.FormData()
          formData.append('token', token)
          formData.append('file', file)
          return axios.post(DOMAIN.qiNiu, formData).then(
            res => {
              resolve(res.data)
            },
            rej => {
              resolve(rej)
            }
          )
        },
        rej => {
          console.log(rej.errorInfo)
          resolve(rej)
        })
    })
  }
}
