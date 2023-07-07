<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { Movie } from "../models/Movie";
import { Language } from "../models/Language";
import { I18nMovie } from "../models/I18nMovie.js";

type Data = {
    movie: Movie,
    movieIsLoaded: boolean,
    width: number,
}

let nullMovie = new Movie();
nullMovie.i18n = {[Language.Russian] : new I18nMovie(), [Language.English] : new I18nMovie()}

export default defineComponent({
    data(): Data {
        return {
            movie: nullMovie,
            movieIsLoaded: false,
            width: 200,
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
        movieTitle(){
            return this.movie.i18n[Language.fromCode(this.$i18n.locale)]!!.title
        },
        movieDescription(){
            return this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.description
        },
        posterURL:function(){
            if (!this.movieIsLoaded) {
                return window.location.origin + "/loading.jpg";
            }
            if (this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.posterId == null) {
                return window.location.origin + "/no_poster.jpg";
            }
            return import.meta.env.VITE_BACKEND_BASE_URL + "images/" + this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.posterId
        },
        movieImageDatas:
            function() {
                if (!this.movieIsLoaded) {
                    return [window.location.origin + "/loading.jpg"];
                }
                let imagesUrls = [];
                for (let i = 0; i < this.movie.imageIds.length; i++) {
                    imagesUrls.push(import.meta.env.VITE_BACKEND_BASE_URL + "images/" + this.movie.imageIds[i]);
                }
                return imagesUrls;
            }
    }
});
</script>
<template>
    <v-card>
        <v-card-text>
            <v-form><h1> {{ $t("informationAboutMoviePage.title") }} </h1>
                    <v-col cols="12" sm="6"> {{ $t("placeholders.id") }}
                        <v-text-field v-model="movie.id" placeholder="id" disabled prepend-inner-icon="mdi-mail"
                                      type="text" class="text-right"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6"> {{ $t("placeholders.title") }}
                        <v-text-field v-model="movieTitle" placeholder="title" disabled prepend-inner-icon="mdi-mail"
                                      type="text"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6"> {{ $t("placeholders.description") }}
                        <v-text-field v-model="movieDescription" placeholder="description" disabled
                                      prepend-inner-icon="mdi-mail" type="text"></v-text-field>
                    </v-col>
                    <v-img class="preview" height="200" :src="posterURL" cover>
                    </v-img>

                <div class="files2">
                    <div v-for="url in movieImageDatas">
                        <img class="preview" :src="url" />
                    </div>
                </div>
                <v-btn id="log_in" prepend-icon="mdi-pencil" v-on:click="editMovieThroughForm" color="black">
                    {{ $t("informationAboutMoviePage.buttons.edit") }}
                </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="backToMainPage"
                           color="black"> {{ $t("buttons.back") }}
                    </v-btn>
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
.languages {
    display: flex;
}

div.ru {
    float: left;
    width: 50%;
}

div.en {
    float: right;
    width: 50%;
}
</style>

