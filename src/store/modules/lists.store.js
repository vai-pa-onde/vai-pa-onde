import uniqid from 'uniqid'
import { hri } from 'human-readable-ids'
import { cuttlyClient as http } from '../http'

const LISTS_KEY = 'vpo-lists'
const SHARING_DATA_KEY = 'vpo-lists-sharing'

function updateLists(state) {
  localStorage.setItem(LISTS_KEY, JSON.stringify(state.listById))
  localStorage.setItem(SHARING_DATA_KEY, JSON.stringify(state.sharingDataById))
}

function updateToken(sharingDataById, listId, activities) {
  const currentSharingData = sharingDataById[listId]
  const newToken = createToken(listId, activities)

  if (newToken === currentSharingData.token) {
    return
  }

  sharingDataById[listId] = { token: newToken }
}

function filterActivities(rootGetters, activities) {
  return rootGetters['search/activities'].filter(it => activities.includes(it.id))
}

function createToken(id, activities) {
  const stringified = JSON.stringify({ name: id, activities })
  return btoa(stringified)
}

const state = {
  listIds: [],
  listById: {},
  sharingDataById: {}
}

const getters = {
  getAll: state => state.listIds,
  getById: state => listId => state.listById[listId],
  getSharingData: state => listId => state.sharingDataById[listId],
  getActivities: (state, _, __, rootGetters) => listId => filterActivities(rootGetters, state.listById[listId]),
  getSharedListActivities: (_, __, ___, rootGetters) => activities => filterActivities(rootGetters, activities)
}

const actions = {
  load({ commit }) {
    const lists = JSON.parse(localStorage.getItem(LISTS_KEY) || '{}')
    const sharingData = JSON.parse(localStorage.getItem(SHARING_DATA_KEY) || '{}')

    Object.entries(lists)
      .filter(entry => !sharingData[entry[0]])
      .forEach(entry => {
        sharingData[entry[0]] = {}
        sharingData[entry[0]].token = createToken(entry[0], entry[1])
      })

    commit('setLists', { lists, sharingData })
  },
  async createUrl({ state, commit }, listId) {
    const currentUrl = state.sharingDataById[listId].url
    if (currentUrl) {
      return
    }

    const vpoUrl = encodeURIComponent(`https://vaipaonde.com.br/lista?list=${state.sharingDataById[listId].token}`)
    const name = uniqid(hri.random())
    try {
      await http.get(`api.php?key=e44fb42bc48e8bbba0d6f432a248974c72e66&short=${vpoUrl}&name=${name}`)
    } catch {}

    commit('assignUrl', { listId, url: `https://cutt.ly/${name}` })
  }
}

const mutations = {
  setLists(state, { lists, sharingData }) {
    state.listIds = Object.keys(lists)
    state.listById = lists
    state.sharingDataById = sharingData
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
    state.sharingDataById[listId] = createToken(id, [])

    updateLists(state)
  },
  addToList(state, { listId, activityId }) {
    if (state.listById[listId].includes(activityId)) {
      return
    }

    const activities = state.listById[listId]
    activities.push(activityId)
    state.listById[listId] = Object.assign([], activities)
    state.listById = Object.assign({}, state.listById)

    updateToken(state.sharingDataById, listId, activities)
    updateLists(state)
  },
  removeFromList(state, { listId, activityId }) {
    if (!state.listById[listId].includes(listId)) {
      return
    }

    state.listById[listId] = state.listById[listId].filter(it => it !== activityId)

    updateToken(state.sharingDataById, listId, state.listById[listId])
    updateLists(state)
  },
  assignUrl(state, { listId, url }) {
    state.sharingDataById[listId].url = url
    updateLists(state)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
