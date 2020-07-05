const FAVORITES_KEY = 'vpo-favorites'

function updateFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

const state = {
  activities: []
}

const getters = {
  isFavorite: state => id => state.activities.includes(id)
}

const actions = {
  load({ commit }) {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
    commit('setFavorites', favorites)
  }
}

const mutations = {
  setFavorites(state, favorites) {
    state.activities = favorites
  },
  addFavorite(state, id) {
    if (state.activities.includes(id)) {
      return
    }

    state.activities.push(id)
    updateFavorites(state.activities)
  },
  removeFavorite(state, id) {
    if (!state.activities.includes(id)) {
      return
    }

    state.activities = state.activities.filter(it => it !== id)
    updateFavorites(state.activities)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
