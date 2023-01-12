<script> 
import Movie from "@/components/Movie.vue";
export default {
    components: { Movie },
    props: {
        movieList: Array
    },
    emits:['deleteMovie','editMovie','addMovieToFavouriteList','informationAboutMovie']
};
</script>

<template>
    
    <h6>
        
       <v-main> <Movie v-for="movie in movieList"  :movie="movie" 
        v-on:deleteMovie="(movie) => this.$emit('deleteMovie', movie)" 
        v-on:informationAboutMovie="(movie) => this.$emit('informationAboutMovie', movie)" 
        v-on:editMovie="(movie) => this.$emit('editMovie', movie)" 
        v-on:addMovieToFavouriteList="(movie) => this.$emit('addMovieToFavouriteList', movie)"/>  </v-main> 
    </h6>
</template>