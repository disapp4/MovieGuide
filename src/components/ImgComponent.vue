<script lang="ts">

import { defineComponent, PropType } from "vue";
import { ImageData } from "@/models/ImageData";

export default defineComponent({
    data() {
        return {
            isSelected: false
        };
    },
    props: {
        imageData: { type: Object as PropType<ImageData>, default: new ImageData() }
    },
    emits: ["deleteMovieImage"]
});
</script>
<template>
    <img class="previewDelete" :class="{selected: isSelected}" :src="imageData.url"
         v-on:click="() => {isSelected=!isSelected,$emit('deleteMovieImage',imageData)}" />

</template>
<style>
.selected {
    opacity: 0.5;
}

.previewDelete:hover {
    opacity: 0.5
}

.previewDelete {
    border-radius: 10px;
    margin: 10px 20px;
    width: 200px;
    height: 250px
}
</style>