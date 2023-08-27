<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent } from "vue";
import { AxiosResponse } from "axios";
import { User } from "../models/User.js";
import { useUserStore } from "../stores/userStore";

type Data = {
    username: string,
    password: string,
    successRegistration: boolean,
    timeoutSuccessRegistration: number,
    failAuth: boolean,
    timeoutFailAuth: number,
    store: ReturnType<typeof useUserStore>
}

export default defineComponent({
        data(): Data {
            return {
                username: "",
                password: "",
                successRegistration: false,
                timeoutSuccessRegistration: 3000,
                failAuth: false,
                timeoutFailAuth: 3000,
                store: useUserStore()
            };
        },
        mounted: function() {
            this.successRegistration = this.store.pullRegistrationSuccess();
        },
        methods: {
            logIn() {
                client.authController(this.username, this.password).then((response: AxiosResponse<User>) => {
                    if (response?.data) {
                        this.store.login(response.data);
                        router.push({ name: "mainPage" });
                    }
                }).catch(() => {
                    this.failAuth = true;
                });
            },
            goToRegistration() {
                router.push({ name: "registration" });
            }
        }
    }
);
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
                              filled></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.password") }}
                <v-text-field :label="$t('placeholders.enterPassword')" v-model="password" name="password"
                              prepend-inner-icon="mdi-lock" type="password" clearable filled
                              variant="solo"></v-text-field>
            </v-col>
            <v-card-actions>
                {{ $t("authorizationPage.noAccount") }}
                <v-btn id="registration" v-on:click="goToRegistration" color="black">
                    {{ $t("authorizationPage.signUp") }}
                </v-btn>
            </v-card-actions>
            <v-btn class="logIn" v-on:click="logIn" color="black"> {{ $t("authorizationPage.buttons.logIn") }}</v-btn>
        </v-form>
        <div class="text-center">
            <v-snackbar color="green"
                        v-model=" successRegistration"
                        :timeout="timeoutSuccessRegistration"
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
                        :timeout="timeoutFailAuth"
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