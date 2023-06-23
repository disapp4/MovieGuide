<script lang="ts">
import { defineComponent } from "vue";
import { Movie } from "../models/Movie";
import { PropType } from "vue";

export default defineComponent({
       watch: {
        "$i18n.locale": function(newVal, oldVal) {
            console.log(newVal + " C2 " + oldVal);
        }
    },
     props: {
        movie: { type: Object as PropType<Movie>, default: new Movie() }},


})

</script>
<template>
 <p> {{this.movie}} </p>
</template>