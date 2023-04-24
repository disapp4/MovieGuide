<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent } from "vue";

type Data = {
    username: string,
    password: string
}
export default defineComponent({
    data(): Data {
        return {
            username: "",
            password: ""
        };
    },
    methods: {
        logIn() {

            client.logIn(this.username, this.password).then(() => router.push({ name: "mainPage" }));
        },
        goToRegistration() {
            router.push({ name: "registration" });
        }
    }
});
</script>
<template>
    <v-card>
        <v-card-text>
            <v-form><h1> {{ $t("authorizationPage.authorization") }} </h1>

                <v-col cols="12" sm="6"> {{ $t("placeholders.username") }}
                    <v-text-field :label="$t('placeholders.enterUsername')" v-model="username" name="username"
                                  prepend-inner-icon="mdi-mail" type="string" clearable filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"> {{ $t("placeholders.password") }}
                    <v-text-field :label="$t('placeholders.enterPassword')" v-model="password" name="password"
                                  prepend-inner-icon="mdi-lock" type="password" clearable filled></v-text-field>
                </v-col>
                <v-btn id="log_in" v-on:click="logIn" color="black"> {{ $t("authorizationPage.buttons.logIn") }}</v-btn>
                <v-card-actions>
                    {{ $t("authorizationPage.noAccount") }}
                    <v-btn id="registration" v-on:click="goToRegistration" color="black">
                        {{ $t("authorizationPage.signUp") }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>