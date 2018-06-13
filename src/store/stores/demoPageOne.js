/* demo page one 接口备注 */
import ajax from '@/utils/ajax'

const actions = {
  /* 接口功能备注 */
  'a:demoPageOne/getXXXXXXXXX' ({commit}, params) {
    return ajax.api({
      cmd: 'xxxxxxx/demoPageOne/getXXXXXXXXX',
      parameters: params
    })
  }
}

export default {
  actions
}
