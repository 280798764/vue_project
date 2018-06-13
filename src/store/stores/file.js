/* 文件上传接口 */
import ajax from '@/utils/ajax'

const actions = {
  'a:file/fileUpload' ({commit}, {file, cmd}) {
    return ajax.apiFileUpload(file, cmd)
  }
}

export default {
  actions
}
