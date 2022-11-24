<script >
import router from "../router";
import client from "../client";
export default {
    data() {
        return {

            username: '',
            password: ''

        }
    },
    props: {

    },
    methods: {
        logIn() {

            client.logIn(this.username, this.password, () => router.push({ name: 'mainPage' }), () => alert("error"))
        },
        goToRegistration() {
            router.push({ name: 'registration' })
        }

    }
}
</script> 
<template>

    <p> <label for="name"> Username: </label><input id="username" v-model="username" type="string" placeholder="логин">
    </p>
    <p> <label for="name"> Password: </label><input id="password" v-model="password" type="password"
            placeholder="пароль"></p>
    <br>
    <button id="log_in" type="button" v-on:click="logIn"> Войти </button>
    <br>
    <button id="registration" type="button" v-on:click="goToRegistration"> Регистрация </button>
</template>