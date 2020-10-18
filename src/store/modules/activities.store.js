import config from '@/config'
import { googleClient as http } from '../http'

const spreadsheetId = '1NkJy0tkkY0jFT5LvqGdACKOj-afefbIm1k186KBrBbA'
const apiKey = config.googleApiKey

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
  getBySubtype: state => (type, subtype) => state.allActivities.filter(it => it.type === type && it.subtype === subtype),
  recommendations: state => activity => findRecommendations(state.allActivities, activity)
}

const actions = {
  async fetch({ commit }) {
    try {
      const csv = await http
        .get(`/v4/spreadsheets/${spreadsheetId}/values/activities_v2?key=${apiKey}`)
        .then(data => data.json())

      const headers = csv.values[0]
      const output = csv.values.splice(1).map(it => {
        const obj = {}

        it.forEach((val, i) => {
          obj[headers[i]] = val
        })

        let newTags = []
        if (obj.tags.length > 0) {
          newTags = obj.tags.split(',').map(it => it.trim().toLowerCase())
        }

        Object.assign(obj, {
          tags: newTags,
          publishedAtDate: convertToDate(obj.publishedAt),
          validUntilDate: convertToDate(obj.validUntil)
        })

        return obj
      })

      const today = new Date()
      const sortedActivities = output
        .filter(it => it.deleted === 'FALSE')
        .filter(it => it.validUntilDate === null || isAfter(it.validUntilDate, today))
        .sort((a, b) => a.publishedAtDate < b.publishedAtDate)

      commit('SET_ALL_ACTIVITIES', sortedActivities)
      commit('SET_LOADED')
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
