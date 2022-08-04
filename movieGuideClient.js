const host = "https://movie-guide-backend.ntrubkin.ru/";
const moviesUrl = host + "movies/";
const usersUrl = host + "users/";

$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
});

function callGetAllMovies(onSuccess) {
    $.ajax({
        url: moviesUrl,
        method: 'get',
        success: onSuccess,
        error: onRequestError,
        crossDomain: true,
    });
}

function callPostMovie(createMovieRequest, onSuccess) {
    $.ajax({
        url: moviesUrl,
        method: 'post',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(createMovieRequest),
        success: onSuccess,
        error: onRequestError
    });
}

function callGetMovie(movieId, onSuccess) {
    $.ajax({
        url: moviesUrl + movieId,
        method: 'get',
        dataType: 'json',
        success: onSuccess,
        error: onRequestError

    });
}

function callPutMovie(movie, onSuccess) {
    $.ajax({
        url: moviesUrl + movie.id,
        method: 'put',
        contentType: "application/json",
        data: JSON.stringify({ title: movie.title, description: movie.description }),
        success: onSuccess,
        error: onRequestError
    });
}

function callDeleteMovie(movieId, onSuccess) {
    $.ajax({
        url: moviesUrl + movieId,
        method: 'delete',
        success: onSuccess,
        error: onRequestError
    });
}

function callHealthCheck(onSuccess) {
    $.ajax({
        url: host + "health-check",
        method: 'get',
        success: onSuccess,
        error: onRequestError
    });
}

function callLogOut(onSuccess) {
    $.ajax({
        url: host + "logout",
        method: 'get',
        success: onSuccess,
        error: onRequestError
    });
}
function callGetCurrentUser(onSuccess) {
    $.ajax({
        url: usersUrl + "me",
        method: 'get',
        success: onSuccess,
        error: onRequestError
    });
}
function callLogIn(username, password, onSuccess, onError) {
    $.ajax({
        url: usersUrl + "me",
        method: 'get',
        success: onSuccess,
        error: onError,
        headers: { "Authorization": "Basic " + window.btoa(username + ":" + password) },
    });
}

function callPostUsers(username,password,onSuccess, onError) {
    $.ajax({
        url: usersUrl,
        method: 'post',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(),
        success: onSuccess,
        error: onError
    });
}

function callPutMoviePoster(imageFile, movieId, onSuccess) {

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    $.ajax({
        url: moviesUrl + movieId + "/poster",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        method: 'PUT',
        success: onSuccess,
        error: onRequestError,
        async: false
    })
}

function callPostMovieImage(imageFile, movieId, onSuccess) {

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    $.ajax({
        url: moviesUrl + movieId + "/images",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        success: onSuccess,
        error: onRequestError,
        async: false
    })
}

function callGetImage(movieId, onSuccess) {
    $.ajax({
        url: moviesUrl + movieId,
        method: 'get',
        dataType: 'json',
        success: onSuccess,
        error: onRequestError

    });
}

function callDeletePoster(movieId, onSuccess) {
    $.ajax({
        url: moviesUrl + movieId + "/poster",
        method: 'delete',
        success: onSuccess,
        error: onRequestError
    });
}
function onRequestError(error) {
    
    if (error.status == 401) {
        window.location.href = '/authorization/authorization.html'
    }
    else {
        console.error(error);
        alert("Произошла ошибка вызова, смотри в консоль")
    }
}


