<script>

import router from "../router";
import client from "../client";

export default {
    data() {
        return {
            movie: {},
            movieList: [],
            imageFiles: [],
            posterFile: null,
            posterURL: "no_poster.jpg",
            imagesURL: "",
        };
    },
    computed: {
        filesUrls() {
            return this.imageFiles.map(item => URL.createObjectURL(item))
        }
    },
    methods: {
        addMovieThroughForm() {
            client.postMovie(this.movie,
                (movieId) => {
                    if (this.posterFile) {
                        client.putMoviePosterSync(this.posterFile, movieId.id)
                    }

                    for (let i = 0; i < this.imageFiles.length; i++) {
                        client.postMovieImageSync(this.imageFiles[i], movieId.id)
                    };
                    router.push({ name: 'mainPage' })
                })
        },
        backToMainPage() {
            router.push({ name: 'mainPage' })
        },
        putMoviePoster() {
            this.posterFile = event.target.files[0];
            if (this.posterFile != null) {
                this.posterURL = URL.createObjectURL(this.posterFile)
            }
            else { this.posterURL = "no_poster.jpg" }
        },
        putMovieImages() {
            let uploadedFiles = event.target.files;
            for (var i = 0; i < uploadedFiles.length; i++) {
                this.imageFiles.push(uploadedFiles[i]);
            }
        },
    }
};

</script>
<template>

    <v-card>
        <v-card-text>
            <v-form>
                <v-toolbar color="black">
                    <v-toolbar-title>Создание фильма</v-toolbar-title></v-toolbar>
                
                <v-col cols="12" sm="6"> Title:
                    <v-text-field v-model="movie.title" placeholder="title" prepend-inner-icon="mdi-mail"
                        type="text"></v-text-field></v-col>
                <v-col cols="12" sm="6"> Description:
                    <v-text-field v-model="movie.description" placeholder="description" prepend-inner-icon="mdi-mail"
                        type="text"></v-text-field></v-col>
                        <v-col cols="12" sm="4"> <v-file-input label="Добавить постер" v-on:update:modelValue="putMoviePoster" variant="filled" prepend-icon="mdi-camera"></v-file-input></v-col>
                        <v-col cols="12" sm="4"> <v-file-input label="Добавить изображения" v-on:update:modelValue="putMovieImages" multiple variant="filled" prepend-icon="mdi-camera"></v-file-input></v-col>
                        <v-img class="preview"  :src="posterURL">
                </v-img>

                <br>
                <div class="files2">
                    <div v-for="url in filesUrls">
                        <img class="preview" :src='url' />
                    </div>
                </div>
                <v-btn id="log_in" prepend-icon="mdi-pencil" v-on:click="addMovieThroughForm" color="black">
                    Сохранить </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="backToMainPage"
                        color="black"> Назад </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>

 
</template>
<style scoped>
.files2 {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;



}

.preview {
    border-radius: 10px;
    margin: 10px 20px;
    width: 200px;
    height: 250px
}
</style>
