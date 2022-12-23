<script>

import router from "../router";
import client from "../client";

export default {
    data() {
        return {
            movie: {},
            movieList: [],
            imageFiles: [],
            posterFile: null,
            posterURL: "no_poster.jpg",
            imagesURL: "",
        };
    },
    computed: {
        filesUrls() {
            return this.imageFiles.map(item => URL.createObjectURL(item))
        }
    },
    methods: {
        addMovieThroughForm() {
            client.postMovie(this.movie,
                (movieId) => {
                    if (this.posterFile) {
                        client.putMoviePosterSync(this.posterFile, movieId.id)
                    }

                    for (let i = 0; i < this.imageFiles.length; i++) {
                        client.postMovieImageSync(this.imageFiles[i], movieId.id)
                    };
                    router.push({ name: 'mainPage' })
                })
        },
        backToMainPage() {
            router.push({ name: 'mainPage' })
        },
        putMoviePoster(event) {
            this.posterFile = event.target.files[0];
            if (this.posterFile != null) {
                this.posterURL = URL.createObjectURL(this.posterFile)
            }
            else { this.posterURL = "no_poster.jpg" }
        },
        putMovieImages(event) {
            let uploadedFiles = event.target.files;
            for (var i = 0; i < uploadedFiles.length; i++) {
                this.imageFiles.push(uploadedFiles[i]);
            }
        },
}};

</script>
<template>
    <h1> Создание фильма </h1>

    <form id="add_movie_form">
        <input type="text" v-model='movie.title' placeholder="title">
        <br>
        <input type="text" v-model='movie.description' placeholder="description">
        <br>
        <div id="image_preview">
            <label for="image_to_save" id="image_to_save2"> Добавить постер </label>
            <input id="image_to_save" name="file" type="file" accept="image/jpeg"
                v-on:change="(event) => putMoviePoster(event)">
            <br>
            <img width="200" height="250" :src="posterURL" />
        </div>

        <br>
        <div id="images_preview">
            <label for="images_to_save" id="images_to_save2"> Добавить изображения </label>
            <input id="images_to_save" type="file" multiple accept="image/jpeg"
                v-on:change="(event) => putMovieImages(event)">
            <br>
            <div class="files2">
            <div v-for="url in filesUrls" >
                <img class="preview" :src='url' />
            </div>
            </div>
        </div>
        <br>
        <v-btn id="add" type="button" v-on:click="addMovieThroughForm"> Отправить </v-btn>
        <v-btn v-on:click="backToMainPage"> Отмена</v-btn>
        <br>
    </form>
</template>
<style scoped>
.files2  {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content:  flex-start;
    
  
    
}
.preview{
    border-radius: 10px;
    margin: 10px 20px;
    width: 200px;
    height: 250px
}
</style>
