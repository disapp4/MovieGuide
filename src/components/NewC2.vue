<script lang="ts">
import { defineComponent } from "vue";
import NewC3 from "./NewC3.vue";
import { Movie } from "../models/Movie";
import { PropType } from "vue";

export default defineComponent({
    components: { NewC3 },
    props: {
             movieList: { type: Array as PropType<Movie[]> }
         },
    computed: {
             convertedMovies: function() {
                 return this.movieList
                    ?.map(movie => movie as Movie);
                   }
         },
    watch: {
        "$i18n.locale": function(newVal, oldVal) {
            console.log(newVal + " C2 " + oldVal);
        }
    }

});

</script>
<template>
    <NewC3 v-for="movie in movieList" :movie="movie" />
</template>