<!--<script setup  lang="ts">-->
<!--import Movies from "../components/Movies.vue";-->
<!--import Paginator from "../components/Paginator.vue";-->
<!--import Sorting from "../components/Sorting.vue";-->
<!--import { Movie } from "../models/Movie";-->
<!--import { Page } from "../models/Page";-->
<!--import router from "../router";-->
<!--import { computed, defineComponent, ref, watch } from "vue";-->
<!--import { AxiosResponse } from "axios";-->
<!--import { client } from "../clients/Client";-->
<!--import { Language } from "../models/Language";-->
<!--import { appStore } from "../stores/appStore";-->
<!--import SpinnerComponent from "../components/SpinnerComponent.vue";-->
<!--import i18n from "../main";-->

<!--const currentPage = ref(new Page());-->
<!--const loading = ref(true);-->
<!--const store = appStore();-->

<!--const isAdmin = computed(() => {-->
<!--    return store.isAdmin;-->
<!--});-->

<!--const paginatorRef = ref<InstanceType<typeof Paginator> | null>(null);-->
<!--const sortingRef = ref<InstanceType<typeof Sorting> | null>(null);-->

<!--watch(i18n.global.locale, () => {-->
<!--    refreshMoviePage();-->
<!--});-->
<!--const deleteMovie = (movie: Movie) => {client.deleteMovie(movie.id).then(() => refreshMoviePage())};-->
<!--const goToAddMoviePage = () => {-->
<!--    router.push({ name: "addMovie" });-->
<!--};-->

<!--const refreshMoviePage = () => {-->
<!--    const pageNumber = paginatorRef.value?.pageNumber || 0;-->
<!--    const pageSize = sortingRef.value?.pageSize;-->
<!--    const pageSortField = sortingRef.value?.pageSortField ;-->
<!--    const pageSortOrder = sortingRef.value?.pageSortOrder;-->
<!--    loading.value = true;-->
<!--    loadMoviePage(pageNumber, pageSize, pageSortField, pageSortOrder);-->
<!--};-->

<!--const changePageNumber = () => {-->
<!--    refreshMoviePage();-->
<!--};-->

<!--const onPageSortField = () => {-->
<!--    const pageSortField = sortingRef.value?.pageSortField ;-->
<!--    const pageSize = sortingRef.value?.pageSize ;-->
<!--    const pageSortOrder = sortingRef.value?.pageSortOrder ;-->
<!--    loadMoviePage(0, pageSize, pageSortField, pageSortOrder);-->
<!--};-->

<!--const onPageSortOrder = () => {-->
<!--    const pageSortField = sortingRef.value?.pageSortField ;-->
<!--    const pageSize = sortingRef.value?.pageSize ;-->
<!--    const pageSortOrder = sortingRef.value?.pageSortOrder ;-->
<!--    loadMoviePage(0, pageSize, pageSortField, pageSortOrder);-->
<!--};-->

<!--const onPageSize = () => {-->
<!--    const pageSortField = sortingRef.value?.pageSortField;-->
<!--    const pageSize = sortingRef.value?.pageSize ;-->
<!--    const pageSortOrder = sortingRef.value?.pageSortOrder ;-->
<!--    loadMoviePage(0, pageSize, pageSortField, pageSortOrder);-->
<!--};-->

<!--const loadMoviePage = (-->
<!--    pageNumber: number,-->
<!--    pageSize: number,-->
<!--    pageSortField: string,-->
<!--    pageSortOrder: string-->
<!--) => {-->
<!--    client-->
<!--        .getMovies(-->
<!--            {-->
<!--                number: pageNumber,-->
<!--                size: pageSize,-->
<!--                field: pageSortField,-->
<!--                order: pageSortOrder-->
<!--            },-->
<!--            Language.fromCode(i18n.global.locale.value)-->
<!--        )-->
<!--        .then((response: AxiosResponse<Page<Movie>>) => {-->
<!--            currentPage.value = response?.data;-->
<!--            loading.value = false;-->
<!--        });-->
<!--};-->
<!--</script>-->
<script lang="ts">
import Movies from "../components/Movies.vue";
import Paginator from "../components/Paginator.vue";
import Sorting from "../components/Sorting.vue";
import { Movie } from "../models/Movie";
import { Page } from "../models/Page";
import router from "../router";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { client } from "../clients/Client";
import { Language } from "../models/Language";
import { appStore } from "../stores/appStore";
import SpinnerComponent from "../components/SpinnerComponent.vue";

