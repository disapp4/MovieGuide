<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import router from "../router";
import { client } from "../clients/Client";
import { AxiosResponse } from "axios";
import { Movie } from "../models/Movie";
import { Language } from "../models/Language";
import { I18nMovie } from "../models/I18nMovie";
import { CreateImageResponse } from "../models/CreateImageResponse";
import DeleteImgComponent from "../components/DeleteImgComponent.vue";
import { appStore } from "../stores/appStore";

const nullMovie = ref(new Movie());
nullMovie.value.i18n = { [Language.Russian]: new I18nMovie(), [Language.English]: new I18nMovie() };

const movie = ref(nullMovie);
const changedRuPosterURL = ref<string | null>("");
const changedEnPosterURL = ref<string | null>("");
const ruPosterFile = ref<File | null>(null);
const enPosterFile = ref<File | null>(null);
const imageFiles = ref<Array<File> | null>([]);
const deletedRuImage = ref<boolean | null>(false);
const deletedEnImage = ref<boolean | null>(false);
const deletedImages = ref<string[]>([]);
const restoreImages = ref<string[]>([]);
const loading = ref<boolean>(false);
const store = appStore();

onMounted(() => {
    refreshMovie();
});

const isAdmin = computed(() => {
    return store.isAdmin;
});

const imageIds = computed(() => {
    const imageIds = [];
    imageIds.push(...(movie.value.imageIds || []));
    return imageIds;
});

const deleteRuImage = () => {
    deletedRuImage.value = true;
};
const restoreRuImage = () => {
    deletedRuImage.value = false;
};
const deleteEnImage = () => {
    deletedRuImage.value = true;
};
const restoreEnImage = () => {
    deletedRuImage.value = false;
};

const deleteImage = (imageId: string) => {
    deletedImages.value.push(imageId);
};
const restoreImage = (imageId: string) => {
    restoreImages.value.push(imageId);
};
const goToMainPage = () => {
    router.push({ name: "mainPage" });
};

const refreshMovie = () => {
    const movieId: string = router.currentRoute.value.params.id as string;
    client.getMovie(movieId).then((response: AxiosResponse<Movie>) => {
        movie.value = response.data;
    });
};

const makeEditMovieRequest = () => {
        if (deletedRuImage.value) {
            movie.value.i18n.Russian!!.posterId = null;
        }
        if (deletedEnImage.value) {
            movie.value.i18n.English!!.posterId = null;
        }
        if (deletedImages.value.length) {
            const allImageIds = movie.value.imageIds.filter(imgId => !deletedImages.value.includes(imgId));
            movie.value.imageIds = allImageIds.concat(restoreImages.value);
        }
        client.putMovie(movie.value).then(() => router.push({ name: "mainPage" }));
    }
;

const putRuMoviePoster = (files: Array<File>) => {
    ruPosterFile.value = files[0];
    client.postImage(ruPosterFile.value).then((response: AxiosResponse<CreateImageResponse>) => {
        movie.value.i18n.Russian!!.posterId = response.data.id;
        changedRuPosterURL.value = ruPosterFile.value ? URL.createObjectURL(ruPosterFile.value) : null;
    });
};

const putEnMoviePoster = (files: Array<File>) => {
    enPosterFile.value = files[0];
    client.postImage(enPosterFile.value).then((response: AxiosResponse<CreateImageResponse>) => {
        movie.value.i18n.English!!.posterId = response.data.id;
        changedEnPosterURL.value = enPosterFile.value ? URL.createObjectURL(enPosterFile.value) : null;
    });
};
const putMovieImages = (files: Array<File>) => {
    const uploadedFiles: File[] = files;
    if (imageFiles.value)
        for (const uploadedFile of uploadedFiles) {
            client.postImage(uploadedFile).then((response: AxiosResponse<CreateImageResponse>) => {
                movie.value.imageIds.push(response.data.id);
                imageFiles.value!!.push(uploadedFile);
            });
        }
};
</script>
<template>
    <v-card class="edit" v-if="isAdmin">
        <v-card-text>
            <v-form>
                <h1> {{ $t("editMoviePage.title") }} </h1>
                <br>
                <div class="languages">
                    <div class="ru">
                        <p class="version"><strong> Русская версия</strong></p>
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
                                          prepend-icon="mdi-camera" variant="solo"
                                          color="deep-purple-accent-2"></v-file-input>
                        </v-col>
                        <DeleteImgComponent :imageId="movie.i18n.Russian?.posterId"
                                            v-on:delete="deleteRuImage"
                                            v-on:restore="restoreRuImage"
                        />
                    </div>
                    <div class="en">
                        <p class="version"><strong> English version</strong></p>
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
                            <v-textarea v-bind:model-value="movie.i18n.English?.description"
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
                                          prepend-icon="mdi-camera" variant="solo"
                                          color="deep-purple-accent-2"></v-file-input>

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
                        <v-file-input :label="$t('placeholders.addImages')" v-on:update:modelValue="putMovieImages"
                                      multiple variant="solo" prepend-icon="mdi-camera"
                                      color="deep-purple-accent-2"></v-file-input>
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
                <v-btn id="log_in" :loading="loading" prepend-icon="mdi-check-bold" v-on:click="makeEditMovieRequest"
                       color="black">
                    {{ $t("buttons.save") }}
                </v-btn>
                <v-card-actions>
                    <v-btn id="registration" prepend-icon="mdi-arrow-left-bottom-bold" v-on:click="goToMainPage"
                           color="black"> {{ $t("buttons.back") }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<style scoped>
.version {
    position: relative;
    font-size: larger;
    right: 120px
}

.title {
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

.ru {
    width: 50%;
}

.en {
    width: 50%;
}
</style>