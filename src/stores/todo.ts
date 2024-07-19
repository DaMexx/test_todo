import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { usePaginationStore } from "./pagination";
export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

export const useTodoStore = defineStore("todo", () => {
  const paginationStore = computed(() => usePaginationStore());
  const { currentPage, numberOfPages } = storeToRefs(paginationStore.value);

  const todos = ref<Todo[]>([]);
  const currentFilter = ref("all");
  const isAllTodosDone = computed({
    get() {
      if (!todos.value.length) {
        return false;
      }
      return todos.value.every((todo) => todo.isDone) || false;
    },
    set(value) {
      if (!todos.value.length) {
        return false;
      }
      if (value) {
        setStatusForAllTodos(value);
      }

      if (!value) {
        setStatusForAllTodos(value);
      }
    }
  });

  const todosToShow = computed<Todo[]>(() => {
    if (currentFilter.value === "all") {
      return todos.value;
    } else if (currentFilter.value === "active") {
      return todos.value.filter((todo) => !todo.isDone);
    } else if (currentFilter.value === "completed") {
      return todos.value.filter((todo) => todo.isDone);
    }
    return [];
  });

  const countActiveTodos = computed(() => {
    return todos.value.filter((todo) => todo.isDone).length;
  });

  const countCompletedTodos = computed(() => {
    return todos.value.filter((todo) => !todo.isDone).length;
  });

  const countAllTodos = computed(() => {
    return todos.value.length;
  });

  const addTodo = (todo: Todo) => {
    todos.value.push(todo);
  };

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const checkTodo = (id: number) => {
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
  };

  const editTodo = (id: number, text: string) => {
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
  };

  const clearCompletedTodos = () => {
    todos.value = todos.value.filter((todo) => !todo.isDone);
  };

  const setFilter = (filter: "all" | "active" | "completed") => {
    currentFilter.value = filter;
  };

  const completeAllTodos = () => {
    todos.value = todos.value.map((todo) => {
      todo.isDone = true;
      return todo;
    });
  };

  const setStatusForAllTodos = (status: boolean = false) => {
    todos.value = todos.value.map((todo) => {
      todo.isDone = status;
      return todo;
    });
  };

  return {
    todosToShow,
    countActiveTodos,
    countCompletedTodos,
    countAllTodos,
    currentFilter,
    isAllTodosDone,
    addTodo,
    removeTodo,
    checkTodo,
    editTodo,
    clearCompletedTodos,
    setFilter,
    completeAllTodos
  };
});
