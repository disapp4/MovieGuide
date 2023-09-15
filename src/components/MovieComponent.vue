<script setup lang="ts">
import { computed, PropType, watch } from "vue";
import { appStore } from "../stores/appStore";
import { Movie } from "../models/Movie";
import { Language } from "../models/Language";
import router from "../router";
import i18n from "../main";

const store = appStore();
const currentLocale = computed(() => i18n.global.locale.value);

watch(() => i18n.global.locale.value, (newVal) => {
    console.log(newVal);
});
const props = defineProps({
    movie: {
        type: Object as PropType<Movie>,
        default: () => new Movie()
    }
});

const isAdmin = computed(() => store.isAdmin);

const movieTitle = computed(() => {
    return props.movie.i18n[Language.fromCode(currentLocale.value)]?.title;
});

const titleIsTooLong = computed(() => {
    const title = movieTitle.value;
    return title ? title.length >= 20 : false;
});

const moviePosterUrl = computed(() => {
    const posterId = props.movie.i18n[Language.fromCode(currentLocale.value)]?.posterId;
    if (posterId == null) {
        return window.location.origin + "/no_poster.jpg";
    }
    return import.meta.env.VITE_BACKEND_BASE_URL + "images/" + posterId;
});

const truncate = (text: string | undefined, stop: number, clamp: string = "...") => {
    if (typeof text === "string") {
        return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
    } else return "";
};

const goToInformationMoviePage = (movie: Movie) => {
    router.push({ name: "informationAboutMovie", params: { id: movie.id } });
};
const goToEditMoviePage = (movie: Movie) => {
    router.push({ name: "editMovie", params: { id: movie.id } });
};
</script>
<template>
    <v-card color="#FAFAFA" width="480"
            class="mx-auto" id="movieCard">
        <div class="containerAvatar">
            <v-avatar
                class="miniPoster"
                size="170"
                rounded="0"
            >
                <v-img class="img" :src="moviePosterUrl"></v-img>
            </v-avatar>
            <div>
                <div class="titleMovie">
                    <v-card-title>
                        <p  class="title"> {{ truncate(movieTitle, 20) }} </p>
                        <v-tooltip v-if="titleIsTooLong"
                                   activator="parent"
                                   location="end"
                        > {{ movieTitle }}
                        </v-tooltip>
                    </v-card-title>
                </div>
                <div class="containerInformation">
                    <v-btn v-on:click="goToInformationMoviePage(movie)" size="small"
                           append-icon="mdi-chevron-triple-right" variant="text" color="black"
                           class="buttonInformation">
                        {{ $t("movieComponentPage.more") }}
                    </v-btn>
                </div>
                <br>
                <div v-if="isAdmin" class="buttons">
                    <v-card-actions>
                        <v-btn v-on:click="() => $emit('deleteMovie', movie)" size="medium" icon="mdi-delete"
                               variant="text"
                               color="black" class="buttonDelete"></v-btn>
                        <v-btn v-on:click="goToEditMoviePage(movie)" size="medium" icon="mdi-pencil"
                               variant="text"
                               color="black" class="buttonEdit"></v-btn>
                    </v-card-actions>
                </div>
            </div>
        </div>
    </v-card>
</template>
<style scoped>
.img {
    width: 90px;
    height: 280px
}

.buttons {
    margin-left: 25px;
    margin-top: -10px;
}

.buttonInformation {
    display: flex;
    right: -10px;
    font-weight: 600
}

.containerInformation {
    margin-left: 10px;
    margin-bottom: -10px;
}

.buttonInformation :hover {
    color: blueviolet;
}

.buttonDelete :hover {
    color: red
}

.buttonEdit :hover {
    color: green
}

.containerAvatar {
    display: flex;
    flex-wrap: nowrap;
}

.title {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: larger;
}

.titleMovie {
    display: flex;
    text-align: center;
}

#movieCard {
    height: 170px;
    margin: 10px
}

#movieCard:hover {
    box-shadow: 0 0 10px #444;
    border: 1px #646B63 solid;
    transform: scale(1.1);
}
</style>