import http from '../http'
import parse from 'csv-parse'

const spreadsheetId = '2PACX-1vRqN0edpOYftetA6gUkMDPONc5o2NHKG9yJLrzDtbhxe-SUqCHMgNaUodI8o4Q4pOX66iDHPGMLC7D2'

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

function convertToDate(date) {
  const splittedDate = date.split('/')
  if (splittedDate.length !== 3) {
    return null
  }

  return new Date(`20${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}T00:00:00`)
}

function isAfter(date, today) {
  return date.getYear() >= today.getYear() && date.getMonth() >= today.getMonth() && date.getDate() >= today.getDate()
}

const state = {
  loaded: false,
  allActivities: []
}

const getters = {
  getById: state => id => state.allActivities.find(it => it.id === id),
  getByType: state => type => state.allActivities.filter(it => it.type === type),
  getBySubtype: state => subtype => state.allActivities.filter(it => it.subtype === subtype),
  recommendations: state => activity => findRecommendations(state.allActivities, activity)
}

const actions = {
  async fetch({ commit }) {
    try {
      const csv = await http
        .get(`/spreadsheets/d/e/${spreadsheetId}/pub?gid=843317981&single=true&output=csv`)
        .then(data => data.text())

      parse(csv, { columns: true }, (err, output) => {
        if (err) {
          throw err
        }

        output.forEach(it => {
          let newTags = []
          if (it.tags.length > 0) {
            newTags = it.tags.split(',').map(it => it.trim().toLowerCase())
          }

          Object.assign(it, {
            tags: newTags,
            image: it.image || require(`@/assets/fallback.png`),
            publishedAtDate: convertToDate(it.publishedAt),
            validUntilDate: convertToDate(it.validUntil)
          })
        })

        const today = new Date('2020-04-18T01:00:00')
        const sortedActivities = output
          .filter(it => it.deleted === 'FALSE')
          .filter(it => it.validUntilDate === null || isAfter(it.validUntilDate, today))
          .sort((a, b) => a.publishedAtDate < b.publishedAtDate)

        commit('SET_ALL_ACTIVITIES', sortedActivities)
        commit('SET_LOADED')
      })
    } catch {}
  }
}

const mutations = {
  SET_ALL_ACTIVITIES(state, activities) {
    state.allActivities = activities
  },
  SET_LOADED(state) {
    state.loaded = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
