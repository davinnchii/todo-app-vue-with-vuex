<script setup>
const props = defineProps({
onError: Function,
})


import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const newTodoTitle = ref('');

function handleAddTodo(newTodoTitle) {
  if (newTodoTitle.trim()) {
    return {
      id: +new Date(),
      title: newTodoTitle.trim(),
      completed: false,
    };
  }
}


function handleSubmit(event) {
  event.preventDefault();
  if (!newTodoTitle.value.trim()) {
    props.onError(true);

    return;
  }
  store.dispatch('addTodo', handleAddTodo(newTodoTitle.value))
  newTodoTitle.value = '';
}

</script>

<template>
  <header class="header">
    <h1>todos</h1>

    <form
        @submit="handleSubmit"
    >
      <input
          type="text"
          class="new-todo"
          placeholder="What needs to be done?"
          v-model="newTodoTitle"
      />
    </form>
  </header>
</template>
<style>
</style>