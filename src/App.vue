<script setup lang="ts">
import { RouterView } from "vue-router";
import { client } from "./Client";
import router from "./router";
import { useI18n } from "vue-i18n";
// @ts-ignore

import { useUserStore } from "./stores/userStore";
import { computed, onMounted } from "vue";
import { AxiosResponse } from "axios/index";
import { User } from "./models/User";

const { t, locale } = useI18n({ useScope: "global" });

const store = useUserStore();

const logOut = () => {
    client.logOut()
        .then(() => {
            router.push({ name: "authorization" });
            store.logout();
        })
        .catch(error => console.log("error", error));
};
const mainPage = () => {
    router.push({ name: "mainPage" });
};

const changeLanguage = () => {
    locale.value= locale.value === "en" ? "ru" :   "en";
};

const account = computed(() => store.hasRole ? "Admin" : "User");

const hiddenAccount = computed(() => store.user);

onMounted(() => {
    client.getCurrentUser().then((response: AxiosResponse<User>) => store.user = response?.data);
});
</script>
<template>
    <v-app>
        <v-toolbar color="black">
            <v-btn prepend-icon="mdi-web" v-on:click="changeLanguage">
                {{ $t("mainPage.toolbar.language") }}
            </v-btn>
            <v-spacer class="mp">
                <v-btn v-on:click="mainPage">
                    <strong>{{ $t("mainPage.toolbar.title") }}</strong>
                </v-btn>
            </v-spacer>
            <v-menu v-if="hiddenAccount" transition="scale-transition">
                <template v-slot:activator="{ props }">
                    <v-btn
                        prepend-icon="mdi-account-circle" v-bind="props">
                        {{ $t("mainPage.toolbar.account") }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        prepend-icon="mdi-account-circle"
                        :title="account"
                    >
                        <template v-slot:append>
                        </template>
                    </v-list-item>
                    <v-list-item>
                        <v-btn color="black" prepend-icon="mdi-export" v-on:click="logOut">
                            {{ $t("mainPage.toolbar.logOut") }}
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
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


