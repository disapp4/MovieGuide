<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent } from "vue";
import { CreateUserRequest } from "../models/CreateUserRequest";
import { CreateUserResponse } from "../models/CreateUserResponse";
import { AxiosResponse } from "axios";

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

            router.push({ name: "authorization" });
        },
        postUsers() {
            let createUserRequest = new CreateUserRequest();
            createUserRequest.username = this.username;
            createUserRequest.password = this.password;
            client.postUsers(createUserRequest).then((response: AxiosResponse<CreateUserResponse>) => {
                router.push({ name: "authorization" }),
                    alert("Регистрация прошла успешна");
            }).catch(() => alert("Ошибка при регистрации"));
        }
    }
});
</script>
<template>

    <v-card>
        <v-card-text>
            <v-form><h1> {{ $t("registrationPage.registration") }} </h1>

                <v-col cols="12" sm="6"> {{ $t("placeholders.username") }}
                    <v-text-field :label="$t('placeholders.enterUsername')" v-model="username" name="username"
                                  prepend-inner-icon="mdi-mail" type="string" clearable filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"> {{ $t("placeholders.password") }}
                    <v-text-field :label="$t('placeholders.enterPassword')" v-model="password" name="password"
                                  prepend-inner-icon="mdi-lock" type="password" clearable filled></v-text-field>
                </v-col>
                <v-btn id="log_in" v-on:click="postUsers" color="black"> {{ $t("registrationPage.buttons.signUp") }}
                </v-btn>
                <v-card-actions>
                    {{ $t("registrationPage.account") }}
                    <v-btn id="registration" v-on:click="logIn" color="black"> {{ $t("registrationPage.logIn") }}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>

</template>

