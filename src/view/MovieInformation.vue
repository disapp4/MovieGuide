<script lang="ts">
import router from "../router";
import { client } from "../clients/Client";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { Movie } from "../models/Movie";
import { Language } from "../models/Language";
import { I18nMovie } from "../models/I18nMovie";
import { appStore } from "../stores/appStore";

type Data = {
    movie: Movie,
    movieIsLoaded: boolean,
    store: ReturnType<typeof appStore>
}

let nullMovie = new Movie();
nullMovie.i18n = { [Language.Russian]: new I18nMovie(), [Language.English]: new I18nMovie() };

export default defineComponent({
    data(): Data {
        return {
            movie: nullMovie,
            movieIsLoaded: false,
            store: appStore()
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
        goToEditPage() {
            router.push({ name: "editMovie" });
        },
        goToMainPage() {
            router.push({ name: "mainPage" });
        }
    },
    computed: {
        isAdmin() {
            return this.store.isAdmin;
        },
        movieTitle() {
            return this.movie.i18n[Language.fromCode(this.$i18n.locale)]!!.title;
        },
        movieDescription() {
            return this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.description;
        },
        posterURL: function() {
            if (!this.movieIsLoaded) {
                return window.location.origin + "/loading.jpg";
            }
            if (this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.posterId == null) {
                return window.location.origin + "/no_poster.jpg";
            }
            return import.meta.env.VITE_BACKEND_BASE_URL + "images/" + this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.posterId;
        },
        movieImageData:
            function() {
                if (!this.movieIsLoaded) {
                    return [window.location.origin + "/loading.jpg"];
                }
                let imagesUrls = [];
                for (let movieImageId of this.movie.imageIds) {
                    imagesUrls.push(import.meta.env.VITE_BACKEND_BASE_URL + "images/" + movieImageId);
                }
                return imagesUrls;
            }
    }
});
</script>
<template>
    <v-card class="information">
        <v-card-text>
            <v-form><h1> {{ $t("informationAboutMoviePage.title") }} </h1>
                <v-col cols="12" sm="6" class="title"> {{ $t("placeholders.title") }}
                    <v-text-field variant="solo" v-model="movieTitle" readonly prepend-inner-icon="mdi-mail"
                                  type="text"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="title"> {{ $t("placeholders.description") }}
                    <v-textarea variant="solo" v-model="movieDescription" readonly
                                prepend-inner-icon="mdi-information" type="text"></v-textarea>
                </v-col>
                <v-img class="previewPoster" :src="posterURL" cover>
                </v-img>
                <div class="files">
                    <div v-for="url in movieImageData">
                        <img class="previewImages" :src="url" alt="imagePreview" />
                    </div>
                </div>
                <v-btn v-if="isAdmin" id="log_in" prepend-icon="mdi-pencil" v-on:click="goToEditPage"
                       color="black">
                    {{ $t("informationAboutMoviePage.buttons.edit") }}
                </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="goToMainPage"
                           color="black"> {{ $t("buttons.back") }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<style scoped>
.title {
    font-size: large;
}

.information {
    background: #F5F5F5
}

.files {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
}

.previewPoster {
    border-radius: 10px;
    margin: 10px 20px;
    width: 220px;
    height: 300px;
    box-shadow: 0 0 10px #444;
    border: 1px #ccc solid;
}

.previewImages {
    border-radius: 10px;
    margin: 10px 20px;
    width: 300px;
    height: 300px;
    box-shadow: 0 0 10px #444;
    border: 1px #ccc solid;
}
</style>

