import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../components/MainPage.vue";
import AddMovie from "../components/AddMovie.vue";
import EditMovie from "../components/EditMovie.vue";
import Registration from "../components/Registration.vue";
import Authorization from "../components/Authorization.vue";
import FavouriteMovies from "../components/FavouriteMovies.vue";
import InformationAboutMovie from "../components/InformationAboutMovie.vue";
import DeleteMovieImage from "../components/DeleteMovieImage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/mainPage', component: MainPage, name: "mainPage" },
    { path: '/add',  component: AddMovie, name: "addMovie" },
    { path: '/edit/:id',  component: EditMovie, name: "editMovie" },
    { path: '/deleteMovieImage/:id',  component: DeleteMovieImage, name: "deleteMovieImage" },
    { path: '/favourite',  component: FavouriteMovies, name: "favouriteMovies" },
    { path: '/information/:id',  component: InformationAboutMovie, name: "informationAboutMovie" },
    { path: '/registration',  component: Registration, name: "registration" },
    { path: '/',  component: Authorization, name: "authorization" },
  
  
  ],
});

export default router;