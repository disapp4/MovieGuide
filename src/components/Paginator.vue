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
        page: function(newVal, oldVal) {
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
        }
    }
});
</script>

<template>
    <div class="text-center">
        <p>
            <v-pagination v-model="pageNumberView" :length="totalPagesView" rounded="circle" :total-visible="4"
                          v-on:next="goToNextPage" v-on:prev="goToPreviousPage"></v-pagination>
        </p>
    </div>
</template>