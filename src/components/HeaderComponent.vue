<script setup lang="ts">
import { client } from "../clients/Client";
import router from "../router";
import { useI18n } from "vue-i18n";
import { appStore } from "../stores/appStore";
import { computed } from "vue";
import { User } from "../models/User";

const { t, locale } = useI18n({ useScope: "global" });
const store = appStore();

const accountType = computed(() => store.isAdmin ? "Admin" : "User");

const account = computed(() => store.user);

const logOut = () => {
    client.logOut()
        .then(() => {
            router.push({ name: "authorization" });
            store.logout();
        });
};
const goToMainPage = () => {
    if (store.user) {
        router.push({ name: "mainPage" });
    }
};

const changeLanguage = () => {
    locale.value = locale.value === "en" ? "ru" : "en";
};
</script>
<template>
    <v-toolbar color="black">
        <v-btn class="btn" prepend-icon="mdi-web" v-on:click="changeLanguage">
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
        <v-btn v-else class="menu"
               prepend-icon="mdi-account-circle">
            {{ $t("mainPage.toolbar.account") }}
        </v-btn>
    </v-toolbar>
</template>
<style scoped>
.btn {
    width: 120px
}

.menu {
    visibility: hidden;
}
</style>