<script lang="ts">
import Movies from "./Movies.vue";
import Paginator from "./Paginator.vue";
import Sorting from "./Sorting.vue";
import { Movie } from "../models/Movie";
import { Page } from "../models/Page";
import router from "../router";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { client } from "../Client";
import { Language } from "../models/Language";

export type PaginatorRef = InstanceType<typeof Paginator>;
export type SortingRef = InstanceType<typeof Sorting>;

type Data = {
    currentPage: Page<Movie>,
    loading: boolean,
}

export function forceCast<T>(input: any): T {
    // ... do runtime checks here
    // @ts-ignore <-- forces TS compiler to compile this as-is
    return input;
}

export default defineComponent({
    computed: {
        Movie() {
            return Movie;
        }
    },
    components: { Movies, Paginator, Sorting },
    data(): Data {
        return {
            currentPage: new Page(),
            loading: true
        };
    },
    mounted() {
        this.refreshMoviePage();
    },
    watch: {
        "$i18n.locale": function() {
            this.refreshMoviePage();
        }
    },
    methods: {
        deleteMovieFromList(movie: Movie) {
            client.deleteMovie(movie.id).then(() => this.refreshMoviePage());
        },
        editMovieFromList(movie: Movie) {
            router.push({ name: "editMovie", params: { id: movie.id } });
        },
        addMovieOnPage() {
            router.push({ name: "addMovie" });
        },
        informationAboutMovie(movie: Movie) {
            router.push({ name: "informationAboutMovie", params: { id: movie.id } });
        },
        favouriteMoviesPage() {
            router.push({ name: "favouriteMovies" });
        },
        addMovieToFavouriteList(movie: Movie) {

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

                this.currentPage = response.data;
                this.loading = false;

            }).catch((err) => {
                {
                    console.log(err);
                }
                ;
            });
        }
    }
});
</script>
<template>
    <div class="mainPage">
        <h1> {{ $t("mainPage.movieList.title") }} </h1>
        <v-card class="header-buttons" color="#F5F5F5">
            <v-btn id="log_in" prepend-icon="mdi-plus" v-on:click="addMovieOnPage" color="black">
                {{ $t("mainPage.movieList.buttons.addMovie") }}
            </v-btn>
            <v-btn id="log_in" prepend-icon="mdi-book-heart" v-on:click="favouriteMoviesPage" color="black">
                {{ $t("mainPage.movieList.buttons.favouriteMovies") }}
            </v-btn>
        </v-card>
    </div>
    <Sorting :page="currentPage" v-on:changePageSortField="onPageSortField"
             v-on:changePageSortOrder="onPageSortOrder"
             v-on:changePageSize="onPageSize" ref="sorting" />

    <div v-if="!loading">
        <Movies :movieList="currentPage?.content" v-on:deleteMovie="(movie: Movie) => deleteMovieFromList(movie)"
                v-on:editMovie="(movie: Movie) => editMovieFromList(movie)"
                v-on:informationAboutMovie="(movie: Movie) => informationAboutMovie(movie)"
                v-on:addMovieToFavouriteList="(movie: Movie) => addMovieToFavouriteList(movie)" />
    </div>
    <div v-else>

        <img src="/loading.jpg" width="300">
    </div>
    <Paginator class="paginator" :page="currentPage" v-on:changePageNumber="changePageNumber" ref="paginator" />
</template>
<style>
.mainPage {
    background-color: #F5F5F5
}
</style>


      

 
