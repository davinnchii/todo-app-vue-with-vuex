<script setup>
import { mdiAccount, mdiAlertCircle } from "@mdi/js";

const errorIcon = { mdiAlertCircle }

import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const hasError = ref(false);
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
    hasError.value = true;

    setTimeout(() => {
      hasError.value = false;
    }, 3000)

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
  <Transition>
    <v-alert
        v-if="hasError"
        closable
        text="Todo can't be empty!"
        type="error"
        variant="tonal"
    />
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>