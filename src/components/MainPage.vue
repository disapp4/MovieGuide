<script>
import Movies from "./Movies.vue";
import Paginator from "./Paginator.vue";
import Sorting from "./Sorting.vue";
import client from "../client"
import router from "../router";

export default {
    components: { Movies, Paginator, Sorting },
    data() {
        return {
            currentPage: null,
        };
    },
    mounted() {
        this.refreshMoviePage()
    },
    methods: {
        logOut() {

            client.logOut(router.push({ name: 'authorization' }))
        },
        deleteMovieFromList(movie) {
            client.deleteMovie(
                movie.id, () => this.refreshMoviePage()
            )
        },
        informationAboutMovie(movie) {
            router.push({ name: 'informationAboutMovie', params: { id: movie.id } })
        },
        editMovieFromList(movie) {
            router.push({ name: 'editMovie', params: { id: movie.id } })
        },
        favouriteMoviesPage() {
            router.push({ name: 'favouriteMovies' })
        },
        addMovieToFavouriteList() {
            console.log("любимый")
        },
        addMovieOnPage() {
            router.push({ name: 'addMovie' })
        },
        changePageNumber() {
            this.refreshMoviePage();
        },
        onPageSortField() {
            let pageSortField = this.$refs.sorting.pageSortField;
            let pageSize = this.$refs.sorting.pageSize;
            let pageSortOrder = this.$refs.sorting.pageSortOrder;
            this.loadMoviePage(0, pageSize, pageSortField, pageSortOrder)
        },
        onPageSortOrder() {
            let pageSortOrder = this.$refs.sorting.pageSortOrder;
            let pageSortField = this.$refs.sorting.pageSortField;
            let pageSize = this.$refs.sorting.pageSize;
            this.loadMoviePage(0, pageSize, pageSortField, pageSortOrder)
        },
        onPageSize() {
            let pageSize = this.$refs.sorting.pageSize;
            let pageSortOrder = this.$refs.sorting.pageSortOrder;
            let pageSortField = this.$refs.sorting.pageSortField;
            this.loadMoviePage(0, pageSize, pageSortField, pageSortOrder)
        },
        refreshMoviePage() {
            let pageNumber = this.$refs.paginator.pageNumber;
            let pageSize = this.$refs.sorting.pageSize;
            let pageSortField = this.$refs.sorting.pageSortField;
            let pageSortOrder = this.$refs.sorting.pageSortOrder;
            this.loadMoviePage(pageNumber, pageSize, pageSortField, pageSortOrder)
        },
        loadMoviePage(pageNumber, pageSize, pageSortField, pageSortOrder) {
            client.getMovies(
                (page) => {
                    this.currentPage = page;
                },
                {
                    number: pageNumber,
                    size: pageSize,
                    field: pageSortField,
                    order: pageSortOrder
                }
            )
        },

    },
};

</script>


<template>
    <v-toolbar color="black" title="Movie Guide"> <v-btn prepend-icon="mdi-export" v-on:click="logOut">
            Выйти
        </v-btn></v-toolbar>

    <h1> Список фильмов </h1>

    <v-card><v-btn id="log_in" prepend-icon="mdi-plus" v-on:click="addMovieOnPage" color="black">
            Добавить фильм </v-btn> <v-btn id="log_in" prepend-icon="mdi-book-heart" v-on:click="favouriteMoviesPage" color="black">
            Любимые фильмы </v-btn></v-card>
        
        
        



    <v-main>
        <Sorting :page="currentPage" v-on:changePageSortField='onPageSortField'
            v-on:changePageSortOrder='onPageSortOrder' v-on:changePageSize='onPageSize' ref="sorting" />
    </v-main>

    <v-main>
        <Movies :movieList="currentPage?.content" v-on:deleteMovie="(movie) => deleteMovieFromList(movie)"
            v-on:editMovie="(movie) => editMovieFromList(movie)"
            v-on:addMovieToFavouriteList="(movie) => addMovieToFavouriteList(movie)"
            v-on:informationAboutMovie="(movie) => informationAboutMovie(movie)" />
    </v-main>


    <v-main>
        <Paginator class="paginator" :page="currentPage" v-on:changePageNumber="changePageNumber" ref="paginator" />
    </v-main>




</template>

<style scoped>
.paginator {
    position: absolute;
}
</style>


 
 
