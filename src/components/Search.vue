<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import store from "../store";

import Pager from './Pager.vue'
import MovieDetails from './MovieDetails.vue'
import Spinner from './Spinner.vue'

onMounted(() => {
    console.log('mounted search')
})
    
</script>

<template>

<MovieDetails :movie="store.movie" />

   
<div class="d-flex flex-row align-items-center mb-4">
    <div class="form-check me-3">
        <input class="form-check-input" v-model="store.query" type="radio" value=":trending">
        <label class="form-check-label" for="Range">Trending</label>
    </div>
    <div class="form-check me-3">
        <input class="form-check-input" v-model="store.query" type="radio"  value=":popular">
        <label class="form-check-label" for="Range">Popular</label>
    </div>
    <div class="form-check me-3">
        <input class="form-check-input" v-model="store.query" type="radio" value=":top">
        <label class="form-check-label" for="Range">Top</label>
    </div>
    <div class="form-check me-3">
        <input class="form-check-input" v-model="store.query" type="radio" value=":playing">
        <label class="form-check-label" for="Range">Playing</label>
    </div>
    <div class="form-check me-3">
        <input class="form-check-input" v-model="store.query" type="radio" value=":upcoming">
        <label class="form-check-label" for="Range">Upcoming</label>
    </div>

    <input class="form-control me-2" v-model="store.query" placeholder="Search..">

    <button class="btn btn-success my-2 my-sm-0" v-on:click="store.search" :disabled="store.query.length==0">Search</button>
    <button class="btn btn-secondary my-2 ms-2 my-sm-0" v-on:click="store.clear">Clear</button>
</div>


<Pager v-if="store.movies.length>0" class="d-flex flex-row justify-content-center mt-4" :total="store.total"/>

<div>
    <Spinner v-if="store.isLoading" />
    <div class="d-flex flex-row flex-wrap mt-4 p-4">
        <div v-for="m in store.movies" key="m.imdbID" class="m-4">
            <img :src="store.posterUrl(m.poster_path)" class="img-fluid rounded" v-on:click='() => store.fetchMovie(m.id)'/>
        </div>
    </div> 
</div>   
</template>


