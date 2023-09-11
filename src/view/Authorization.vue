<script setup lang="ts">
import router from "../router";
import { client } from "../clients/Client";
import { ref, onMounted, inject } from "vue";
import { AxiosResponse } from "axios";
import { User } from "../models/User";
import { appStore } from "../stores/appStore";

const username = ref("");
const password = ref("");
const successRegistration = ref(false);
const failAuth = ref(false);
const store = appStore();
const passwordInputRef = ref();

onMounted(() => {
    successRegistration.value = store.pullRegistrationSuccess();
});

const logIn = () => {
    client.logIn(username.value, password.value).then((response: AxiosResponse<User>) => {
        store.login(response.data);
        router.push({ name: "mainPage" });
    }).catch(() => {
        failAuth.value = true;
    });
};
const goToRegistrationPage = () => {
    router.push({ name: "registration" });
};
const focusPasswordInput = () => {
   passwordInputRef.value.focus();
};
</script>
<template>
    <h1> {{ $t("authorizationPage.authorization") }} </h1>
    <br>
    <v-alert class="alert"
             border="start"
             border-color="black"
             elevation="2"
             width="700"
    >
        {{ $t("authorizationPage.alert") }}
        <strong>admin:admin </strong> и <strong> user:user</strong>
    </v-alert>
    <br>
    <div class="form">
        <v-form>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.username") }}
                <v-text-field :label="$t('placeholders.enterUsername')" v-model="username" name="username"
                              prepend-inner-icon="mdi-mail" type="string" variant="solo" clearable
                              filled v-on:keydown.enter="focusPasswordInput"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.password") }}
                <v-text-field ref="passwordInputRef" :label="$t('placeholders.enterPassword')" v-model="password"
                              name="password"
                              prepend-inner-icon="mdi-lock" type="password" clearable filled
                              variant="solo" v-on:keydown.enter="logIn"></v-text-field>
            </v-col>
            <v-card-actions>
                {{ $t("authorizationPage.noAccount") }}
                <v-btn id="registration" v-on:click="goToRegistrationPage" color="black">
                    {{ $t("authorizationPage.signUp") }}
                </v-btn>
            </v-card-actions>
            <v-btn class="logIn" v-on:click="logIn" color="black">
                {{ $t("authorizationPage.buttons.logIn") }}
            </v-btn>
        </v-form>
        <div class="text-center">
            <v-snackbar color="green"
                        v-model=" successRegistration"
                        :timeout="3000"
            >
                {{ $t("authorizationPage.snackbarSuccess") }}
                <template v-slot:actions>
                    <v-btn
                        color="white"
                        size="large"
                        @click=" successRegistration = false"
                        prepend-icon="mdi-close-circle"
                    >
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
        <div class="text-center">
            <v-snackbar color="red"
                        v-model="failAuth"
                        :timeout="3000"
            >
                {{ $t("authorizationPage.snackbarFail") }}
                <template v-slot:actions>
                    <v-btn
                        color="white"
                        size="large"
                        @click="failAuth = false"
                        prepend-icon="mdi-close-circle"
                    >
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </div>
</template>
<style scoped>
.alert {
    display: block;
    margin-left: auto;
    margin-right: auto
}

.title {
    font-size: larger
}

.form {
    position: relative;
    left: 33%;
}

.logIn {
    position: relative;
    left: -33%
}
</style>