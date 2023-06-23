<script lang="ts">
import MovieComponent from "./MovieComponent.vue";
import { defineComponent } from "vue";
import { Movie } from "../models/Movie";
import { PropType } from "vue";

export default defineComponent({
    components: { MovieComponent },
    // computed: {
    //     convertedMovies: function() {
    //         return this.movieList
    //             ?.map(movie => movie as Movie);
    //             }
    // },
    // props: {
    //     movieList: { type: Array as PropType<Movie[]> }
    // },
     watch:{"$18n.locale": function(newVal, oldVal){
         console.log(newVal + " Movies " + oldVal)
         }},
    // emits: ["deleteMovie", "editMovie", "addMovieToFavouriteList", "informationAboutMovie"]
});
</script>

<template>
    <h6> Movies
            <MovieComponent />
<!--                v-for="movie in movieList" :movie="movie"-->
<!--                            v-on:deleteMovie="(movie: Movie) => $emit('deleteMovie', movie)"-->
<!--                            v-on:editMovie="(movie:Movie) => $emit('editMovie', movie)"-->
<!--                            v-on:informationAboutMovie="(movie:Movie) => $emit('informationAboutMovie', movie)" -->
<!--                            v-on:addMovieToFavouriteList="(movie:Movie) => $emit('addMovieToFavouriteList', movie)"-->

    </h6>
</template>

