<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent, ref } from "vue";
import { CreateMovieRequest } from "../models/CreateMovieRequest";
import { CreateMovieResponse } from "../models/CreateMovieResponse";
import { AxiosResponse } from "axios";

type Data = {
    title: string
    description: string,
    imageFiles: Array<File> | null,
    posterFile: File | null,
    posterURL: string,
    imagesURL: string
}

export default defineComponent({
    data(): Data {
        return {
            title: "",
            description: "",
            imageFiles: [],
            posterFile: null,
            posterURL: "no_poster.jpg",
            imagesURL: ""
        };
    },
    computed: {
        addedFilesUrls() {
            if (this.imageFiles) {
                return this.imageFiles.map(item => URL.createObjectURL(item));
            }
        }
    },
    methods: {
        addMovieThroughForm() {
            let createMovieRequest = new CreateMovieRequest();
            createMovieRequest.title = this.title;
            createMovieRequest.description = this.description;
            client.postMovie(createMovieRequest)
                .then((response: AxiosResponse<CreateMovieResponse>) => {
                    let imagePromises = [];
                    if (this.posterFile) {
                        imagePromises.push(client.putMoviePoster(this.posterFile, response.data.id));
                    }
                    if (this.imageFiles)
                        for (let i = 0; i < this.imageFiles.length; i++) {
                            imagePromises.push(client.postMovieImage(this.imageFiles[i], response.data.id));
                        }
                    Promise.all(imagePromises)
                        .then(() => router.push({ name: "mainPage" }));
                });
        },
        backToMainPage() {
            router.push({ name: "mainPage" });
        },
        putMoviePoster(files: Array<File>) {
            this.posterFile = files[0];
            if (this.posterFile != null) {
                this.posterURL = URL.createObjectURL(this.posterFile);
            } else {
                this.posterURL = "no_poster.jpg";
            }
        },
        putMovieImages(files: Array<File>) {
            let uploadedFiles: Array<File> = files;
            if (this.imageFiles)
                for (let i = 0; i < uploadedFiles.length; i++) {
                    this.imageFiles.push(uploadedFiles[i]);
                }
        }
    }
});
</script>
<template>

    <v-card>
        <v-card-text>
            <v-form>

                <h1> {{ $t("addMoviePage.title") }} </h1>
                <v-col cols="12" sm="6"> {{ $t("placeholders.title") }}
                    <v-text-field v-model="title" :placeholder="$t('addMoviePage.placeholders.enterTitle')"
                                  prepend-inner-icon="mdi-mail"
                                  type="text"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"> {{ $t("placeholders.description") }}
                    <v-text-field v-model="description" :placeholder="$t('addMoviePage.placeholders.enterDescription')"
                                  prepend-inner-icon="mdi-mail"
                                  type="text"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-file-input :label="$t('placeholders.addPoster')" v-on:update:modelValue="putMoviePoster"
                                  variant="filled"
                                  prepend-icon="mdi-camera"></v-file-input>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-file-input :label="$t('placeholders.addImages')" v-on:update:modelValue="putMovieImages" multiple
                                  variant="filled" prepend-icon="mdi-camera"></v-file-input>
                </v-col>

                <img class="preview2" :src="posterURL" />
                <br>
                <div class="files2">
                    <div v-for="url in addedFilesUrls">
                        <img class="preview" :src="url" />
                    </div>
                </div>
                <v-btn id="log_in" prepend-icon="mdi-check-bold" v-on:click="addMovieThroughForm" color="black">
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
.preview2 {
    margin: 10px 20px;
    border-radius: 10px;
    width: 200px;
    height: 250px
}
</style>
