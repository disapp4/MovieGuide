import { defineStore } from "pinia";
import { User } from "../models/User";

export const appStore = defineStore("appStore", {
    state: () => ({
        user: null as null | User,
        registeredRecently: false
    }),
    getters: {
        currentUser: state => state.user,
        isAdmin: state => state.user?.roles.includes("ROLE_ADMIN")
    },
    actions: {
        setRegistrationSuccess(value: boolean) {
            this.registeredRecently = value;
        },
        pullRegistrationSuccess() {
            let regSuccessValue = this.registeredRecently;
            this.registeredRecently = false;
            return regSuccessValue;
        },
        login(user: User) {
            this.user = user;
        },
        logout() {
            this.user = null;
        }
    }
});