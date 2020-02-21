<template>
  <div class="container grid-xs py-2">
      <form @submit.prevent="add(todo)">
        <div class="input-group">
          <input 
            type="text"
            v-model="todo.description"
            class="form-input"
            placeholder="Novo todo"
          >
          <button class="btn btn-primary input-group-btn" :class="{loading}">Adicionar</button>
        </div>
          
      </form>
      <div class="todo-list">
        <Todo 
          v-for="item in todos" 
          :key="item.id" 
          :todo="item" 
          @toggle="toggleTodo" 
          @remove="removeTodo"
        />
      </div>
    </div>
</template>

<script>
import Todo from '@/components/Todo'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Todo
  },
  data () {
    return {
      todo: { checked: false }
    }
  },
  computed: {
    ...mapState(['todos', 'loading'])
  },
  methods: {
    ...mapActions(['addTodo', 'toggleTodo', 'removeTodo']),
    async add (todo) {
      await this.addTodo(todo) // chamada da mutation do arquivo store.js
      this.todo = { checked: false }
    }
  }
}
</script>

<style scoped>
.todo-list {
  padding-top: 2rem;
}
</style>