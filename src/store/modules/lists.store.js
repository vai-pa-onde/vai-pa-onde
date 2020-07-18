const LISTS_KEY = 'vpo-lists'

function updateLists(listById) {
  localStorage.setItem(LISTS_KEY, JSON.stringify(listById))
}

const state = {
  listIds: [],
  listById: {}
}

const getters = {
  getAll: state => state.listIds,
  getById: state => listId => state.listById[listId],
  getActivities: (state, _, __, rootGetters) => listId => rootGetters['search/activities'].filter(it => state.listById[listId].includes(it.id))
}

const actions = {
  load({ commit }) {
    const lists = JSON.parse(localStorage.getItem(LISTS_KEY) || '{}')
    commit('setLists', lists)
  }
}

const mutations = {
  setLists(state, lists) {
    state.listIds = Object.keys(lists)
    state.listById = lists
  },
  addToList(state, { listId, activityId }) {
    if (state.listById[listId].includes(activityId)) {
      return
    }

    state.listById[listId].push(activityId)
    updateLists(state.listById)
  },
  removeFromList(state, { listId, activityId }) {
    if (!state.listById[listId].includes(listId)) {
      return
    }

    state.listById[listId] = state.listById[listId].filter(it => it !== activityId)
    updateLists(state.listById)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
