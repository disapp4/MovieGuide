<script lang="ts">
import { Page } from "../models/Page";
import { defineComponent, PropType } from "vue";

import { Movie } from "../models/Movie";

export default defineComponent({
    data() {
        return {
            pageNumber: 0,
            pageNumberView: 1,
            totalPagesView: 5
        };
    },
    props: {
        page: { type: Object as PropType<Page<Movie>> }
    },
    watch: {
        page: function(newVal) {
            this.pageNumber = newVal.number;
            this.pageNumberView = this.pageNumber + 1;
            this.totalPagesView = newVal.totalPages;
        }
    },
    emits: ["changePageNumber"],
    methods: {
        goToNextPage() {
            this.pageNumber = this.pageNumber + 1;
            this.$emit("changePageNumber", this.pageNumber);
        },
        goToPreviousPage() {
            this.pageNumber = this.pageNumber - 1;
            this.$emit("changePageNumber", this.pageNumber);
        },
        goToPage(value:any) {
            this.pageNumber = value - 1;
            this.$emit("changePageNumber", this.pageNumber);
        }
    }
});
</script>

<template>
    <div class="text-center">
        <p>
            <v-pagination v-model="pageNumberView" :length="totalPagesView" rounded="circle" total-visible="4"
                          prev-icon="mdi-menu-left"
                          next-icon="mdi-menu-right"
                          color="black"   v-on:update:model-value="goToPage"></v-pagination>
        </p>
    </div>
</template>