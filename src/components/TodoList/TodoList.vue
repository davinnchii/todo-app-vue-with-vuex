<script setup>
import { computed, ref } from "vue";
import { getFilteredTodos } from "@/utils/getFilteredTodos";
import { useStore } from "vuex";

const store = useStore();
const editedTodo = ref();
const newTodoTitle = ref();

const props = defineProps({
  filterParam: String,
})

const todos = computed(() => store.getters.getTodos,
);
const allActive = computed(() => todos.value.every(todo => todo.completed));
const visibleTodos = computed(() => (getFilteredTodos(todos.value, props.filterParam)
))

function toggleAll(completed) {
  store.dispatch('toggleAll', completed);
}

let beforeEditCache = '';

function handleEditTodo(todo) {
  beforeEditCache = todo.title;
  editedTodo.value = todo;
  newTodoTitle.value = todo.title
}

function handleCancelEdit() {
  editedTodo.value = null;
  newTodoTitle.value = beforeEditCache;
}

function handleRemoveTodo(todo) {
  store.dispatch('removeTodo', todo);
}

function handleDoneEdit(todo) {
  if (editedTodo.value && editedTodo.value !== beforeEditCache) {
    editedTodo.value = null;
    store.dispatch('editTodo', { todo, title: newTodoTitle.value.trim() })
    newTodoTitle.value = '';
  }

  if (!newTodoTitle.value) {
    handleRemoveTodo(todo);
  }
}

function checkTodo(todo) {
  store.dispatch('toggleTodo', todo);
}

</script>

<template>
  <section class="main">
    <input
        type="checkbox"
        id="toggle-all"
        class="toggle-all"
        @click="toggleAll(!allActive)"
    />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <li
          v-for="todo in visibleTodos"
          class="todo"
          :class="{'completed': todo.completed, 'editing': todo === editedTodo}"
          :key="todo.id">
        <div class="view">
          <input
              type="checkbox"
              class="toggle"
              :checked="todo.completed"
              @change="checkTodo(todo)"
          />
          <label
              for="toggle-view"
              @dblclick="handleEditTodo(todo)"
          >
            {{ todo.title }}
          </label>
          <button
              type="button"
              class="destroy"
              @click="handleRemoveTodo(todo)"
          />
        </div>
        <input
            v-if="todo === editedTodo"
            type="text"
            class="edit"
            v-model="newTodoTitle"
            @keyup.esc="handleCancelEdit(todo)"
            @keydown.enter="handleDoneEdit(todo)"
            @blur="handleDoneEdit(todo)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>

</style>