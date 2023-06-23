<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    watch: {
        "$i18n.locale": function(newVal, oldVal) {
            console.log(newVal + " fm " + oldVal);
            // this.refreshMoviePage();
        }
    },
    // components: { EditImgComponent2 },
    // methods: {
    //     deleteImage() {
    //         console.log("удалить");
    //     },
    //     restoreImage() {
    //         console.log("восстановить");
    //     }
    // }

});


</script>

<template>

    <h1>
        favouriteMovies


    </h1>

</template>
