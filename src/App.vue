<script setup>
import { computed, ref } from 'vue';
import TodoHeader from "@/components/Header/TodoHeader.vue";
import TodoList from "@/components/TodoList/TodoList.vue";
import TodoFilters from "@/components/TodoFilters/TodoFilters.vue";
import { useStore } from "vuex";

const store = useStore();
const filterParam = ref('all');
const todos = computed(() => store.getters.getTodos,
);

</script>

<template>
  <div class="todoapp">
    <TodoHeader/>
    <TodoList v-if="todos.length" :filterParam="filterParam"/>
    <TodoFilters
        :filterParam="filterParam"
        :onParamChange="(newParam) => filterParam = newParam"
    />
  </div>
</template>

<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";
</style>