<script lang="ts">
import router from "../router";
import { client } from "../clients/Client";
import { defineComponent } from "vue";
import { CreateUserRequest } from "../models/CreateUserRequest";
import { appStore } from "../stores/appStore";

type Data = {
    username: string,
    password: string,
    store: ReturnType<typeof appStore>
}
export default defineComponent({
    data(): Data {
        return {
            username: "",
            password: "",
            store: appStore()
        };
    },
    methods: {
        goToLogInPage() {
            router.push({ name: "authorization" });
        },
        postUsers() {
            let request = new CreateUserRequest();
            request.username = this.username;
            request.password = this.password;
            client.postUsers(request).then(() => {
                this.store.setRegistrationSuccess(true);
                router.push({ name: "authorization" });
            });
        },
        focusPasswordInput() {
            let passwordInput = this.$refs.passwordInput as HTMLInputElement | undefined;
            if (passwordInput) {
                passwordInput.focus();
            }
    }}
});
</script>
<template>
    <h1> {{ $t("registrationPage.registration") }} </h1>
    <div class="form">
        <v-form>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.username") }}
                <v-text-field :label="$t('placeholders.enterUsername')" v-model="username" name="username"
                              prepend-inner-icon="mdi-mail" type="string" clearable filled
                              variant="solo" @keydown.enter="focusPasswordInput"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="title"> {{ $t("placeholders.password") }}
                <v-text-field ref="passwordInput" :label="$t('placeholders.enterPassword')" v-model="password" name="password"
                              prepend-inner-icon="mdi-lock" type="password" clearable filled
                              variant="solo" @keydown.enter="postUsers"></v-text-field>
            </v-col>
            <v-card-actions>
                {{ $t("registrationPage.account") }}
                <v-btn id="registration" v-on:click="goToLogInPage"  color="black"> {{ $t("registrationPage.logIn") }}
                </v-btn>
            </v-card-actions>
            <v-btn class="logIn" v-on:click="postUsers" color="black"> {{ $t("registrationPage.buttons.signUp") }}
            </v-btn>
        </v-form>
    </div>
</template>

<style scoped>
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