<script lang="ts">
import { defineComponent } from "vue";
import MovieComponent2 from "./MovieComponent2.vue";
import { Movie } from "../models/Movie";
import { PropType } from "vue";

export default defineComponent({
    watch:{
        "$i18n.locale": function(newVal, oldVal){
            console.log(newVal + " C2 " + oldVal)
        }
    },
    components:{MovieComponent2},
    props: {
            movieList: { type: Array as PropType<Movie[]> }
         },
})

</script>

<template>
<MovieComponent2 v-for="movie in movieList" :movie="movie"

/>
</template>