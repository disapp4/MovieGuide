<script lang="ts">
import { defineComponent } from "vue";
import Movies2 from "./Movies2.vue";
import Paginator from "./Paginator.vue";
import Sorting from "./Sorting.vue";
import { Page } from "../models/Page";
import { Movie } from "../models/Movie";
import { Language } from "../models/Language";
import router from "../router";

export type PaginatorRef = InstanceType<typeof Paginator>;
export type SortingRef = InstanceType<typeof Sorting>;
export function forceCast<T>(input: any): T {
    // ... do runtime checks here
    // @ts-ignore <-- forces TS compiler to compile this as-is
    return input;
}

type Data = {
    currentPage: Page<Movie>,
    language: Language

}

export default defineComponent({
    data(): Data {
        return {
            currentPage: new Page(),
            language: Language.Russian

        };
    },
    components: { Movies2, Paginator, Sorting },
    watch: {
        "$i18n.locale": function(newVal, oldVal) {
            console.log(newVal + " C1 " + oldVal);
        }
    },
    methods:{


        addMovieOnPage() {
            router.push({ name: "addMovie" });
        },
        favouriteMoviesPage() {
            router.push({ name: "favouriteMovies" });
        },
        changePageNumber() {
            console.log('пагинатор')
        },
        onPageSortField() {
            let pageSortField = (this.$refs.sorting as SortingRef).pageSortField;
            let pageSize = (this.$refs.sorting as SortingRef).pageSize;
            let pageSortOrder = (this.$refs.sorting as SortingRef).pageSortOrder;

        },
        onPageSortOrder() {
            let pageSortField = (this.$refs.sorting as SortingRef).pageSortField;
            let pageSize = (this.$refs.sorting as SortingRef).pageSize;
            let pageSortOrder = (this.$refs.sorting as SortingRef).pageSortOrder;

        },
        onPageSize() {
            let pageSortField = (this.$refs.sorting as SortingRef).pageSortField;
            let pageSize = (this.$refs.sorting as SortingRef).pageSize;
            let pageSortOrder = (this.$refs.sorting as SortingRef).pageSortOrder;

        },



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
    <Sorting :page="currentPage"  v-on:changePageSortField="onPageSortField"
             v-on:changePageSortOrder="onPageSortOrder"
             v-on:changePageSize="onPageSize" ref="sorting" />
    <Movies2 :movieList="currentPage?.content" />
    <Paginator class="paginator"  :page="currentPage"   v-on:changePageNumber="changePageNumber"  ref="paginator" />


</template>