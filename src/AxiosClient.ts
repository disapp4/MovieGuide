import axios, { AxiosResponse } from "axios";
import { Movie } from "./models/Movie";
import { Page } from "./models/Page";
import { CreateMovieRequest } from "./models/CreateMovieRequest";
import { CreateUserRequest } from "./models/CreateUserRequest";
import { CreateUserResponse } from "./models/CreateUserResponse";
import { PageRequest } from "./models/PageRequest";
import { CreateMovieResponse } from "./models/CreateMovieResponse";
import { User } from "./models/User";


export class AxiosClient {

    private axiosInstance = axios.create({
        withCredentials: true,
        baseURL: "https://movie-guide-backend.ntrubkin.ru/"
    });

    public async getMovie(movieId: string) {
        return this.axiosInstance.get<Movie>("movies/" + movieId);
    }



    public async getMovies(pageRequest: PageRequest) {
        return this.axiosInstance.get<Page<Movie>>("movies" + `?page=` + pageRequest.number + `&size=` + pageRequest.size + `&sort=` + pageRequest.field + `,` + pageRequest.order);
    }

    public postMovie(createMovieRequest: CreateMovieRequest) {
        return this.axiosInstance.post<CreateMovieResponse>("movies",
            createMovieRequest
        );
    }

    public putMovie(movie: Movie) {
        return this.axiosInstance.put("movies/" + movie.id, {
            title: movie.title,
            description: movie.description
        });
    }

    public deleteMovie(movieId: string) {
        return this.axiosInstance.delete("movies/" + movieId);
    }

    public healthCheck() {
        return this.axiosInstance.get("health-check");
    }

    public logOut() {
        return this.axiosInstance.get("logout", {
            headers:{ Accept: "*/*"}});
    }

    public logIn(username: string, password: string) {
        return this.axiosInstance.get<User>("users/me", { headers: { "Authorization": "Basic " + window.btoa(username + ":" + password) } });
    }

    public postUsers(createUserRequest: CreateUserRequest) {
        return this.axiosInstance.post<CreateUserResponse>("users",
            createUserRequest
        );
    }

    public putMoviePoster(imageFile: File, movieId: string) {
        let formData = new FormData();
        formData.append("imageFile", imageFile);
        return this.axiosInstance.put("movies/" + movieId + "/poster", formData ,{
            headers: { "Content-Type": "multipart/form-data"},

        });
    }

    public postMovieImage(imageFile: File , movieId: string) {
        let formData  = new FormData();
        formData.append("imageFile", imageFile);
        return this.axiosInstance.post("movies/" + movieId + "/images", formData,{

            headers: { "Content-Type": "multipart/form-data" }
        });
    }

     public getImage(movieId: string){
         return this.axiosInstance.get("images/" + movieId)
     }

    public deletePoster(movieId: string) {
        return this.axiosInstance.delete("movies/" + movieId + "/poster");
    }

    public deleteImage(movieId: string, imageId: string) {
        return this.axiosInstance.delete("movies/" + movieId + "/images/" + imageId);
    }
}


export const client: AxiosClient = new AxiosClient();


