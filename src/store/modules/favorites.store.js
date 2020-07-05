const FAVORITES_KEY = 'vpo-favorites'

const state = {
  activities: []
}

const getters = {}

const actions = {
  load({ commit }) {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
    commit('setFavorites', favorites)
  }
}

const mutations = {
  setFavorites(state, favorites) {
    state.activities = favorites
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
