<script setup lang="ts">
import router from "../router";
import { client } from "../clients/Client";
import { ref } from "vue";
import { CreateUserRequest } from "../models/CreateUserRequest";
import { appStore } from "../stores/appStore";

const username = ref("");
const password = ref("");
const store = appStore();

const goToLogInPage = () => {
    router.push({ name: "authorization" });
};

const postUsers = () => {
    const request = new CreateUserRequest();
    request.username = username.value;
    request.password = password.value;
    client.postUsers(request)
        .then(() => {
            store.setRegistrationSuccess(true);
            router.push({ name: "authorization" });
        });
};

const focusPasswordInput = () => {
    const passwordInput = document.querySelector("#passwordInput") as HTMLInputElement | null;
    if (passwordInput) {
        passwordInput.focus();
    }
};
</script>
<template>
    <h1> {{ $t("registrationPage.registration") }} </h1>
    <div class="form">
        <v-form>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.username") }}
                <v-text-field :label="$t('placeholders.enterUsername')" v-model="username" name="username"
                              prepend-inner-icon="mdi-mail" type="string" clearable filled
                              variant="solo" @keydown.enter="focusPasswordInput"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.password") }}
                <v-text-field id="passwordInput" :label="$t('placeholders.enterPassword')" v-model="password"
                              name="password"
                              prepend-inner-icon="mdi-lock" type="password" clearable filled
                              variant="solo" @keydown.enter="postUsers"></v-text-field>
            </v-col>
            <v-card-actions>
                {{ $t("registrationPage.account") }}
                <v-btn id="registration" v-on:click="goToLogInPage" color="black"> {{ $t("registrationPage.logIn") }}
                </v-btn>
            </v-card-actions>
            <v-btn class="logIn" v-on:click="postUsers" color="black"> {{ $t("registrationPage.buttons.signUp") }}
            </v-btn>
        </v-form>
    </div>
</template>
<style scoped>
.title {
    font-size: larger
}

.form {
    position: relative;
    left: 33%
}

.logIn {
    position: relative;
    left: -33%
}
</style>