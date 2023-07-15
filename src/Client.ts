import axios, { AxiosResponse } from "axios";
import { Movie } from "./models/Movie";
import { Page } from "./models/Page";
import { CreateMovieRequest } from "./models/CreateMovieRequest";
import { CreateUserRequest } from "./models/CreateUserRequest";
import { CreateUserResponse } from "./models/CreateUserResponse";
import { PageRequest } from "./models/PageRequest";
import { CreateMovieResponse } from "./models/CreateMovieResponse";
import { User } from "./models/User";
import router from "./router";
import { Language } from "./models/Language";
import { CreateImageResponse } from "./models/CreateImageResponse";

export class Client {
    private axiosInstance = axios.create({
        withCredentials: true,
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL
    });

    constructor() {
        this.axiosInstance.interceptors.response.use(
          response => response,
          error => {
            if (error.response.status === 401) {
              router.push({ name: "authorization" });
            }
            return Promise.reject(error);
          }
        );
    }

    public async getMovie(movieId: string) {
        return this.axiosInstance.get<Movie>("movies/" + movieId);
    }

    public async getMovies(pageRequest: PageRequest, language: Language) {
        return this.axiosInstance.get<Page<Movie>>("movies" + `?page=` + pageRequest.number + `&size=` + pageRequest.size + `&sort=` + pageRequest.field + `,` + pageRequest.order + `&lang=` + language);
    }

    public postMovie(createMovieRequest: CreateMovieRequest) {
        return this.axiosInstance.post<CreateMovieResponse>("movies",
            createMovieRequest
        );
    }

    public putMovie(movie: Movie) {
        return this.axiosInstance.put("movies/" + movie.id, movie);
    }

    public deleteMovie(movieId: string) {
        return this.axiosInstance.delete("movies/" + movieId);
    }

    public healthCheck() {
        return this.axiosInstance.get("health-check");
    }

    public logOut() {
        return this.axiosInstance.get("logout", {
            headers: { Accept: "*/*" }
        });
    }

    public logIn(username: string, password: string) {
        return this.axiosInstance.get<User>("users/me", { headers: { "Authorization": "Basic " + window.btoa(username + ":" + password) } });
    }

    public postUsers(createUserRequest: CreateUserRequest) {
        return this.axiosInstance.post<CreateUserResponse>("users",
            createUserRequest
        );
    }

    public putMoviePoster(imageFile: File, movieId: string, language: Language) {
        let formData = new FormData();
        formData.append("imageFile", imageFile);
        return this.axiosInstance.put("movies/" + movieId + "/poster" + `?lang=` + language, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

    public postImage(imageFile: File) {
        let formData = new FormData();
        formData.append("imageFile", imageFile);
        return this.axiosInstance.post<CreateImageResponse>("images", formData, {

            headers: { "Content-Type": "multipart/form-data" }
        });
    }

    public getImage(movieId: string) {
        return this.axiosInstance.get("images/" + movieId);
    }

    public deletePoster(movieId: string, language: Language) {
        return this.axiosInstance.delete("movies/" + movieId + "/poster" + `?lang=` + language);
    }

    public deleteImage(movieId: string, imageId: string) {
        return this.axiosInstance.delete("movies/" + movieId + "/images/" + imageId);
    }

    public onRequestError(error: any) {
        if (error.response.status == 401) {
            router.push({ name: "authorization" }).then(err => console.error(err));
        } else {
            console.error(error);
            alert("Произошла ошибка вызова, смотри в консоль");
        }
    }
}

export const client: Client = new Client();


