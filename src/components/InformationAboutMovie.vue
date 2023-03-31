<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent, ref } from "vue";
import { CreateMovieRequest } from "../models/CreateMovieRequest";
import { CreateMovieResponse } from "../models/CreateMovieResponse";
import { AxiosResponse } from "axios";
import { Movie } from "../models/Movie";

type Data = {
    movie: Movie,
    movieIsLoaded: boolean,
    width:number

}

export default defineComponent({
    data(): Data {
        return {
            movie: new Movie(),
            movieIsLoaded: false,
            width:200
        };
    },

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
        editMovieThroughForm() {
            router.push({ name: "editMovie" });
        },
        backToMainPage() {
            router.push({ name: "mainPage" });
        }
    },
    computed: {
            newPosterURL:
                function () {
                    if (!this.movieIsLoaded) {
                        return window.location.origin + "/loading.jpg"
                    }
                    if (this.movie.posterId == null) {
                        return window.location.origin + "/no_poster.jpg"
                    }
                    return "https://movie-guide-backend.ntrubkin.ru/movies/" + this.movie.id + "/poster"
                },
            movieImageDatas:
                function () {
                    if (!this.movieIsLoaded) {
                        return [window.location.origin + "/loading.jpg"]
                    }
                    let imagesUrls = []
                    for (let i = 0; i < this.movie.imageIds.length; i++) {
                        imagesUrls.push("https://movie-guide-backend.ntrubkin.ru/images/" + this.movie.imageIds[i])
                    }
                    return imagesUrls
                }
        }

    })
</script>
<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-toolbar color="black">
                    <v-toolbar-title>Информация о фильме</v-toolbar-title></v-toolbar>
                <v-img class="preview" height="200"  :src="newPosterURL" cover>
                </v-img>

                <v-col cols="12" sm="6"> Id:
                    <v-text-field v-model="movie.id" placeholder="id" disabled prepend-inner-icon="mdi-mail"
                                  type="text" class="text-right"></v-text-field></v-col>
                <v-col cols="12" sm="6"> Title:
                    <v-text-field v-model="movie.title" placeholder="title" disabled prepend-inner-icon="mdi-mail"
                                  type="text"></v-text-field></v-col>
                <v-col cols="12" sm="6"> Description:
                    <v-text-field v-model="movie.description" placeholder="description" disabled
                                  prepend-inner-icon="mdi-mail" type="text"></v-text-field></v-col>
                <br>
                <div class="files2">
                    <div v-for="url in movieImageDatas">
                        <img class="preview" :src='url' />
                    </div>
                </div>
                <v-btn id="log_in" prepend-icon="mdi-pencil" v-on:click="editMovieThroughForm" color="black">
                    Редактировать </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="backToMainPage"
                           color="black"> Назад </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
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

