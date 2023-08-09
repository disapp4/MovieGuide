<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent, inject } from "vue";
import { AxiosResponse } from "axios";
import { User } from "../models/User.js";
import { useUserRole } from "../globalRole";


type Data = {
    username: string,
    password: string,
    snackbar1: boolean,
    timeout1: number,
    snackbar2: boolean,
    timeout2: number
}
let globalRole = useUserRole();


export default defineComponent({
        data(): Data {
            return {
                username: "",
                password: "",
                snackbar1: false,
                timeout1: 3000,
                snackbar2: false,
                timeout2: 8000

            };
        },
        mounted: function() {
            this.snackbar1 = this.$route.hash == "#reg-success";
            this.snackbar2 = this.$route.hash == "#authFail";
        },
        methods: {
            logIn() {
                client.logIn(this.username, this.password).then((response: AxiosResponse<User>) => {


                    globalRole.user.value = response.data;

                    console.log(globalRole.user.value);

                    router.push({ name: "mainPage" });
                }).catch(

                );

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
                        v-model="snackbar1"
                        :timeout="timeout1"
            >
                {{ $t("authorizationPage.snackbarSuccess") }}

                <template v-slot:actions>
                    <v-btn
                        color="white"
                        size="large"
                        @click="snackbar1 = false"
                        prepend-icon="mdi-close-circle"
                    >
                    </v-btn>
                </template>
            </v-snackbar>
        </div>

        <div class="text-center">
            <v-snackbar color="red"
                        v-model="snackbar2"
                        :timeout="timeout2"

            >
                {{ $t("authorizationPage.snackbarFail") }}

                <template v-slot:actions>
                    <v-btn
                        color="white"
                        size="large"
                        @click="snackbar2 = false"
                        prepend-icon="mdi-close-circle"

                    >
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </div>
</template>
<style scooped>
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