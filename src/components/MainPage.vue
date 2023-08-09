<script lang="ts">
import Movies from "./Movies.vue";
import Paginator from "./Paginator.vue";
import Sorting from "./Sorting.vue";
import { Movie } from "../models/Movie";
import { Page } from "../models/Page";
import router from "../router";
import { defineComponent, inject } from "vue";
import { AxiosResponse } from "axios";
import { client } from "../Client";
import { Language } from "../models/Language";
import { userRoleKey, useUserRole } from "../globalRole";
import { User } from "../models/User";

export type PaginatorRef = InstanceType<typeof Paginator>;
export type SortingRef = InstanceType<typeof Sorting>;


type Data = {
    currentPage: Page<Movie>,
    loading: boolean,
    isAdmin: boolean | undefined



}

export default defineComponent({

    computed: {
        Movie() {
            return Movie;
        },



    },
    components: { Movies, Paginator, Sorting },
    data(): Data {
        return {
            currentPage: new Page(),
            loading: true,
            isAdmin:false

        };
    },
    mounted: function() {

        this.refreshMoviePage()

    },
    watch: {
        "$i18n.locale": function() {
            this.refreshMoviePage();
        }
    },

    methods: {
        newComp(){
            router.push({ name: "newComponent" });
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
        refreshMoviePage() {
            let pageNumber = (this.$refs.paginator as PaginatorRef).pageNumber;
            let pageSize = (this.$refs.sorting as SortingRef).pageSize;
            let pageSortField = (this.$refs.sorting as SortingRef).pageSortField;
            let pageSortOrder = (this.$refs.sorting as SortingRef).pageSortOrder;
            // this.isAdmin =  user?.hasRole("ROLE_ADMIN");
            // console.log(this.isAdmin);
         
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
            });
        }
    }
});
</script>
<template>

    <v-btn @click=" newComp">NewComp</v-btn>
    <h1> {{ $t("mainPage.movieList.title") }} </h1>

    <v-btn prepend-icon="mdi-plus" v-on:click="addMovieOnPage" color="black">
        {{ $t("mainPage.movieList.buttons.addMovie") }}
    </v-btn>


    <Sorting :page="currentPage" v-on:changePageSortField="onPageSortField"
             v-on:changePageSortOrder="onPageSortOrder"
             v-on:changePageSize="onPageSize" ref="sorting" />
    <div v-if="!loading">
        <Movies :movieList="currentPage?.content" v-on:deleteMovie="(movie: Movie) => deleteMovieFromList(movie)"
                v-on:editMovie="(movie: Movie) => editMovieFromList(movie)"
                v-on:informationAboutMovie="(movie: Movie) => informationAboutMovie(movie)"
        />
    </div>
    <div v-else>
        <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    </div>
    <Paginator class="paginator" :page="currentPage" v-on:changePageNumber="changePageNumber" ref="paginator" />
</template>
<style>
.lds-roller {
    display: flex;
    justify-content: center;
    width: 1000px;
    height: 1000px;
}

.lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
}

.lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0a0a0a;
    margin: -4px 0 0 -4px;
}

.lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
    top: 63px;
    left: 63px;
}

.lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
    top: 68px;
    left: 56px;
}

.lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
    top: 71px;
    left: 48px;
}

.lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
}

.lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
    top: 71px;
    left: 32px;
}

.lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
    top: 68px;
    left: 24px;
}

.lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
    top: 63px;
    left: 17px;
}

.lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12px;
}

@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}


</style>


      

 
