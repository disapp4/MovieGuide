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
    <h1> Список фильмов </h1>
    <button v-on:click="addMovieOnPage">Добавить фильм </button>
    <button v-on:click="favouriteMoviesPage"> Список любимых фильмов </button>
    <button v-on:click="logOut"> Выйти из аккаунта </button>

    <Sorting :page="currentPage" v-on:changePageSortField='onPageSortField' v-on:changePageSortOrder='onPageSortOrder'
        v-on:changePageSize='onPageSize' ref="sorting" />

    <Movies :movieList="currentPage?.content" v-on:deleteMovie="(movie) => deleteMovieFromList(movie)"
        v-on:editMovie="(movie) => editMovieFromList(movie)"
        v-on:addMovieToFavouriteList="(movie) => addMovieToFavouriteList(movie)"
        v-on:informationAboutMovie="(movie) => informationAboutMovie(movie)" />

    <Paginator class="paginator" :page="currentPage" v-on:changePageNumber="changePageNumber" ref="paginator" />

</template>

<style scoped>
.paginator {
    position: absolute;
    bottom: 0;
}
</style>


 
 
