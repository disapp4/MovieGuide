import { defineStore } from "pinia";
import { User } from "../models/User";

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: null as null | User,
        invalidCredentials: false

    }),
    getters: {
        currentUser: state => state.user,
        hasRole: state => state.user?.roles.includes("ROLE_ADMIN"),
        isInvalidCredentials: state => state.invalidCredentials
    },
    actions: {
        login(user: User) {
            this.user = user;
        },
        logout() {
            this.user = null;

        },
        handleInvalidCredentials() {
            this.invalidCredentials = true;
        }
    }
});