<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import store from "../store"
import { IImage } from "../types";
    
const props = defineProps<{
  posters: IImage[],
}>()

onMounted(() => {
    console.log('mounted carousel')
})
</script>

<template>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <!-- images -->
        <div class="carousel-inner">
            <div v-for="(p,i) in posters" key="i" :class="i == 0 ? 'carousel-item active' : 'carousel-item'">
                <img :src="store.posterUrl(p.file_path)" class="d-block w-100" alt="..." />
            </div> 
        </div>
        <!-- navigation -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        
    </div>
</template>