export type PaginatorRef = InstanceType<typeof Paginator>;
export type SortingRef = InstanceType<typeof Sorting>;

type Data = {
    currentPage: Page<Movie>,
    loading: boolean,
    store: ReturnType<typeof appStore>
}

export default defineComponent({
    components: { Movies, Paginator, Sorting, SpinnerComponent },
    data(): Data {
        return {
            currentPage: new Page(),
            loading: true,
            store: appStore()
        };
    },
    mounted: function() {
        this.refreshMoviePage();
    },
    computed: {
        Movie() {
            return Movie;
        },
        isAdmin() {
            return this.store.isAdmin;
        }
    },
    watch: {
        "$i18n.locale": function() {
            this.refreshMoviePage();
        }
    },
    methods: {
        deleteMovie(movie: Movie) {
            client.deleteMovie(movie.id).then(() => this.refreshMoviePage());
        },
        goToAddMoviePage() {
            router.push({ name: "addMovie" });
        },
        refreshMoviePage() {
            let pageNumber = (this.$refs.paginator as PaginatorRef).pageNumber;
            let pageSize = (this.$refs.sorting as SortingRef).pageSize;
            let pageSortField = (this.$refs.sorting as SortingRef).pageSortField;
            let pageSortOrder = (this.$refs.sorting as SortingRef).pageSortOrder;
            this.loading = true;
            this.loadMoviePage(pageNumber, pageSize, pageSortField, pageSortOrder);
        },
        changePageNumber() {
            this.refreshMoviePage();
        },
        onPageSortField() {
            let pageSortField = (this.$refs.sorting as SortingRef).pageSortField;
            let pageSize = (this.$refs.sorting as SortingRef).pageSize;
            let pageSortOrder = (this.$refs.sorting as SortingRef).pageSortOrder;
            this.loadMoviePage(0, pageSize, pageSortField, pageSortOrder);
        },
        onPageSortOrder() {
            let pageSortField = (this.$refs.sorting as SortingRef).pageSortField;
            let pageSize = (this.$refs.sorting as SortingRef).pageSize;
            let pageSortOrder = (this.$refs.sorting as SortingRef).pageSortOrder;
            this.loadMoviePage(0, pageSize, pageSortField, pageSortOrder);
        },
        onPageSize() {
            let pageSortField = (this.$refs.sorting as SortingRef).pageSortField;
            let pageSize = (this.$refs.sorting as SortingRef).pageSize;
            let pageSortOrder = (this.$refs.sorting as SortingRef).pageSortOrder;
            this.loadMoviePage(0, pageSize, pageSortField, pageSortOrder);
        },
        loadMoviePage(pageNumber: number, pageSize: number, pageSortField: string, pageSortOrder: string) {
            client.getMovies(
                {
                    number: pageNumber,
                    size: pageSize,
                    field: pageSortField,
                    order: pageSortOrder
                }, Language.fromCode(this.$i18n.locale)
            ).then((response: AxiosResponse<Page<Movie>>) => {
                this.currentPage = response?.data;
                this.loading = false;
            });
        }
    }
});
</script>
<template>
    <h1> {{ $t("mainPage.movieList.title") }} </h1>
    <v-btn v-if="isAdmin" prepend-icon="mdi-plus" v-on:click="goToAddMoviePage" color="black">
        {{ $t("mainPage.movieList.buttons.addMovie") }}
    </v-btn>
    <Sorting :page="currentPage"
             v-on:changePageSortField="onPageSortField"
             v-on:changePageSortOrder="onPageSortOrder"
             v-on:changePageSize="onPageSize" ref="sorting" />
    <div v-if="!loading">
        <Movies :movieList="currentPage?.content"
                v-on:deleteMovie="(movie: Movie) => deleteMovie(movie)" />
    </div>
    <div v-else>
        <SpinnerComponent />
    </div>
    <Paginator class="paginator" :page="currentPage" v-on:changePageNumber="changePageNumber" ref="paginator" />
</template>