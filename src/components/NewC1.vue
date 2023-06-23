<script lang="ts">
import { defineComponent } from "vue";
import NewC2 from "./NewC2.vue";
import Sorting from "./Sorting.vue";
import { Page } from "../models/Page";
import { Movie } from "../models/Movie";
import { Language } from "../models/Language";


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
    components: { NewC2, Sorting },
    watch: {
        "$i18n.locale": function(newVal, oldVal) {
            console.log(newVal + " C2 " + oldVal);
        }
    }

});

</script>
<template>
    <Sorting :page="currentPage"  />
    <NewC2 :movieList="currentPage?.content" />
</template>