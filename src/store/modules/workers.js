const state = {
    list: []
}

const mutations = {
    SET_WORKERS(state, list) {
        state.list = list
    }

}

const actions = {
    addWorkers({commit}) {
        const list = require('@/assets/data/workers.json')
        commit('SET_WORKERS', list)
    }
}

const getters = {
    test: () => 'tesyt'
}

export default {
    namespaced: true,
    state, 
    mutations,
    actions, 
    getters
}