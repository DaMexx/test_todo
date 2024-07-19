import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useTodoStore } from "./todo";
import { storeToRefs } from "pinia";

export const usePaginationStore = defineStore("pagination", () => {
  const todosStore = computed(() => useTodoStore());
  const { todosToShow } = storeToRefs(todosStore.value);
  const currentPage = ref(1);

  const numberOfPages = computed(() => {
    return Math.ceil(todosToShow.value.length / 5);
  });

  const setPage = (page: number) => {
    if (page < 1) {
      currentPage.value = 1;
    } else if (page > numberOfPages.value) {
      currentPage.value = numberOfPages.value;
    } else {
      currentPage.value = page;
    }
  };

  const previousPage = () => {
    setPage(currentPage.value - 1);
  };
  const nextPage = () => {
    setPage(currentPage.value + 1);
  };

  return { currentPage, numberOfPages, setPage, previousPage, nextPage };
});
