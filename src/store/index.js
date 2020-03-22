import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

import authenticatedClient from './modules/clients/authenticatedHttpClient'
import AuthorizationHeaderTransformer from './http/authorizationHeaderTransformer'

Vue.use(Vuex)
const store = new Vuex.Store({ modules })

const authorizationHeaderTransformer = new AuthorizationHeaderTransformer(store)
authenticatedClient.addTransformer(authorizationHeaderTransformer)

export default store
