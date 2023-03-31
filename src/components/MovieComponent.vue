<script lang="ts">
import { defineComponent } from 'vue'
import { Movie } from '../models/Movie'
import { PropType } from "vue"

export default defineComponent({
    data() {
        return {
            show: false
        }
    },
    props: {
        movie: {type: Object as PropType<Movie>, default: new Movie()},
         },
    emits: ['deleteMovie', 'editMovie', 'addMovieToFavouriteList', 'informationAboutMovie'],
    
    methods: {

    },
   })
</script>

<template>
    <v-card
     width="400" class="mx-auto" id="movieCard" :title='movie.title'>
        <v-btn v-on:click="() => $emit('informationAboutMovie', movie )" size="small"
            append-icon="mdi-chevron-triple-right" variant="text" color="black">
             Подробнее</v-btn>
        <br>
        <v-btn v-on:click="() => $emit('deleteMovie', movie)" size="small" icon="mdi-delete" variant="text"
            color="black"></v-btn>
        <v-btn v-on:click="() => $emit('editMovie', movie)" size="small" icon="mdi-pencil" variant="text"
            color="black"></v-btn>
        <v-btn v-on:click="() => $emit('addMovieToFavouriteList', movie)" size="small" variant="text"
            icon="mdi-heart" color="black"></v-btn>
    </v-card>

</template>
<style scoped>
 #movieCard {
    margin: 10px
 } 
</style>