<script>

import router from "../router";
import client from "../client";
import { setBlockTracking, toDisplayString } from "vue";


export default {

    data() {
        return {
            movie: {},
            changedPosterURL: "",
            posterFile: null,
            imageFiles: [],
            changedImagesURL: '',
            movieIsLoaded: false,
            visible: true,
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
                () => {
                    if (this.posterFile) {
                        client.putMoviePosterSync(this.posterFile, this.movie.id)
                    }

                    for (let i = 0; i < this.imageFiles.length; i++) {
                        client.postMovieImageSync(this.imageFiles[i], this.movie.id)
                    };
                    router.push({ name: 'mainPage' })
                })
        },
        backToMainPage() {
            router.push({ name: 'mainPage' })

        },
        putMoviePoster(event) {
            this.visible = false;
            this.posterFile = event.target.files[0];
            this.changedPosterURL = this.posterFile ? URL.createObjectURL(this.posterFile) : null;
        },
        putMovieImages(event) {
            this.visible = false;
            let uploadedFiles = event.target.files;
            for (var i = 0; i < uploadedFiles.length; i++) {
                this.imageFiles.push(uploadedFiles[i]);
            }
        },
        
        deleteMovieImage() {
            router.push({ name: 'deleteMovieImage', params: { id: this.movie.id } })
        },
    },
    computed: {
        newPosterURL:
            function () {
                if (!this.movieIsLoaded) {
                    return "http://127.0.0.1:5173/loading.jpg"
                }
                if (this.changedPosterURL) {
                    return this.changedPosterURL
                }
                if (this.movie.posterId == null) {
                    return "http://127.0.0.1:5173/no_poster.jpg"
                }
                return "https://movie-guide-backend.ntrubkin.ru/movies/" + this.movie.id + "/poster"
            },
        filesUrls:
            function () {
                if (!this.movieIsLoaded) {
                    return ["http://127.0.0.1:5173/loading.jpg"]
                }
                let imagesUrls = [];
                for (var i = 0; i < this.movie.imageIds.length; i++) {
                    imagesUrls.push("https://movie-guide-backend.ntrubkin.ru/images/" + this.movie.imageIds[i])
                }
                return imagesUrls
            },
        addedFilesUrls:
            function () {
                if (this.imageFiles) {
                    return this.imageFiles.map(item => URL.createObjectURL(item))
                }
            }
    }
}
</script>
<template>
    <input type="text" v-model="movie.title" placeholder="title">
    <br>
    <input type="text" v-model="movie.description" placeholder="description">
    <br>
    <button id="disabled" v-on:click="(movie) => deleteMovieImage(movie)" v-show="visible"> Режим удаления </button>
    <br>
    <label for="image_to_save" id="image_to_save2"> Изменить постер </label>
    <input id="image_to_save" type="file" accept="image/jpeg" v-on:change="(event) => putMoviePoster(event)" />
    <br>
    <img class="preview" :src='newPosterURL' />
    <br>
    

    <br>
    <label for="images_to_save" id="images_to_save2"> Добавить изображения </label>
    <input id="images_to_save" type="file" multiple accept="image/jpeg"
        v-on:change="(event) => putMovieImages(event)" />
    <br>

    <div class="files">
        <div v-for="url in filesUrls">
            <img class="preview" :src='url' />
        </div>
        <div v-for="url in addedFilesUrls">
            <img class="preview" :src='url' />
        </div>


    </div>

    <br>
    <button v-on:click="editMovieThroughForm"> Сохранить </button>
    <button v-on:click="backToMainPage"> Отмена </button>


</template>

<style scoped>
.files {
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


 
