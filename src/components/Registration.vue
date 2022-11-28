<script >


import router from "../router";
import client from "../client";

export default {
    data() {
        return {
            username:"",
            password:""
        }
    },
    props: {

    },
    methods: {
        logIn() {

            router.push({ name: 'authorization' })
        },
        
        postUsers() {
            client.postUsers({username:this.username, password: this.password}, () => router.push({ name: 'authorization' }), () => alert("error"))
        }
    }
}

</script> 
<template>

    <p> <label for="name"> Username: </label><input id="username" v-model="this.username" type="string" placeholder="логин"></p>
    <p> <label for="name"> Password: </label><input id="password" v-model="this.password" type="password" placeholder="пароль"></p>
    <br>
    <button id="post_users" type="button" v-on:click="postUsers"> Зарегистрироваться </button>
    <br>
    <button id="log_in" type="button" v-on:click="logIn"> Войти в аккаунт </button>
    <br>
</template>