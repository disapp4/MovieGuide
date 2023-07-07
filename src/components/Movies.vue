<script lang="ts">
import MovieComponent from "./MovieComponent.vue";
import { defineComponent } from "vue";
import { Movie } from "../models/Movie";
import { PropType } from "vue";

export default defineComponent({
    components: { MovieComponent },
    props: {
        movieList: { type: Array as PropType<Movie[]> }
    },
    emits: ["deleteMovie", "editMovie", "addMovieToFavouriteList", "informationAboutMovie"]
});
</script>

<template>
        <MovieComponent
            v-for="movie in movieList" :movie="movie"
            v-on:deleteMovie="(movie: Movie) => $emit('deleteMovie', movie)"
            v-on:editMovie="(movie:Movie) => $emit('editMovie', movie)"
            v-on:informationAboutMovie="(movie:Movie) => $emit('informationAboutMovie', movie)"
            v-on:addMovieToFavouriteList="(movie:Movie) => $emit('addMovieToFavouriteList', movie)" />
</template>

