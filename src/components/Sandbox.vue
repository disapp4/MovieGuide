<script>

import router from "../router";
import client from "../client";


export default {

    data() {
        return {
            movie: {},
            changedPosterURL: "",

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
            client.putMovie(this.movie,


                () => router.push({ name: 'mainPage' }))
        },
        backToMainPage() {
            router.push({ name: 'mainPage' })

        },
        putMoviePoster(event) {
            console.log(event);
            let posterFile = event.target.files[0];
            this.changedPosterURL = posterFile ? URL.createObjectURL(posterFile) : null;
        },
    },
    computed: {
        newPosterURL:
            function () {
                if (!this.movieIsLoaded) {
                    return "http://127.0.0.1:5173/loading.jpg"
                }
                if (this.changedPosterURL) { 
                    return this.changedPosterURL }
                if (this.movie.posterId == null) {
                    return "http://127.0.0.1:5173/no_poster.jpg"
                }
                
                return "https://movie-guide-backend.ntrubkin.ru/movies/" + this.movie.id + "/poster"
            }
    }
}


</script>



<template>
    <h1> sandbox </h1>
    <!-- <input type="text" v-model="movie.title" placeholder="title">
    <br>
    <input type="text" v-model="movie.description" placeholder="description">
    <br>
    <label for="image_to_save" id="image_to_save2"> Изменить постер </label>
    -->
    <input id="image_to_save" type="file" accept="image/jpeg" v-on:change="putMoviePoster">
    <br>
    <p>{{ newPosterURL }}</p>

    <img width="200" height="250" :src='newPosterURL' />
    <!--

    <br>
    <label for="images_to_save" id="images_to_save2"> Добавить изображения </label>
    <input id="images_to_save" type="file" accept="image/jpeg">
    <br>


    <button v-on:click="editMovieThroughForm"> Сохранить </button>
    <button v-on:click="backToMainPage"> Отмена </button> -->


</template>


 
