import { createRouter, createWebHistory } from "vue-router";

import MainPage from "../components/MainPage.vue";
import Authorization from "../components/Authorization.vue";
import AddMovie from "../components/AddMovie.vue";
import FavouriteMovies from "../components/FavouriteMovies.vue";
import EditMovie from "../components/EditMovie.vue";
import InformationAboutMovie from "../components/InformationAboutMovie.vue";
import Registration from "../components/Registration.vue";
import DeleteMovieImage from "../components/DeleteMovieImage.vue";

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", component: MainPage, name: "mainPage" },
        { path: "/add", component: AddMovie, name: "addMovie" },
        { path: "/edit/:id", component: EditMovie, name: "editMovie" },
        { path: "/delete-movie-image/:id", component: DeleteMovieImage, name: "deleteMovieImage" },
        { path: "/favourite", component: FavouriteMovies, name: "favouriteMovies" },
        { path: "/information/:id", component: InformationAboutMovie, name: "informationAboutMovie" },
        { path: "/registration", component: Registration, name: "registration" },
        { path: "/authorization", component: Authorization, name: "authorization" }
    ]
});