<script setup lang="ts">
import router from "../router";
import { client } from "../clients/Client";
import { computed, onMounted, ref, watch } from "vue";
import { AxiosResponse } from "axios";
import { Movie } from "../models/Movie";
import { Language } from "../models/Language";
import { I18nMovie } from "../models/I18nMovie";
import { appStore } from "../stores/appStore";
import i18n from "../main";

const currentLocale = computed(() => i18n.global.locale.value);

onMounted(() => {
    refreshMovie();
});

const nullMovie = ref(new Movie());
nullMovie.value.i18n = { [Language.Russian]: new I18nMovie(), [Language.English]: new I18nMovie() };

const movie = ref(nullMovie);
const movieIsLoaded = ref(false);
const store = appStore();

const isAdmin = computed(() => store.isAdmin);
const movieTitle = computed(() => movie.value.i18n[Language.fromCode(currentLocale.value)]?.title);
const movieDescription = computed(() => movie.value.i18n[Language.fromCode(currentLocale.value)]?.description);

const posterURL = computed(() => {
    if (!movieIsLoaded.value) {
        return window.location.origin + "/loading.jpg";
    }
    if (movie.value.i18n[Language.fromCode(currentLocale.value)]?.posterId == null) {
        return window.location.origin + "/no_poster.jpg";
    }
    return import.meta.env.VITE_BACKEND_BASE_URL + "images/" + movie.value.i18n[Language.fromCode(currentLocale.value)]?.posterId;
});

const movieImageData = computed(() => {
    if (!movieIsLoaded.value) {
        return [window.location.origin + "/loading.jpg"];
    }
    let imagesUrls = [];
    for (let movieImageId of movie.value.imageIds) {
        imagesUrls.push(import.meta.env.VITE_BACKEND_BASE_URL + "images/" + movieImageId);
    }
    return imagesUrls;
});

const goToEditPage = () => {
    router.push({ name: "editMovie" });
};
const goToMainPage = () => {
    router.push({ name: "mainPage" });
};

const refreshMovie = () => {
    const movieId: string = (router.currentRoute.value.params.id as string);
    client.getMovie(movieId).then((response: AxiosResponse<Movie>) => {
        movie.value = response.data;
        movieIsLoaded.value = true;
    });
};
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
                <v-img class="previewImage" :src="posterURL" cover>
                </v-img>
                <div class="files">
                    <div v-for="url in movieImageData">
                        <img class="previewImage" :src="url" alt="imagePreview" />
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

.previewImage {
    border-radius: 10px;
    margin: 10px 20px;
    width: 220px;
    height: 300px;
    box-shadow: 0 0 10px #444;
    border: 1px #ccc solid;
}
</style>