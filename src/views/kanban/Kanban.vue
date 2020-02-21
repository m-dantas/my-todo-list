<template>
  <div class="container-board">
    <h2>Board</h2>
    <div class="columns">

      <div class="column col-5">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">Todo</div>
          </div>
          <div class="panel-body">
            <Todo
            v-for="todo in unCheckeds"
            :key="todo.id" 
            :todo="todo"
            @toggle="toggleTodo"
            @remove="removeTodo"/>
          </div>
          <div class="panel-footer">
            <button
              class="btn btn-link float-right" 
              v-if="unCheckeds.length > 0"
              @click="checkedAll"
            >
              Concluir tudo
            </button>
          </div>
        </div>
      </div>

      <div class="column col-5">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title">Done</div>
          </div>
          <div class="panel-body">
            <Todo
              v-for="todo in checkeds"
              :key="todo.id"
              :todo="todo"
              @toggle="toggleTodo"
              @remove="removeTodo"/>
          </div>
          <div class="panel-footer">
            <button
              class="btn btn-link float-right"
              v-if="checkeds.length > 0"
              @click="removeAllChecked"
            >
              <span class="text-error">Remover tudo</span>
            </button>
            <button
              class="btn btn-link float-right"
              v-if="checkeds.length > 0"
              @click="unCheckedAll"
            >
              Desmarcar tudo
            </button>            
          </div>
        </div>
      </div>

    </div>
  </div>  
</template>

<script>
import Todo from '@/components/Todo'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Kanban',
  components: {
    Todo
  },
  computed: {
    ...mapGetters(['unCheckeds', 'checkeds'])
  },
  methods: {
    ...mapActions([
      'removeTodo', 
      'toggleTodo',
      'checkedAll',
      'unCheckedAll',
      'removeAllChecked'
    ])
  }
}
</script>

<style scoped>
.container-board {
  height: calc(100vh - 138px);
  padding: 10px;
}

.columns {
  height: 100%;
}

.columns .column .panel {
  border: 0;
  box-shadow: 0 0.25rem 1rem rgba(48, 55, 66, .15);
  height: 100%;
}
</style>