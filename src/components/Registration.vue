<script lang="ts">
import router from "../router/index.js";
import { client } from "../Client";
import { defineComponent } from "vue";
import { CreateUserRequest } from "../models/CreateUserRequest";
import { useUserStore } from "../stores/userStore";

type Data = {
    username: string,
    password: string,
    store: ReturnType<typeof useUserStore>
}
export default defineComponent({
    data(): Data {
        return {
            username: "",
            password: "",
            store: useUserStore()
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
            client.postUsers(createUserRequest).then(() => {
                this.store.setRegistrationSuccess(true);
                router.push({ name: "authorization" });
            }).catch();
        }
    }
});
</script>
<template>
    <h1> {{ $t("registrationPage.registration") }} </h1>
    <div class="form">
        <v-form>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.username") }}
                <v-text-field :label="$t('placeholders.enterUsername')" v-model="username" name="username"
                              prepend-inner-icon="mdi-mail" type="string" clearable filled
                              variant="solo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.password") }}
                <v-text-field :label="$t('placeholders.enterPassword')" v-model="password" name="password"
                              prepend-inner-icon="mdi-lock" type="password" clearable filled
                              variant="solo"></v-text-field>
            </v-col>
            <v-card-actions>
                {{ $t("registrationPage.account") }}
                <v-btn id="registration" v-on:click="logIn" color="black"> {{ $t("registrationPage.logIn") }}
                </v-btn>
            </v-card-actions>
            <v-btn class="logIn" v-on:click="postUsers" color="black"> {{ $t("registrationPage.buttons.signUp") }}
            </v-btn>
        </v-form>
    </div>
</template>

<style scooped>
.title {
    font-size: larger
}

.form {
    position: relative;
    left: 33%
}

.logIn {
    position: relative;
    left: -33%
}
</style>