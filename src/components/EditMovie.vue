<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { Movie } from "../models/Movie.js";

type Data = {
    movie: Movie,
    changedPosterURL: string | null,
    posterFile: File | null,
    imageFiles: Array<File> | null,
    changedImagesURL: string | null,
    movieIsLoaded: boolean,
    visible: boolean
}
export default defineComponent({
        data(): Data {
            return {
                movie: new Movie(),
                changedPosterURL: "",
                posterFile: null,
                imageFiles: [],
                changedImagesURL: "",
                movieIsLoaded: false,
                visible: true
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
                client.putMovie(this.movie)
                    .then(() => {
                        let imagePromises = [];
                        if (this.posterFile) {
                            imagePromises.push(client.putMoviePoster(this.posterFile, this.movie.id));
                        }
                        if (this.imageFiles)
                            for (let i = 0; i < this.imageFiles.length; i++) {
                                imagePromises.push(client.postMovieImage(this.imageFiles[i], this.movie.id));
                            }
                        Promise.all(imagePromises)
                            .then(() => router.push({ name: "mainPage" }));

                    });
            },
            backToMainPage() {
                router.push({ name: "mainPage" });

            },
            putMoviePoster(files: Array<File>) {
                this.visible = false;
                this.posterFile = files[0];
                this.changedPosterURL = this.posterFile ? URL.createObjectURL(this.posterFile) : null;
            },
            putMovieImages(files: Array<File>) {
                this.visible = false;
                let uploadedFiles: Array<File> = files;
                if (this.imageFiles)
                    for (let i = 0; i < uploadedFiles.length; i++) {
                        this.imageFiles.push(uploadedFiles[i]);
                    }
            },
            deleteMovieImage() {
                router.push({ name: "deleteMovieImage", params: { id: this.movie.id } });
            }
        },
        computed: {
            newPosterURL:
                function(): string {
                    if (!this.movieIsLoaded) {
                        return window.location.origin + "/loading.jpg";
                    }
                    if (this.changedPosterURL) {
                        return this.changedPosterURL;
                    }
                    if (this.movie.posterId == null) {
                        return window.location.origin + "/no_poster.jpg";
                    }
                    return "https://movie-guide-backend.ntrubkin.ru/movies/" + this.movie.id + "/poster";
                },
            movieImageDatas:
                function() {
                    if (!this.movieIsLoaded) {
                        return [window.location.origin + "/loading.jpg"];
                    }
                    let imagesUrls = [];
                    for (let i = 0; i < this.movie.imageIds.length; i++) {
                        imagesUrls.push("https://movie-guide-backend.ntrubkin.ru/images/" + this.movie.imageIds[i]);
                    }
                    return imagesUrls;
                },
            addedFilesUrls:
                function() {
                    if (this.imageFiles) {
                        return this.imageFiles.map(item => URL.createObjectURL(item));
                    }
                }

        }
    }
);
</script>
<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-toolbar color="black">
                    <v-toolbar-title>Редактировать</v-toolbar-title>
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
                <v-col cols="12" sm="4">
                    <v-file-input label="Добавить постер" v-on:update:modelValue="putMoviePoster"
                                  variant="filled" prepend-icon="mdi-camera"></v-file-input>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-file-input label="Добавить изображения" v-on:update:modelValue="putMovieImages"
                                  multiple variant="filled" prepend-icon="mdi-camera"></v-file-input>
                </v-col>
                <img class="preview" :src="newPosterURL" />

                <br>
                <div class="files">
                    <div v-for="url in movieImageDatas">
                        <img class="preview" :src="url" />
                    </div>

                    <div v-for="url in addedFilesUrls">
                        <img class="preview" :src="url" />
                    </div>
                </div>

                <v-btn id="log_in" prepend-icon="mdi-check-bold" v-on:click="editMovieThroughForm" color="black">
                    Сохранить
                </v-btn>
                <v-btn id="registration" prepend-icon="mdi-delete" v-on:click="deleteMovieImage"
                       color="black" v-show="visible"> Режим удаления
                </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="backToMainPage"
                           color="black"> Назад
                    </v-btn>
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


 
