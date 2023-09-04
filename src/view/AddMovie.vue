<script setup lang="ts">
import router from "../router";
import { client } from "../clients/Client";
import { computed, ref } from "vue";
import { CreateMovieRequest } from "../models/CreateMovieRequest";
import { AxiosResponse } from "axios";
import { Language } from "../models/Language";
import { I18nCreateMovieRequest } from "../models/I18nCreateMovieRequest";
import { CreateImageResponse } from "../models/CreateImageResponse";
import { appStore } from "../stores/appStore";


const ruTitle = ref("");
const enTitle = ref("");
const ruDescription = ref("");
const enDescription = ref("");
const ruPosterFile = ref<File | null>(null);
const enPosterFile = ref<File | null>(null);
const ruPosterURL = ref("no_poster.jpg");
const enPosterURL = ref("no_poster.jpg");
const ruPosterId = ref<string | null>(null);
const enPosterId = ref<string | null>(null);
const imageFiles = ref<Array<File> | null>([]);
const imageIds = ref<Array<string> | null>([]);
const store = appStore();

const isAdmin = computed(() => store.isAdmin);

const addedFilesUrls = computed(() => {
    if (imageFiles.value) {
        return imageFiles.value.map(item => URL.createObjectURL(item));
    }
});

const makeAddMovieRequest = () => {
    const ruCreateMovieRequest = new I18nCreateMovieRequest();
    ruCreateMovieRequest.title = ruTitle.value;
    ruCreateMovieRequest.description = ruDescription.value;
    ruCreateMovieRequest.posterId = ruPosterId.value;

    const enCreateMovieRequest = new I18nCreateMovieRequest();
    enCreateMovieRequest.title = enTitle.value;
    enCreateMovieRequest.description = enDescription.value;
    enCreateMovieRequest.posterId = enPosterId.value;

    const createMovieRequest = new CreateMovieRequest();
    createMovieRequest.i18n = {
        [Language.Russian]: ruCreateMovieRequest,
        [Language.English]: enCreateMovieRequest
    };
    createMovieRequest.imageIds = imageIds.value;
    client.postMovie(createMovieRequest).then(() => router.push({ name: "mainPage" }));
};

const goToMainPage = () => {
    router.push({ name: "mainPage" });
};

const putRuMoviePoster = (files: Array<File>) => {
    ruPosterFile.value = files[0];
    if (ruPosterFile.value != null) {
        client.postImage(ruPosterFile.value).then((response: AxiosResponse<CreateImageResponse>) => {
            ruPosterId.value = response.data.id;
            ruPosterURL.value = URL.createObjectURL(ruPosterFile.value!!);
        });
    } else {
        ruPosterURL.value = "no_poster.jpg";
    }
};
const putEnMoviePoster = (files: Array<File>) => {
    enPosterFile.value = files[0];
    if (enPosterFile.value != null) {
        client.postImage(enPosterFile.value).then((response: AxiosResponse<CreateImageResponse>) => {
            enPosterId.value = response.data.id;
            enPosterURL.value = URL.createObjectURL(enPosterFile.value!!);
        });
    } else {
        enPosterURL.value = "no_poster.jpg";
    }
};

const putMovieImages = (files: Array<File>) => {
    if (imageFiles.value)
        for (const uploadedFile of files) {
            client.postImage(uploadedFile).then((response: AxiosResponse<CreateImageResponse>) => {
                imageIds.value!.push(response.data.id);
                imageFiles.value!.push(uploadedFile);
            });
        }
};
</script>
<template>
    <v-card class="add" v-if="isAdmin">
        <v-card-text>
            <v-form>
                <h1> {{ $t("addMoviePage.title") }} </h1>
                <div class="languages">
                    <div class="ru">
                        <p class="version"><strong> Русская версия </strong></p>
                        <v-col cols="12" sm="8" class="title"> {{ $t("placeholders.title") }}
                            <v-text-field v-model="ruTitle" :placeholder="$t('addMoviePage.placeholders.enterTitle')"
                                          prepend-inner-icon="mdi-mail"
                                          type="text" variant="solo"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8" class="title"> {{ $t("placeholders.description") }}
                            <v-textarea v-model="ruDescription"
                                        :placeholder="$t('addMoviePage.placeholders.enterDescription')"
                                        prepend-inner-icon="mdi-mail"
                                        type="text" variant="solo"></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-file-input :label="$t('placeholders.addPoster')"
                                          v-on:update:modelValue="putRuMoviePoster"
                                          prepend-icon="mdi-camera" variant="solo"
                                          color="deep-purple-accent-2"></v-file-input>
                        </v-col>
                        <img class="previewImage" :src="ruPosterURL" alt="ruPreview" />
                        <br>
                    </div>
                    <div class="en">
                        <p class="version"><strong> English version</strong></p>
                        <v-col cols="12" sm="8" class="title"> {{ $t("placeholders.title") }}
                            <v-text-field v-model="enTitle" :placeholder="$t('addMoviePage.placeholders.enterTitle')"
                                          prepend-inner-icon="mdi-mail"
                                          type="text" variant="solo"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8" class="title"> {{ $t("placeholders.description") }}
                            <v-textarea v-model="enDescription"
                                        :placeholder="$t('addMoviePage.placeholders.enterDescription')"
                                        prepend-inner-icon="mdi-mail"
                                        type="text" variant="solo"></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-file-input :label="$t('placeholders.addPoster')"
                                          v-on:update:modelValue="putEnMoviePoster"
                                          variant="solo" color="deep-purple-accent-2"
                                          prepend-icon="mdi-camera"></v-file-input>
                        </v-col>
                        <img class="previewImage" :src="enPosterURL" alt="enPreview" />
                        <br>
                    </div>
                </div>
                <v-col cols="12" sm="4">
                    <v-file-input :label="$t('placeholders.addImages')" v-on:update:modelValue="putMovieImages" multiple
                                  variant="solo" color="deep-purple-accent-2" prepend-icon="mdi-camera"></v-file-input>
                </v-col>
                <div class="files">
                    <div v-for="url in addedFilesUrls">
                        <img class="previewImage" :src="url" alt="imagePreview" />
                    </div>
                </div>
                <v-btn id="log_in" prepend-icon="mdi-check-bold" v-on:click="makeAddMovieRequest" color="black">
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
    font-size: large
}

.add {
    background: #F5F5F5
}

.files {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
}

.previewImage {
    border-radius: 10px;
    margin: 10px 20px;
    width: 200px;
    height: 250px;
    box-shadow: 0 0 10px #444;
    border: 1px #ccc solid;
}

.languages {
    display: flex;
}

div.ru {
    width: 50%;
}

div.en {
    width: 50%;
}
</style>