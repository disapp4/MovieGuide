<script>

export default {
    data() {
        return {
            pageSize: 5,
            pageSortField: 'title',
            pageSortOrder: 'asc'
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
        changePageSize(event) {
            this.pageSize = event.target.value;
            this.$emit('changePageSize', this.pageSize)
        },
        changePageSortField(event) {
            this.pageSortField = event.target.value
            this.$emit('changePageSortField', this.pageSortField)
        },
        changePageSortOrder(event) {
            this.pageSortOrder = event.target.value
            this.$emit('changePageSortOrder', this.pageSortOrder)
        }
    }
}
</script>
<template>

    <p>
        <span> Сортировать: </span>
        <label> pageSize</label>
        <select v-model="pageSize" v-on:change="(event) => changePageSize(event)">
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
        </select>

        <label> pageSortField</label>
        <select v-model="pageSortField" v-on:change="(event) => changePageSortField(event)">
            <option value="id">Id</option>
            <option value="title">Title</option>

        </select>
        <label> pageSortOrder</label>
        <select v-model="pageSortOrder" v-on:change="(event) => changePageSortOrder(event)">
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
        </select>
    </p>
</template>