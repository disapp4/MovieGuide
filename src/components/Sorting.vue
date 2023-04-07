<script lang="ts">
import { Page } from "../models/Page";
import { defineComponent, PropType } from "vue";
import { Movie } from "../models/Movie";

export default defineComponent({
    data() {
        return {
            sizeValues: [2, 5, 10],
            sortFieldValues: ["id", "title"],
            sortOrderValues: ["asc", "desc"],
            pageSize: 5,
            pageSortField: "title",
            pageSortOrder: "asc"
        };
    },
    props: {
        page: { type: Object as PropType<Page<Movie>> }
    },
    watch: {
        page: function(newVal, oldVal) {
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
    <h4> Сортировать: </h4>
    <div class="sorting">
        <v-col class="d-flex" cols="12" sm="7" color="black">
            <v-select label="pageSize" :items="sizeValues" v-model="pageSize"
                      v-on:update:modelValue="changePageSize">
            </v-select>
            <v-select label="pageSortField" :items="sortFieldValues" v-model="pageSortField"
                      v-on:update:modelValue="changePageSortField">
            </v-select>
            <v-select label="pageSortOrder" v-model="pageSortOrder" :items="sortOrderValues"
                      v-on:update:modelValue="changePageSortOrder">
            </v-select>
        </v-col>
    </div>


</template>
<style scoped>
.sorting{
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: auto;
    background-color:#F5F5F5
}
</style>