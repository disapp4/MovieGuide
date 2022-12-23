import $ from 'jquery';
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
});
export default {
    getMovies: function (onSuccess, pageRequest) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies" + `?page=` + pageRequest.number + `&size=` + pageRequest.size + `&sort=` + pageRequest.field + `,` + pageRequest.order,
            method: 'get',
            success: onSuccess,
            error: function () {
                console.error();
            },
            crossDomain: true,
        });
    },
    postMovie: function (createMovieRequest, onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies",
            method: 'post',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(createMovieRequest),
            success: onSuccess,
            error: this.onRequestError
        });
    },
    getMovie: function (movieId, onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId,
            method: 'get',
            dataType: 'json',
            success: onSuccess,
            error: this.onRequestError
        });
    },
    putMovie: function (movie, onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies/" + movie.id,
            method: 'put',
            contentType: "application/json",
            data: JSON.stringify({ title: movie.title, description: movie.description }),
            success: onSuccess,
            error: this.onRequestError
        });
    },
    deleteMovie: function (movieId, onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId,
            method: 'delete',
            success: onSuccess,
            error: this.onRequestError
        });
    },
    healthCheck: function (onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/health-check",
            method: 'get',
            success: onSuccess,
            error: this.onRequestError
        });
    },
    logOut: function (onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/logout",
            method: 'get',
            success: onSuccess,
            error: this.onRequestError
        });
    },
    getCurrentUser: function (onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/users/me",
            method: 'get',
            success: onSuccess,
            error: this.onRequestError
        });
    },
    logIn: function (username, password, onSuccess, onError) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/users/me",
            method: 'get',
            success: onSuccess,
            error: onError,
            headers: { "Authorization": "Basic " + window.btoa(username + ":" + password) },
        });
    },
    postUsers: function (createUserRequest, onSuccess, onError) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/users/",
            method: 'post',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(createUserRequest),
            success: onSuccess,
            error: onError
        });
    },

    putMoviePosterSync: function (imageFile, movieId) {
        console.log(imageFile);
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId + "/poster",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'PUT',
            error: this.onRequestError,
            async: false
        })
    },
    postMovieImageSync: function (imageFile, movieId) {

        const formData = new FormData();
        formData.append('imageFile', imageFile);
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId + "/images",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            error: this.onRequestError,
            async: false
        })
    },
    getImage: function (movieId, onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId,
            method: 'get',
            dataType: 'json',
            success: onSuccess,
            error: this.onRequestError
        });
    },
    deletePoster: function (movieId, onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId + "/poster",
            method: 'delete',
            success: onSuccess,
            error: this.onRequestError

        })
    },
    deleteImage: function (movieId, imageId, onSuccess) {
        $.ajax({
            url: "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId + "/images/" + imageId,
            method: 'delete',
            success: onSuccess,
            error: this.onRequestError

        })
    },
    onRequestError: function (error) {


        if (error.status == 401) {
            window.location.href = '/authorization/authorization.html'
        }
        else {
            console.error(error);
            alert("Произошла ошибка вызова, смотри в консоль")
        }
    }



}

