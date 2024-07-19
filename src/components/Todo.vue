<script setup lang="ts">
import { type Todo } from "@/stores/todo";
import { nextTick, ref, watch } from "vue";

interface Props {
  todo: Todo;
  removeTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
}

const props = defineProps<Props>();

const isEditing = ref(false);
const editableText = ref("");
const input = ref<HTMLInputElement | null>(null);

const onChangeTodo = async () => {
  editableText.value = props.todo.text;
  isEditing.value = true;
  await nextTick();
  input.value?.focus();
};

const onSaveTodo = () => {
  props.editTodo(props.todo.id, editableText.value);
  isEditing.value = false;
};

watch(isEditing, (newValue) => {
  if (newValue) {
    nextTick();
    input.value?.focus();
  }
});
</script>

<template>
  <li class="todo">
    <input type="checkbox" :checked="todo.isDone" v-model="todo.isDone" />
    <span v-if="!isEditing" class="todo__text" @dblclick="onChangeTodo">
      {{ todo.text }}
    </span>
    <input
      v-else
      ref="input"
      type="text"
      v-model="editableText"
      @keyup.enter="onSaveTodo"
      @blur="isEditing = false"
    />
    <button :disabled="todo.isDone" @click="removeTodo(todo.id)">x</button>
  </li>
</template>

<style scoped>
.todo {
  padding: 5px 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo__text {
  display: block;
  margin-right: 10px;
}
</style>
