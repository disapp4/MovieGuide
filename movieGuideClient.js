const host = "https://movie-guide-backend.ntrubkin.ru/";
const moviesUrl = host + "movies/";
function callGetAllMovies(onSuccess) {
    $.ajax({
        url: moviesUrl,         
        method: 'get',           
        success: onSuccess,
        error: onRequestError
    });
}

function callPostMovie(createMovieRequest,onSuccess) {
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

function callGetMovie(movieId,onSuccess) {
    $.ajax({
        url: moviesUrl + movieId,
        method: 'get',
        dataType: 'json',
        success: onSuccess,
        error: onRequestError

    });
}

function callPutMovie(movie,onSuccess) {
    $.ajax({
        url: moviesUrl + movie.id,
        method: 'put',
        contentType: "application/json",
        data: JSON.stringify({ title: movie.title, description: movie.description }),
        success: onSuccess,
        error: onRequestError

    });
}

function callDeleteMovie(movieId,onSuccess) {
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


function onRequestError(error) {
    console.error(error);
    alert("Произошла ошибка вызова, смотри в консоль")
}


