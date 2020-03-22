import http from './clients/authenticatedHttpClient'

const state = {
  data: null
}

const getters = {}

const actions = {
  async exampleFetch({ commit }) {
    try {
      let response = await http.get('/nice/url').then(data => data.json())
      commit('SET_DATA', response)
    } catch {}

    return state.data
  }
}

const mutations = {
  SET_DATA(state, data) {
    state.data = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
