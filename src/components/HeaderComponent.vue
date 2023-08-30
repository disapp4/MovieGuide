<script setup lang="ts">
import { client } from "../clients/Client";
import router from "../router";
import { useI18n } from "vue-i18n";
import { appStore } from "../stores/appStore";
import { computed } from "vue";
import { User } from "../models/User";

const { t, locale } = useI18n({ useScope: "global" });
const store = appStore();
const logOut = () => {
    client.logOut()
        .then(() => {
            router.push({ name: "authorization" });
            store.logout();
        });
};
const goToMainPage = () => {
    router.push({ name: "mainPage" });
};

const changeLanguage = () => {
    locale.value = locale.value === "en" ? "ru" : "en";
};

const accountType = computed(() => store.isAdmin ? "Admin" : "User");

const account = computed(() => store.user);
</script>
<template>
    <v-toolbar color="black">
        <v-btn prepend-icon="mdi-web" v-on:click="changeLanguage">
            {{ $t("mainPage.toolbar.language") }}
        </v-btn>
        <v-spacer class="mp">
            <v-btn v-on:click="goToMainPage">
                <strong>{{ $t("mainPage.toolbar.title") }}</strong>
            </v-btn>
        </v-spacer>
        <v-menu v-if="account" transition="scale-transition">
            <template v-slot:activator="{ props }">
                <v-btn
                    prepend-icon="mdi-account-circle" v-bind="props">
                    {{ $t("mainPage.toolbar.account") }}
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                    prepend-icon="mdi-account-circle"
                    :title="accountType"
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
</template>
<style scoped>

</style>