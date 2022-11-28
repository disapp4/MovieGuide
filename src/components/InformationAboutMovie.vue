<script >
import router from "../router";
import client from "../client";


export default {

    data() {
        return {
            movie: {},
            movieIsLoaded: false
        };
    },

    created() {
        this.refreshMovie();

    },


    methods: {

        refreshMovie() {
            client.getMovie(this.$route.params.id, (movie) => { this.movie = movie; this.movieIsLoaded = true; })
        },
        editMovieThroughForm() {
            router.push({ name: 'editMovie' })
        },
        backToMainPage() {
            router.push({ name: 'mainPage' })

        },

    },
    computed: {
        newPosterURL:
            function () {
                if (!this.movieIsLoaded) {
                    return "http://127.0.0.1:5173/loading.jpg"
                }
                if (this.movie.posterId == null) {
                    return "http://127.0.0.1:5173/no_poster.jpg"
                }
                return "https://movie-guide-backend.ntrubkin.ru/movies/" + this.movie.id + "/poster"
            },
        filesUrls:
            function () {
                if (!this.movieIsLoaded) {
                    return "http://127.0.0.1:5173/loading.jpg"
                }
                
            
                    for (var i = 0; i < this.movie.imageIds.length; i++) {
                        return `"https://movie-guide-backend.ntrubkin.ru/images/` + this.movie.imageIds[i] + `"`
                    }
                

            }
    }
}
</script>
<template>

    <input type="text" v-model="movie.id" placeholder="id" disabled>
    <br>
    <input type="text" v-model="movie.title" placeholder="title" disabled>
    <br>
    <input type="text" v-model="movie.description" placeholder="description" disabled>
    <br>
    <img width="200" height="250" :src='newPosterURL' />
    
    <br>
    <div class="files2">
        <div v-for="url in filesUrls">
            <img class="preview" :src='url' />
        </div>
    </div>



    <button v-on:click="editMovieThroughForm"> Редактировать </button>
    <button v-on:click="backToMainPage"> Назад </button>

</template>
<style scoped>
.files2 {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;



}

.preview {
    border-radius: 10px;
    margin: 10px 20px;
    width: 200px;
    height: 250px
}
</style>

