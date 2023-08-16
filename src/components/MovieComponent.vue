<script lang="ts">
import { defineComponent } from "vue";
import { Movie } from "../models/Movie";
import { PropType } from "vue";
import { Language } from "../models/Language";
import { useUserStore } from "../stores/userStore";

type Data = {
    show: boolean,
    store:ReturnType<typeof useUserStore>
}
export default defineComponent({
    methods: {
        truncate(text: string | undefined, stop: number, clamp: string = "...") {
            if (typeof text === "string") {
                return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
            } else return "";

        }
    },
    data(): Data {
        return {
            show: false,
            store: useUserStore()
        };
    },
    props: {
        movie: { type: Object as PropType<Movie>, default: new Movie() }
    },
    emits: ["deleteMovie", "editMovie", "informationAboutMovie"],
    computed: {
        userRole(){
            return this.store.hasRole

        },
        movieTitleLength(){
            return this.movieTitle!.length>=20
        },
        Language() {
            return Language;
        },
        loading: function(): boolean {
            return true;
        },
        movieTitle: function() {
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
    <v-card color="#FAFAFA" width="480"
            class="mx-auto" id="movieCard">
        <div class="container">
            <v-avatar
                class="miniPoster"
                size="170"
                rounded="0"
            >
                <v-img class="img" :src="moviePoster"></v-img>
            </v-avatar>
            <div>
                <div class="titleMovie">
                    <v-card-title>
                        <p  text-align="center" class="title"> {{ truncate(movieTitle, 20) }} </p>
                        <v-tooltip v-if="movieTitleLength"
                                   activator="parent"
                                   location="end"
                        > {{ movieTitle }}
                        </v-tooltip>
                    </v-card-title>
                </div>
                <div class="container1">
                    <v-btn  v-on:click="() => $emit('informationAboutMovie', movie )" size="small"
                           append-icon="mdi-chevron-triple-right" variant="text" color="black"
                           class="buttonInformation">
                        {{ $t("movieComponentPage.more") }}
                    </v-btn>

                </div>
                <br>
                <div v-if="userRole" class="buttons">
                    <v-card-actions>
                        <v-btn v-on:click="() => $emit('deleteMovie', movie)" size="medium" icon="mdi-delete"
                               variant="text"
                               color="black" class="buttonDelete"></v-btn>
                        <v-btn v-on:click="() => $emit('editMovie', movie)" size="medium" icon="mdi-pencil"
                               variant="text"
                               color="black" class="buttonEdit"></v-btn>

                    </v-card-actions>
                </div>
            </div>
        </div>
    </v-card>


</template>
<style scoped>
.img {
    width: 90px;
    height: 280px
}

.buttons {
    margin-left: 25px;
    margin-top: -10px;
}

.buttonInformation {
    display: flex;
    right: -10px;
    font-weight: 600
}

.container1 {
    margin-left: 10px;
    margin-bottom: -10px;
}

.buttonInformation :hover {
    color: blueviolet;
}

.buttonDelete :hover {
    color: red
}

.buttonEdit :hover {
    color: green
}

.container {
    display: flex; /* or inline-flex */
    flex-wrap: nowrap;
}

.title {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: larger;

}

.titleMovie {
    display: flex;    text-align: center;
}

#movieCard {
    height: 170px;
    margin: 10px
}

#movieCard:hover {
    box-shadow: 0 0 10px #444;
    border: 1px #646B63 solid;
    transform: scale(1.1);
}

</style>