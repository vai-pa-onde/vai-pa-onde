const state = {
  sending: false
}

const getters = {}

const actions = {
  async sendSuggestion({ commit }, body) {
    commit('SET_SENDING', true)

    try {
      const formData = new FormData()
      Object.entries(body).forEach(entry => formData.append(entry[0], entry[1]))

      await fetch(`https://script.google.com/macros/s/AKfycbzfyLVJa-LID-4T2XArvjSGJufUh0GiboixuAPUzW1eqRb_YoSh/exec`, {
        method: 'POST',
        body: new URLSearchParams(formData)
      })
        .then(data => data.text())
    } catch {} finally {
      commit('SET_SENDING', false)
    }
  }
}

const mutations = {
  SET_SENDING(state, sending) {
    state.sending = sending
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
