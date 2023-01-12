<script>
export default {
    data() {
        return {
            pageNumber: 0,
            pageNumberView: 1,
            totalPagesView: 5,
           
        }
    },
    props: {
        page: Object
    },

    watch: {
        page: function () {
            this.pageNumber = this.page.number
            this.pageNumberView = this.pageNumber + 1
            this.totalPagesView = this.page.totalPages
        
        }
    },
    methods: {
        goToNextPage() {
            this.pageNumber = this.pageNumber + 1
            this.$emit("changePageNumber", this.pageNumber)
        },
        goToPreviousPage() {
            this.pageNumber = this.pageNumber - 1
            this.$emit("changePageNumber", this.pageNumber)

        },
        
    }

}


</script>
<template>
    <p>
    <div class="text-center">
        <v-pagination v-model="pageNumberView" :length="totalPagesView" rounded="circle" :total-visible="4" v-on:next="goToNextPage"
            v-on:prev="goToPreviousPage"  ></v-pagination>
    </div>

    </p>
</template>