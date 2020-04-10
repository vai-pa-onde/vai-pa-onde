function search(state, activities) {
  if (state.terms.length === 0) {
    return activities
  }

  return activities.filter(it =>
    state.terms.every(term =>
      it.title.toLowerCase().includes(term) ||
      it.brand.toLowerCase().includes(term) ||
      it.tags.includes(term)
    )
  )
}

const state = {
  terms: []
}

const getters = {
  activities: (state, _, rootState, __) => search(state, rootState.activities.allActivities),
  filterByType: (state, _, __, rootGetters) => type => search(state, rootGetters['activities/getByType'](type)),
  filterBySubtype: (state, _, __, rootGetters) => subtype => search(state, rootGetters['activities/getBySubtype'](subtype))
}

const actions = {}

const mutations = {
  addTerm(state, term) {
    let trimmedSearchTerm = term.trim().toLowerCase()
    if (trimmedSearchTerm === '' || state.terms.includes(trimmedSearchTerm)) {
      return
    }

    state.terms.push(trimmedSearchTerm)
  },
  removeTerm(state, term) {
    let trimmedSearchTerm = term.trim().toLowerCase()
    if (trimmedSearchTerm === '' || !state.terms.includes(trimmedSearchTerm)) {
      return
    }

    state.terms = state.terms.filter(it => it !== trimmedSearchTerm)
  },
  reset(state) {
    state.terms = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
