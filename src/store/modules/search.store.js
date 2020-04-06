import activitiesStore from '@/store/modules/activities.store'

function search(state) {
  if (state.searchTerms.length === 0) {
    return activitiesStore.state.allActivities
  }

  return activitiesStore.state.allActivities.filter(it =>
    state.searchTerms.some(term =>
      it.title.toLowerCase().includes(term) ||
      it.brand.toLowerCase().includes(term) ||
      it.tags.includes(term)
    )
  )
}

const state = {
  searchTerms: []
}

const getters = {
  activities: state => search(state),
  filterByType: (_, getters) => type => getters.activities.filter(it => it.type === type),
  filterBySubtype: (_, getters) => subtype => getters.activities.filter(it => it.subtype === subtype)
}

const actions = {}

const mutations = {
  addSearchTerm(state, term) {
    let trimmedSearchTerm = term.trim().toLowerCase()
    if (trimmedSearchTerm === '' || state.searchTags.includes(trimmedSearchTerm)) {
      return
    }

    state.searchTerms.push(trimmedSearchTerm)
  },
  removeSearchTerm(state, term) {
    let trimmedSearchTerm = term.trim().toLowerCase()
    if (trimmedSearchTerm === '' || state.searchTags.includes(trimmedSearchTerm)) {
      return
    }

    state.searchTerms = state.searchTerms.filter(it => it === trimmedSearchTerm)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
