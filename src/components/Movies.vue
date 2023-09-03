<script setup lang="ts">
import MovieComponent from "./MovieComponent.vue";
import { PropType } from "vue";
import { Movie } from "../models/Movie";

const emits = defineEmits(["deleteMovie"]);

const props = defineProps({ movieList: Array as PropType<Movie[]> });

</script>

<template>
    <MovieComponent
        v-for="movie in props.movieList" :movie="movie"
        v-on:deleteMovie="emits('deleteMovie', movie)" />
</template>