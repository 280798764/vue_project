/* homepage 接口备注 */
import ajax from '@/utils/ajax'

const actions = {
  /* 接口功能备注 */
  'a:homepage/getXXXXXXXXX' ({commit}, params) {
    return ajax.api({
      cmd: 'xxxxxxx/homepage/getXXXXXXXXX',
      parameters: params
    })
  }
}

export default {
  actions
}
