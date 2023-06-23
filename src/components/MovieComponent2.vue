<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({

    watch: {
        "$i18n.locale": function(newVal, oldVal) {
            console.log(newVal + " C2 " + oldVal);
        }
    }

});

</script>

<template>
    <p> MC2</p>
    <v-card color="white" width="400"
            class="mx-auto" id="movieCard">
        <div class="container">
            <v-avatar
                class="ma-3"
                size="120"
                rounded="0">


            </v-avatar>
            <div>
                <v-card-title>
                    <p class="title"> фильм </p>
                </v-card-title>
                <div class="container1">
                    <v-btn size="small"
                           append-icon="mdi-chevron-triple-right" variant="text" color="black"
                           class="buttonInformation">
                        {{ $t("movieComponentPage.more") }}
                    </v-btn>
                </div>
                <br>
                <div class="ms-2">
                    <v-card-actions>
                        <v-btn size="small" icon="mdi-delete"


                               variant="text"
                               color="black"></v-btn>
                        <v-btn

                            size="small" icon="mdi-pencil"
                            variant="text"
                            color="black"></v-btn>
                        <v-btn
                            size="small"
                            variant="text"
                             class="isFavourite" icon="mdi-heart"></v-btn>
                    </v-card-actions>
                </div>
            </div>
        </div>

    </v-card>
</template>