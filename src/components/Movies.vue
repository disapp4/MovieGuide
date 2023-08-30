<script lang="ts">
import MovieComponent from "./MovieComponent.vue";
import { defineComponent, PropType } from "vue";
import { Movie } from "../models/Movie";

export default defineComponent({
    components: { MovieComponent },
    props: {
        movieList: { type: Array as PropType<Movie[]> }
    },
    emits: ["deleteMovie"]
});
</script>

<template>
    <MovieComponent
        v-for="movie in movieList" :movie="movie"
        v-on:deleteMovie="$emit('deleteMovie', movie)" />
</template>

