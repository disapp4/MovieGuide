<script lang="ts">

import { defineComponent } from "vue";

type Data = {
    imageIsDeleted: boolean
}
export default defineComponent({
    data(): Data {
        return {
            imageIsDeleted: false
        };
    },
    props: {
        imageId: { type: String },
        loadingImg: { type: Boolean }
    },
    computed: {
        imageUrl() {
            if (this.imageId == null) {
                return window.location.origin + "/no_poster.jpg";
            }
            console.log(this.loadingImg);
            return import.meta.env.VITE_BACKEND_BASE_URL + "images/" + this.imageId;
        }
    },
    emits: ["delete", "restore"],
    methods: {
        switchImage(imageId: string) {
            this.imageIsDeleted = !this.imageIsDeleted;
            this.imageIsDeleted ? this.$emit("delete", imageId) : this.$emit("restore", imageId);
        },
        iconButton() {
            return this.imageIsDeleted ? "O" : "X";
        }
    }
});
</script>
<template>
    <div class="deleteImage">
        <img :src="imageUrl" class="previewPoster" :class="{deleted: imageIsDeleted}" />
        <v-btn class="button" size="small" variant="text" v-on:click="switchImage" :icon="iconButton"></v-btn>

    </div>
</template>
<style>
.previewPoster {
    border-radius: 10px;
    margin: 10px 20px;
    width: 200px;
    height: 250px

}

.deleteImage {
    position: relative;
    width: 50%;
}

.deleteImage button {
    position: absolute;
    bottom: 80%;
    left: 68%;
    background-color: white;
    color: black;
    font-size: 14px;
}

.deleted {
    opacity: 0.5
}

</style>