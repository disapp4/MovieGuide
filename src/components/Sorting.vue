<script lang="ts">
import { Page } from "../models/Page";
import { defineComponent, PropType } from "vue";
import { Movie } from "../models/Movie";

export default defineComponent({
    data() {
        return {
            sizeValues: [2, 5, 10],
            sortFieldValues: [{
                value: "id",
                view: "sortingPage.pageSortField.id"
            }, {
                value: "i18n.title",
                view: "sortingPage.pageSortField.title"
            }],
            sortOrderValues: [{
                value: "asc",
                view: "sortingPage.pageSortOrder.asc"
            }, {
                value: "desc",
                view: "sortingPage.pageSortOrder.desc"
            }],
            pageSize: 5,
            pageSortField: "i18n.title",
            pageSortOrder: "asc"
        };
    },
    props: {
        page: { type: Object as PropType<Page<Movie>> }
    },
    watch: {
        page: function(newVal) {
            this.pageSize = newVal.size;
        }
    },
    emits: ["changePageSortField", "changePageSortOrder", "changePageSize"],
    methods: {
        changePageSize() {
            this.$emit("changePageSize", this.pageSize);
        },
        changePageSortField() {
            this.$emit("changePageSortField", this.pageSortField);
        },
        changePageSortOrder() {
            this.$emit("changePageSortOrder", this.pageSortOrder);
        }
    }
});
</script>
<template>
    <h4> {{ $t("sortingPage.title") }} </h4>
    <div class="sorting">
        <v-col class="d-flex" cols="12" sm="7" color="black">
            <v-select :label="$t('sortingPage.pageSize')" :items="sizeValues" v-model="pageSize"
                      v-on:update:modelValue="changePageSize" variant="outlined">
            </v-select>
            <v-select :label="$t('sortingPage.pageSortField.pageSortField')" :items="sortFieldValues"
                      :item-title="item => $t(item.view)"
                      v-model="pageSortField"
                      v-on:update:modelValue="changePageSortField" variant="outlined">
            </v-select>
            <v-select :label="$t('sortingPage.pageSortOrder.pageSortOrder')" v-model="pageSortOrder"
                      :items="sortOrderValues" :item-title="item => $t(item.view)"
                      v-on:update:modelValue="changePageSortOrder" variant="outlined">
            </v-select>
        </v-col>
    </div>
</template>
<style scoped>
.sorting {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: auto;
    background-color: #F5F5F5
}
</style>