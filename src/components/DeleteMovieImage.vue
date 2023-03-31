<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent, ref } from "vue";
import { Movie } from "../models/Movie.js";
import { AxiosResponse } from "axios";
import ImgComponent from "./ImgComponent.vue";
import { ImageData } from "../models/ImageData";

type Data = {
    movie: Movie,
    movieIsLoaded: boolean,
    imageRemoved: boolean,
    moviePoster: string,
    movieImageIds: string[],
    isActive: boolean,
}
export default defineComponent({
    data(): Data {
        return {
            movie: new Movie(),
            movieIsLoaded: false,
            moviePoster: "",
            imageRemoved: false,
            movieImageIds: [],
            isActive: false
        };
    },
    components: { ImgComponent },
    created() {
        this.refreshMovie();
    },
    methods: {
        refreshMovie() {
            let movieId: string = (this.$route.params.id as string);
            client.getMovie(movieId).then((response: AxiosResponse<Movie>) => {
                this.movie = response.data;
                this.movieIsLoaded = true;
            });
        },
        deleteMovieImageThroughForm() {
            let movieId = (this.$route.params.id as string);
            if (this.moviePoster == "delete") {
                client.deletePoster(movieId).then(() => console.log("ok"));
            }
            for (let i = 0; i < this.movieImageIds.length; i++) {
                client.deleteImage(movieId, this.movieImageIds[i]).then(() => console.log("ok"));
            }
            router.push({ name: "mainPage" });
        },
        backToEditMoviePage() {
            router.push({ name: "editMovie" });
        },
        backToMainPage() {
            router.push({ name: "mainPage" });
        },
        deleteMoviePoster() {
            if (this.movie.posterId == null) {
            }
            if (this.movie.posterId) {
                this.moviePoster = "delete";
            }
        },
        deleteMovieImage(imageData: ImageData) {
            let imageId;
            if (this.imageRemoved) {
                this.imageRemoved = false;
                imageId = imageData.imageId;
                this.movieImageIds = this.movieImageIds.filter(imageId => imageId != imageId);
            } else {
                this.imageRemoved = true;
                imageId = imageData.imageId;
                this.movieImageIds.push(imageId);
            }
        },
        windowLocationOrigin(url: string) {
            return window.location.origin + url;
        }
    },
    computed: {
        newPosterURL:
            function() {
                if (!this.movieIsLoaded) {
                    return window.location.origin + "/loading.jpg";
                }
                if (this.movie.posterId == null || this.moviePoster == "delete") {
                    return window.location.origin + "/no_poster.jpg";
                }
                return "https://movie-guide-backend.ntrubkin.ru/movies/" + this.movie.id + "/poster";
            },
        movieImageDatas:
            function(): ImageData[] {
                let imagesData = [];
                for (let i = 0; i < this.movie.imageIds.length; i++) {
                    let url = "https://movie-guide-backend.ntrubkin.ru/images/" + this.movie.imageIds[i];
                    let imageId = this.movie.imageIds[i];
                    let imageData: ImageData = { url: url, imageId: imageId };
                    imagesData.push(imageData);
                }
                return imagesData;
            }
    }
});
</script>

<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-toolbar color="black">
                    <v-toolbar-title>Режим удаления</v-toolbar-title>
                </v-toolbar>
                <br>
                <v-col cols="12" sm="6"> Title:
                    <v-text-field v-model="movie.title" placeholder="title" prepend-inner-icon="mdi-mail"
                                  type="text"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"> Description:
                    <v-text-field v-model="movie.description" placeholder="description" prepend-inner-icon="mdi-mail"
                                  type="text"></v-text-field>
                </v-col>
                <img class="previewDelete" :src="newPosterURL" v-on:click="deleteMoviePoster" />
                <br>
                <div class="filesDelete" v-if="movieIsLoaded">
                    <div v-for="imageData in movieImageDatas">
                        <ImgComponent :imageData="imageData"
                                      v-on:deleteMovieImage="(imageData: ImageData) => deleteMovieImage(imageData)" />
                    </div>
                </div>
                <div v-else>
                    <img :src="windowLocationOrigin('/loading.jpg')">
                </div>
                <v-btn id="log_in" prepend-icon="mdi-check-bold" v-on:click="deleteMovieImageThroughForm" color="black">
                    Сохранить
                </v-btn>
                <v-btn id="registration" prepend-icon="mdi-list-box-outline" v-on:click="backToMainPage" color="black">
                    Список фильмов
                </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="backToEditMoviePage"
                           color="black"> Назад
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<style scoped>
.filesDelete {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
}
.previewDelete:hover {
    border-radius: 10px;
    margin: 10px 20px;
    width: 200px;
    height: 250px;
    opacity: 0.5
}
.previewDelete {
    border-radius: 10px;
    margin: 10px 20px;
    width: 200px;
    height: 250px
}
</style>