import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import insuranceService from './modules/insuranceService'
import vehicle from './modules/vehicle'
import system from './modules/system'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    vehicle,
    insuranceService,
    system,

  },
  getters
})

export default store
