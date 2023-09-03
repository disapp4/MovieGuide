<!--<script setup lang="ts">-->
<!--import { Page } from "../models/Page";-->
<!--import { Movie } from "../models/Movie";-->
<!--import { ref, watch, PropType } from "vue";-->

<!--const pageNumber = ref(0);-->
<!--const pageNumberView = ref(1);-->
<!--const totalPages = ref(5);-->

<!--const props = defineProps({-->
<!--    page: {-->
<!--        type: Object as PropType<Page<Movie>>,-->
<!--        required: true-->
<!--    }-->
<!--});-->

<!--const emits = defineEmits(["changePageNumber"]);-->

<!--watch(() => props.page, (newVal) => {-->
<!--    pageNumber.value = newVal.number;-->
<!--    pageNumberView.value = pageNumber.value + 1;-->
<!--    totalPages.value = newVal.totalPages;-->
<!--});-->

<!--const goToPage = (value: any) => {-->
<!--    pageNumber.value = value - 1;-->
<!--    emits("changePageNumber", pageNumber.value);-->
<!--};-->

<!--</script>-->
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