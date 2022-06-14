const host = "https://movie-guide-backend.ntrubkin.tk/";
const moviesUrl = host + "movies/";
function getAllMovies(onSuccess) {
    $.ajax({
        url: moviesUrl,         /* Куда пойдет запрос */
        method: 'get',             /* Метод передачи (post или get) */
        success: onSuccess,
        error: onRequestError
    });
}

function postMovie(createMovieRequest,onSuccess) {
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

function getMovie(movieId,onSuccess) {
    $.ajax({
        url: moviesUrl + movieId,
        method: 'get',
        dataType: 'json',
        success: onSuccess,
        error: onRequestError

    });
}

function putMovie(movie,onSuccess) {
    $.ajax({
        url: moviesUrl + movie.id,
        method: 'put',
        contentType: "application/json",
        data: JSON.stringify({ title: movie.title, description: movie.description }),
        success: onSuccess,
        error: onRequestError

    });
}

function deleteMovie(movieId,onSuccess) {
    $.ajax({
        url: moviesUrl + movieId,
        method: 'delete',
        success: onSuccess,
        error: onRequestError

    });
}

function healthCheck(onSuccess) {
    $.ajax({
        url: host + "health-check",
        method: 'get',
        success: onSuccess,
        error: onRequestError

    });
}


function onRequestError(error) {
    console.error(error);
    alert("Произошла ошибка, смотри в консоль")
}


