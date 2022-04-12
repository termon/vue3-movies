import { reactive } from 'vue'

export default reactive({
    query: '',
    movies: [], 
    movie: undefined,
    total: 0,
    page: 1,
    isLoading: false,
    isPrevPage: false,
    isNextPage: false,
    error: '',

    clear() {
        this.movie = undefined
        this.movies = []
        this.query = ''
        this.page = 1
        this.error = ''
        this.total = 0
    },

    // "w92", "w154", "w185", "w342", "w500", "w780", "original"
    posterUrl(poster:string, size='w342', path = 'https://image.tmdb.org/t/p/') {
        return path + size + poster  
    },
    nextPage() {
        if (this.isNextPage) {
            this.page = this.page + 1
            this.search()
        }
    },
    prevPage() {
        if (this.isPrevPage) {
            this.page = this.page - 1
            this.search()
        }
    },

    async search() {
        this.isLoading = true 
        console.log(this._query())
        const resp = await fetch(this._query(), this._getTokenObj())
        const json = await resp.json()
        if (json.results) {                 
            this.movies = json.results
            this.total = json.total_pages
            this.isNextPage = (this.total > this.page) ? true : false
            this.isPrevPage = this.page > 1
        } else {
            this.movies = []
            this.query = ''
            this.total = 0
            this.isPrevPage = false
            this.isNextPage = false
        }  
        this.isLoading = false
    },

    async fetchMovie(id:any) {
        this.isLoading = true
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,images,videos`, this._getTokenObj())
        const json = await resp.json()       
        if (json.title) {
            this.movie = json
            console.log(json)
        } else {
            this.movie = undefined
        }
        this.isLoading = false
    },

    // -------- action methods -----------
    _query() {
        if (this.query === ':trending') {
          return `https://api.themoviedb.org/3/trending/movie/week?page=${this.page}`
        } else if (this.query === ':popular') {
          return `https://api.themoviedb.org/3/movie/popular?page=${this.page}`
        } else if (this.query === ':playing') {
          return `https://api.themoviedb.org/3/movie/now_playing?page=${this.page}`
        } else if (this.query === ':upcoming') {
          return `https://api.themoviedb.org/3/movie/upcoming?page=${this.page}`
        } else if (this.query === ':top') {
          return `https://api.themoviedb.org/3/movie/top_rated?page=${this.page}`
        } else {
          return `https://api.themoviedb.org/3/search/movie?query="${this.query}"&page=${this.page}`
        }
    },
    _getTokenObj() { 
        const TOKEN = import.meta.env.VITE_TOKEN
        return {
          method: 'GET',
          headers: new Headers(
            {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            })
        } 
    }

});