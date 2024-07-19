<script setup lang="ts">
import { computed, ref } from "vue";
import { usePaginationStore } from "@/stores/pagination";
import { storeToRefs } from "pinia";
const store = usePaginationStore();
const { currentPage, numberOfPages } = storeToRefs(store);
const { setPage, previousPage, nextPage } = store;
console.log("numberOfPages", numberOfPages);
</script>
<template>
  <section class="pagination">
    <button class="pagination__button" v-for="number in 10" :key="number">
      {{ number }}
    </button>
  </section>
</template>

<style scoped>
.pagination__button {
  padding: 5px 10px;
}
</style>
