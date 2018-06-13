/* Vuex Store */
import Vue from 'vue'
import Vuex from 'vuex'

import common from './stores/common'
import file from './stores/file'
import homepage from './stores/homepage'
import demoPageOne from './stores/demoPageOne'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    common,
    file,
    homepage,
    demoPageOne
  }
})
