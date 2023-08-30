<script lang="ts">
import { Page } from "../models/Page";
import { defineComponent, PropType } from "vue";
import { Movie } from "../models/Movie";

export default defineComponent({
    data() {
        return {
            pageNumber: 0,
            pageNumberView: 1,
            totalPages: 5
        };
    },
    props: {
        page: { type: Object as PropType<Page<Movie>> }
    },
    watch: {
        page: function(newVal) {
            this.pageNumber = newVal.number;
            this.pageNumberView = this.pageNumber + 1;
            this.totalPages = newVal.totalPages;
        }
    },
    emits: ["changePageNumber"],
    methods: {
        goToPage(value: any) {
            this.pageNumber = value - 1;
            this.$emit("changePageNumber", this.pageNumber);
        }
    }
});
</script>

<template>
    <div class="text-center">
        <v-pagination v-model="pageNumberView" :length="totalPages" rounded="circle" total-visible="4"
                      prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right"
                      color="black" v-on:update:model-value="goToPage"></v-pagination>
    </div>
</template>