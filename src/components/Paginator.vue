<script>

export default {
    data() {
        return {
            pageNumber: 0,
        };
    },
    props: {
        page: Object
    },
    emits: ['changePageNumber'],
    watch: {
        page: function () {
            this.pageNumber = this.page.number;
        }
    },
    computed: {
        pageNumberView: function () {
            return this.page ? this.pageNumber + 1 : "-"
        },
        totalPagesView: function () {
            return this.page ? this.page.totalPages : "-"
        },
        lastPageNumber: function () {
            return this.page.totalPages - 1;
        }
    },
    methods: {
        goToPreviousPageNumber() {
            if (this.pageNumber > 0) {
                this.pageNumber = this.pageNumber - 1;
                this.$emit('changePageNumber', this.pageNumber)
            }
        },
        goToNextPageNumber() {
            if (this.pageNumber < this.lastPageNumber) {
                this.pageNumber = this.pageNumber + 1;
                this.$emit('changePageNumber', this.pageNumber)
            }
        }
    }
}
</script>
<template>
    <p>
        <button v-on:click="goToPreviousPageNumber"> &lt; </button>
        {{ pageNumberView }} / {{ totalPagesView }}
        <button v-on:click="goToNextPageNumber"> &gt; </button>
    </p>
</template>