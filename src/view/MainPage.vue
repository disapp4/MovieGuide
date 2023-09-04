<script setup  lang="ts">
import Movies from "../components/Movies.vue";
import Paginator from "../components/Paginator.vue";
import Sorting from "../components/Sorting.vue";
import { Movie } from "../models/Movie";
import { Page } from "../models/Page";
import router from "../router";
import { computed, onMounted, Ref, ref, watch } from "vue";
import { AxiosResponse } from "axios";
import { client } from "../clients/Client";
import { Language } from "../models/Language";
import { appStore } from "../stores/appStore";
import SpinnerComponent from "../components/SpinnerComponent.vue";
import i18n from "../main";

const currentPage= ref<Page<Movie>>(new Page<Movie>());
const loading = ref(true);
const store = appStore();

const isAdmin = computed(() => {
    return store.isAdmin;
});

const paginatorRef = ref<typeof Paginator>();
const sortingRef = ref<typeof Sorting>();

onMounted(() => {
    refreshMoviePage();

});

watch(() => i18n.global.locale.value, () => {
    refreshMoviePage();
});
const deleteMovie = (movie: Movie) => {client.deleteMovie(movie.id).then(() => refreshMoviePage())};
const goToAddMoviePage = () => {
    router.push({ name: "addMovie" });
};

const refreshMoviePage = () => {  const pageNumber = paginatorRef.value?.pageNumber
    const pageSize = sortingRef.value?.pageSize;
    const pageSortField = sortingRef.value?.pageSortField;
    const pageSortOrder = sortingRef.value?.pageSortOrder;
    loading.value = true;
    loadMoviePage(pageNumber, pageSize, pageSortField, pageSortOrder);
};

const changePageNumber = () => {
    refreshMoviePage();
};

const onPaginationOrSortingChange = () => {
    const pageSortField = sortingRef.value?.pageSortField ;
    const pageSize = sortingRef.value?.pageSize;
    const pageSortOrder = sortingRef.value?.pageSortOrder ;
    loadMoviePage(0, pageSize, pageSortField, pageSortOrder);
};

const loadMoviePage = (
    pageNumber: number,
    pageSize: number,
    pageSortField: string,
    pageSortOrder: string
) => {
    client
        .getMovies(
            {
                number: pageNumber,
                size: pageSize,
                field: pageSortField,
                order: pageSortOrder
            },
            Language.fromCode(i18n.global.locale.value)
        )
        .then((response: AxiosResponse<Page<Movie>>) => {
            currentPage.value = response?.data;
            loading.value = false;
        });
};
</script>
<template>
    <h1> {{ $t("mainPage.movieList.title") }} </h1>
    <v-btn v-if="isAdmin" prepend-icon="mdi-plus" v-on:click="goToAddMoviePage" color="black">
        {{ $t("mainPage.movieList.buttons.addMovie") }}
    </v-btn>
    <Sorting :page="currentPage"
             v-on:changePageSortField="onPaginationOrSortingChange"
             v-on:changePageSortOrder="onPaginationOrSortingChange"
             v-on:changePageSize="onPaginationOrSortingChange" ref="sortingRef" />
    <div v-if="!loading">
        <Movies :movieList="currentPage?.content"
                v-on:deleteMovie="(movie: Movie) => deleteMovie(movie)" />
    </div>
    <div v-else>
        <SpinnerComponent />
    </div>
    <Paginator class="paginator" :page="currentPage" v-on:changePageNumber="changePageNumber" ref="paginatorRef" />
</template>