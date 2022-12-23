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
<!-- <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="2"
        > Username: 
        <v-text-field
            v-model="this.username" 
            type="string" 
            label="username" 
            clearable 
            filled
            ></v-text-field>   
        </v-col>

        <v-col
          cols="12"
          sm="2"
        > Password: 
        <v-text-field
            v-model="this.password" 
            type="password" 
            label="password" 
            clearable 
            filled
            ></v-text-field>   
        </v-col>
    </v-row>
    </v-container>
    <p> <label for="name"> Username: </label><v-text-field id="username" v-model="this.username" type="string" placeholder="логин"></v-text-field></p>
    <p> <label for="name"> Password: </label><input id="password" v-model="this.password" type="password" placeholder="пароль"></p>
    <br>
    <v-btn id="post_users" type="button" v-on:click="postUsers"> Зарегистрироваться </v-btn>
    <br>
    <v-btn id="log_in" type="button" v-on:click="logIn"> Войти в аккаунт </v-btn>
    <br> -->
    <v-card>
        <v-card-text>
            <v-form>
                <v-toolbar  color="black">
                        <v-toolbar-title>Регистрация</v-toolbar-title></v-toolbar>
                <v-col cols="12" sm="6"> Username:
                    <v-text-field label="Enter your username" v-model="username" name="username"
                        prepend-inner-icon="mdi-mail" type="string" clearable filled ></v-text-field></v-col>
                        <v-col cols="12" sm="6"> Password:
                    <v-text-field label="Enter your password" v-model="password" name="password"
                        prepend-inner-icon="mdi-lock" type="password" clearable filled ></v-text-field></v-col>
                        <v-btn id="log_in" v-on:click="postUsers" color="black"  > Зарегистрироваться </v-btn> 
                        <v-card-actions>
                            Есть аккаунт? <v-btn id="registration" v-on:click="logIn"  color="black" > Войти в аккаунт </v-btn>
                        </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>