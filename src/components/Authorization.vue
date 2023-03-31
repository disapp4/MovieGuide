<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent, ref } from "vue";

type Data = {
    username: string,
    password: string
}
export default defineComponent({
    data(): Data {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        logIn() {

             client.logIn(this.username, this.password).then(() => router.push({ name: 'mainPage' }))
        },
        goToRegistration() {
             router.push({ name: 'registration' })
        }
    }
})
</script> 
<template>
    <v-card>
        <v-card-text>
            <v-form>
                <v-toolbar color="black">
                    <v-toolbar-title>Авторизация</v-toolbar-title></v-toolbar>
                <v-col cols="12" sm="6"> Username:
                    <v-text-field label="Enter your username" v-model="username" name="username"
                        prepend-inner-icon="mdi-mail" type="string" clearable filled></v-text-field></v-col>
                <v-col cols="12" sm="6"> Password:
                    <v-text-field label="Enter your password" v-model="password" name="password"
                        prepend-inner-icon="mdi-lock" type="password" clearable filled></v-text-field></v-col>
                <v-btn id="log_in" v-on:click="logIn" color="black"> Войти </v-btn>
                <v-card-actions>
                    Нет аккаунта? <v-btn id="registration" v-on:click="goToRegistration" color="black"> Регистрация </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>