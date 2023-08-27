import { defineStore } from "pinia";
import { User } from "../models/User";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: null as null | User,
        registrationSuccess: false
    }),
    getters: {
        currentUser: state => state.user,
        hasRole: state => state.user?.roles.includes("ROLE_ADMIN")
    },
    actions: {
        setRegistrationSuccess(value: boolean) {
            this.registrationSuccess = value;
        },
        pullRegistrationSuccess() {
            let regSuccessValue = this.registrationSuccess;
            this.registrationSuccess = false;
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