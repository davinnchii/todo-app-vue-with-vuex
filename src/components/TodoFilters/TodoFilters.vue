<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  filterParam: String,
  onParamChange: Function,
})
const store = useStore();

const todos = computed(() => store.getters.getTodos,
);
const filters = ['all', 'active', 'completed'];


const active = computed(() => {
  const activeTodos = todos.value.filter(({ completed }) => !completed);

  if (activeTodos.length === 1) {
    return activeTodos.length + ' item left';
  }

  return activeTodos.length
      ? activeTodos.length + ' items left'
      : 'Everything is done!';
});

function removeCompleted() {
  store.dispatch('clearCompleted')
}
</script>

<template>
  <footer class="footer" v-if="todos.length">
        <span class="todo-count" data-cy="todosCounter">
          {{ active }}
        </span>

    <ul class="filters">
      <li v-for="filter in filters" v-bind:key="filter">
        <a
            :href="`#/${filter}`"
            :class="{
            'selected' : filterParam === filter,
              }"
            @click="onParamChange(filter)"
        >
          {{ filter[0].toUpperCase() + filter.slice(1) }}
        </a>
      </li>
    </ul>

    <button
        type="button"
        class="clear-completed"
        @click="removeCompleted"
    >
      Clear completed
    </button>
  </footer>
</template>

<style scoped>

</style>