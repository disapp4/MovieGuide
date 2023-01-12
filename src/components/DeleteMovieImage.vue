<script>
import router from "../router";
import client from "../client";

export default {

    data() {
        return {
            movie: {},
            movieIsLoaded: false,
            moviePoster: '',
            movieImageIds: [],
        };
    },
    created() {
        this.refreshMovie();
    },
    methods: {
        refreshMovie() {
            client.getMovie(this.$route.params.id, (movie) => { this.movie = movie; this.movieIsLoaded = true; })
        },
        deleteMovieImageThroughForm() {
            if (this.moviePoster == 'delete') {
                client.deletePoster(this.movie.id, () => { })
            }
           for (let i=0; i<this.movieImageIds.length; i++){
            client.deleteImage(this.movie.id,this.movieImageIds[i], ()=>{})
           }
            router.push({ name: 'mainPage' })
        },
        backToEditMoviePage() {
            router.push({ name: 'editMovie' })
        },
        backToMainPage() {
            router.push({ name: 'mainPage' })
        },
        deleteMoviePoster() {
            if (this.movie.posterId == null) {}
            else { this.moviePoster = 'delete' }
        },
        deleteMovieImage(url) {
            console.log('удален')
            this.movieImageIds.push(url.imageId)
            }

    },
    computed: {
        newPosterURL:
            function () {
                if (!this.movieIsLoaded) {
                    return "http://127.0.0.1:5173/loading.jpg"
                }
                if (this.movie.posterId == null || this.moviePoster == 'delete') {
                    return "http://127.0.0.1:5173/no_poster.jpg"
                }
                return "https://movie-guide-backend.ntrubkin.ru/movies/" + this.movie.id + "/poster"
            },
        filesUrls:
            function () {

                if (!this.movieIsLoaded) {
                    return ["http://127.0.0.1:5173/loading.jpg"]
                }
                let imagesData = [];

                for (var i = 0; i < this.movie.imageIds.length; i++) {
                    let imageData = {};
                    imageData.url = "https://movie-guide-backend.ntrubkin.ru/images/" + this.movie.imageIds[i];
                    imageData.imageId = this.movie.imageIds[i];
                    imagesData.push(imageData)
                }
                return imagesData
            }
    }
}


</script>

<template>
    
  




    <v-card>
        <v-card-text>
            <v-form>
                <v-toolbar color="black">
                    <v-toolbar-title>Режим удаления</v-toolbar-title></v-toolbar>
                <br>
                <v-col cols="12" sm="6"> Title:
                    <v-text-field v-model="movie.title" placeholder="title" prepend-inner-icon="mdi-mail"
                        type="text"></v-text-field></v-col>
                <v-col cols="12" sm="6"> Description:
                    <v-text-field v-model="movie.description" placeholder="description" prepend-inner-icon="mdi-mail"
                        type="text"></v-text-field></v-col>
                
                <v-img class="preview" :src="newPosterURL" v-on:click="deleteMoviePoster"></v-img>

                <br>
                <div class="files">
                    <div v-for="url in filesUrls">
                        <img class="preview" :src='url.url' v-on:click="deleteMovieImage(url)"/>
                    </div>

             
                </div>

                <v-btn id="log_in" prepend-icon="mdi-check-bold" v-on:click="deleteMovieImageThroughForm" color="black">
                    Сохранить </v-btn> <v-btn id="registration" prepend-icon="mdi-list-box-outline" v-on:click="backToMainPage"
                    color="black" > Список фильмов </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="backToEditMoviePage"
                        color="black"> Назад </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<style scoped>
.files {
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


.preview:hover{
    opacity: 0.5
}

.container {
    position: relative;
    width: 50%;
}

.container .delete {
    position: absolute;
    top: 4%;
    left: 37%;
    background-color: white;
    color: rgb(0, 0, 0);
    font-size: 15px;
    padding: 10px 20px;

    border-radius: 5px;
}

.container .delete:hover {
    background-color: rgb(128, 128, 128);
}
</style>