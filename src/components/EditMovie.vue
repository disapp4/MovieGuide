<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { Movie } from "../models/Movie.js";
import { Language } from "../models/Language";
import { I18nMovie } from "../models/I18nMovie";
import { CreateImageResponse } from "../models/CreateImageResponse";
import DeleteImgComponent from "./DeleteImgComponent.vue";
import { useUserStore } from "../stores/userStore.js";

type Data = {
    movie: Movie,
    changedRuPosterURL: string | null,
    changedEnPosterURL: string | null,
    ruPosterFile: File | null,
    enPosterFile: File | null,
    imageFiles: Array<File> | null,
    changedImagesURL: string | null,
    movieIsLoaded: boolean,
    deletedRuImageId: string | null,
    deletedEnImageId: string | null,
    deletedImages: Array<String>,
    restoreImages: Array<String>,
    loading:boolean,
    store: ReturnType<typeof useUserStore>
}
let nullMovie = new Movie();
nullMovie.i18n = { [Language.English]: new I18nMovie(), [Language.Russian]: new I18nMovie() };

export default defineComponent({
        data(): Data {
            return {
                movie: nullMovie,
                changedRuPosterURL: "",
                changedEnPosterURL: "",
                ruPosterFile: null,
                enPosterFile: null,
                imageFiles: [],
                changedImagesURL: "",
                movieIsLoaded: false,
                deletedRuImageId: "",
                deletedEnImageId: "",
                deletedImages: [],
                restoreImages: [],
                loading: false,
                store: useUserStore()
            };
        },
        components: { DeleteImgComponent },
        created() {
            this.refreshMovie();
        },
        methods: {
            loadSave () {
                this.loading = true
                setTimeout(() => (this.loading = false), 500);
                setTimeout(this.editMovieThroughForm, 1000);

            },
            deleteRuImage() {
                this.deletedRuImageId = "delete";
            },
            restoreRuImage() {
                this.deletedRuImageId = "restore";
            },
            deleteEnImage() {
                this.deletedEnImageId = "delete";
            },
            restoreEnImage() {
                this.deletedEnImageId = "restore";
            },
            deleteImage(imageId: string) {
                this.deletedImages.push(imageId);
            },
            restoreImage(imageId: string) {
                this.restoreImages.push(imageId);
            },
            refreshMovie() {
                let movieId: string = (this.$route.params.id as string);
                client.getMovie(movieId).then((response: AxiosResponse<Movie>) => {
                    this.movie = response.data;
                    this.movieIsLoaded = true;
                });
            },
            editMovieThroughForm() {
                if (this.deletedRuImageId == "delete") {
                    this.movie.i18n.Russian!!.posterId = null;
                }
                if (this.deletedEnImageId == "delete") {
                    this.movie.i18n.English!!.posterId = null;
                }
                if (this.deletedImages) {
                    let allImageIds = this.movie.imageIds.filter(imgId => !this.deletedImages.includes(imgId));
                    // todo: research this
                    // @ts-ignore
                    this.movie.imageIds = allImageIds.concat(this.restoreImages);
                }
                client.putMovie(this.movie)
                    .then(() => router.push({ name: "mainPage" }));
            },
            backToMainPage() {
                router.push({ name: "mainPage" });
            },
            putRuMoviePoster(files: Array<File>) {
                this.ruPosterFile = files[0];
                client.postImage(this.ruPosterFile).then((response: AxiosResponse<CreateImageResponse>) => {
                    this.movie.i18n.Russian!!.posterId = response.data.id;
                    this.changedRuPosterURL = this.ruPosterFile ? URL.createObjectURL(this.ruPosterFile) : null;
                });
            },
            putEnMoviePoster(files: Array<File>) {

                this.enPosterFile = files[0];
                client.postImage(this.enPosterFile).then((response: AxiosResponse<CreateImageResponse>) => {
                    this.movie.i18n.English!!.posterId = response.data.id;
                    this.changedEnPosterURL = this.enPosterFile ? URL.createObjectURL(this.enPosterFile) : null;
                });
            },
            putMovieImages(files: Array<File>) {
                let uploadedFiles: Array<File> = files;
                if (this.imageFiles)
                    for (let i = 0; i < uploadedFiles.length; i++) {
                        client.postImage(uploadedFiles[i]).then((response: AxiosResponse<CreateImageResponse>) => {
                            this.movie.imageIds.push(response.data.id);
                            this.imageFiles!!.push(uploadedFiles[i]);
                        });

                    }
            }
        },
    computed: {
        ruTitle() {
            return this.movie.i18n[Language.fromCode("ru")]!.title;
        },
        Language() {
            return Language;
        },
        movieTitle(lang: string) {
            return this.movie.i18n[Language.fromCode(lang)]!.title;
        },
        imageIds() {
            let imageIds = [];
            imageIds.push(...(this.movie.imageIds || []));
            return imageIds;
        },
        userRole(){
            return this.store.hasRole

        }

    },
    }
);
</script>
<template>
    <v-card class="edit" v-if="userRole">
        <v-card-text>
            <v-form>
                <h1> {{ $t("editMoviePage.title") }} </h1>
                <br>
                <div class="languages">
                    <div class="ru">
                        <p class="version"> <strong> Русская версия</strong></p>
                        <v-col cols="10" sm="8" class="title"> {{ $t("placeholders.title") }}

                        <v-text-field v-bind:model-value="movie.i18n.Russian?.title"
                                      v-on:update:modelValue="(value) => {
                                          if (movie.i18n.Russian) {
                                              movie.i18n.Russian.title = value
                                          }
                                      }"
                                      :placeholder="$t('editMoviePage.placeholders.editTitle')"
                                      prepend-inner-icon="mdi-mail"
                                      type="text" variant="solo"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8" class="title"> {{ $t("placeholders.description") }}
                            <v-textarea v-bind:model-value="movie.i18n.Russian?.description"
                                          v-on:update:modelValue="(value) => {
                                          if (movie.i18n.Russian) {
                                              movie.i18n.Russian.description = value
                                          }
                                      }"
                                          :placeholder="$t('editMoviePage.placeholders.editDescription')"
                                          prepend-inner-icon="mdi-information"
                                          type="text" variant="solo"></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-file-input :label="$t('placeholders.addPoster')"
                                          v-on:update:modelValue="putRuMoviePoster"
                                           prepend-icon="mdi-camera" variant="solo" color="deep-purple-accent-2" ></v-file-input>
                        </v-col>

                        <DeleteImgComponent :imageId="movie.i18n.Russian?.posterId"
                                            v-on:delete="deleteRuImage"
                                            v-on:restore="restoreRuImage"
                        />
                    </div>
                    <div class="en">
                        <p class="version"> <strong> English version</strong></p>
                        <v-col cols="12" sm="8" class="title"> {{ $t("placeholders.title") }}
                            <v-text-field v-bind:model-value="movie.i18n.English?.title"
                                          v-on:update:modelValue="(value) => {
                                          if (movie.i18n.English) {
                                              movie.i18n.English.title = value
                                          }
                                      }"
                                          :placeholder="$t('editMoviePage.placeholders.editTitle')"
                                          prepend-inner-icon="mdi-mail"
                                          type="text" variant="solo"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8" class="title"> {{ $t("placeholders.description") }}
                            <v-textarea  v-bind:model-value="movie.i18n.English?.description"
                                          v-on:update:modelValue="(value) => {
                                          if (movie.i18n.English) {
                                              movie.i18n.English.description = value
                                          }
                                      }"
                                          :placeholder="$t('editMoviePage.placeholders.editDescription')"
                                          prepend-inner-icon="mdi-information"
                                          type="text" variant="solo"></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-file-input :label="$t('placeholders.addPoster')"
                                          v-on:update:modelValue="putEnMoviePoster"
                                           prepend-icon="mdi-camera" variant="solo" color="deep-purple-accent-2"  ></v-file-input>

                        </v-col>
                        <DeleteImgComponent :imageId="movie.i18n.English?.posterId"
                                            v-on:delete="deleteEnImage"
                                            v-on:restore="restoreEnImage"
                        />
                    </div>
                </div>
                <br>
                <div class="add">
                    <v-col cols="12" sm="3">
                        <v-file-input  :label="$t('placeholders.addImages')" v-on:update:modelValue="putMovieImages"
                                      multiple variant="solo" prepend-icon="mdi-camera" color="deep-purple-accent-2"></v-file-input>
                    </v-col>
                </div>
                <br>
                <div class="files">
                    <div v-for="imageId in imageIds">

                        <DeleteImgComponent :imageId="imageId"
                                            v-on:delete="deleteImage(imageId)"
                                            v-on:restore="restoreImage(imageId)"
                        />
                    </div>
                </div>
                <br>
                <v-btn id="log_in" :loading="loading" prepend-icon="mdi-check-bold" v-on:click="loadSave" color="black">
                    {{ $t("buttons.save") }}
                </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="backToMainPage"
                           color="black"> {{ $t("buttons.back") }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>

</template>

<style scoped>
.version{
    position: relative;
    font-size: larger;
    right:120px
}

.title{
    font-size: large;
}
.edit {
    background: #F5F5F5;
}

.files {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;

}

.languages {
    display: flex;
}

div.ru {
    float: left;
    width: 50%;
}

div.en {
    float: right;
    width: 50%;
}
</style>


 
