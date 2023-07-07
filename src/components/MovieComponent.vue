<script lang="ts">
import { defineComponent } from "vue";
import { Movie } from "../models/Movie";
import { PropType } from "vue";
import { Language } from "../models/Language";

type Data = {
    show: boolean,
    isFavourite: boolean,

}
export default defineComponent({
    methods: {
        truncate(text: string | undefined, stop: number, clamp: string = "...") {
            if (typeof text === "string"){return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");}
            else return ""

        }
    },
    data(): Data {
        return {
            show: false,
            isFavourite: false

        };
    },
    props: {
        movie: { type: Object as PropType<Movie>, default: new Movie() }
    },
    emits: ["deleteMovie", "editMovie", "addMovieToFavouriteList", "informationAboutMovie"],
    computed: {
        Language() {
            return Language;
        },
        loading: function(): boolean {
            return true;
        },
        movieTitle: function(){
            return this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.title;
        },
        moviePoster: function() {
            if (this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.posterId == null) {
                return window.location.origin + "/no_poster.jpg";
            }
            return import.meta.env.VITE_BACKEND_BASE_URL + "images/" + this.movie.i18n[Language.fromCode(this.$i18n.locale)]?.posterId;
        }
    }
});
</script>

<template>
    <v-card color="white" width="400"
            class="mx-auto" id="movieCard">
        <div class="container">
            <v-avatar
                class="ma-3"
                size="120"
                rounded="0"
            >
                <v-img class="miniPoster" :src="moviePoster"></v-img>
            </v-avatar>
            <div>
                <v-card-title>
                    <p class="title"> {{ truncate(movieTitle, 13) }} </p>
                </v-card-title>
                <div class="container1">
                    <v-btn v-on:click="() => $emit('informationAboutMovie', movie )" size="small"
                           append-icon="mdi-chevron-triple-right" variant="text" color="black"
                           class="buttonInformation">
                        {{ $t("movieComponentPage.more") }}
                    </v-btn>
                </div>
                <br>
                <div class="ms-2">
                    <v-card-actions>
                        <v-btn v-on:click="() => $emit('deleteMovie', movie)" size="small" icon="mdi-delete"
                               variant="text"
                               color="black"></v-btn>
                        <v-btn v-on:click="() => $emit('editMovie', movie)" size="small" icon="mdi-pencil"
                               variant="text"
                               color="black"></v-btn>
                        <v-btn v-on:click="() => {isFavourite=!isFavourite,$emit('addMovieToFavouriteList', movie)}"
                               size="small"
                               variant="text"
                               :class={favourite:isFavourite} class="isFavourite" icon="mdi-heart"></v-btn>
                    </v-card-actions>
                </div>
            </div>
        </div>
    </v-card>



</template>
<style scoped>
.buttonInformation {
    display: flex;
    right: -20px
}

.container {
    display: flex; /* or inline-flex */
    flex-wrap: nowrap;
}

.title {
    white-space: nowrap; /* Отменяем перенос текста */
    overflow: hidden;
    text-overflow: ellipsis;
}

.title:hover {
    white-space: normal;
}

#movieCard {
    margin: 10px
}

.isFavourite {
    color: black
}

.favourite {
    color: red;
}

.miniPoster {
    height: 100px;
    width: 70px;
    margin: 10px;
    border-radius: 10px;
}
</style>