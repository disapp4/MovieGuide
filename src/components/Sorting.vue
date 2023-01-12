<script>

export default {
    data() {
        return {
            sizeValues: [2, 5, 10],
            sortFieldValues: ['id', 'title'],
            sortOrderValues: ['asc', 'desc'],
            pageSize: 5,
            pageSortField: 'title',
            pageSortOrder: 'asc',

        }
    },
    props: {
        page: Object
    },
    watch: {
        page: function () {
            this.pageSize = this.page.size;
        }
    },
    emits: ['changePageSortField', 'changePageSortOrder', 'changePageSize'],
    methods: {
        changePageSize() {
            this.$emit('changePageSize', this.pageSize)
        },
        changePageSortField() {
            this.$emit('changePageSortField', this.pageSortField)
        },
        changePageSortOrder() {
            this.$emit('changePageSortOrder', this.pageSortOrder)
        }
    }
}
</script>
<template>

    <h4> Сортировать: </h4>
    <v-col class="d-flex" cols="12" sm="7" >
        <v-select label="pageSize" :items="sizeValues" v-model="pageSize"
            v-on:update:modelValue="changePageSize">
        </v-select>

        <v-select label="pageSortField" :items="sortFieldValues" v-model="pageSortField"
            v-on:update:modelValue="changePageSortField">
        </v-select>

        <v-select label="pageSortOrder" v-model="pageSortOrder" :items="sortOrderValues"
            v-on:update:modelValue="changePageSortOrder">

        </v-select></v-col>

</template>