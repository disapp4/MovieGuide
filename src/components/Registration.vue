<script lang="ts">
import router from "../router/index.js"
import { client } from "../AxiosClient"
import { defineComponent} from "vue"
import { CreateUserRequest} from "../models/CreateUserRequest"
import { CreateUserResponse} from "../models/CreateUserResponse"
import { AxiosResponse } from "axios"

type Data = {
    username:  string,
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

            router.push({ name: 'authorization' })
        },
        postUsers() {
            let createUserRequest = new CreateUserRequest();
            createUserRequest.username = this.username;
            createUserRequest.password = this.password;
            client.postUsers(createUserRequest).then( (response: AxiosResponse<CreateUserResponse>) => {
                router.push({ name: 'authorization' }),
                alert('Регистрация прошла успешна')}).
                catch(() => alert("Ошибка при регистрации"))
        }
    }
})
</script>
<template>

<v-card>
        <v-card-text>
            <v-form>
                <v-toolbar color="black">
                    <v-toolbar-title>Регистрация</v-toolbar-title></v-toolbar>
                <v-col cols="12" sm="6"> Username:
                    <v-text-field label="Enter your username" v-model="username" name="username"
                        prepend-inner-icon="mdi-mail" type="string" clearable filled></v-text-field></v-col>
                <v-col cols="12" sm="6"> Password:
                    <v-text-field label="Enter your password" v-model="password" name="password"
                        prepend-inner-icon="mdi-lock" type="password" clearable filled></v-text-field></v-col>
                <v-btn id="log_in" v-on:click="postUsers" color="black"> Зарегистрироваться </v-btn>
                <v-card-actions>
                    Есть аккаунт? <v-btn id="registration" v-on:click="logIn" color="black"> Войти в аккаунт </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>

</template>

