<script setup lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { client } from "./Client";
import router from "./router";
import { useI18n } from "vue-i18n";
// @ts-ignore
import { defaultLocale, languages } from "./i18n";
import { watch } from "vue";

const { t, locale } = useI18n({ useScope: "global" });

const logOut = () => {
    client.logOut()
        .then(() => router.push({ name: "authorization" }))
        .catch(error => console.log("error", error));
};
const mainPage = () => {
    router.push({ name: "mainPage" });
};

const changeLanguage = () => {
    locale.value === "en" ? locale.value="ru" : locale.value="en";

   };

watch (locale, (newVal, oldVal) => {
    console.log(newVal + " app " + oldVal)


})
// export default defineComponent({
//     data(){
//         return {}
//     },
//     watch: {
//         "$18n.locale": function(newVal, oldVal) {
//             console.log(newVal + " app " + oldVal);
//         }
//     },
//     methods: {
//         logOut() {
//             client.logOut()
//                 .then(() => router.push({ name: "authorization" }))
//                 .catch(error => console.log("error", error));
//         },
//         mainPage() {
//             router.push({ name: "mainPage" });
//         },
//
//         changeLanguage() {
//             locale.value === "en" ? locale.value = "ru" : locale.value = "en";
//
//         }
//     }
// });

</script>

<template>

    <v-app>
        <v-toolbar color="black">
            <v-btn prepend-icon="mdi-web" v-on:click="changeLanguage">
                {{ $t("mainPage.toolbar.language") }}
            </v-btn>
            <v-spacer>
                <v-btn v-on:click="mainPage">
                    <strong>{{ $t("mainPage.toolbar.title") }}</strong>
                </v-btn>
            </v-spacer>

            <v-btn prepend-icon="mdi-export" v-on:click="logOut">
                {{ $t("mainPage.toolbar.logOut") }}
            </v-btn>

        </v-toolbar>
        <v-main>
            <RouterView />
        </v-main>

        <v-footer class="d-flex flex-column">
            <v-spacer></v-spacer>
            <div class="  bg-black text-center w-100">
                <strong>movie guide</strong>
            </div>
        </v-footer>
    </v-app>
</template>


