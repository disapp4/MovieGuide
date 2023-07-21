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
    emits: ["deleteMovie", "editMovie", "informationAboutMovie"]
});
</script>

<template>
    <MovieComponent
        v-for="movie in movieList" :movie="movie"
        v-on:deleteMovie="$emit('deleteMovie', movie)"
        v-on:editMovie="$emit('editMovie', movie)"
        v-on:informationAboutMovie="$emit('informationAboutMovie', movie)"
    />
</template>

