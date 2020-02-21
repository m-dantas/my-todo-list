import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
  * state: estado atual da variavel
  * dispatch: serve para chamar uma outra action
  * commit: aplica o novo estado da variavel de state
*/

const state = {
  todos: [],
  loading: false
}

// chamadas das funções feitas nas mutations
const actions = {
  addTodo ({ commit }, todo) {
    commit('setLoading', true)
    return new Promise(resolve => {
      setTimeout(() => {
        todo.id = Date.now()

        commit('addTodo', todo)
        commit('setLoading', false)
        resolve(todo)
      }, 500)
    })
  },
  toggleTodo ({ commit }, todo) {
    commit('toggleTodo', todo)
  },
  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  },
  checkedAll ({ commit, state }) {
    const uncheckeds = state.todos.filter(todo => !todo.checked).map(todo => todo.id)
    commit('toggleList', uncheckeds)
  },
  unCheckedAll ({ commit, state }) {
    const checkeds = state.todos.filter(todo => todo.checked).map(todo => todo.id)
    commit('toggleList', checkeds)
  },
  removeAllChecked ({ commit, state }) {
    const checkeds = state.todos.filter(todo => todo.checked).map(todo => todo.id)
    commit('removeList', checkeds)
  }
}

const getters = {
  unCheckeds (state) {
    return state.todos.filter(todo => todo.checked === false)
  },
  checkeds (state) {
    return state.todos.filter(todo => todo.checked === true)
  }
}

// mutations: funções da aplicação
const mutations = {
  addTodo (state, payload) {
    state.todos.push(payload)
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  toggleTodo (state, payload) {
    const index = state.todos.findIndex(item => item.id === payload.id)

    if (index > -1) {
      const checked = !state.todos[index].checked
      // $set funçao do vue para atualizar informações passando por todo o ciclo de vida
      Vue.set(state.todos, index, {...state.todos[index], checked})
    }
  },
  removeTodo (state, payload) {
    state.todos = state.todos.filter(item => item.id !== payload.id)
  },
  toggleList (state, todosIds) {
    const todos = state.todos.map(item => {
      return todosIds.includes(item.id) ? { ...item, checked: !item.checked } : item
    })
    state.todos = todos
  },
  removeList (state, todosIds) {
    const todos = state.todos.filter(item => !todosIds.includes(item.id))
    state.todos = todos
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store