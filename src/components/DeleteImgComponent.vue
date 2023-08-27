<script lang="ts">
import { defineComponent, PropType } from "vue";

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
        imageId: { type: null as unknown as PropType<string | null>, required: false }
    },
    computed: {
        imageUrl() {
            if (this.imageId == null) {
                return window.location.origin + "/no_poster.jpg";
            }
            return import.meta.env.VITE_BACKEND_BASE_URL + "images/" + this.imageId;
        },
        iconButton() {
            return this.imageIsDeleted ? "mdi-backup-restore" : "mdi-delete";
        }
    },
    emits: ["delete", "restore"],
    methods: {
        switchImage(imageId: string) {
            this.imageIsDeleted = !this.imageIsDeleted;
            this.imageIsDeleted ? this.$emit("delete", imageId) : this.$emit("restore", imageId);
        }

    }});
</script>
<template>
    <div class="deleteImage">
        <img :src="imageUrl" class="previewPoster" :class="{deleted: imageIsDeleted}" alt="posterPreview" />
        <v-btn class="button"  density="comfortable" v-on:click="switchImage" :icon="iconButton"></v-btn>
    </div>
</template>
<style>
.previewPoster {
    border-radius: 10px;
    margin: 5px 5px 5px 5px;
    width: 200px;
    height: 250px;
    box-shadow: 0 0 10px #444;
    border: 1px #ccc solid;
}

.deleteImage {
    position: relative;
    width: 220px;
    height: 250px;
}

.button {
    position: absolute;
    bottom: 100%;
    left: 32%;
    color: black;
    font-size: 14px;
}

.deleteImage button:hover {
    color: red
}

.deleted {
    opacity: 0.5
}

</style>