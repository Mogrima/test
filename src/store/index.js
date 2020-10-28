import Vuex from 'vuex'
import Vue from 'vue'

import workers from './modules/workers'

Vue.use(Vuex)

const modules = {
    workers
}

export default new Vuex.Store({
    modules
})
