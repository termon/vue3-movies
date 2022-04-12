<script setup lang="ts">
import store from "../store";
    
const props = defineProps<{
  total: number,
}>()
    
</script>

<template>

<nav >
  <ul className="pagination">
    <li class="page-item">
        <a class="page-link" v-on:click="store.prevPage" :disabled="!(store.isPrevPage)"> Prev</a>
    </li>  
    <li class="page-item">
        <a class="page-link" v-on:click="store.nextPage" :disabled="!store.isNextPage">Next</a>
    </li>  
  </ul>
</nav>  
</template>


