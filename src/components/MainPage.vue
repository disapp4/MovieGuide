<script lang="ts">
import Movies from "./Movies.vue";
import Paginator from "./Paginator.vue";
import Sorting from "./Sorting.vue";
import { Movie } from "@/models/Movie";
import { Page } from "@/models/Page";
import router from "../router";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { client } from "@/Client";

export type PaginatorRef = InstanceType<typeof Paginator>;
export type SortingRef = InstanceType<typeof Sorting>;

type Data = {
    currentPage: Page<Movie>
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
            currentPage: new Page()
        };
    },
    mounted() {
        this.refreshMoviePage();
    },

    methods: {
        logOut() {
            client.logOut()
                .then(() => router.push({ name: "authorization" }))
                .catch(error => console.log("error", error));
        },
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
                }
            ).then((response: AxiosResponse<Page<Movie>>) => this.currentPage = response.data).catch(error => {
                console.log("error", error);
            });
        }
    }
});
</script>
<template>
    <v-toolbar color="black" title="Movie Guide">
        <v-btn prepend-icon="mdi-export" v-on:click="logOut">
            Выйти
        </v-btn>
    </v-toolbar>
    <h1> Список фильмов </h1>
    <v-card class="header-buttons" color="#F5F5F5">
        <v-btn id="log_in" prepend-icon="mdi-plus" v-on:click="addMovieOnPage" color="black">
            Добавить фильм
        </v-btn>
        <v-btn id="log_in" prepend-icon="mdi-book-heart" v-on:click="favouriteMoviesPage" color="black">
            Любимые фильмы
        </v-btn>
    </v-card>
    <v-main>
        <Sorting :page="currentPage" v-on:changePageSortField="onPageSortField"
                 v-on:changePageSortOrder="onPageSortOrder"
                 v-on:changePageSize="onPageSize" ref="sorting" />

        <Movies :movieList="currentPage?.content" v-on:deleteMovie="(movie: Movie) => deleteMovieFromList(movie)"
                v-on:editMovie="(movie: Movie) => editMovieFromList(movie)"
                v-on:informationAboutMovie="(movie: Movie) => informationAboutMovie(movie)"
                v-on:addMovieToFavouriteList="(movie: Movie) => addMovieToFavouriteList(movie)" />

        <Paginator class="paginator" :page="currentPage" v-on:changePageNumber="changePageNumber" ref="paginator" />

    </v-main>
</template>


      

 
