<script setup lang="ts">
import { RouterView } from "vue-router";
import { client } from "./clients/Client";
import { appStore } from "./stores/appStore";
import { onMounted } from "vue";
import { AxiosResponse } from "axios";
import { User } from "./models/User";
import HeaderComponent from "./components/HeaderComponent.vue";

const store = appStore();

onMounted(() => {
    client.getCurrentUser().then((response: AxiosResponse<User>) => store.user = response?.data);
});
</script>
<template>
    <v-app>
        <HeaderComponent />
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


