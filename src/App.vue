<script setup>
import { ref } from 'vue';
import TodoHeader from "@/components/Header/TodoHeader.vue";
import TodoList from "@/components/TodoList/TodoList.vue";
import TodoFilters from "@/components/TodoFilters/TodoFilters.vue";

const filterParam = ref('all');

</script>

<template>
  <div class="todoapp">
    <TodoHeader />
    <TodoList :filterParam="filterParam" />
    <TodoFilters
        :filterParam="filterParam"
        :onParamChange="(newParam) => filterParam = newParam"
    />
  </div>
</template>

<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";
</style>