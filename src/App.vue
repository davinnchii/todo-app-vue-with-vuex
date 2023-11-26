<script setup>
import { computed, ref } from 'vue';
import TodoHeader from "@/components/Header/TodoHeader.vue";
import TodoList from "@/components/TodoList/TodoList.vue";
import TodoFilters from "@/components/TodoFilters/TodoFilters.vue";
import { useStore } from "vuex";
import ErrorModal from "@/components/ErrorModal/ErrorModal.vue";

const store = useStore();
const filterParam = ref('all');
const todos = computed(() => store.getters.getTodos,
);
const hasError = ref(false);

</script>

<template>
  <div class="todoapp">
    <TodoHeader :onError="() => hasError = true"/>
    <TodoList v-if="todos.length" :filterParam="filterParam"/>
    <TodoFilters
        :filterParam="filterParam"
        :onParamChange="(newParam) => filterParam = newParam"
    />
    <Transition name="modal">
      <Teleport to="body">
        <ErrorModal v-if="hasError" :isActive="hasError" @close="hasError = false"/>
      </Teleport>
    </Transition>
  </div>
</template>

<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";

.todoapp h1 {
  top: -90px;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
</style>