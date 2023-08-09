<script setup lang="ts">
import { RouterView } from "vue-router";
import { client } from "./Client";
import router from "./router";
import { useI18n } from "vue-i18n";
// @ts-ignore
import { defaultLocale, languages } from "./i18n";
import {userRoleKey, useUserRole  } from "./globalRole";
import { inject } from "vue";
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
    locale.value === "en" ? locale.value = "ru" : locale.value = "en";
};

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
            <v-btn  prepend-icon="mdi-account-circle"  >


                {{ $t("mainPage.toolbar.account") }}
            </v-btn>


            <v-btn prepend-icon="mdi-export" v-on:click="logOut">
                {{ $t("mainPage.toolbar.logOut") }}
            </v-btn>

        </v-toolbar>
        <v-main>
            <RouterView />
        </v-main>

        <v-footer
            class="bg-black text-center d-flex flex-column w-20"
        >
            <p><strong>movie guide</strong> &copy; {{ new Date().getFullYear() }}</p>
        </v-footer>


    </v-app>
</template>

<style scooped>

</style>

