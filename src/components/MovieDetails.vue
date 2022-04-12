<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import store from "../store"
import { IMovie } from '../types'
    
import Carousel from './Carousel.vue'    

const props = defineProps<{
  movie: IMovie,
}>()
    
onMounted(() => {
    console.log('mounted moviedetails')
})
</script>

<template>
<div v-if="movie" class="card shadow-lg p-3 mb-5">

    <!-- card body -->
    <div class="row g-0">        
      <div class="col-md-4">
          <!-- display carousel or poster -->
        <Carousel v-if="movie.images.backdrops.length > 1" :posters="movie.images.backdrops" />  
        <img v-else :src="store.posterUrl(movie.poster_path)" class="card-img-top img-fluid" alt="..."/>      
      </div> 
      <div class="col-md-8">
        <div class="card-body">
            <h4 class="card-title">{{movie.title}} <span class="badge bg-info fs-6">{{movie.vote_average}}</span></h4>
            <h5 class="fs-5">Released <span class="fs-6 text-muted">{{ movie.release_date }}</span></h5>
            <h5 className="card-subtitle mb-2 text-muted">
              Cast (<span v-for="(c,i) in movie.credits.cast.slice(0, 4)" key="i">{{c.name + ' '}} </span>)
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Crew (<span v-for="(c,i) in movie.credits.crew.slice(0, 4)" key="i">{{c.name + ' '}} </span>)
            </h6>
            <p class="card-text">{{ movie.overview }}</p>
            <p> Runtime <span class="badge rounded-pill bg-primary">{{movie.runtime}}</span></p>   
        </div>
      </div>
    </div>
</div> <!-- card -->
    
</template>    