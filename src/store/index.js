import { createStore } from 'vuex'

export default createStore({
  state: {
    treasure: [],
    location: [
      {
        latitude: 0,
        longitude: 0,
        name: ''
      }
    ],
    user: {
      platform: '',
      name: '',
      email: ''
    },
  },
  getters: {
    getAll(state) {
      return state.treasure
    },
    getById: (state) => (_id) => {
      return state.treasure.find(t => t._id == _id)
    },
    getLocation(state) {
      return state.location
    },
    getUser(state) {
      return state.user
    },
    getSearchTreasure: (state) => (location,difficulty,distance) => {
      return state.treasure.filter(t => 
        t.location.city == location.city &&
        t.location.province == location.province &&
        t.location.country == location.country &&
        t.difficulty == difficulty &&
        t.distance <= distance
      )
    },
    getSearchTreasureNoDiff: (state) => (location,distance) => {
      return state.treasure.filter(t => 
        t.location.city == location.city &&
        t.location.province == location.province &&
        t.location.country == location.country &&
        t.distance <= distance
      )
    },
  },

  mutations: {
    ADD_TREASURE (state, {treasure}) {
      state.treasure.push(treasure)
    },
    ADD_SCORE (state, {id,score}) {
      let treasure = state.treasure.find(t => {
        return t._id == id
      })
      if (treasure) {
        treasure.score = score
      }
    },
    ADD_USER (state, {user}) {
      state.user = user
    },
    ADD_DISTANCE (state, {id,distance}) {
      let treasure = state.treasure.find(t => {
        return t._id == id 
      })
      if(treasure) {
        treasure.distance = distance
      }
    },
    ADD_LOCATION(state,{location}) {
      state.location = location
    }
  },

  actions: {
    addTreasure({commit},{treasure}) {
      commit('ADD_TREASURE',{treasure})
    },
    addScore({commit},{id,score}) {
      commit('ADD_SCORE',{id,score})
    },
    addUser({commit},{user}) {
      commit('ADD_USER',{user})
    },
    addDistance({commit},{id,distance}) {
      commit('ADD_DISTANCE',{id,distance})
    },
    addLocation({commit},{location}) {
      commit('ADD_LOCATION',{
        location: location
      })
    }
  },
  modules: {
  }
})
