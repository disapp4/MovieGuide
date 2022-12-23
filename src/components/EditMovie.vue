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
    
    <button id="disabled" v-on:click="(movie) => deleteMovieImage(movie)" v-show="visible"> Режим удаления </button>
    <br>
    <label for="image_to_save" id="image_to_save2"> Изменить постер </label>
    <input id="image_to_save" type="file" accept="image/jpeg" v-on:change="(event) => putMoviePoster(event)" />
    <!-- <v-file-input
    show-size
    counter
    multiple
    label="File input"
  ></v-file-input> -->
<!--     
    <br>
    <img class="preview" :src='newPosterURL' />
    <br>
    

    <br>
    <label for="images_to_save" id="images_to_save2"> Добавить изображения </label>
    <input id="images_to_save" type="file" multiple accept="image/jpeg"
        v-on:change="(event) => putMovieImages(event)" />
    <br> -->

    <div class="files">
        <div v-for="url in filesUrls">
            <img class="preview" :src='url' />
        </div>
        
        <div v-for="url in addedFilesUrls">
            <img class="preview" :src='url' />
        </div>


    </div>


   
    <v-card>
        <v-card-text>
            <v-form>
                <v-toolbar color="black">
                    <v-toolbar-title>Редактировать</v-toolbar-title></v-toolbar>
                <v-img class="preview" height="200" :src="newPosterURL" cover>
                </v-img>

                <v-file-input
                
    accept="image/*"
    label="File input"
    type="file"
    hide-input
    v-on:change="(event) => putMovieImages(event)"
  ></v-file-input>
                <v-btn id="registration" prepend-icon="mdi-delete" v-on:click="backToMainPage"
                        color="black"> Режим удаления</v-btn>
               <br>
                <v-col cols="12" sm="6"> Title:
                    <v-text-field v-model="movie.title" placeholder="title"  prepend-inner-icon="mdi-lock"
                        type="text"></v-text-field></v-col>
                <v-col cols="12" sm="6"> Description:
                    <v-text-field v-model="movie.description" placeholder="description" 
                        prepend-inner-icon="mdi-mail" type="text"></v-text-field></v-col>



                        <br>
                <div class="files2">
                    <div v-for="url in filesUrls">
                        <img class="preview" :src='url' />
                    </div>
                  
                </div>
                <v-btn id="log_in" prepend-icon="mdi-pencil" v-on:click="editMovieThroughForm" color="black">
                    Сохранить </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="backToMainPage"
                        color="black"> Назад </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
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


 
