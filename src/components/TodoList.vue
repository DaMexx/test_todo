<script setup lang="ts">
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";
import Todo from "@/components/Todo.vue";
const store = useTodoStore();
const { todosToShow } = storeToRefs(store);
const { removeTodo, editTodo } = store;
</script>

<template>
  <ul class="todo-list">
    <Todo
      v-for="todo in todosToShow"
      :key="todo.id"
      :todo="todo"
      :remove-todo="removeTodo"
      :edit-todo="editTodo"
    />
  </ul>
</template>

<style scoped>
.todo-list {
  list-style: none;
}
</style>
