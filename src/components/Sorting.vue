<script setup lang="ts">
import { Page } from "../models/Page";
import { ref, watch, PropType } from "vue";
import { Movie } from "../models/Movie";

const pageSize = ref(5);
const pageSortField = ref("i18n.title");
const pageSortOrder = ref("asc");
const sizeValues = [2, 5, 10];

defineExpose({
    pageSize,
    pageSortField,
    pageSortOrder

})
const sortFieldValues = [{
   value: "id",
    view: "sortingPage.pageSortField.id"
}, {
    value: "i18n.title",
   view: "sortingPage.pageSortField.title"
}];

const sortOrderValues = [{
   value: "asc",
    view: "sortingPage.pageSortOrder.asc"
}, {
    value: "desc",
   view: "sortingPage.pageSortOrder.desc"
}];

const props = defineProps({ page: {
    type: Object as PropType<Page<Movie>>,
    required: true,
  } });

const emits = defineEmits(["changePageSortField", "changePageSortOrder", "changePageSize"]);

watch( props.page, (newVal) => {
   if (newVal) {
      pageSize.value = newVal.size;
   }
});

const changePageSize = () => {
   emits("changePageSize", pageSize.value);
};

const changePageSortField = () => {
   emits("changePageSortField", pageSortField.value);
};

const changePageSortOrder = () => {
    emits("changePageSortOrder", pageSortOrder.value);
};
</script>
<template>
    <div class="sorting">
        <v-col class="d-flex" cols="3" sm="7" color="black">
            <v-select :label="$t('sortingPage.pageSize')" :items="sizeValues" v-model="pageSize"
                      v-on:update:modelValue="changePageSize" variant="solo">
            </v-select>
            <v-select :label="$t('sortingPage.pageSortField.pageSortField')" :items="sortFieldValues"
                      :item-title="item => $t(item.view)"
                      v-model="pageSortField"
                      v-on:update:modelValue="changePageSortField" variant="solo">
            </v-select>
            <v-select :label="$t('sortingPage.pageSortOrder.pageSortOrder')" v-model="pageSortOrder"
                      :items="sortOrderValues" :item-title="item => $t(item.view)"
                      v-on:update:modelValue="changePageSortOrder" variant="solo">
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