<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent } from "vue";
import { CreateMovieRequest } from "../models/CreateMovieRequest";
import { AxiosResponse } from "axios";
import { Language } from "../models/Language.js";
import { I18nCreateMovieRequest } from "../models/I18nCreateMovieRequest";
import { CreateImageResponse } from "../models/CreateImageResponse";
import { useUserStore } from "../stores/userStore.js";

type Data = {
    ruTitle: string,
    ruDescription: string | null,
    enTitle: string,
    enDescription: string | null,
    imageFiles: Array<File> | null,
    ruPosterFile: File | null,
    ruPosterURL: string,
    imagesURL: string,
    enPosterFile: File | null,
    enPosterURL: string,
    ruPosterId: string | null,
    enPosterId: string | null,
    imageIds: Array<String> | null,
    loading:boolean,
    store:ReturnType<typeof useUserStore>
}

export default defineComponent({
    data(): Data {
        return {
            ruTitle: "",
            ruDescription: "",
            enTitle: "",
            enDescription: "",
            imageFiles: [],
            ruPosterFile: null,
            ruPosterURL: "no_poster.jpg",
            imagesURL: "",
            enPosterFile: null,
            enPosterURL: "no_poster.jpg",
            ruPosterId: "",
            enPosterId: "",
            imageIds: [],
            loading:false,
            store: useUserStore()
        };
    },
    computed: {
        addedFilesUrls() {
            if (this.imageFiles) {
                return this.imageFiles.map(item => URL.createObjectURL(item));
            }
        },
        userRole(){
            return this.store.hasRole

        }
    },
    methods: {
        loadSave(){
            this.loading = true
            setTimeout(() => (this.loading = false), 500);
            setTimeout(this.addMovieThroughForm, 1000);


        },
        addMovieThroughForm() {
            let ruCreateMovieRequest = new I18nCreateMovieRequest();
            ruCreateMovieRequest.title = this.ruTitle;
            ruCreateMovieRequest.description = this.ruDescription;
            ruCreateMovieRequest.posterId = this.ruPosterId;

            let enCreateMovieRequest = new I18nCreateMovieRequest();
            enCreateMovieRequest.title = this.enTitle;
            enCreateMovieRequest.description = this.enDescription;
            enCreateMovieRequest.posterId = this.enPosterId;

            let createMovieRequest = new CreateMovieRequest();
            createMovieRequest.i18n = {
                [Language.Russian]: ruCreateMovieRequest,
                [Language.English]: enCreateMovieRequest
            };

            createMovieRequest.imageIds = this.imageIds;
            client.postMovie(createMovieRequest)
                .then(() => router.push({ name: "mainPage" }));
        },
        backToMainPage() {
            router.push({ name: "mainPage" });
        },
        putRuMoviePoster(files: Array<File>) {
            this.ruPosterFile = files[0];
            if (this.ruPosterFile != null) {
                client.postImage(this.ruPosterFile).then((response: AxiosResponse<CreateImageResponse>) => {
                    this.ruPosterId = response.data.id;
                    this.ruPosterURL = URL.createObjectURL(this.ruPosterFile!!);
                });
            } else {
                this.ruPosterURL = "no_poster.jpg";
            }
        },
        putEnMoviePoster(files: Array<File>) {
            this.enPosterFile = files[0];
            if (this.enPosterFile != null) {
                client.postImage(this.enPosterFile).then((response: AxiosResponse<CreateImageResponse>) => {
                    this.enPosterId = response.data.id;
                    this.enPosterURL = URL.createObjectURL(this.enPosterFile!!);
                });

            } else {
                this.enPosterURL = "no_poster.jpg";
            }
        },
        putMovieImages(files: Array<File>) {
            let uploadedFiles: Array<File> = files;
            if (this.imageFiles)
                for (let i = 0; i < uploadedFiles.length; i++) {
                    client.postImage(uploadedFiles[i]).then((response: AxiosResponse<CreateImageResponse>) => {
                        this.imageIds!!.push(response.data.id);
                        this.imageFiles!!.push(uploadedFiles[i]);
                    });
                }
        }
    }
});
</script>
<template>

    <v-card class="add" v-if="userRole">
        <v-card-text>
            <v-form>
                <h1> {{ $t("addMoviePage.title") }} </h1>
                <div class="languages">
                    <div class="ru">
                        <p class="version"> <strong> Русская версия </strong></p>
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
                        <img class="preview2" :src="ruPosterURL" alt="ruPreview" />
                        <br>
                    </div>
                    <div class="en">
                        <p class="version"> <strong> English version</strong></p>
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
                        <img class="preview2" :src="enPosterURL" alt="enPreview" />
                        <br>
                    </div>
                </div>
                <v-col cols="12" sm="4">
                    <v-file-input :label="$t('placeholders.addImages')" v-on:update:modelValue="putMovieImages" multiple
                                  variant="solo" color="deep-purple-accent-2" prepend-icon="mdi-camera"></v-file-input>
                </v-col>
                <div class="files2">
                    <div v-for="url in addedFilesUrls">
                        <img class="preview" :src="url" alt="imagePreview" />
                    </div>
                </div>
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



.title {
    font-size: large
}

.add {
    background: #F5F5F5
}

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
    height: 250px;
    box-shadow: 0 0 10px #444;
    border: 1px #ccc solid;
}

.preview2 {
    margin: 10px;
    border-radius: 10px;
    width: 200px;
    height: 250px;
    box-shadow: 0 0 10px #444;
    border: 1px #ccc solid;
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
