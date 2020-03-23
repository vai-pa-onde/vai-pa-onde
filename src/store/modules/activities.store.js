import http from '../http'
import parse from 'csv-parse'

const spreadsheetId = '2PACX-1vRqN0edpOYftetA6gUkMDPONc5o2NHKG9yJLrzDtbhxe-SUqCHMgNaUodI8o4Q4pOX66iDHPGMLC7D2'

const state = {
  allActivities: []
}

const getters = {}

const actions = {
  async fetch({ commit }) {
    try {
      const csv = await http.get(`/spreadsheets/d/e/${spreadsheetId}/pub?gid=514874226&single=true&output=csv`).then(data => data.text())
      parse(csv, { columns: true }, (err, output) => {
        if (err) {
          throw err
        }

        commit('SET_ALL_ACTIVITIES', output)
      })
    } catch {}
  }
}

const mutations = {
  SET_ALL_ACTIVITIES(state, activities) {
    console.log(activities)
    state.allActivities = activities
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
