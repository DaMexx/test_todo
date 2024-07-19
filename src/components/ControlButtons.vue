<script setup lang="ts">
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";
const store = useTodoStore();
const { clearCompletedTodos, setFilter, completeAllTodos } = store;
const {
  countActiveTodos,
  countCompletedTodos,
  countAllTodos,
  currentFilter,
  isAllTodosDone
} = storeToRefs(store);
</script>

<template>
  <section class="control-buttons">
    <button
      class="control-buttons__button"
      :class="{ 'control-buttons__button--active': currentFilter === 'all' }"
      @click="setFilter('all')"
    >
      All ({{ countAllTodos }})
    </button>
    <button
      class="control-buttons__button"
      :class="{ 'control-buttons__button--active': currentFilter === 'active' }"
      :disabled="countCompletedTodos === 0"
      @click="setFilter('active')"
    >
      Current ({{ countCompletedTodos }})
    </button>
    <button
      class="control-buttons__button"
      :class="{
        'control-buttons__button--active': currentFilter === 'completed'
      }"
      :disabled="countActiveTodos === 0"
      @click="setFilter('completed')"
    >
      Completed ({{ countActiveTodos }})
    </button>
    <button
      class="control-buttons__button"
      :class="{}"
      :disabled="countActiveTodos === 0"
      @click="clearCompletedTodos"
    >
      Clear completed
    </button>
    <input
      type="checkbox"
      v-model="isAllTodosDone"
      :disabled="countAllTodos === 0"
    />
  </section>
</template>

<style scoped>
.control-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 20px 0;
}

.control-buttons__button {
  padding: 10px;
  border-radius: 30px;
  border: none;
}

.control-buttons__button--active {
  background-color: green;
}
</style>
