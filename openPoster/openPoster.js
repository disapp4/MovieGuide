const params = new URLSearchParams(window.location.search);
let movieId = params.get('movieId');

function showPoster(movie) {
  let posterId = movie.posterId;
  if (posterId !== null) {
    $("#poster").attr("src", "https://movie-guide-backend.ntrubkin.ru/movies/" + movieId + "/poster")
  }
  else {
    $("#poster").attr("src", "../no_poster.jpg");
  }
}

showPoster(movieId);
