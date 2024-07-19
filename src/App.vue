<script setup lang="ts">
import { useTodoStore, type Todo } from "@/stores/todo";
import { computed, ref } from "vue";
import TodoList from "@/components/TodoList.vue";
import ControlButtons from "@/components/ControlButtons.vue";
import Pagination from "./components/Pagination.vue";

const store = useTodoStore();
const newText = ref("");

const { addTodo } = store;
const onAddTodo = () => {
  if (!newText.value) {
    return;
  }
  const newTodo: Todo = {
    id: parseInt(crypto.randomUUID().replace(/-/g, ""), 16),
    text: newText.value,
    isDone: false
  };
  addTodo(newTodo);
  newText.value = "";
};
</script>

<template>
  <main class="main">
    <Pagination />
    <section class="input-block">
      <input
        class="input-block__input"
        type="text"
        @keyup.enter="onAddTodo"
        placeholder="Enter new todo"
        v-model="newText"
      />
      <button class="input-block__button" @click="onAddTodo">Add</button>
    </section>
    <ControlButtons />
    <section class="todos-block">
      <TodoList />
    </section>
  </main>
</template>

<style scoped>
.main {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
}

.input-block,
.todos-block {
  width: 100%;
  padding: 30px 0;
}

.input-block {
  display: flex;
  gap: 5px;
}

.input-block__input {
  width: 100%;
  padding: 5px 10px;
}

/* 
.todos-block {

} */
</style>
