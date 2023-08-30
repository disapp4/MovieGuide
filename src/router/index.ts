import { createRouter, createWebHistory } from "vue-router";

import MainPage from "../view/MainPage.vue";
import Authorization from "../view/Authorization.vue";
import AddMovie from "../view/AddMovie.vue";
import EditMovie from "../view/EditMovie.vue";
import Registration from "../view/Registration.vue";
import MovieInformation from "../view/MovieInformation.vue";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", component: MainPage, name: "mainPage" },
        { path: "/add", component: AddMovie, name: "addMovie" },
        { path: "/edit/:id", component: EditMovie, name: "editMovie" },
        { path: "/information/:id", component: MovieInformation, name: "informationAboutMovie" },
        { path: "/registration", component: Registration, name: "registration" },
        { path: "/authorization", component: Authorization, name: "authorization" }
    ]
});