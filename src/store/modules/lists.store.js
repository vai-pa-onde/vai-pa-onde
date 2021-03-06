const LISTS_KEY = 'vpo-lists'

function updateLists(listById) {
  localStorage.setItem(LISTS_KEY, JSON.stringify(listById))
}

function filterActivities(rootGetters, activities) {
  return rootGetters['search/activities'].filter(it => activities.includes(it.id))
}

const state = {
  listIds: [],
  listById: {}
}

const getters = {
  getAll: state => state.listIds,
  getById: state => listId => state.listById[listId],
  getActivities: (state, _, __, rootGetters) => listId => filterActivities(rootGetters, state.listById[listId]),
  getSharedListActivities: (_, __, ___, rootGetters) => activities => filterActivities(rootGetters, activities)
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
  createList(state, listId) {
    const id = listId.trim().toLowerCase()
    if (state.listById[id]) {
      return
    }

    const listIds = state.listIds
    listIds.push(id)

    state.listById[id] = []
    state.listIds = Object.assign([], listIds)

    updateLists(state.listById)
  },
  addToList(state, { listId, activityId }) {
    if (state.listById[listId].includes(activityId)) {
      return
    }

    const activities = state.listById[listId]
    activities.push(activityId)
    state.listById[listId] = Object.assign([], activities)
    state.listById = Object.assign({}, state.listById)

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
