import http from '../http'
import parse from 'csv-parse'

const spreadsheetId = '2PACX-1vRqN0edpOYftetA6gUkMDPONc5o2NHKG9yJLrzDtbhxe-SUqCHMgNaUodI8o4Q4pOX66iDHPGMLC7D2'

function search(state) {
  if (!state.searchString) {
    return state.allActivities
  }

  const searchString = state.searchString
  return state.allActivities.filter(it =>
    it.title.toLowerCase().includes(searchString) || it.brand.toLowerCase().includes(searchString)
  )
}

function findRecommendations(activities, activity) {
  const filteredActivities = activities.filter(it => it.id !== activity.id)

  const activityById = {}
  filteredActivities.forEach(it => { activityById[it.id] = it })

  const countById = {}
  filteredActivities.forEach(it => { countById[it.id] = 0 })

  activity.tags.forEach(tag =>
    filteredActivities.forEach(it => {
      if (it.tags.includes(tag)) {
        countById[it.id]++
      }
    })
  )

  return Object.entries(countById).sort((a, b) => b[1] - a[1]).map(it => activityById[it[0]])
}

const state = {
  loaded: false,
  searchString: null,
  allActivities: []
}

const getters = {
  all: state => search(state),
  filterByType: state => type => search(state).filter(it => it.type === type),
  filterBySubtype: state => subtype => search(state).filter(it => it.subtype === subtype),
  getById: state => id => state.allActivities.find(it => it.id === id),
  recommendations: state => activity => findRecommendations(state.allActivities, activity)
}

const actions = {
  async fetch({ commit }) {
    try {
      const csv = await http
        .get(`/spreadsheets/d/e/${spreadsheetId}/pub?gid=514874226&single=true&output=csv`)
        .then(data => data.text())

      parse(csv, { columns: true }, (err, output) => {
        if (err) {
          throw err
        }

        output.forEach(it => {
          let newTags = []
          if (it.tags.length > 0) {
            newTags = it.tags.split(',').map(it => it.trim())
          }

          Object.assign(it, {
            tags: newTags,
            image: it.image || require(`@/assets/${it.type}-fallback.png`)
          })
        })

        commit('SET_ALL_ACTIVITIES', output)
        commit('SET_LOADED')
      })
    } catch {}
  },
  doSearch({ commit }, searchString) {
    let trimmedSearchString = searchString.trim()
    if (trimmedSearchString === '') {
      commit('SET_SEARCH_STRING', null)
    }

    commit('SET_SEARCH_STRING', trimmedSearchString.toLowerCase())
  }
}

const mutations = {
  SET_ALL_ACTIVITIES(state, activities) {
    state.allActivities = activities
  },
  SET_LOADED(state) {
    state.loaded = true
  },
  SET_SEARCH_STRING(state, searchString) {
    state.searchString = searchString
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
