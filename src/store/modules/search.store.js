const sortMethods = {
  PUBLISHED_AT: 'publishedAt',
  VALID_UNTIL: 'validUntil'
}

function sortByValidUntilDate(a, b) {
  if (!a.validUntilDate && !b.validUntilDate) {
    return sortByPublishedAtDate(a, b)
  }

  if (a.validUntilDate && b.validUntilDate) {
    return a.validUntilDate - b.validUntilDate
  }

  if (a.validUntilDate) {
    return -1
  }

  return 1
}

function sortByPublishedAtDate(a, b) {
  return b.publishedAtDate - a.publishedAtDate
}

function search(state, activities) {
  if (state.sortBy === sortMethods.VALID_UNTIL) {
    activities.sort(sortByValidUntilDate)
  } else {
    activities.sort(sortByPublishedAtDate)
  }

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
  terms: [],
  sortBy: sortMethods.PUBLISHED_AT
}

const getters = {
  activities: (state, _, rootState, __) => search(state, rootState.activities.allActivities),
  favorites: (state, _, rootState, __) => search(state, rootState.activities.allActivities).filter(it => rootState.favorites.activities.includes(it.id)),
  filterByType: (state, _, __, rootGetters) => type => search(state, rootGetters['activities/getByType'](type)),
  filterBySubtype: (state, _, __, rootGetters) => subtype => search(state, rootGetters['activities/getBySubtype'](subtype))
}

const actions = {}

const mutations = {
  addTerm(state, term) {
    window.fbq('track', 'Search')

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
  changeSort(state, sortBy) {
    state.sortBy = sortBy
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
